const mongoose=require('mongoose');
const {Schema}=mongoose;

const productoSchema= new Schema({
    codigo_Articulo:{type:String,required:true},
    nombre_Articulo:{type:String,required:true},
    Referencia:{type:String,required:false},
    fecha_Compra:{type:String,required:false},
    proveedor:{type:String,required:false},       
    linea:{type:String,required:false},       
    marca:{type:String,required:false},       
    medida:{type:String,required:false},      
    cantidad_Total:{type:Number,default:0},      
    costo:{type:Number,required:false}
});

module.exports=mongoose.model('productos',productoSchema);

