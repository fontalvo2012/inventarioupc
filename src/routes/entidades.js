const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db=admin.firestore();

router.post('/ajaxentidad',(req,res)=>{
    const {nit} = req.body;
    db.collection('entidades').where("nit", "==", nit ).get()
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
                regimen:doc.data().regimen,
                cdeps:doc.data().cdeps,
                beneficio:doc.data().beneficio,
                comision:doc.data().comision,
                copago:doc.data().copago,
                contrato:doc.data().contrato,
                descuento:doc.data().descuento,
                poliza:doc.data().poliza
            });
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

router.post('/addentidades',(req,res)=>{
    const {nit,rsocial,email,direccion,telefono,regimen,tipoid,cdeps,contrato} = req.body;
    let docRef = db.collection('entidades').doc();
    let setAda = docRef.set({
        tipoid:tipoid,
        nit: nit,
        rsocial: rsocial,
        email: email,
        cdeps:cdeps,
        contrato:contrato,
        direccion:direccion,
        telefono:telefono,
        regimen:regimen,
        beneficio:'',
        poliza:'',
        copago:'0',
        comision:'0',
        descuento:'0'
        
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
    const {nit,rsocial,email,direccion,telefono,regimen,tipoid,cdeps,contrato,id} = req.body;
    var washingtonRef = db.collection("entidades").doc(id);
  
    return washingtonRef.update({    
        tipoid:tipoid,
        nit: nit,
        rsocial: rsocial,
        email: email,
        cdeps:cdeps,
        contrato:contrato,
        direccion:direccion,
        telefono:telefono,
        regimen:regimen     
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