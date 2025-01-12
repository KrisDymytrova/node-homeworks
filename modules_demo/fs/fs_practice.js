const fs = require('fs');

fs.readFile('readme.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Помилка читання файлу:', err);
        return;
    }
    console.log('Вміст файлу:', data);
});


fs.writeFile('result.txt', 'Node.js', (err) => {
    if (err) {
        console.error('Помилка запису файлу:', err);
        return;
    }
    console.log('Файл успішно записано!');
});


if (fs.existsSync('result.txt')) {
    console.log('Файл існує.');
} else {
    console.log('Файл не знайдено.');
}


fs.mkdir('testFolder', (err) => {
    if (err) {
        console.error('Помилка створення папки:', err);
        return;
    }
    console.log('Папку створено!');
});

if (fs.existsSync('testFolder')) {
    console.log('Папка вже існує.');
} else {
    console.log('Папку не знайдено.');
}