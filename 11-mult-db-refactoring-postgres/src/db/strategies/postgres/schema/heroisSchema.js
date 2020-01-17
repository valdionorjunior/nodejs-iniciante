const Sequelize = require('sequelize')


const HeroiSchema = {
    name: 'herois',
    schema: {
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
    },
    options: {
        //sequelize não tem preparação para banco existente, abaxo configuração para isso
        tableName: 'TB_HEROIS',
        freezeTebleName: false,//não alterar as opções dos bancos
        timestamps: false, //impede de o sequelize criar propriedades sozinho (updated ection, etc)
    }
} 
module.exports = HeroiSchema