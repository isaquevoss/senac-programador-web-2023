const express = require('express');
const app = express();
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

//npm install jsonwebtoken
const jsonwebtoken = require('jsonwebtoken');

//função login e verificarAutenticacao

app.use(bodyParser.json());

var db;

app.listen(3000, async () => {
  db = await sqlite.open({
    filename: 'database/database.db',
    driver: sqlite3.Database,
  });
  await criarTabelas();
  console.log('applicativo rodando na porta 3000;');
});

function criarTabelas() {
 db.run(
    'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email varchar(100), senha varchar(100))'
  )
  db.run(   
    `CREATE TABLE IF NOT EXISTS clientes 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    nome varchar(100),
    sobrenome varchar(100),
    idade INTEGER);`
  )
}
//funcoes de requisição
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

  if (usuario?.senha == req.body.senha) {
    const token = jsonwebtoken.sign(usuario, 'senha super secreta', {
      expiresIn: 3600,
    });
    res.json({ mensagem: 'sucesso', token: token });
  } else {
    res.status(401).json({ mensagem: 'usuário ou senha inválidos' });
  }
}

async function getClientes(req, res) {
  const clientes = await db.all('select * from clientes');
  res.json(clientes);
}

function verificarAutenticacao(req, res, next) {
  try {
    jsonwebtoken.verify(req.headers.authorization,'senha super secreta');
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ mensagem: 'não autorizado' });
  }
}

//Registro de rotas
app.post('/cadastrar', cadastrarUsuario);

app.post('/login', login);

//MIDDLEWARE
app.use(verificarAutenticacao);


async function getCliente(req, res){
  //implementação 
  const cliente = await db.get('',[req.params.id]);
  res.json(cliente)
}

async function createCliente(req, res){
  const insert = await db.run ('insert into clientes () values (?,?,?)', [req.body.nome,]);
  const cliente = await db.get('select * from clientes where id = ?',[insert.lastID]);
  res.json(cliente);
}

async function updateCliente(req, res){
  await db.run('update clientes set nome = ?, sobrenome = ?, idade = ? where id = ?',[
    req.body.nome,
    req.body.sobrenome,
    req.body.idade,
    req.params.id
  ])
  const cliente = await db.get('select * from clientes where id ?', [req.params.id]);
  res.json(cliente);
}


//Registro de rotas protegitas
app.get('/clientes', getClientes);

app.get('/clientes/:id', getCliente);

app.post('/clientes', createCliente);

app.put('/clientes', updateCliente);



