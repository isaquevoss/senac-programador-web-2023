const express = require('express');

const app = express();

app.get('/', (req,res) => {
    res.json({message: 'Hello World!'})
})

var clientes = [
    {id: 1, nome: 'João'},
    {id: 2, nome: 'Maria'},
    {id: 3, nome: 'José'},
    {id: 4, nome: 'Pedro'}
]

app.get('/clientes', (req,res) => {
    res.json(clientes)
})

app.get('/clientes/:id', (req,res) => {
    var cliente = clientes.find(cliente => cliente.id == req.params.id)
    if (cliente) 
    res.json(clientes.find(cliente => cliente.id == req.params.id))
    else
    res.status(404).json({message: 'Cliente não encontrado!'})
})


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})