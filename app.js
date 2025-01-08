const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Помилка читання файлу:", err);
        return;
    }
    console.log("Вміст файлу data.txt:", data);
});