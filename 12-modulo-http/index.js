const http = require('http')


http.createServer((request, response) =>{
    response.end('Hellow NODEJS')
}).listen(5000, () =>console.log('Running server'))

