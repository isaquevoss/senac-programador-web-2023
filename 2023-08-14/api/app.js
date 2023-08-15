const express = require('express');
const app = express();
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var db;

app.listen(3000, async () => {
  db = await sqlite.open({
    filename: 'database/database.db',
    driver: sqlite3.Database,
  });
  criarTabelas();
  console.log('applicativo rodando na porta 3000;');
});

function criarTabelas() {
  db.run(
    'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email varchar(100), senha varchar(100))'
  );
}
//funcoes de requesicao
async function cadastrarUsuario(req, res) {
  const insert = await db.run(
    'insert into usuarios (email, senha) values (?, ?)',
    [req.body.email, req.body.senha]
  );
  const usuario = await db.get('select * from usuarios where id = ?', [
    insert.lastID,
  ]);
  res.json(usuario);
}

async function login(req, res) {
  const usuario = await db.get('select * from usuarios where email = ?', [
    req.body.email,
  ]);

  if (usario?.senha == req.body.senha) {
    res.json({ mensagem: 'sucesso', token: 'aqui vai ir um token'});
  } else {
    res.status(401).json({ mensagem: 'usuário ou senha inválidos' });
  }
}

function getClientes(req, res) {    
    res.json({ mensagem: 'retornando clientes' });
}

function verificarAutenticacao(req,res, next){
    const autenticado = true;
    console.log(req.headers.authorization)
    if (!autenticado){
        res.status(401).json({mensagem: 'Não autorizado'});
    }else{
        next();
    }
}

//Registro de rotas
app.post('/cadastrar', cadastrarUsuario);

app.post('/login', login);


app.use(verificarAutenticacao);

app.get('/clientes', getClientes);
