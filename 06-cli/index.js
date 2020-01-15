const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main(){
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do personagem.") //cria uma especie de variavel para armazenamento
        .option('-p, --poder [value]', "Poder do personagem.")
        .option('-p, --poder [value]', "Poder do personagem.")
        .option('-i, --id [value]', "id do personagem.")


        .option('-c, --cadastrar', "Cadastrar personagem.")
        .option('-l, --listar', "Listar personagem.")
        .option('-a --atualizar [value]', "Atualizar personagem por id.")
        .option('-r --remover', "Remover todos os dados ou um por id .")
        .parse(process.argv)//pega o uqepassado na linha de comando

    const heroi = new Heroi(Commander)// a classe heroi filtra somente os argumento de que precisamos no construtor de dentro do commander
    try {

        if(Commander.cadastrar){
            delete heroi.id//matada o atributo id do objetos

            const resultado = await Database.cadastrar(heroi)
            if(!resultado){
                console.error('Personagem não foi cadastrado.')
                return
            }
            console.log('Deu certo no cadastro do jabá rapá.')
            return
        }
        if(Commander.listar){
            const idlist = parseInt(Commander.id)
            const resultado = await Database.listar(idlist)
            if(!resultado){
                console.error('Personagem não encontrado.')
                return
            }
            // console.log(`Nome: ${resultado.nome}\nPoder: ${resultado.poder}`)
            console.log(resultado)
            return
        }
        if(Commander.remover){
            const resultado = await Database.remover(heroi.id)

            if(!resultado){
                console.error('Erro ao remover dados.')
                return
            }
            console.log('Dado removido com sucesso.')
        }
        if(Commander.atualizar){
            const idAtualizar = parseInt(Commander.atualizar)
            // delete heroi.id// deleto o id sujo que veio "undefined" ou null
            //remover tods as chaves que vieram undefined or null
            const dado = JSON.stringify(heroi)//transformo heroi em string-> não virá p id
            const atualHeroi = JSON.parse(dado) //transfomo de novo em json, agora json sem id
            
            const resultado = Database.atualizar(idAtualizar, atualHeroi)
            if(!resultado){
                console.error('Erro ao remover dados.')
                return
            }
            console.log('Dado alterado com sucesso.')
            return
        }

        
    } catch (error) {
        console.log('Problemas na execução. ', error)
    }
}

main()