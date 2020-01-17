/**
*	Estrategia de banco MongoBD
*/


//implementando as strategis de banco de dados
//MONGO

const ICrud = require('./../interfaces/interfacesCrud')
const Mongoose = require('mongoose')
const STATUS = {
	0: 'Disconectado',
	1: 'Conectado',
	2: 'Conectando',
	3: 'Disconectando'
}

class MongoDb  extends ICrud{

	constructor(connection, schema){
		super()
		this._schema = schema
		this._connection = connection
	}

	async isConnected(){
		/** ESTADO 
			setTimeout(()=>{
				console.log(`Estados da Conecxão:
					0: Disconectado
					1: Conectado
					2: Conectando
					3: Disconectando\n
					Estado atual: ${state}\n`)
			}, 1000)
		*/
		const state = STATUS[this._connection.readyState]

		// verificando o estado da função
		if(state === 'Conectado') return state

		if(state !== 'Conectando') return state

		await new Promise(resolve => setTimeout(resolve, 1000))
		return STATUS[this._connection.readyState]
		
	}
	
	static connect(){//metodo statico para se enchergado fora sem precisar instanciar
		//abrindo a concecxao com o banco

		Mongoose.connect('mongodb://junior:Bwi280281@localhost:27017/herois' //pasamos o container://usuario:senha@host:porta/db
		,{useNewUrlParser: true, useUnifiedTopology: true}, function (error){//na função validamos se deu problema
			if(!error) return

			console.log('Falha ao conectar com o Mongo', error)
		})

		const connection = Mongoose.connection

		//evento de esta aberta
		connection.once('open', () => console.log('Database: Mongo Rodando!'))

		return connection
	}

	create(item){
		return  this._schema.create(item)
	}

	read(item, skip=0, limit=10){ // fazemos a leitura, também com paginação se não passar o skip, fica na primeira posção, limit de pra mostrar 10 itens
		return  this._schema.find(item).skip(skip).limit(limit)
	}

	update(id, item){
		return  this._schema.updateOne({_id: id}, {$set: item})//set par aalterar somente o que vc quer, sem sobrepor o resto
	}

	delete(id){
		return this._schema.deleteOne({_id: id}) // no mongo ao remover, a resposta é a quantidade de item removidos
	}
}

module.exports = MongoDb