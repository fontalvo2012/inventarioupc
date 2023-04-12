const mongoose=require('mongoose');
const {Schema}=mongoose;

process.env.TZ = "America/New_York"
d = new Date();
d.toLocaleTimeString();


const solicitudesSchema= new Schema({

    nro:{type:String,required:false},   
    productos:{type:Object,required:false},
    fecha:{type:String,default:d},  
    usuario:{type:String,required:false},  
    cantidad:{type:String,default:d} 

});

module.exports=mongoose.model('solicitudes',solicitudesSchema);

