//hapi - api concorrente com o express -> similar 
//npm i hapi

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const heroiSchema = require('./db/strategies/mongodb/schemas/heroisSchemas')
const MongoDb = require('./db/strategies/mongodb/mongodb')

const app = new Hapi.Server({
    port: 5000
})

async function main (){
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, heroiSchema))

    app.route([
        {
            path: '/herois',
            method: 'GET',
            handler: (request, head) => {
                return context.read()
            }
        }
    ])
    await app.start()

    console.log('Rodando na porta 5000')
}

main()