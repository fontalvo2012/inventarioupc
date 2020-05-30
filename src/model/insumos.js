const mongoose=require('mongoose');
const {Schema}=mongoose;

const insumoSchema= new Schema({
    codigo:{type:Number,required:true},
    nombre:{type:String,required:true},
    valor:{type:String,required:false}    
});

module.exports=mongoose.model('insumos',insumoSchema);

