
const router = require('express').Router();
const knex = require('../database/db')

// middleware response por verificar se usuario possui
// o header de autenticação para acessar as próximas rotas
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

// pega todos os eventos
router.get('/', (req, res) => {
    knex().select().from('eventos')
        .then(r => {
            res.json(r)
        })
});


// pega informação de um evento 
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

// atualiza um evento
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

// realiza um sorteio de um dos usuários cadastrados nesse evento
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

// seria para criar
router.post('/:id', async (req, res) => {
    const { id } = req.params;
    try {


    } catch (error) {
        console.error(error)
    }
})



module.exports = router;