const url = require('url');

const myUrl = new URL('https://example.com/path?name=Node.js');
console.log('Протокол:', myUrl.protocol);
console.log('Шлях:', myUrl.pathname);
console.log('Параметри:', myUrl.searchParams.get('name'));