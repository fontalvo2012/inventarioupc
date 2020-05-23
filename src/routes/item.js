const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db = admin.firestore();
const Tarifas = require('../model/tarifas');

// => MONGO DB
router.post('/addTarifa',async(req,res)=>{
    const {cd,cups,nombre,valor,a_quirurgico,atiende,autorizacion,c_diagnostico,c_diagnostico2,c_diagnostico3,c_externa,complicacion,copago,entidad,f_consulta,f_procedimiento,tipo,forma}=req.body;
    const newTarifas= new Tarifas({cd,cups,nombre,valor,a_quirurgico,atiende,autorizacion,c_diagnostico,c_diagnostico2,c_diagnostico3,c_externa,complicacion,copago,entidad,f_consulta,f_procedimiento,tipo,forma});
    await newTarifas.save();
    const num=(await Tarifas.find({entidad:entidad})).length;  
    res.send({valor:num,cups:cups});
});

router.get('/addItem',async(req,res)=>{
    res.render('item/index');
});
router.post('/verTarifas',async(req,res)=>{
    const {entidad}=req.body;
    const t= await Tarifas.find({entidad:entidad}).sort({nombre:'asc'});
    res.send(t);
});

router.post('/verItem',async(req,res)=>{
    const {id,entidad}=req.body;
    const t= await Tarifas.findOne({entidad:entidad,cups:id})
    res.send(t);
});

router.post('/Actualizartarifas',async(req,res)=>{
    const {valor,id}=req.body;
    await Tarifas.findByIdAndUpdate(id,{valor:valor});
    res.send('::Realizado::');
});

// //MONGO DB <=



module.exports = router;