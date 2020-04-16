const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db=admin.firestore();

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){        
        next();
    } else{
        res.redirect("/singIn");
    }
}
router.post('/ajaxpaciente',checkAuthentication,(req,res)=>{
    const {cedula} = req.body;
    db.collection('pacientes').where("cedula", "==", cedula ).get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {            
            valores.push({
                id:doc.id,
                direccion:doc.data().direccion,
                cedula:doc.data().cedula,
                telefono:doc.data().telefono,
                email:doc.data().email,
                nombre:doc.data().nombre,
                snombre:doc.data().snombre,
                apellido:doc.data().apellido,
                sapellido:doc.data().sapellido,
                sexo:doc.data().sexo,
                nacimiento:doc.data().nacimiento,
                edad:doc.data().edad,
                unidad:doc.data().unidad,
                ecivil:doc.data().ecivil,
                cdM:doc.data().cdM,
                cddep:doc.data().cddep,
                zresidencial:doc.data().zresidencial,
                td:doc.data().td
            });
        });       
        res.send(valores);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send({'valor':'error'});
    });
});

router.get('/addpacientes',checkAuthentication,(req,res)=>{
    db.collection('pacientes').orderBy('nombre','asc').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {           
            valores.push({
                id:doc.id,
                direccion:doc.data().direccion,
                cedula:doc.data().cedula,
                telefono:doc.data().telefono,
                email:doc.data().email,
                nombre:doc.data().nombre,
                snombre:doc.data().snombre,
                apellido:doc.data().apellido,
                sapellido:doc.data().sapellido,
                sexo:doc.data().sexo,
                nacimiento:doc.data().nacimiento,
                edad:doc.data().edad,
                unidad:doc.data().unidad,
                ecivil:doc.data().ecivil,
                cdM:doc.data().cdM,
                cddep:doc.data().cddep,
                zresidencial:doc.data().zresidencial,
                td:doc.data().td
            });
        });       
        res.render('pacientes/index',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('pacientes/index');
    });
});

router.get('/consultarpacientes',checkAuthentication,(req,res)=>{
    db.collection('pacientes').orderBy('nombre','asc').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {           
            valores.push(doc.data());
        });
        console.log(valores);
        res.render('pacientes/consultar',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('pacientes/consultar');
    });
});

router.post('/ajax_consultarpacientes',checkAuthentication,(req,res)=>{
    const {cc} = req.body;
    db.collection('pacientes').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {
        if ( validarcedula(cc,doc.data().cedula)) {
            valores.push(doc.data());
        }           
        });
        console.log(valores);
        res.send(valores)
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send('null')
    });
});


function validarcedula(c1,c2) {
    if(c1.substr(0,c1.length)==c2.substr(0,c1.length)){
        return true;
    }
    return false;
}


router.post('/addpacientes',checkAuthentication,(req,res)=>{
    const { td,cedula,nombre,snombre,apellido,sapellido,sexo,nacimiento,edad,unidad,ecivil,cdM,cddep,zresidencial,email,direccion,telefono,ciudad} = req.body;
    let docRef = db.collection('pacientes').doc();
    let setAda = docRef.set({
        cedula: cedula,
        ciudad:ciudad,
        nombre: nombre.toUpperCase(),
        snombre:snombre.toUpperCase(),
        apellido:apellido.toUpperCase(),
        sapellido:sapellido.toUpperCase(),
        email: email,
        direccion:direccion,
        telefono:telefono,
        td:td,
        sexo:sexo,
        nacimiento:nacimiento,
        edad:edad,
        unidad:unidad,
        ecivil:ecivil,
        cdM:cdM,
        cddep:cddep,
        zresidencial:zresidencial
    });
    res.redirect('/addpacientes');
});

router.get('/delpaciente/:id',checkAuthentication,(req,res)=>{
    const {id}= req.params;   
    db.collection("pacientes").doc(id).delete().then(function () {       
        res.redirect('/addpacientes');
    }).catch(function (error) {
        console.error("Error removing document: ", error);
        res.redirect('/addpacientes');
    });   
});

router.post('/actualizarpaciente',checkAuthentication,(req,res)=>{
    const { id,td,nombre,snombre,apellido,sapellido,sexo,nacimiento,edad,unidad,ecivil,cdM,cddep,zresidencial,email,direccion,telefono} = req.body;
    var washingtonRef = db.collection("pacientes").doc(id);  
    return washingtonRef.update({
        nombre: nombre,
        snombre:snombre,
        apellido:apellido,
        sapellido:sapellido,
        email: email,
        direccion:direccion,
        telefono:telefono,
        td:td,
        sexo:sexo,
        nacimiento:nacimiento,
        edad:edad,
        unidad:unidad,
        ecivil:ecivil,
        cdM:cdM,
        cddep:cddep,
        zresidencial:zresidencial    
    })
        .then(function () {
            res.send('Actualizado Correctamente');
        })
        .catch(function (error) {           
            res.redirect('Error en Actualizar');
        });
});





module.exports = router;