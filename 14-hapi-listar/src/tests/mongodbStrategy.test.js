//testar se a strategia de banco de dados ta funcionanco e se tudo ocorre com oesperado.
//Install mocha - npm i --save-dev // fluxo de deste
const assert = require('assert')
const MongoDb = require('../db/strategies/mongodb/mongodb')//strategia do MongoDb
const HeroiSchema = require('../db/strategies/mongodb/schemas/heroisSchemas')
const Contex = require('../db/strategies/base/contextStrategy') //contexto da strategia

const MOCK_HEROI_CADASTRAR = {
    nome: 'Spider-Man',
    poder: 'Teia de Aranha'
}

const MOCK_HEROI_DEFAULT = {
    nome: 'Bezouro Azul',
    poder: 'Armadura Alienigena'
}

const MOCK_HEROI_ALTERAR = {
    nome: 'Viuva-Negra',
    poder: 'Inteligencia'
}

let context = {}

let MOCK_HEROI_ID = ''

describe('- MongoDB Suite de teste -', function (){
    this.beforeAll(async () => {
        const connection = MongoDb.connect() //funcao estatica - não ha necessidade de instanciar
        context = new Contex(new MongoDb(connection, HeroiSchema))// passa a connectio com o schema que queremos usar

        const result = await context.create(MOCK_HEROI_ALTERAR)
        MOCK_HEROI_ID = result._id

    })

    it('Verificando conecxão', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'
        
        assert.deepEqual(result, expected)
    })

    it('Cadastrar item no banco', async () => {
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })
    
    it('Listar item do banco', async () => {
        const [{nome, poder}] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome})//pega aprimeira posiçã oda lista, e dessa primeira posição, somente nome e poder
        
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })

    it('Atualizar item no banco', async () => {
        const result = await context.update(MOCK_HEROI_ID, { nome: 'Gaviao Negro'})

        assert.deepEqual(result.nModified, 1) // objetod do mongo possuem nModified - se o item doi modificado ou não - booleano
    })

    it('Removendo item do banco de dados', async () => {
        const result = await context.delete(MOCK_HEROI_ID)

        assert.deepEqual(result.n, 1)//verifica a quantidade de itens removidos
    })

})