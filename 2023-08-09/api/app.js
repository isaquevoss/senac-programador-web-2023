const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

var db;

function criarTabelas() {
  db.exec(`CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        sobrenome TEXT,
        idade TEXT 
    );`);
}

app.get('/clientes/:id', async (req, res) => {
  const cliente = await db.get('SELECT * FROM clientes WHERE id = ?', [
    req.params.id,
  ]);
  res.json(cliente);

});

app.post('/clientes', async (req,res) => {      
    const insert = await db.run('INSERT INTO clientes (nome, sobrenome, idade) VALUES (?, ?, ?)', [req.body.nome, req.body.sobrenome, req.body.idade]);
    const cliente = await db.get('SELECT * FROM clientes WHERE id = ?', [insert.lastID]);
    res.json(cliente);
});

async function getClientes(req, res) {
  const clientes = await db.all('SELECT * FROM clientes');
  res.json(clientes);
}

app.get('/clientes', getClientes);


app.listen(3000, async () => {
  console.log('Server is running on port 3000');
  db = await sqlite.open({
    filename: 'database/database.db',
    driver: sqlite3.Database,
  });
  criarTabelas();
});
