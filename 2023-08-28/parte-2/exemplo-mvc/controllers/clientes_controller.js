async function criarCliente(req, res) {
  const cliente = await Cliente.create(req.body);
  res.json(cliente);
}

async function listarClientes(req, res) {
  const clientes = await Cliente.findAll();
  res.json(clientes);
}
async function deletarCliente(req, res) {
  const cliente = await Cliente.findByPk(req.params.id);
  await cliente.destroy();
  res.json({ mensagem: 'Cliente deletado com sucesso' });
}

async function atualizarCliente(req, res) {
  const cliente = await Cliente.findByPk(req.params.id);
  cliente.nome = req.body.nome || null;
  cliente.sobrenome = req.body.sobrenome || null;
  cliente.idade = req.body.idade || null;
  cliente.cpf = req.body.cpf || null;
  cliente.save();
  res.json(cliente);
}

module.exports = {
  criarCliente,
  listarClientes,
  deletarCliente,
  atualizarCliente,
};
