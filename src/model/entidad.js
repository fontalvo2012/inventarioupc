const mongoose=require('mongoose');
const {Schema}=mongoose;

const entidadSchema= new Schema({
    nit:{type:String,required:true},
    rsocial:{type:String,required:true},
    email:{type:String,required:true},
    direccion:{type:String,required:true},
    telefono:{type:String,required:true},
    regimen:{type:String,required:true},
    tipoid:{type:String,required:true},
    cdeps:{type:String,required:true},
    contrato:{type:String,required:true},
    vcap:{type:String,required:true},
    tfac:{type:String,required:false}    
});

module.exports=mongoose.model('entidades',entidadSchema);

