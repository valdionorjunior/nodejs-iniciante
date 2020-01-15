const service = require('./service')

Array.prototype.customMap = function (callback){
    const mapeamento = []
    for (let index = 0; index <= this.length -1; index++) {
        const result = callback([this.index], index); 
        mapeamento.push(result)
    }
    return mapeamento
}

async function main(){
    try {
        const data = await service.obterPessoas('y')
        // const nomes = []

        // console.time('tempo de forEach')
        // data.results.forEach(element => {
        //     nomes.push(element.name)
        // });
        // console.timeEnd('tempo de forEach')

        // const nomes = data.results.map((element) => element.name)
        const nomes = data.results.customMap(function (element, index){
            return `[${index}] ${element.name}`
        })

        console.log(nomes)
        
    } catch (error) {
        console.error('HOUvE UM PROBLEMA', error)
    }
}

main ()