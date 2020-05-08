const mongoose=require('mongoose');
const {Schema}=mongoose;

const facturaSchema= new Schema({
    codigo:{type:String,required:true},    
    hc:{type:Object,required:true},
    anexo:{type:Array,required:false},
    estado:{type:String,required:false},
    fecha:{type:Date,default:Date.now}
});

module.exports=mongoose.model('facturas',facturaSchema);

