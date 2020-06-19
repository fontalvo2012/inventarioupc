const mongoose=require('mongoose');
const {Schema}=mongoose;

const medicamentoSchema= new Schema({
    codigo:{type:String,required:true},
    nombre:{type:String,required:true},      
    presentacion:{type:String,required:false},    
    uso:{type:String,required:false},    
    tipo:{type:String,required:false}      
});
module.exports=mongoose.model('medicamentos',medicamentoSchema);

