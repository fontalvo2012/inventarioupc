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
    const ncitas=await Cita.find();
    console.log(ncitas.length);
    const c=JSON.parse(cita);
    c.nro=ncitas.length;
    const newcita=new Cita(c);
    await newcita.save();
    res.send('realizado');
});

router.post('/consultarcitas',async(req,res)=>{
    const {fecha,medico}=req.body; 
    const valores = await Cita.find({fecha:fecha,medico:medico}).lean();
    console.log(valores);
    res.send(valores); 
});

router.get('/vercitas',async(req,res)=>{   
    const medicos=await Medico.find().lean();
    const valores = await Cita.find({fecha:getfecha()}).lean();     
    var f=fechaformat();
    console.log(f);
    res.render('citas/consultas',{valores,f,medicos}); 
});
function fechaformat() {
    const fecha=new Date();
    var ano=fecha.getFullYear();
    var mes=fecha.getMonth()+1;
    var dia=fecha.getDate();
    if (dia<10) {
        dia='0'+dia;
    }
    if(mes<10){
        mes='0'+mes;
    }

    return ano+'-'+mes+'-'+dia;
}

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
    console.log(diaActual);
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

router.post('/vercitasfiltro',async(req,res)=>{
   const {medico,fecha}=req.body;  
   console.log(formatFecha(fecha),medico);   
   const citas = await Cita.find({medico:medico,fecha:formatFecha(fecha)}); 
   console.log(citas);
   res.send(citas);   
});

router.post('/vercitaspaciente',async(req,res)=>{
    const {cc}=req.body; 
    const valores = await Cita.find({'paciente.cedula':cc}).lean();
    console.log(valores) ;
    res.send(valores);  
 });

router.post('/ensala/:id',async(req,res)=>{
    const {id}=req.params; 
    const {copago,autorizacion,valor,entidad,cantidad,posquirurgico}=req.body;    
    const autoriz= await Factura.find({'hc.entidad.nit':entidad,'hc.autorizacion':autorizacion});  
    console.log(posquirurgico)
    if(autoriz[0]){        
        if(autoriz[0].hc.autorizacion==""){
            await Cita.updateOne({_id:id},
                {
                copago:copago,
                autorizacion:autorizacion,        
                estado:'ensala',
                valor:valor,
                cantidad:cantidad,
                posquirurgico:posquirurgico     
            }); 
            const cita=await Cita.findOne({_id:id});
            if (cita.item.tipo=='p') {
                const newFactura = new Factura({ codigo: 0, hc: cita, estado: 'PREFACTURA', descripcion: 'FATURACION DE PROCEDIMIENTO' });     
                await newFactura.save();
            }       
            req.flash('success','Adminision: '+cita.nro)
        }else{
            req.flash('login', 'El Numero autorizacion existe!');
        }
    } else{
        await Cita.updateOne({_id:id},
            {
            copago:copago,
            autorizacion:autorizacion,        
            estado:'ensala',
            valor:valor,
            cantidad:cantidad,
            posquirurgico:posquirurgico          
        }); 
        const cita=await Cita.findOne({_id:id});
        if (cita.item.tipo=='p') {
            const newFactura = new Factura({ codigo: 0, hc: cita, estado: 'PREFACTURA', descripcion: 'FATURACION DE PROCEDIMIENTO' });     
            await newFactura.save();
        }     
        req.flash('success','Adminision: '+cita.nro)
    }
    
    res.redirect('/vercitas');
});

router.post('/conCitas',async(req,res)=>{
    const {fecha,medico}=req.body;
    console.log(fecha,medico);
    const cita = await Cita.find({medico:medico,fecha:formatFecha(fecha)}); 
    res.send(cita);
})
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