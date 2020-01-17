//testar se a strategia de banco de dados ta funcionanco e se tudo ocorre com oesperado.
//Install mocha - npm i --save-dev // fluxo de deste
const assert = require('assert')
const MongoDB = require('../db/strategies/mongodb')//strategia do postgres
const Contex = require('../db/strategies/base/contextStrategy') //contexto da strategia

const context = new Contex(new MongoDB())

describe('- MongoDB Suite de teste -', function (){
    this.beforeAll(async () => {
        await context.connect()
    })

    it('Verificando conecxão', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'
        
        assert.deepEqual(result, expected)
    })

})