const mongoose=require('mongoose');
const {Schema}=mongoose;

const ventasSchema= new Schema({

    codigo:{type:Number,required:true},
    cliente:{type:Object,required:true},
    fecha:{type:String,required:true},
    productos:{type:Object,required:false}
    

});

module.exports=mongoose.model('ventas',ventasSchema);

