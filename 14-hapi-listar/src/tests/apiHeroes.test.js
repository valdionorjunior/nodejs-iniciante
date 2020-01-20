const assert = require('assert')
const api = require('../api')
let app ={}

describe.only('Swite de Teste Api', async function (){

    this.beforeAll(async () =>{
        app = await api
    })

    it('Listar /herois', async ()=>{ // como tenho mais de 10000 registro, o banco leva tepo pra trzer, arrumar o time out depois
        const result = await app.inject({
            method: 'GET',
            url:'/herois?skip=0&limit=10'
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))

    })

    it('Listar /herois - Deve retornar somente 10 registros', async () => {
        const TAMANHO_LIMITE = 3

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        // console.log('dados: ',dados.length)
        assert.deepEqual(statusCode, 200)// garantindo que a resposta está correta
        assert.ok(dados.length === TAMANHO_LIMITE) //verifico se veio os 10 registro
    })

    it('Listar /herois - Deve retornar status 500 pois estamos passando string no limit ou skip', async () => {
        const TAMANHO_LIMITE = 'a'

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const statusCode = result.statusCode

        // assert.deepEqual(statusCode, 500)// garantindo que a resposta está correta
        assert.deepEqual(result.payload, 'Heroes -> list(): erro interno no servidor')
    })

    it('Listar /herois - filtra um por nome', async () => {
        const TAMANHO_LIMITE = '3'
        const NAME='Thor'

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        })

        const statusCode = result.statusCode
        const [dados] = JSON.parse(result.payload)

        assert.ok(dados.nome === NAME)
        assert.deepEqual(statusCode, 200)// garantindo que a resposta está correta
    })


})