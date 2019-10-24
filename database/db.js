const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './database/database.sqlite'
    }
})

module.exports = knex;