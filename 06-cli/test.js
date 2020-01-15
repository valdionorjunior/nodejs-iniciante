const { deepEqual, ok } = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    id: 99,
    nome: 'Flash',
    poder: 'speed',
}

const DEFAULT_ITEM_ATUALIZAR = {
    id: 2,
    nome: 'Lanterna verde',
    poder: 'Anel do lanterna',
}

describe('Switch de manipulação de dados', function () {

    before( async ()=>{
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })

    it( 'Deve pesquisar um personagem usando arquivos', async ()=> {
        const expected = DEFAULT_ITEM_CADASTRAR

        // const expected = {
        //     ...DEFAULT_ITEM_CADASTRAR,
        //     id: 2,
        //     nome: 'Tião'
        // }

        const [resultado] = await  database.listar(expected.id) // o filter retorn um [], contudo usand destructor no resultado, pega-se a primeira posição do arry => [resultado]
        deepEqual(resultado, expected)
    })

    it( 'Deve cadasrar um presonagem usando arquivos', async ()=> {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const resulta = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(actual, expected)
    })

    it('Deve remover um personagem por id.', async ()=>{
        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)
    })

    it.only('Deve atualizar as informações de personagens no arquivo', async () =>{
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Josep',
            poder: 'Crescimento de arvores'
        }
        const dadoAAtualizar={
            nome: 'Valdionor',
            poder: 'Abençoado por Deus'
        }

        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, dadoAAtualizar)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected)

    })
})