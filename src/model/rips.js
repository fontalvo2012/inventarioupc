const mongoose=require('mongoose');
const {Schema}=mongoose;

const ripSchema= new Schema({
    consecutivo:{type:Number,required:true},
    entidad:{type:String,required:true},
    nombre:{type:String,required:true},
    fecha:{type:Date,default:Date.now()},
});

module.exports=mongoose.model('rips',ripSchema);

