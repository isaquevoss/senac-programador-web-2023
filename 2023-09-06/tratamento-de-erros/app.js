function calcular(a, b) {
  return a + b;
}

function converterCliente(cliente) {
  if (!cliente.endereco) {
    throw new Error('O cliente não possui endereço e não será convertido');
  }

  return {
    nome: cliente.nome,
    endereco: cliente.endereco.rua + ', ' + cliente.endereco.numero,
  };
}
const clientes = [
  { nome: 'João', endereco: { rua: 'Rua 1', numero: 123 } },
  { nome: 'Maria', endereco: { rua: 'Rua 2', numero: 456 } },
  { nome: 'José', endereco: { rua: 'Rua 3', numero: 789 } },
  { nome: 'Ana', endereco: { rua: 'Rua 4', numero: 1011 } },
  { nome: 'Pedro', endereco: { rua: 'Rua 5', numero: 1213 } },
  { nome: 'Paula', endereco: { rua: 'Rua 6', numero: 1415 } },
  { nome: 'Carlos', endereco: { rua: 'Rua 7', numero: 1617 } },
  { nome: 'Mariana', endereco: { rua: 'Rua 8', numero: 1819 } },
  { nome: 'Fernando', endereco: { rua: 'Rua 9', numero: 2021 } },
  { nome: 'Mariana', enderecos: { rua: 'Rua 10', numero: 2223 } },
  { nome: 'Fernando', endereco: { rua: 'Rua 11', numero: 2425 } },
  { nome: 'Mariana', endereco: { rua: 'Rua 12', numero: 2627 } },
  { nome: 'Fernando', endereco: { rua: 'Rua 13', numero: 2829 } },
  { nome: 'Mariana', endereco: { rua: 'Rua 14', numero: 3031 } },
  { nome: 'Fernando', endereco: { rua: 'Rua 15', numero: 3233 } },
];

function conververClientes(clientes) {
  var clientesConvertidos = 0;
  var clientesComErro = 0;
  for (i = 0; i < clientes.length; i++) {
    try {
      converterCliente(clientes[i]);
      clientesConvertidos++;
      console.log('Cliente convertido com sucesso!');
      console.log(
        'Total de clientes convertidos ate o momento: ' + clientesConvertidos
      );
    } catch (error) {
      clientesComErro++;
      console.log(
        'Ocorreu um erro ao converter o cliente: ' + JSON.stringify(clientes[i])
      );
      console.log(error.message);
    }
  }
  console.log('conversão concluida');
  console.log('Total de clientes convertidos: ' + clientesConvertidos);
  console.log('Total de clientes com erro: ' + clientesComErro);
}

conververClientes(clientes);

console.log('Fim da aplicação sem erros!');
