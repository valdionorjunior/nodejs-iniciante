const axios = require('axios')
const URL = `https://swapi.co/api/people`

async function obterPessoas(nome){
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url)
    return response.data
}

// obterPessoas('r2').then((response) =>{
//     console.log('Resposta: ', response)
// }).catch(err =>{
//     console.error(`Houve algum problema no consumo da url: ${URL}`, err)
// })


module.exports = {obterPessoas}