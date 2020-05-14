const mongoose=require('mongoose');
const {Schema}=mongoose;

const medicoSchema= new Schema({
    cedula:{type:String,required:true},
    nombres:{type:String,required:true},
    registro:{type:String,required:true},
    especialidad:{type:String,required:true},
    telefono:{type:String,required:true},
    email:{type:String,required:true},
    agenda:{type:Array,required:true}  
});

module.exports=mongoose.model('medicos',medicoSchema);

