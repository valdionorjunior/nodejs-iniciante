/**abaixo passamos a strategia no construtor para que 
 * dependendo do banco que for chamado
 *  chamar uma forma diferente de interar se adequando ao banco chamado 
 * 
 * */

const ICrud = require('../interfaces/interfacesCrud')

class ContextStrategy extends ICrud{
	constructor(strategy){
		super()
		this._database = strategy;
	}

	create(item){
		return this._database.create(item)
	}

	read(item, skip, limit){
		return this._database.read(item, skip, limit)
	}

	update(id, item){
		return this._database.update(id, item)
	}

	delete(item){
		return this._database.delete(item)
	}
	isConnected(){
		return this._database.isConnected()
	}	
	connect(){
		return this._database.connect()
	}
}

module.exports = ContextStrategy