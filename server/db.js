const path = require('path')

const dbPath = path.resolve(__dirname, 'db/jrtm.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true
})

// Create a table in the database called "players"
knex.schema
    .hasTable('players')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('players', (table) => {
                table.increments('id').primary()
                table.string('name')
                table.string('race')
                table.string('profession')
            })
                .then(() => {
                    // Log success message
                    console.log('Table \'Players\' created')
                    knex('players').insert({ name: 'MrCitron', race: 'Dunadan', profession: 'bourrin' })
                    .then(function (res) {
                        console.log("row inserted");
                    })        
                })
                .catch((error) => {
                    console.error(`There was an error creating table: ${error}`)
                })
        }
    })
    .then(() => {
        // Log success message
        console.log('done')
        // Just for debugging purposes:
        // Log all data in "books" table
        knex('players').select('*')
            .then(data => console.log('data:', data))
            .catch(err => console.log(err))
    })
    .catch((error) => {
        console.error(`There was an error setting up the database: ${error}`)
    })


module.exports = knex