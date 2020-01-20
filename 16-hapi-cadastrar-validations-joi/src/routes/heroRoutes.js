const BaseRoutes = require('./base/baseRoutes')
const Joi = require('joi')//usado para realizar as validações

const failAction = (request, headers, erro) =>{
    throw erro; 
}

class HeroRoutes extends BaseRoutes{

    constructor(db){
        super()
        this.db = db
    }

    list(){
        return {
            path:  '/herois',
            method: 'GET',
            config: {//validações via joi
                validate:{  
                    //validaçõesem payload -> body
                    // validações headers -> header
                    // validações em params -> na urls 
                    //validações nas quary que não mondadas pelos params na url -> "?skip=0&limit=10"
                    failAction:(request, headers, erro) =>{//deixando explicito os campos que deram erro ao validar
                        throw erro; // quando não validar repassa os campo que deram errado
                    },
                    query:{//validando o skip e o limit
                        skip: Joi.number().integer().default(0),//numero, inteiro, defult 0
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100) //valida se é string, se tem entre 3 e 100 caracteres
                    }
                }   
            },
            handler: async (request, headers) => {
                try {
                    //pegando o que quero de dentro da url 
                    const {skip, limit, nome} = request.query
                    const query = nome? {
                        nome: {$regex: `.*${nome}*.`} //passamos um regex para que ele filtre vai contai
                    }:{}// se foi passado o nome retorna o ojeto nome, se não retorna um objeto vazio

                    return await this.db.read(nome ?query : {}, skip, limit)

                } catch (error) {
                    console.log('Houve um problema ao listar', error)
                    return 'Heroes -> list(): erro interno no servidor'
                }
            }
        }
    }

    create(){
        return {
            path:  '/herois',
            method: 'POST',            config: {//validações via joi
                validate:{  
                    //validaçõesem payload -> body
                    // validações headers -> header
                    // validações em params -> na urls 
                    //validações nas quary que não mondadas pelos params na url -> "?skip=0&limit=10"
                    failAction,//deixando explicito os campos que deram erro ao validar
                                        // quando não validar repassa os campo que deram errado
                    payload: {
                        nome: Joi.string().required().min(3).max(100), // tipo string, obrigatorio, min 3 max 100 caracteres
                        poder: Joi.string().required().min(2).max(30)
                    }
                }   
            },
            handler: async (request, headers) => {
                try {
                    
                    const { nome, poder } = request.payload // também funcionaria passando o request.payload diretamente no metodo create
                    
                    // const result =  await this.db.create(request.payload)

                    const result =  await this.db.create({
                        nome,
                        poder
                    })

                    return { message: 'Heroi cadastrado com sucesso!',
                            _id: result._id}

                } catch (error) {
                    console.log('HeroRoutes - creste() -> Problemas a presistir dado no banco.\n ERRO: ', error)
                    return 'HeroRoutes - creste() -> Internal Error!'
                }
            }
        }
    }
}

module.exports = HeroRoutes