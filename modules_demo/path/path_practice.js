const path = require('path');

const invalidPath = 'modules_demo/../fs/result.txt';
console.log('Нормалізований шлях:', path.normalize(invalidPath));

const filePath = 'result.txt';
console.log('Розширення файлу:', path.extname(filePath));