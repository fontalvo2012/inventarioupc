const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db=admin.firestore();

router.post('/ajaxentidad',(req,res)=>{
    const {id} = req.body;
    db.collection('entidades').where("cedula", "==", id ).get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {            
            valores.push({id:doc.id,nit:doc.data().nit,rsocial:doc.data().rsocial,telefono:doc.data().telefono,email:doc.data().email,direccion:doc.data().direccion});
        });       
        res.send(valores);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send({'valor':'error'});
    });
});

router.get('/addentidades',(req,res)=>{
    db.collection('entidades').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            valores.push({id:doc.id,nit:doc.data().nit,rsocial:doc.data().rsocial,telefono:doc.data().telefono,email:doc.data().email,direccion:doc.data().direccion,regimen:doc.data().regimen});
        });       
        res.render('entidades/index',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('entidades/index');
    });
});

router.post('/addentidades',(req,res)=>{
    const {nit,rsocial,email,direccion,telefono,regimen} = req.body;
    let docRef = db.collection('entidades').doc();
    let setAda = docRef.set({
        nit: nit,
        rsocial: rsocial,
        email: email,
        direccion:direccion,
        telefono:telefono,
        regimen:regimen
    });
    res.redirect('/addentidades');
});

router.get('/delentidad/:id',(req,res)=>{
    const {id}= req.params;
   
    db.collection("entidades").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
        res.redirect('/addentidades');
    }).catch(function (error) {
        console.error("Error removing document: ", error);
        res.redirect('/addentidades');
    });   
});

router.post('/actualizarentidad',(req,res)=>{
    const {nombres,email,registro,telefono,id} = req.body;
    var washingtonRef = db.collection("entidades").doc(id);
  
    return washingtonRef.update({        
        nombres: nombres,
        email: email,
        registro:registro,
        telefono:telefono      
    })
        .then(function () {
            res.send('Actualizado Correctamente');
        })
        .catch(function (error) {           
            res.redirect('Error en Actualizar');
        });
});


router.post('/selectEntidad',(req,res)=>{
    db.collection('entidades').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            valores.push({id:doc.id,nit:doc.data().nit,rsocial:doc.data().rsocial,telefono:doc.data().telefono,email:doc.data().email,direccion:doc.data().direccion,regimen:doc.data().regimen});
        });       
        res.send(valores);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send({valor:'error'})
    });
});
module.exports = router;