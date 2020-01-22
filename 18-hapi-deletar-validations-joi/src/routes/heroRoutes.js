const BaseRoutes = require('./base/baseRoutes')
const Joi = require('joi')//usado para realizar as validações
//npm i boom  -> biblioteca que ajuda em mensagens customizadas
const Boom = require('boom')

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
                    console.log('Heroes -> list(): Houve um problema ao listar', error)
                    return Boom.internal()//mensagem customizada de erro usando o Boom
                }
            }
        }
    }

    create(){
        return {
            path:  '/herois',
            method: 'POST',            
            config: {//validações via joi
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
                    console.log('HeroRoutes - create() -> Problemas ao presistir dado no banco.\n ERRO: ', error)
                    return Boom.internal()//mensagem customizada de erro usando o Boom
                }
            }
        }
    }

    update(){
        return {
            path:  '/herois/{id}',
            method: 'PATCH',            
            config: {//validações via joi
                validate:{  
                    //validaçõesem payload -> body
                    // validações headers -> header
                    // validações em params -> na urls 
                    //validações nas quary que não mondadas pelos params na url -> "?skip=0&limit=10"
                    failAction,//deixando explicito os campos que deram erro ao validar
                                        // quando não validar repassa os campo que deram errado
                    params: {
                        id: Joi.string().required()// tipo string, obrigatorio
                    },                    
                    payload: {
                        nome: Joi.string().min(3).max(100), // tipo string, min 3 max 100 caracteres
                        poder: Joi.string().min(2).max(30)
                    }
                }   
            },
            handler: async (request, headers) => {
                try {
                    
                    const id = request.params.id;//posso extrair de dentro dele também "const {id} = request.params"
                    // const { nome, poder } = request.payload // também funcionaria passando o request.payload diretamente no metodo create
                    
                    // const result =  await this.db.create(request.payload)

                    // const result =  await this.db.update({
                    //     nome,
                    //     poder
                    // })
                    const data = JSON.parse(JSON.stringify(request.payload))//transformo o resultado em string, de pois em JSON para retirar os "undefined"
                                                                            //caso algum campo venha indefinido
                    const result =  await this.db.update(id, data)
                    if(result.nModified !== 1 )return Boom.notFound('HeroRoutes - update() -> ID não encontrado no banco, ')
                    
                    return { message: 'Heroi alterado com sucesso!'}

                } catch (error) {
                    // console.log('HeroRoutes - update() -> Problemas ao alterar dado no banco.\n ERRO: ', error)
                    return Boom.internal('HeroRoutes - update() -> Problemas ao alterar dado no banco.')//mensagem customizada de erro usando o Boom
                }
            }
        }
    }

    delete(){
        return {
            path:  '/herois/{id}',
            method: 'DELETE',            
            config: {//validações via joi - biblioteca de validação
                validate:{  
                    //validaçõesem payload -> body
                    // validações headers -> header
                    // validações em params -> na urls 
                    //validações nas quary que não mondadas pelos params na url -> "?skip=0&limit=10"
                    failAction,//deixando explicito os campos que deram erro ao validar
                                        // quando não validar repassa os campo que deram errado
                    params: {
                        id: Joi.string().required()// tipo string, obrigatorio
                    }
                }   
            },
            handler: async (request) => {
                try {
                    
                    const id = request.params.id;//posso extrair de dentro dele também "const {id} = request.params"

                    const result =  await this.db.delete(id)
                    
                    if(result.deletedCount !== 1 )return Boom.notFound('HeroRoutes - delete() -> ID não encontrado no banco, ')
                    // if(result.n !== 1 )return { message: 'Não foi possivel deletar do personagem!'} //pode se validar também pelo 'n'
                    
                    return { message: 'Heroi deletado com sucesso!'}
                    

                } catch (error) {
                    // console.log('HeroRoutes - delete() -> Problemas ao deletar dado no banco.\n ERRO: ', error)
                    return Boom.internal('HeroRoutes - delete() -> Problemas ao deletar dado no banco.')//mensagem customizada de erro usando o Boom
                }
            }
        }
    }
}

module.exports = HeroRoutes