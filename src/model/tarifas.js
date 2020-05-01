const mongoose=require('mongoose');
const {Schema}=mongoose;

const tarifasSchema= new Schema({
    cd:{type:String,required:true},
    cups:{type:String,required:true},
    nombre:{type:String,required:true},
    valor:{type:Number,required:true},
    a_quirurgico:{type:String,required:false},
    atiende:{type:String,required:false},
    autorizacion:{type:String,required:false},
    c_diagnostico:{type:String,required:false},
    c_diagnostico2:{type:String,required:false},
    c_diagnostico3:{type:String,required:false},
    c_externa:{type:String,required:false},
    complicacion:{type:String,required:false},
    copago:{type:String,required:false},
    entidad:{type:String,required:false},
    f_consulta:{type:String,required:false},
    f_procedimiento:{type:String,required:false},
    tipo:{type:String,required:false},
    forma:{type:String,required:false}
});

module.exports=mongoose.model('tarifas',tarifasSchema);

