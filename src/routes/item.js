const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db = admin.firestore();
const Tarifas = require('../model/tarifas');
const Entidad = require('../model/entidad');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){        
        next();
    } else{
        res.redirect("/singIn");
    }
}
// => MONGO DB
router.post('/addTarifa',checkAuthentication,async(req,res)=>{
    const {cd,cups,nombre,valor,a_quirurgico,atiende,autorizacion,c_diagnostico,c_diagnostico2,c_diagnostico3,c_externa,complicacion,copago,entidad,f_consulta,f_procedimiento,tipo,forma,porcentaje}=req.body;
    const newTarifas= new Tarifas({cd,cups,nombre,valor,a_quirurgico,atiende,autorizacion,c_diagnostico,c_diagnostico2,c_diagnostico3,c_externa,complicacion,copago,entidad,f_consulta,f_procedimiento,tipo,forma,porcentaje});
    await newTarifas.save();
    const num=(await Tarifas.find({entidad:entidad})).length;  
    res.send({valor:num,cups:cups});
});

router.get('/addItem',checkAuthentication,async(req,res)=>{
    res.redirect('/tarifas');
});

router.post('/consultarTarifas',checkAuthentication,async(req,res)=>{
    const {entidad}=req.body;
    const tarifa=await Tarifas.find({entidad:entidad});
    var array=[]
    tarifa.forEach(element => {
        array.push(`${element.cups}::${element.nombre}`);
    });
    console.log(tarifa);
    res.send(array);
});

router.post('/consultarProcedimientos',checkAuthentication,async(req,res)=>{
    const {entidad}=req.body;
    const tarifa=await Tarifas.find({entidad:entidad,tipo:'p'});
    var array=[]
    tarifa.forEach(element => {
        array.push(`${element.cups}::${element.nombre}`);
    });    
    res.send(array);
});
router.post('/consultaritemProcedimientos',checkAuthentication,async(req,res)=>{
    const {entidad,cups}=req.body;
    const tarifa=await Tarifas.findOne({entidad:entidad,cups:cups});
    res.send(tarifa);
});

router.post('/addItem',checkAuthentication,async(req,res)=>{    
    const {cups,nombre,entidad_form,valor,copago,atiende,dprincipal,tipo,a_quirurgico,complicacion} = req.body;
    const  ent = await Entidad.find().sort({rsocial:'asc'}).lean();
    var forma='';

    if (tipo=='p') {
        forma='uvr'
    };

    const item={
        cd: '12',
        cups,
        nombre,
        valor,
        a_quirurgico,
        atiende,
        autorizacion:'',
        c_diagnostico:dprincipal,
        c_diagnostico2:'',
        c_diagnostico3:'',
        c_externa :'15',
        complicacion,
        copago,
        entidad:entidad_form,
        f_consulta:'',
        f_procedimiento:'',
        tipo,
        forma    
    }
    
    const i=await Tarifas.findOne({entidad:entidad_form,cups:cups});
    const error=[];
    
    if(i){
        console.log('ya existe el procedimiento')
        error.push({mensaje:'EL ITEM EXISTE: modificalo desde el menu parametos/tarifas'})
    }else{
        const tarifa= new Tarifas(item);
        await tarifa.save();
        error.push({mensaje:'EL ITEM FUE CREADO!'});
    }

    res.render('item/tarifas',{ent,error});
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