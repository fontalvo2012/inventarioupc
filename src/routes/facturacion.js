const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db=admin.firestore();

router.get('/facturar',(req,res)=>{
    
    db.collection('carlosparra').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {
            valores.push({
                id:doc.id,
                nit:doc.data().nit,
                web:doc.data().web,
                rzocial:doc.data().rzocial,
                web:doc.data().web,
                habilitacion:doc.data().habilitacion,
                email:doc.data().email,
                resolfac:doc.data().resolfac,
                direccion:doc.data().direccion,
                telefono:doc.data().telfonos
            });
        });    
        res.render('facturacion/index',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        valores.push({mensaje:'error'});
        res.render('facturacion/index',{valores});
    });
});

router.post('/facturar',(req,res)=>{
   const {fac} = req.body; 
  
    let docRef = db.collection('facturas').doc();
    let setAda = docRef.set(JSON.parse(fac))
    .then(function () {
        res.send('ingresado');
    })
    .catch(function (error) {          
        res.send('error');
    });  
   
});

router.post('/consecutivo',(req,res)=>{    
    db.collection("facturas")
    .orderBy("consecutivo", "desc").limit(1).get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {
            valores.push({
                cons:doc.data().consecutivo,        
            });
         
        });       
        res.send(valores);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send({'valor':'error'});
    });
});

module.exports = router;