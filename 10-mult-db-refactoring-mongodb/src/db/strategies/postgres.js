//implementando as strategis de banco de dados
//POSTGRESS

const ICrud = require( './interfaces/interfacesCrud')
const Sequelize = require('sequelize')


class Postgres extends ICrud{
	constructor(){
		super()
		this._driver = null//privado quando se usa o "_"
		this._herois= null
	}

	async isConnected(){//verificar se está conectado com o banco
		try {
			await this._driver.authenticate()//tenca autenticar no banco, se autenticar -> conexao ativa, se nao entra no catch
			return true
		} catch (error) {
			console.log('Conection Fail', error)
			return false;
		}
	}

	async defineModel(){
		this._herois = this._driver.define('herois', { //criando modelo para se trabalhar
			id:{
				type: Sequelize.INTEGER,         
				require: true,
				primaryKey: true,
				autoIncrement: true
			},
			nome:{
				type:Sequelize.STRING,
				require: true,
			},
			poder:{
				type:Sequelize.STRING,
				require: true,
			}
		}, {//sequelize não tem preparação para banco existente, abaxo configuração para isso
			tableName: 'TB_HEROIS',
			freezeTebleName: false,//não alterar as opções dos bancos
			timestamps: false, //impede de o sequelize criar propriedades sozinho (updated ection, etc)
		})
	
		await this._herois.sync()//sincroniza com o banco
	}

	async connect(){ //_ significa que será um metodo privado

		this._driver = new Sequelize(
			//construção do driver
			'heroes',//database
			'junior',//usuario
			'Bwi280281',//senha
			{
				host: 'localhost',//host do banco
				dialect:'postgres', //tipo do banco
				quoteIdentifiers: false,//não será case sensitive
				operatorAliases: false, //tirando mesnagens de metodos depreciados
			}
		)

		await this.defineModel()
	}

	async create(item){
		const {dataValues} = await this._herois.create(item, {raw: true})
		return dataValues
	}

	async read(item = {}){ //se nao madar nada de parametro o parametro é vazio
		return await this._herois.findAll({where: item, raw: true}) //fazendo um where no banco pela propriedade --> para para vir so raw
	}

	async update(id, item){
		//update retorna status se atualizou ou não, retorn 1 se consegiu ou 0 se nao
		return await this._herois.update(item, {where: {id}})
	}

	async delete(id){
		const query = id ? {id} : {}
		return await this._herois.destroy( {where : query})
	}

	
}

module.exports = Postgres