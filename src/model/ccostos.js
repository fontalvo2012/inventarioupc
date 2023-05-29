const mongoose=require('mongoose');
const {Schema}=mongoose;
var moment = require('moment');

const ccostosSchema= new Schema({
  nombre:{type:String,required:true},
  descripcion:{type:String,required:true},
  estado:{type:String,default:"open"},
  decga:{type:String,default:moment().format('DD/MM/YYYY')},
  insumos:{type:Object,required:false}
});

module.exports=mongoose.model('ccostos',ccostosSchema);

