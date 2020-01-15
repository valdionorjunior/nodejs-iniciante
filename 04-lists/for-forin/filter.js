const { obterPessoas } = require('./service')

/** segue um desctructor, que nada mais é que extrair uma propriedade de um determinado elemento
 * exemplo
 * 
 * const user = {
 *  nome: 'josé',
 * idade: 12,
 * sexo: 'M'
 * }
 * 
 * extraindo :
 * const {nome} = user //irá extrair somente o nome do json acima
 * const {idade, sexo} = user // extrai as outrar propriedade em 2 variareis
 * 
 * console.logç(nome, idade, sexo)
 * */ 

 Array.prototype.meuFilter = function (callback){
     const lista =[]
     for(index in this){//retorna a posiçã ode cada um 
         const item = this[index] //pega item de cada posição 
         const result = callback(item, index, this)
         // 0, "", null, undefined === false
         if(!result) continue
         lista.push(item)   
     }
     return lista
 }

 async function main(){
    try {
        const {
            results
        } = await obterPessoas('a') //realizo um desctructor na função

        // const familiaLars = results.filter((item)=>{
        //     //repcisa retornar um boolean 
        //     //para informar se retira ou deixa no novo array
        //     // false retira 
        //     //true deixa no novo array

        //     //se não ncontrou é = -1
        //     // encontrou , retorna a posiçã odentro do array
        //     const result = item.name.toLowerCase().indexOf('lars') !== -1
        //     return result
        // })
        const familiaLars = results.meuFilter((item, index, lista) => {
            console.log(`index: ${index}, lista: `,lista.length)
            return item.name.toLowerCase().indexOf('lars') !== -1
        })
        const names = familiaLars.map((elemento) => elemento.name)
        console.log(names)

    } catch (error) {
        console.error('Deu problema ao comsumir swapi.io', error)
    }


 }

 main ()