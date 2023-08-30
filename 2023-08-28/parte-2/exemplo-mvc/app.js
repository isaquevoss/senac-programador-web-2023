const express = require('express');
const app = express();


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});


const clientesRouter = require('./routes/clientes_router');
app.use('/clientes', clientesRouter)