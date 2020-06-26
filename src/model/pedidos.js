const mongoose=require('mongoose');
const {Schema}=mongoose;

const pedidosSchema= new Schema({

    nro:{type:String,required:false},
    pedidos:{type:Object,required:true},
    fecha:{type:Date,default:Date.now()},   
    estado:{type:String,required:false},
    usuario:{type:String,required:false},
    supervisor:{type:String,required:false}

});

module.exports=mongoose.model('pedidos',pedidosSchema);

