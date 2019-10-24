
const router = require('express').Router();
const knex = require('../database/db.js')
const crypto = require('crypto');

// lista usuários
router.get('/', (req, res) => {
    knex().select().from('usuarios')
        .then(r => {
            res.json(r)
        })
        .catch(console.error)
});


// realiza login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    console.log(req.headers)
    try {
        const usuario = await knex('usuarios').where('email', email).first()

        if (usuario.senha == senha) {
            const token = crypto.randomBytes(32).toString('hex');
            knex('usuarios').where('id', usuario.id).update('token', token)
                .then(r => console.log(response))
                .catch(console.error)
            return res.json({
                token
            })
        }
        return res.json('diferente')

    } catch (error) {
        console.error(error)
    }
})

// cria novo usuário
router.post('/', (req, res) => {
    const { email, senha } = req.body
    knex().insert({ email, senha }).into('usuarios')
        .then(r => {
            console.log(r)
        })
        .catch(console.error)

    res.json();
});


module.exports = router;