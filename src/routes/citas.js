const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db=admin.firestore();



router.get('/localidades',(req,res)=>{
    const { cups,nombre,valor,entidad,id} = req.body;
    let docRef = db.collection('items').doc();
    let setAda = docRef.set({
        cups: cups,
        nombre: nombre,
        valor: valor,
        entidad:entidad        
    });
    res.redirect('/item');
});

router.get('/citas',(req,res)=>{
    db.collection('medicos').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {            
            valores.push(doc.data());            
        });       
        res.render('citas/index',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('citas/index');
    });
  
});

router.post('/addcitas',(req,res)=>{
    const {cita}=req.body;
    console.log(JSON.parse(cita));
    let docRef = db.collection('citas').doc();
    docRef.set(JSON.parse(cita));
    res.send('realizado');
})

router.post('/consultarcitas',(req,res)=>{
    const {fecha}=req.body;
  
    db.collection('citas').where('fecha','==',fecha).get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {            
            valores.push(doc.data());            
        });       
        res.send(valores)
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send('{error:error}');
    });
})

module.exports = router;