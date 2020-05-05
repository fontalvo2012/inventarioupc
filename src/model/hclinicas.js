const mongoose=require('mongoose');
const {Schema}=mongoose;

const hclinicaSchema= new Schema({   
    codigo: {type:String,required:true},   
    cedula:{type:String,required:true},   
    nombres:{type:String,required:true},   
    id:{type:String,required:true},
    cups:{type:String,required:true},
    diagnostico:{type:String,required:true},
    nombrecups:{type:String,required:true},
    motivo:{type:String,required:true},
    actual:{type:String,required:true},
    antecedentes:{type:Array,required:false},
    fisico:{type:Array,required:true},
    clinico:{type:String,required:true},
    plan:{type:String,required:true},
    impDiagnostico:{type:Array,required:true},
    ordenes:{type:String,required:true},
    receta:{type:Array,required:true},
    medico:{type:Array,required:true},
    tipo:{type:String,required:true},
    fecha:{type:String,required:true},
    pinicio:{type:String,required:true},
    pfinal:{type:String,required:true},
    cita:{type:Array,required:true}  
});

module.exports=mongoose.model('hclinicas',hclinicaSchema);

