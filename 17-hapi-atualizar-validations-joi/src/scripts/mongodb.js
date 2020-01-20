
/**
docker ps // verificar qual id esta rodando o imagem do mongo no docker
docker start "nome da imagen || id" para startar
//Faça o mesmo com a imagem co client que foi criada para o mongo utilize  comando star como preferencial 

// para manipular na bash: se linux use sudo, capixe? 
 docker exec -it mongodb "id ou nome da image" --host localhost -u junior -p Bwi280281 --authenticationDatabase herois

show dbs // mostra todos os bancos que podemos usar, como não iserimos nenhum registro nao criu db
use herois// use 'nome do db' seta o banco que vamos manipular
show collections // mostra todas as collections (tabelas) que possuimos no db setado
*/

db.herois.insert({//o herois aqui é uma collection e não o db
    nome: 'Thor',
    poder: 'Deus do Trovão',
    dataNascimento: '1991-06-21'
})

//apos rodar o moando anterio, agora ira mostrar a collection, e shwo db mostr o db

//listar
db.herois.find()//lista tudo e tra em uma linha sem farmatação
db.herois.find().pretty()//lista tudo de forma mais formatada em json()

//verificando que funciona JS no banco - rode o comando a baixo na bash que esta conectada com o banco
for (let i=0; i<= 50000; i++){
    db.herois.insert({
        nome: `Personagem-${i+1}`,
        poder: `Poder ${i+1}`,
        dataNascimento: '9999-99-99'
    })
}
//verifique quantos documento há na database
db.herois.count()

//trazendo somente um registo
db.herois.findOne()//traz o primeiro registro

db.herois.find().limit(1000).sort({nome: -1}) // traz os 1000 primeiros herois ordenados de forma decrescente

//comando abaixo,traz -> Do resultado que trazer do banco quero somente a coluna poder , ocultado o ID
db.herois.find({},{poder: 1,_id:0}) //força o id = 0 par an trazer-lo pois por padrão ao pedir uma coluna ele tra a coluna que se quer seguido do id.

//**CREATE
db.herois.insert({//o herois aqui é uma collection e não o db
    nome: 'Thor',
    poder: 'Deus do Trovão',
    dataNascimento: '1991-06-21'
})

//**READ
db.herois.find()

//**UPDATE
// se pega o id finco de uma find
db.herois.find({nome: 'Personagem-1'})
// resp:
// {
// 	"_id" : ObjectId("5e20a8984f787114ee06a49d"),
// 	"nome" : "Personagem-1",
// 	"poder" : "Poder 1",
// 	"dataNascimento" : "9999-99-99"
// }

// passa o id para o update

// mudando o nome
db.herois.update({_id: ObjectId("5e20a8984f787114ee06a49d")},  
    {
    nome: 'Tony Stark',
})
//find pra ver oq trouxe
db.herois.find({nome: 'Tony Stark'})
//resp { "_id" : ObjectId("5e20a8984f787114ee06a49d"), "nome" : "Tony Stark" } 
//verifique que ele deleta os outros dados - tome cuidado!!!

/**NO UPDATE PASSAMOS UM COMANDO PARA QUE ELE NÂO SUBSTITUA TUDO PELO QUE SE FOI MANDADO, 
 * atualizando somente o que queremos 
 * find - pegue o terceiro da lista para verificar no meu caso id 5e20a8984f787114ee06a49e
 * 5e20a8984f787114ee06a49e
 * 
 * db.herois.update({ "_id" : ObjectId("5e20a8984f787114ee06a49e")},
                  {$set: {nome: 'Iron-Man'}})
 * */
db.herois.update({ _id : ObjectId("5e20a8984f787114ee06a49e")},
                  {$set: {nome: 'Iron-Man'}})// com o dolar set agora tenho a certeza de que irá comente atualizar o nome
///CUIDADO!! caso erre o nome do campo, ele irá adicionar o nome do campo sem aviso algum
//GARANTA O NOME DOS CAMPOS
//por padrão o update altera somente o primeiro q ele encontrar, mesmo que existe outros com o mesmo atributo

// busque novamente
db.herois.find({nome: 'Iron-Man'})

//respo:
// { 
//     "_id" : ObjectId("5e20a8984f787114ee06a49e"), 
//     "nome" : "Iron-Man", 
//     "poder" : "Poder 2", 
//     "dataNascimento" : "9999-99-99" 
// }

db.herois.update({ dataNascimento : '9999-99-99'}, //altera somente 1 mesmo tendo muitas data assim
                  {$set: {dataNascimento: '0000-00-00'}})
// busque novamente
db.herois.find({dataNascimento: '0000-00-00'})
//por padrão o update altera somente o primeiro q ele encontrar, mesmo que existe outros com o mesmo atributo


//**DELETE

//aqui passamos noss where/ ele não remove sem se passar a condição
db.herois.remove()

//remover todos 
db.herois.remove({}) //remove geral

//removendo item especifico
db.herois.remove({nome: 'Personagem-3'})

