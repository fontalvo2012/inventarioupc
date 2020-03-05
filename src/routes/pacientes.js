const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db=admin.firestore();

router.post('/ajaxpaciente',(req,res)=>{
    const {id} = req.body;
    db.collection('pacientes').where("cedula", "==", id ).get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {            
            valores.push({id:doc.id,direccion:doc.data().direccion,cedula:doc.data().cedula,telefono:doc.data().telefono,email:doc.data().email,nombres:doc.data().nombres});
        });       
        res.send(valores);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send({'valor':'error'});
    });
});

router.get('/addpacientes',(req,res)=>{
    db.collection('pacientes').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {           
            valores.push({id:doc.id,direccion:doc.data().direccion,cedula:doc.data().cedula,telefono:doc.data().telefono,email:doc.data().email,nombre:doc.data().nombre,snombre:doc.data().snombre,apellido:doc.data().apellido,sapellido:doc.data().sapellido});
        });       
        res.render('pacientes/index',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('pacientes/index');
    });
});

router.post('/addpacientes',(req,res)=>{
    const { cedula,nombre,snombre,apellido,sapellido,email,direccion,telefono} = req.body;
    let docRef = db.collection('pacientes').doc();
    let setAda = docRef.set({
        cedula: cedula,
        nombre: nombre,
        snombre:snombre,
        apellido:apellido,
        sapellido:sapellido,
        email: email,
        direccion:direccion,
        telefono:telefono
    });
    res.redirect('/addpacientes');
});

router.get('/delpaciente/:id',(req,res)=>{
    const {id}= req.params;   
    db.collection("pacientes").doc(id).delete().then(function () {       
        res.redirect('/addpacientes');
    }).catch(function (error) {
        console.error("Error removing document: ", error);
        res.redirect('/addpacientes');
    });   
});

router.post('/actualizarpaciente',(req,res)=>{
    const {nombre,snombre,apellido,sapellido,email,direccion,telefono,id} = req.body;
    var washingtonRef = db.collection("pacientes").doc(id);  
    return washingtonRef.update({        
        nombre: nombre,
        snombre:snombre,
        sapellido:sapellido,
        apellido:apellido,
        email: email,
        direccion:direccion,
        telefono:telefono      
    })
        .then(function () {
            res.send('Actualizado Correctamente');
        })
        .catch(function (error) {           
            res.redirect('Error en Actualizar');
        });
});

module.exports = router;