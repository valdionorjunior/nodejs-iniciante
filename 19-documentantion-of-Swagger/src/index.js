
const ContextStrategy = require('./db/strategies/base/contextStrategy')
const MongoBD = require('./db/strategies/mongodb')
const Postgres = require('./db/strategies/postgres')


const contextMongoDB = new ContextStrategy(new MongoBD())
contextMongoDB.create()

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()
contextPostgres.delete() // nossa exception, caso metodo n esteja implementado