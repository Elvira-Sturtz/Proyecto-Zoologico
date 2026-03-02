 const {Schema, model} = require('mongoose') 

 const zonaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    }, 
    extension: {
        type: Number,
        required: true
    }
 }, 
{
    timestamps: true
}) 

module.exports = model('Zona', zonaSchema)
