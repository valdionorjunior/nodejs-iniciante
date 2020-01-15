const {readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {

    constructor(){
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivo(dados){
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString(), JSON.stringify(dados))//transforma a string em json
    }

    async escreverDadosArquivo(dados){
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrar(heroi){
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <= 2 ? heroi.id : Date.now()

        /**concaternar 2 objetos json -> o objeto  id com o objeto hero */
        const heroiConcatID = {
            id,
            ...heroi
        }

        const dadosFinais = [
            ...dados,
            heroiConcatID,
        ]

        const resultado = await this.escreverDadosArquivo(dadosFinais)
        return resultado
    }

    async listar(id){
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => id ? item.id === id : true)

        return dadosFiltrados
    }

    async remover(id){
        if(!id){
            return await this.escreverDadosArquivo([])
        }
        const dado = await this.obterDadosArquivo()
        const indice = dado.findIndex(item => item.id === parseInt(id))

        if(indice === -1){
            throw Error('Dado não encontrado.')
        }
        
        //achando o indice do que quero remover, removo ele do arry
        dado.splice(indice, 1) //a partir do indice, remove um unico item

        return await this.escreverDadosArquivo(dado) //escrevo novamente o dado novo no arquivo
    }

    async atualizar(id, modifications){
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))

        if(indice === -1){
            throw Error('Atualização falhou! Dado não existe para atualizar.')
        }

        const atual = dados[indice]
        const objAtualizar = {
            ...atual,
            ...modifications
        }
        dados.splice(indice, 1)

        return await this.escreverDadosArquivo([
            ...dados,
            objAtualizar
        ])

    }
}
module.exports = new Database()