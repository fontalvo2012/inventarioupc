const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db=admin.firestore();
const Medico=require('../model/medicos');
const Cita=require('../model/citas');
const Factura= require('../model/facturas');

router.get('/citas',async(req,res)=>{
    const valores=await Medico.find().lean();
    res.render('citas/index',{valores});
});

router.post('/apartadas',async(req,res)=>{
    const {cedula}=req.body;
    const valores=await Cita.find({'paciente.cedula':cedula,estado:''});   
    res.send(valores);
});

router.post('/addcitas',async(req,res)=>{
    const {cita}=req.body;
    const newcita=new Cita(JSON.parse(cita));
    await newcita.save();
    res.send('realizado');
});

router.post('/consultarcitas',async(req,res)=>{
    const {fecha,medico}=req.body; 
    const valores=await Cita.find({fecha:fecha,medico:medico});
    res.send(valores); 
});

router.get('/vercitas',async(req,res)=>{   
    const valores = await Cita.find({fecha:getfecha()}).lean(); 
    res.render('citas/consultas',{valores}); 
});

function getfecha() {
    var diaActual = new Date();
    var f ='';
    var mes=diaActual.getMonth()+1;
    var dia=diaActual.getDate();
    if(diaActual.getMonth()<10){
        mes='0'+mes
    }
    
    if(diaActual.getDate()<10){
        dia='0'+dia
    }
    return mes+'/'+dia+'/'+diaActual.getFullYear();    
}
function formatFecha(fecha) {
    var diaActual = new Date(fecha);
    var f ='';
    var mes=diaActual.getMonth()+1;
    var dia=diaActual.getDate()+1;
    if(diaActual.getMonth()<10){
        mes='0'+mes
    }    
    if(diaActual.getDate()<10){
        dia='0'+dia
    }
    return mes+'/'+dia+'/'+diaActual.getFullYear();    
}

router.post('/vercitasfiltro',async(req,res)=>{
   const {medico,fecha}=req.body;  
   console.log(formatFecha(fecha));
   const citas = await Cita.find({medico:medico,fecha:formatFecha(fecha)}).lean(); 
   res.send(citas);   
});

router.post('/vercitaspaciente',async(req,res)=>{
    const {cc}=req.body; 
    const valores = await Cita.find({'paciente.cedula':cc}).lean(); 
    res.render('citas/consultas',{valores});  
 });

router.post('/ensala/:id',async(req,res)=>{
    const {id}=req.params; 
    const {copago,autorizacion,valor,entidad}=req.body;    
    const autoriz= await Factura.find({'hc.entidad.nit':entidad,'hc.autorizacion':autorizacion});  
    
    if(autoriz[0]){
        req.flash('login', 'El Numero autorizacion existe!');
    } else{
        await Cita.updateOne({_id:id},
            {
            copago:copago,
            autorizacion:autorizacion,        
            estado:'ensala',
            valor:valor        
        }); 
        const cita=await Cita.findOne({_id:id});
        if (cita.item.tipo=='p') {
            const newFactura = new Factura({ codigo: 0, hc: cita, estado: 'PREFACTURA', descripcion: 'FATURACION DE PROCEDIMIENTO' });     
            await newFactura.save();
        }     
    }

   
  
    

    res.redirect('/vercitas');
});

router.get('/borrarcita/:id',async(req,res)=>{
    const {id}= req.params;   
    await Cita.findOneAndDelete({_id:id});
    res.redirect('/vercitas');
});

router.post('/borrarcita',async(req,res)=>{
    const {id}=req.body;   
    await Cita.findOneAndDelete({_id:id});
    res.send('1');
});

module.exports = router;