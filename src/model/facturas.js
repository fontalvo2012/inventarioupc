const mongoose=require('mongoose');
const {Schema}=mongoose;

const facturaSchema= new Schema({
    codigo:{type:Number,required:true},    
    hc:{type:Object,required:true},
    anexo:{type:Object,required:false},
    estado:{type:String,required:false},
    descripcion:{type:String,required:false},
    fecha:{type:Date,default:Date.now()},
    vencimiento:{type:String,default:Date.now()}
});

module.exports=mongoose.model('facturas',facturaSchema);

