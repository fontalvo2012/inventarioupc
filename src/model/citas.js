const mongoose=require('mongoose');
const {Schema}=mongoose;

const citaSchema= new Schema({
    id:{type:Number,required:true},
    nro:{type:Number,required:false},
    medico:{type:String,required:true},
    fecha:{type:String,required:false},
    hora:{type:String,required:false},
    estado:{type:String,required:false},
    paciente:{type:Object,required:true},
    item:{type:Object,required:true},
    nombres:{type:String,required:false},
    entidad:{type:Object,required:true},
    diagnostico:{type:String,required:false},
    motivo:{type:String,required:false},
    telefono:{type:String,required:false},
    copago:{type:Number,required:false},
    autorizacion:{type:Object,required:false},
    nmedico:{type:Object,required:false},
    nitem:{type:Object,required:false},
    valor:{type:Number,required:false},
    cantidad:{type:Number,required:false},
    nentidad:{type:String,required:false},
    posquirurgico:{type:String,required:false},
    fcreacion:{type:Date,default:Date.now()}
});
module.exports=mongoose.model('citas',citaSchema);

