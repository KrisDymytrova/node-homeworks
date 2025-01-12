const crypto = require('crypto');

const hash = crypto.createHash('sha256').update('Hello').digest('hex');
console.log('Хеш:', hash);