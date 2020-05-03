const mongoose=require('mongoose');
const {Schema}=mongoose;

const pacienteSchema= new Schema({
    td:{type:String,required:true},
    cedula:{type:String,required:true},
    nombre:{type:String,required:true},
    snombre:{type:String,required:false},
    apellido:{type:String,required:false},
    sapellido:{type:String,required:false},
    sexo:{type:String,required:false},
    nacimiento:{type:String,required:false},
    edad:{type:String,required:false},
    unidad:{type:String,required:false},
    ecivil:{type:String,required:false},
    cdM:{type:String,required:false},
    cddep:{type:String,required:false},
    zresidencial:{type:String,required:false},
    email:{type:String,required:false},
    direccion:{type:String,required:false},
    telefono:{type:String,required:false},
    ciudad:{type:String,required:false},
    nombre_acom:{type:String,required:false},
    parentesco:{type:String,required:false},
    tel_acom:{type:String,required:false}
     
});

module.exports=mongoose.model('pacientes',pacienteSchema);

