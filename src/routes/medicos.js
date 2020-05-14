const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db=admin.firestore();
const Medico=require('../model/medicos');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){        
        next();
    } else{
        res.redirect("/singIn");
    }
  }

router.post('/ajaxmedico',async(req,res)=>{
    const {cedula} = req.body;   
    const medico= await Medico.findOne({cedula:cedula});
    res.send(medico);  
  
});

router.post('/agendaMedicos',async(req,res)=>{
    const {cc}=req.body;
    const medico=await Medico.findOne({cedula:cc});
    res.send(medico);   
});

router.get('/addmedicos',checkAuthentication,(req,res)=>{
    res.render('medicos/index');
});

router.post('/ajaxaddmedicos',checkAuthentication,async(req,res)=>{
    const { medi } = req.body;    
    const medicos=new Medico(JSON.parse(medi));
    await medicos.save();  
    res.send('ingresado');
});



router.get('/vermedicos',checkAuthentication,async(req,res)=>{
    const valores=await Medico.find().lean();
    res.render('medicos/consultas',{valores});
})

router.post('/actualizarmedico',checkAuthentication,async(req,res)=>{
    const {id,medi} = req.body;   
    await Medico.findByIdAndUpdate(id,JSON.parse(medi));
    res.send('Actualizado')
  
});

router.post('/selecmedico',async(req,res)=>{
    const medico=await Medico.find();
    res.send(medico);   
})

module.exports = router;