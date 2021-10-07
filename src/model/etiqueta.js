const mongoose=require('mongoose');
const {Schema}=mongoose;

const etiquetasSchema= new Schema({
    nombre:{type:String,required:true}
});

module.exports=mongoose.model('etiquetas',etiquetasSchema);

