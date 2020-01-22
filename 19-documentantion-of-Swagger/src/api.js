//hapi - api concorrente com o express -> similar 
//npm i hapi
//npm i vision inert  hapi-swagger(swagger versão 9.1.3 - a ultima versão do mesmo 12.0 há incompatiblidade com hapi/inert)

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const heroiSchema = require('./db/strategies/mongodb/schemas/heroisSchemas')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroRoutes = require('./routes/heroRoutes')
const HapiSwager = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')


const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, method) {
    return method.map(method => instance[method]())//pasando a instancia , para cada metodo retorna o metodo de dentro da instancia
}


async function main (){
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, heroiSchema))
    
    const swaggerOptions = {
        info:{
            title: 'API Herois - #Treinamento NodeBR.',
            version: 'v1.0'
            // basePath: 'http://localhost:8080/swagger/swagger.json'//ARQUIVO DE CONF SWAGGER
        },
        lang: 'pt' //linguagem portugues de Portugal
    }

    //Registro de Plugins
    await app.register([ //usado pra registar e se cominicar com modulos
        Vision,
        Inert,
        {//hapiSwagger tem configuração diferente
            plugin: HapiSwager,
            options: swaggerOptions
        }
    ])
    
    // app.route([
    //     ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods())
    // ])

    app.route(mapRoutes(new HeroRoutes(context), HeroRoutes.methods()))
    await app.start()

    console.log('Rodando na porta', app.info.port)

    return app
}

module.exports = main()