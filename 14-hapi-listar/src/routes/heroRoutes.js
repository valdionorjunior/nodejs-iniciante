const BaseRoutes = require('./base/baseRoutes')

class HeroRoutes extends BaseRoutes{

    constructor(db){
        super()
        this.db = db
    }

    list(){
        return {
            path:  '/herois',
            method: 'GET',
            handler: (request, headers) => {
                try {
                    //pegando o que quero de dentro da url 
                    const {skip, limit, nome} = request.query
                    let query = {}//

                    if(nome){//se o nome existir passa a quary inteira, se não passo o objeto vazio par aque não fique 'nome='
                        query.nome = nome
                    }

                    if(isNaN(skip)){ ///verifica se é um numro ou não
                        throw Error(`Heroes -> list(): O tipo do skip esta incorreto: SKIP ${limit}`)
                    }
                    if(isNaN(limit)){
                        throw Error(`Heroes -> list(): O tipo do limit esta incorreto:  LIMIT ${limit}`)
                    }
                    return this.db.read(query, parseInt(skip), parseInt(limit))

                } catch (error) {
                    console.log('Houve um problema ao listar', error)
                    return 'Heroes -> list(): erro interno no servidor'
                }
            }
        }
    }

    // create(){
    //     return {
    //         path:  '/herois',
    //         method: 'POST',
    //         handler: (request, headers) => {
    //             return this.db.read()
    //         }
    //     }
    // }
}

module.exports = HeroRoutes