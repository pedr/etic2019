
const express = require('express')
const app = express();
const usuarios = require('./rotas/usuarios')
const eventos = require('./rotas/eventos')

const PORT = 8000;
app.use(express.json())

app.listen(PORT, () => console.log(`Listening at port ${PORT}`))

app.get('/', (req, res) => {
    res.json({
        'olá a todos': 'hello world'
    })
});

app.use('/usuarios', usuarios);

app.use('/eventos', eventos);
