const mongoose=require('mongoose');
const {Schema}=mongoose;

const proveedorSchema= new Schema({   
    nit:{type:String,required:true},
    nombre:{type:String,required:true},
    direccion:{type:String,required:false},
    email:{type:String,required:false},
    telefono:{type:String,required:false}
});

module.exports=mongoose.model('proveedores',proveedorSchema);

