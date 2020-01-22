//npm install sequelize
//npm install pg-hstore pg

const Sequelize = require('sequelize')
const driver = new Sequelize(
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

async function main(){
    const Herois = driver.define('herois', { //criando modelo para se trabalhar
        id:{
            type:Sequelize.INTEGER,         
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

    await Herois.sync()

    // const result = await Herois.findAll({raw: true})//raw para trazer as informaçoes em um formado limpo
    //trasenco um campo especifico:
    const result = await Herois.findAll({raw: true, attributes: ['nome']})//traz so o nome
    // await Herois.create({
    //     nome: 'Lampiao',
    //     poder: 'Rei do Cangaço'
    // })
    console.log('result', result)
}

main()