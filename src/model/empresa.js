const mongoose=require('mongoose');
const {Schema}=mongoose;

const empresaSchema= new Schema({
  nit:{type:String,required:true},
  razonsocial:{type:String,required:true},
  direccion:{type:String},
  telefono:{type:String},
  email:{type:String},
  texto:{type:String},
  logo:{type:String},
});

module.exports=mongoose.model('empresas',empresaSchema);

