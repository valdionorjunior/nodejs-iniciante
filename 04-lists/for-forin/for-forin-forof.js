const service = require('./service')

async function main(){
    try {
        const data = await service.obterPessoas('lu')
        const nomes =[]
        console.time('Tempo For')
        for(let i=0; i <= data.results.length - 1; i++){
            const personagem = data.results[i]
            nomes.push(personagem.name)
        }
        console.timeEnd('Tempo For')

        console.time('Tempo For in')
        for(let i in data.results){
            nomes.push(data.results[i].name)
        }
        console.timeEnd('Tempo For in')

        console.time('Tempo For of')
        for(pessoa of data.results){
            nomes.push(pessoa.name)
        }
        console.timeEnd('Tempo For of')

        console.log(nomes)
    } catch (error) {
        console.log('ERRO: DEU PROBLEMA', error)
    }
}

main()