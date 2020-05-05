const mongoose=require('mongoose');
const {Schema}=mongoose;

const empresasSchema= new Schema({
    nit:{type:String,required:true},
    rsocial:{type:String,required:true},
    direccion:{type:String,required:false},
    habilitacion:{type:String,required:true},
    resolucion:{type:String,required:false},
    tresolucion:{type:String,required:false},
    telefono:{type:String,required:false},
    email:{type:String,required:false},
});

module.exports=mongoose.model('empresas',empresasSchema);

