//implementando as strategis de banco de dados
//POSTGRESS

const ICrud = require( './interfaces/interfacesCrud')
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

module.exports = Postgres