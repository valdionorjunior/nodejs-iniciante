//hapi - api concorrente com o express -> similar 
//npm i hapi

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const heroiSchema = require('./db/strategies/mongodb/schemas/heroisSchemas')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroRoutes = require('./routes/heroRoutes')

const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, method) {
    return method.map(method => instance[method]())//pasando a instancia , para cada metodo retorna o metodo de dentro da instancia
}


async function main (){
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, heroiSchema))

    app.route([
        ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods())
    ])
    await app.start()

    console.log('Rodando na porta', app.info.port)

    return app
}

module.exports = main()