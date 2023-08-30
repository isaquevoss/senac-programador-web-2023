const router = require('express').Router();

const clientesController = require('../controllers/clientesController');
router.get('/', clientesController.listarClientes);
router.post('/', clientesController.criarCliente);
router.put('/:id', clientesController.atualizarCliente);
router.delete('/:id', clientesController.deletarCliente);

exports.default = router;