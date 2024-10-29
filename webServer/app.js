const http = require('http');

const server = http.createServer((req, res)=>{
res.write('hola mundo!');
res.end();
});

server.listen(3000, '127.0.0.1');
console.log("servidor web iniciado en http://127.0.0.1;3000")