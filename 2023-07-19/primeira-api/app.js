var express = require('express');
var app = express();

app.get('/', function(req, res) {    
    res.send('Olá mundo!');
})

app.listen(3000, function() {
    console.log('app rodando na porta 3000!');
});
//npm init -y
//npm install express
//node app.js
//abrir o navegador e acessar localhost:3000
