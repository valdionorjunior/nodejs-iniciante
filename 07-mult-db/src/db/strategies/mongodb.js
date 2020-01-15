/**
*	Estrategia de banco MongoBD
*/


//implementando as strategis de banco de dados
//MONGO

const ICrud = require('./interfaces/interfacesCrud')

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

module.exports = MongoBD