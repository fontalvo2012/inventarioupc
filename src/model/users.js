const mongoose=require('mongoose');
const {Schema}=mongoose;

const usersSchema= new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    perfil:{type:String,required:false},
    nombre:{type:String,required:true},
    medico:{type:String,required:true},
    empleado:{type:String,required:false},       
    jefe:{type:Object,required:false},       
    admin:{type:Number,required:false},       
    sede:{type:Number,required:false},       
    cordinador:{type:Number,required:false},
    despacho:{type:Number,required:false},
    carnet:{type:String,required:false},

});

module.exports=mongoose.model('users',usersSchema);

