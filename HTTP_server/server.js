const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Функція логування запиту
const logRequest = (req) => {
    console.log(`Метод: ${req.method}, URL: ${req.url}`);
};

// Створення HTTP-сервера
const server = http.createServer((req, res) => {
    logRequest(req);
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const route = parsedUrl.pathname;

    // Обробка маршрутів
    if (req.method === 'GET') {
        if (route === '/') {
            // Відправка вмісту index.html
            const filePath = path.join(__dirname, 'index.html');
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('File is not found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else if (route === '/about') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('About page');
        } else if (route === '/contact') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Contacts');
        } else if (route === '/json') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Hello, JSON!' }));
        } else if (route === '/params') {
            // GET-запит з параметрами
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`You passed the parameters: ${JSON.stringify(query)}`);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Page is not found');
        }
    } else if (req.method === 'POST') {
        // Обробка POST-запита
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Data obtained: ${body}`);
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method not allowed');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});