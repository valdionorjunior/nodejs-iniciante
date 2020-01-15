const { obterPessoas } = require('./service')

async function main(){
    try {
        const { results } = await obterPessoas('y')

        const pesos = results.map(item => parseInt(item.height))
        console.log(`Pesos: ${pesos}`)

        // pesos = pesos.filter((item) =>{
        //     const result = parseInt(item.height) !== undefined ? parseInt(item.height) : 0
        // })

        // console.log(`Pesos: ${pesos}`)

        const pesoTotal = pesos.reduce((anterior, proximo) => {
            return anterior + proximo
        },0)

        console.log(`Total: ${pesoTotal}`)
    } catch (error) {
        console.log('ocorreu um problema ao comsumo da api swapi.io', error)
    }
}

main ()