const mongoose=require('mongoose');
const {Schema}=mongoose;

const cieSchema= new Schema({
    codigo:{type:String,required:true},
    capitulo:{type:Number,required:true},      
    tipo:{type:String,required:false},    
    nombre:{type:String,required:true}      
});
module.exports=mongoose.model('cies',cieSchema);

