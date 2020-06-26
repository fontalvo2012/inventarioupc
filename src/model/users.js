const mongoose=require('mongoose');
const {Schema}=mongoose;

const usersSchema= new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    perfil:{type:String,required:true},
    nombre:{type:String,required:true},
    medico:{type:String,required:true},
    empleado:{type:String,required:false},       
    admin:{type:Number,required:false},       
    sede:{type:Number,required:false},       
    cordinador:{type:Number,required:false},
    despacho:{type:Number,required:false}         
});

module.exports=mongoose.model('users',usersSchema);

