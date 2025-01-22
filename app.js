const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Метод: ${req.method}, URL: ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Привіт з Express.js!');
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Користувач з ID: ${userId}`);
});

app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send('Будь ласка, надайте ім\'я та електронну пошту.');
    }

    res.send(`Отримано дані: Ім'я - ${name}, Електронна пошта - ${email}`);
});

app.use((req, res) => {
    res.status(404).send('Сторінка не знайдена');
});

app.listen(3000, () => {
    console.log('Сервер працює на порту 3000');
});