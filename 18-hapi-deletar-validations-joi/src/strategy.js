class NotImplementedException extends Error {
	constructor(){
		super("Not Implemented Exception")
	}
}

class ICrud { // simulando uma interface
	create(item){
		throw new NotImplementedException()
	}

	read(query){
		throw new NotImplementedException()
	}

	update(id, item){
		throw new NotImplementedException()
	}

	delete(id){
		throw new NotImplementedException()
	}
}


//implementando as strategis de banco de dados
//MONGO

class MongoBD  extends ICrud{

	constructor(){
		super()
	}

	create(item){
		console.log('Item salvo no MongoDB')
	}

	read(query){
		console.log('Leitura no MongoDB')
	}

	update(id, item){
		console.log('Item atualizado no MongoDB')
	}

	delete(id){
		console.log('Item deletado do MongoDB')
	}
}

//implementando as strategis de banco de dados
//MONGO
class Postgres extends ICrud{
	constructor(){
		super()
	}

	create(item){
		console.log('Item salvo no Postgres')
	}

	read(query){
		console.log('Leitura no Postgres')
	}

	update(id, item){
		console.log('Item atualizado no Postgres')
	}

		delete(id){
			console.log('Item deletado do Postgres')
		}
	
}
class ContextStrategy {
	constructor(strategy){
		this._database = strategy;
	}

	create(item){
		return this._database.create(item)
	}

	read(item){
		return this._database.read(item)
	}

	update(id, item){
		return this._database.update(id, item)
	}

	delete(item){
		return this._database.delete(item)
	}	
}

/**
 * repasando os contextos para a s classes abstratas
 */
const contextMongoDB = new ContextStrategy(new MongoBD())
contextMongoDB.create('obj')

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create('obj')
// contextPostgres.delete('1') // nossa exception, caso metodo n esteja implementado