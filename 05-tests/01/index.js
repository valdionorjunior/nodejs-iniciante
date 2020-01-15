const { obterPessoa } = require('./service')


async function main (){
    const result = await obterPessoa('r2-d2')
     console.log(result)
}

main()