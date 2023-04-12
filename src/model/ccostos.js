const mongoose=require('mongoose');
const {Schema}=mongoose;

const ccostosSchema= new Schema({
  nombre:{type:String,required:true},
  descripcion:{type:String,required:true},
  estado:{type:String,default:"open"},
  decga:{type:Date,default:new Date()},
  insumos:{type:Object,required:false}
});

module.exports=mongoose.model('ccostos',ccostosSchema);

