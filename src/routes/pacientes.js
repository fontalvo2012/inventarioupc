const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db=admin.firestore();
const Paciente=require('../model/pacientes');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){        
        next();
    } else{
        res.redirect("/singIn");
    }
}

//MONGO DB =>
router.get('/addpacientes',checkAuthentication,(req,res)=>{
    res.render('pacientes/index');
});
router.post('/addpacientes',checkAuthentication,async(req,res)=>{
    const { td,cedula,nombre,snombre,apellido,sapellido,sexo,nacimiento,edad,unidad,ecivil,cdM,cddep,zresidencial,email,direccion,telefono,ciudad,nombre_acom,parentesco,tel_acom} = req.body;
    const newPaciente= new Paciente({ td,cedula,nombre,snombre,apellido,sapellido,sexo,nacimiento,edad,unidad,ecivil,cdM,cddep,zresidencial,email,direccion,telefono,ciudad,nombre_acom,parentesco,tel_acom});   
    const p=await Paciente.findOne({cedula:cedula});
    var error=[];
    if(p){         
        error.push({mensaje:'El paciente ya fue registrado',tipo:'danger'})
    }else{
        await newPaciente.save();
        error.push({mensaje:'Paciente Registrado Satisfactoria mente',tipo:'success'})
    }   
    res.render('pacientes/index',{error});
});

router.post('/ajaxpaciente',checkAuthentication,async(req,res)=>{
    const {cedula} = req.body;
    const p = await Paciente.findOne({cedula:cedula});
    res.send(p);    
});

router.get('/consultarpacientes',checkAuthentication,async(req,res)=>{
    const valores=await Paciente.find().lean();
    res.render('pacientes/consultar',{valores});
});
//MONGO DB <=



router.post('/ajax_consultarpacientes',checkAuthentication,async(req,res)=>{
    const {cc} = req.body;   
    const p=await Paciente.findOne({cedula:cc});
    res.send(p);

    // db.collection('pacientes').get()
    // .then((snapshot) => {
    //     var valores=[];
    //     snapshot.forEach((doc) => {
    //     if ( validarcedula(cc,doc.data().cedula)) {
    //         valores.push(doc.data());
    //     }           
    //     });
      
    //     res.send(valores)
    // })
   
});


function validarcedula(c1,c2) {
    if(c1.substr(0,c1.length)==c2.substr(0,c1.length)){
        return true;
    }
    return false;
}

module.exports = router;