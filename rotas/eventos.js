
const router = require('express').Router();
const knex = require('../database/db')


router.use('/', async (req, res, next) => {
    const { authorization } = req.headers;
    knex('usuarios').where('token', authorization).first()
        .then((response) => {
            if (response == undefined) {
                throw Error('não autorizado')
            }
            req.usuario = response;
            return next();
        })
        .catch(error => {
            console.error(error)
            res.status(403).json({
                error: error.message   
            });
        })
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {

        const evento = knex('eventos').where('id', id).first();
        const usuarios = knex('usuarios')
            .innerJoin('eventos_usuarios', 'usuarios.id', 'eventos_usuarios.usuario_id')
            .where('eventos_usuarios.evento_id', id)

        res.json(
            {
                evento: await evento,
                usuarios: await usuarios,
            }
        )
    } catch (error) {
        console.error(error)
    }
});

router.put('/:id', async (req, res) => {
    const { nome, horario } = req.body;
    const { id } = req.params;
    try { 

        console.log(req.usuario)
        if (!req.usuario.admin) {
            return res.status(403).json({
                error: 'não autorizado'
            })
        }

        const response = await  knex('eventos').where('id', id)
            .update({
                nome,
                horario
            })
            console.log(response)
        res.json(response)

    } catch (error) {
        console.error(error)
    }
})

router.get('/:id/sorteio', async (req, res) => {
    const { id } = req.params;
    try {
        const usuarios = await knex('usuarios')
            .innerJoin('eventos_usuarios', 'usuarios.id', 'eventos_usuarios.usuario_id')
            .where('eventos_usuarios.evento_id', id)
        const random = Math.floor(Math.random() * usuarios.length)
        res.json({
            selecionado: usuarios[random]
        })
    } catch (error) {
        console.error(error)
    }
})

router.post('/:id', async (req, res) => {
    const { id } = req.params;
    try {


    } catch (error) {
        console.error(error)
    }
})

router.get('/', (req, res) => {
    knex().select().from('eventos')
        .then(r => {
            res.json(r)
        })
});

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