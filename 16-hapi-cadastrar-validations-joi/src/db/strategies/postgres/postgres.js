//implementando as strategis de banco de dados
//POSTGRESS

const ICrud = require( './../interfaces/interfacesCrud')
const Sequelize = require('sequelize')
// heroiSchema

class Postgres extends ICrud{
	constructor(connection, schema){
		super()
		this._connection = connection//privado quando se usa o "_"
		this._schema= schema
	}

	async isConnected(){//verificar se está conectado com o banco
		try {
			await this._connection.authenticate()//tenca autenticar no banco, se autenticar -> conexao ativa, se nao entra no catch
			return true
		} catch (error) {
			console.log('Conection Fail', error)
			return false;
		}
	}

	static async defineModel(connection, schema){	
		const model = connection.define(schema.name, schema.schema, schema.options) //criar modelo e passando as opções 

		await model.sync()//sincroniza com o banco

		return model
	}

	static async connect(){ //_ significa que será um metodo privado

		const connection = new Sequelize(
			//construção do driver
			'heroes',//database
			'junior',//usuario
			'Bwi280281',//senha
			{
				host: 'localhost',//host do banco
				dialect:'postgres', //tipo do banco
				quoteIdentifiers: false,//não será case sensitive
				operatorAliases: false, //tirando mesnagens de metodos depreciados
				logging: false //tira os logs da bash, --por default mostra os logs o que acho importante
			}
		)

		return connection
	}

	async create(item){
		const {dataValues} = await this._schema.create(item, {raw: true})
		return dataValues
	}

	async read(item = {}){ //se nao madar nada de parametro o parametro é vazio
		return await this._schema.findAll({where: item, raw: true}) //fazendo um where no banco pela propriedade --> para para vir so raw
	}

	async update(id, item){
		//update retorna status se atualizou ou não, retorn 1 se consegiu ou 0 se nao
		return await this._schema.update(item, {where: {id}})
	}

	async delete(id){
		const query = id ? {id} : {}
		return await this._schema.destroy( {where : query})
	}

	
}

module.exports = Postgres