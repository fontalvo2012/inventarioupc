const mongoose=require('mongoose');
const {Schema}=mongoose;

const comprasSchema= new Schema({

    nro:{type:String,required:true},
    proveedor:{type:String,required:true},
    productos:{type:Object,required:false},
    fecha:{type:String,required:false},  
    imagen:{type:String,required:false}  

});

module.exports=mongoose.model('compras',comprasSchema);

