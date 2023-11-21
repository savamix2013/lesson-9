const fs = require('fs');
 
let data = JSON.parse(fs.readFileSync('persons.txt', 'utf8'));
 
console.log(data);