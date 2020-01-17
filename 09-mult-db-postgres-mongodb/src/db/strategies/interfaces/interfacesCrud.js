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

	defineModel(){
		throw new NotImplementedException()
	}

	isConnected(){
		throw new NotImplementedException()
	}

	connect(){
		/**TODO: Conexao com o bando de dados */
		throw new NotImplementedException()
	}
}

module.exports = ICrud