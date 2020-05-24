const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db=admin.firestore();
const Entidad = require('../model/entidad');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){        
        next();
    } else{
        res.redirect("/singIn");
    }
}

// => MONGO DB

router.post('/addentidades',checkAuthentication,async(req,res)=>{
    const {nit,rsocial,email,direccion,telefono,regimen,tipoid,cdeps,contrato,vcap,tfac} = req.body;
    const newEntidad= new Entidad({nit,rsocial,email,direccion,telefono,regimen,tipoid,cdeps,contrato,vcap,tfac});
    await newEntidad.save();
    res.redirect('/addentidades');
});

router.get('/tarifas',async(req,res)=>{       
    const ent = await Entidad.find().sort({rsocial:'asc'}).lean();    
    res.render('item/tarifas',{ ent });
});

router.get('/descargaRips',async(req, res) => {  
    var valores=[];   
    valores = await Entidad.find().sort({rsocial:'asc'}).lean();    
    res.render('facturacion/descargaRips',{ valores });
});

router.post('/ajaxentidad',checkAuthentication,async(req,res)=>{
    const {nit} = req.body;
    var valores=[];   
    valores = await Entidad.find({nit:nit}).lean();     
    res.send(valores);
});

router.post('/selectEntidad',checkAuthentication,async(req,res)=>{
    var valores=[];   
    valores = await Entidad.find().lean();   
    res.send(valores);
});



// MONGO DB <=
router.get('/addentidades',checkAuthentication,(req,res)=>{
    res.render('entidades/index');
});

router.get('/verentidad',checkAuthentication,async(req,res)=>{
    var entidades=[]
    entidades= await Entidad.find().lean();
    res.render('entidades/consultar',{entidades});
});

module.exports = router;