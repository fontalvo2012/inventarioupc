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
    var entidad=[];   
    entidad = await Entidad.find().sort({rsocial:'asc'}).lean();
    console.log(entidad);  
    res.render('item/tarifas',{ entidad });
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
    db.collection('entidades').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {            
            valores.push({
                id:doc.id,
                nit:doc.data().nit,
                rsocial:doc.data().rsocial,
                telefono:doc.data().telefono,
                email:doc.data().email,
                direccion:doc.data().direccion,
                regimen:doc.data().regimen
            });
        });       
        res.render('entidades/index',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('entidades/index');
    });
});

module.exports = router;