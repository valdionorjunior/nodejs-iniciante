//schema - modelo do objeto
const Mongoose = require('mongoose')

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
//geristrando modelo
module.exports = Mongoose.model('herois', heroisSchema)