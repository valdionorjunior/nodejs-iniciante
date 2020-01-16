//testar se a strategia de banco de dados ta funcionanco e se tudo ocorre com oesperado.
//Install mocha - npm i --save-dev // fluxo de deste
const assert = require('assert')
const Postgres = require('../db/strategies/postgres')//strategia do postgres
const Contex = require('../db/strategies/base/contextStrategy') //contexto da strategia

const contex = new Contex(new Postgres())

//mock 
const MOCK_HEROI_CADASTRAR = {
    nome: 'Hulk',
    poder: 'Super Força'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Black Phatera',
    poder: 'Super Força'
}

const MOCK_HEROI_DELETAR = {
    nome: 'Vision',
    poder: 'Intagible'
}

describe('- Postgres Strategi - banco Postgres -',function (){
    this.timeout(Infinity)// pode demorar o tempo de for pra conectar, sem time out

    this.beforeAll(async function () {
        await contex.connect()
        await contex.delete()//deleta geral
        await contex.create(MOCK_HEROI_ATUALIZAR)//caso não tenha o item no banco
        await contex.create(MOCK_HEROI_DELETAR)//caso não tenha o item no banco
    })

    it('Postgres Connection', async function (){
        const result = await contex.isConnected()
        assert.equal(result, true)//verifica se está conectado
    })

    it('Cadastrar', async function(){

        
        const result = await contex.create(MOCK_HEROI_CADASTRAR)
        delete result.id //retiro o id pq não sei qual id foi cadastrado no banco
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('listar do banco por nome', async function (){
        const [result] = await contex.read({ nome: MOCK_HEROI_CADASTRAR.nome }) //[result] -> faz com que pego somente a primeira posição do que vir, se quizer mais podiçoes poderia passar [resunt,segunda,treceira ...]
        delete result.id

        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Atualizar no banco', async function (){
        const [itemAtualizar] = await contex.read({nome: MOCK_HEROI_ATUALIZAR.nome})
        const novoItem = {
            ...itemAtualizar,//pego todo o json e numdo abaixo somente a propriedade que eu quizer
            poder: "Roupa de Adamantium"
        }
        delete novoItem.id
        const [result] = await contex.update(itemAtualizar.id, novoItem) //por algum motivo também tenta setar o id
        assert.deepEqual(result, 1)

        const [atualizado] = await contex.read({id: itemAtualizar.id})
        delete atualizado.id 
        assert.deepEqual(atualizado, novoItem)
    })

    it('Deletar no banco por id', async function (){

        const [itemdeletar] = await contex.read({nome: MOCK_HEROI_DELETAR.nome})

        const result = await contex.delete(itemdeletar.id) 
        assert.deepEqual(result, 1)
    })
})