const mongoose=require('mongoose');
const {Schema}=mongoose;

const clientesSchema= new Schema({

    cedula:{type:String,required:true},
    nombres:{type:String,required:true},
    telefono:{type:String,required:false},
    direccion:{type:Object,required:false},
    email:{type:String,required:false}
});

module.exports=mongoose.model('clientes',clientesSchema);

