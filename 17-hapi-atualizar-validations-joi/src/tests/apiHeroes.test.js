const assert = require('assert')
const api = require('../api')
let app ={}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Valdionor Junior',
    poder: 'NodeJs Developer'
    // dataNascimento: '2020-01-20'
}
const MOCK_HEROI_INICIAL = {
    nome: 'Junior Rodrigues',
    poder: 'Kotlin Developer'
    // dataNascimento: '2020-01-20'
}

let MOCK_ID = ''

describe('Swite de Teste Api', async function (){

    this.beforeAll(async () =>{
        app = await api

        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: JSON.stringify(MOCK_HEROI_INICIAL) 
        })
        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id//pego id da resposta

    })

    it('Listar GET -> /herois', async ()=>{ // como tenho mais de 10000 registro, o banco leva tepo pra trzer, arrumar o time out depois
        const result = await app.inject({
            method: 'GET',
            url:'/herois?skip=0&limit=10'
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))

    })

    it('Listar GET -> /herois - Deve retornar somente 10 registros', async () => {
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

    it('Listar GET -> /herois - Deve retornar status 500 pois estamos passando string no limit ou skip', async () => {
        const TAMANHO_LIMITE = 'a'

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })

        const statusCode = result.statusCode
        const errorResult = { 
            "statusCode": 400,
            "error": "Bad Request",
            "message": "child \"limit\" fails because [\"limit\" must be a number]", 
            "validation": { 
                "source": "query", 
                "keys": ["limit"] } 
            }

        // assert.deepEqual(statusCode, 500)// garantindo que a resposta está correta
        assert.deepEqual(result.payload, JSON.stringify(errorResult))
    })

    it('Listar GET -> /herois - filtra um por nome', async () => {
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

    it('Cadastrar POST -> /herois - > ', async () => {
        
        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: MOCK_HEROI_CADASTRAR 
        })

        const statusCode = result.statusCode
        const {message, _id} = JSON.parse(result.payload)


        assert.ok(statusCode === 200) // === compara alem do valor, o tipo também, pois posso ter '200' como string com parado a 200 Number
        assert.notStrictEqual(_id, undefined)// id não pode ser igual undefined
        assert.deepEqual(message, "Heroi cadastrado com sucesso!")
    })

    it('Alterar PATCH -> /herois/:id', async () => {

        const _id = MOCK_ID
        const expected = { poder: 'FullStack Developer' }

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const {message} = JSON.parse(result.payload)

        assert.ok(statusCode === 200) // === compara alem do valor, o tipo também, pois posso ter '200' como string com parado a 200 Number

        assert.deepEqual(message, "Heroi alterado com sucesso!")
    })

    it.only('Error Alterar PATCH -> /herois/:id - Não atualiza id incorreto', async () => {

        const _id = '5e260e2223927449abd091e1'
        const expected = { poder: 'FullStack Developer' }

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const {message} = JSON.parse(result.payload)

        assert.ok(statusCode === 200) // === compara alem do valor, o tipo também, pois posso ter '200' como string com parado a 200 Number

        assert.deepEqual(message, "Não foi possivel realizar a alteração do personagem!")
    })
})