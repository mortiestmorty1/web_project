const mongoose= require('mongoose');

const productSchema=new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: String,
        required: true
    },
    size:{
        type: String,
        required : false
    },
    Image:{
        type:Buffer,
        required: false
    }
})

module.exports = mongoose.model('product',productSchema);