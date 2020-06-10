const { Router } = require('express');
const router = Router();
const Insumo=require('../model/insumos');
const Medicamentos=require('../model/medicamentos');
const Cie10=require('../model/cie10');
function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){        
        next();
    } else{
        res.redirect("/singIn");
    }
  }

router.get('/insumos',checkAuthentication, async(req, res) => {
   const insumos=await Insumo.find().lean(); 
   res.render('medicamentos/insumos',{insumos});
});

router.post('/insumos',checkAuthentication, async(req, res) => {
    const {nombre,valor}=req.body;
    const num = await Insumo.find();    
    const insumo= new Insumo({codigo:num.length,nombre,valor});
    await insumo.save();    
    res.redirect('/insumos');
 });

 router.post('/completeInsumos',checkAuthentication,async(req,res)=>{
     const i=await Insumo.find();
     var insumo=[];
     i.forEach(element => {
         insumo.push(element.nombre);
     });
     res.send(insumo);
 })
 router.post('/medicamentos',checkAuthentication,async(req,res)=>{
    const {nombre,presentacion,tipo}= req.body;
    const codigo=await Medicamentos.find();
    const medicamentos = new Medicamentos({codigo:codigo.length,nombre,presentacion,tipo});
    await medicamentos.save();
    res.redirect('/medicamentos');
 })
 router.post('/medicamentosAjax',checkAuthentication,async(req,res)=>{
    const {nombre,presentacion,tipo,codigo}= req.body;   
    const medicamentos = new Medicamentos({codigo,nombre,presentacion,tipo});
    await medicamentos.save();
    res.send('agreado:'+nombre);
 })
 router.get('/medicamentos',checkAuthentication,async(req,res)=>{
     const medicamentos= await Medicamentos.find().lean();
     res.render('medicamentos/medicamentos',{medicamentos});
})

router.get('/parametros',checkAuthentication,async(req,res)=>{
   
    res.render('medicamentos/parametros');
})

router.post('/medicamentosArray',checkAuthentication,async(req,res)=>{
    const medicamentos= await Medicamentos.find().lean();
    const medicamentoAr=[];
    medicamentos.forEach(element => {
        medicamentoAr.push(element.nombre+" "+element.presentacion);
    });
    res.send(medicamentoAr);
})

router.post('/addCie10',checkAuthentication,async(req,res)=>{
   const {codigo,nombre,tipo,capitulo}=req.body;
   const cie=new Cie10({codigo,nombre,tipo,capitulo});   
   await cie.save();
   res.send('creado: '+codigo);
})

router.post('/addCie10Complete',checkAuthentication,async(req,res)=>{
    const cieArray=[];
    const  cie10=await Cie10.find();
    cie10.forEach(element => {
        cieArray.push(element.codigo+' :: '+element.nombre);
    });
     res.send(cieArray);
 })

 router.post('/Cie10Ajax',checkAuthentication,async(req,res)=>{
    const {codigo}=req.body;
    const c =await Cie10.findOne({codigo:codigo});
    if (c) {
        res.send('si');
    }else{
        res.send('no');
    }
    
 })


module.exports = router;