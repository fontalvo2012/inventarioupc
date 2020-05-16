const mongoose=require('mongoose');
const {Schema}=mongoose;

const procedimientoSchema= new Schema({
    imagen:{type:Array,required:true},
    codigo:{type:String,required:true}      
});

module.exports=mongoose.model('procedimientos',procedimientoSchema);

