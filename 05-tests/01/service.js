const { get } = require('axios')

const URL = `https://swapi.co/api/people/`

async function obterPessoa(nome){
    const url = `${URL}?search=${nome}&format=json`

    const result = await get(url)

    return result.data.results.map(mapearPersonagem)
}

function mapearPersonagem(item){
    return {
        nome: item.name,
        peso: item.height,
    }
}

module.exports = { obterPessoa } //exporta somente a function