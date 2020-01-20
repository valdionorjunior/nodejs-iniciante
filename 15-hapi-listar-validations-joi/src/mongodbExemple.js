//TRABALHANDO COM O MONGOOSE - para limitar e ajudar na manipulação dos itens no banco de dados
//  npm install mongoose

const Mongoose = require('mongoose')

//abrindo a concecxao com o banco

Mongoose.connect('mongodb://junior:Bwi280281@localhost:27017/herois' //pasamos o container://usuario:senha@host:porta/db
,{useNewUrlParser: true}, function (error){//na função validamos se deu problema
    if(!error) return

    console.log('Falha ao conectar com o Mongo', error)
})

const connection = Mongoose.connection



//evento de esta aberta
connection.once('open', () => console.log('Database: Mongo Rodando!'))

// //ESTADO 
// const state = connection.readyState
// // verificando o estado da função
// setTimeout(()=>{
//     console.log(`Estados da Conecxão:
//         0: Disconectado
//         1: Conectado
//         2: Conectando
//         3: Disconectando\n
//         Estado atual: ${state}\n`)
// }, 1000)

//CRIANDO MODELO = SCHEMA

const heroisSchema = Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder:{
        type: String,
        require: true
    },
    insertedAt:{
        type: Date,
        default: new Date()
    }
})
//geristrnado modelo
const model = Mongoose.model('herois', heroisSchema)

async function main(){

    // const result = await model.create({
    //     nome: 'Capitão América',
    //     poder: 'super humano'
    // })

    // console.log(result)

    const listItem = await model.find()

    console.log('Items: ',listItem)
}

main ()