const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db=admin.firestore();

router.post('/ajaxitems',(req,res)=>{
    const {id} = req.body;
    db.collection('items').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {            
          if (doc.id==id) {
            valores.push({
                id:doc.id,
                registro:doc.data().registro,
                cups:doc.data().cups,
                valor:doc.data().valor,
                nombre:doc.data().nombre,
                entidad:doc.data().entidad
            });
          }
        });       
        res.send(valores);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send({'valor':'error'});
    });
});

router.post('/itemcups',(req,res)=>{
    const {entidad} = req.body;
    db.collection('items').where("entidad", "==", entidad ).get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {            
            valores.push({
                id:doc.id,
                registro:doc.data().registro,
                cups:doc.data().cups,
                valor:doc.data().valor,
                nombre:doc.data().nombre,
                entidad:doc.data().entidad
            });
        });       
        res.send(valores);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send({'valor':'error'});
    });
});

router.get('/item',(req,res)=>{
    db.collection('items').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            valores.push({id:doc.id,cups:doc.data().cups,valor:doc.data().valor,nombre:doc.data().nombre,entidad:doc.data().entidad});
        });       
        res.render('item/index',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('item/index');
    });
});

router.post('/items',(req,res)=>{
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

router.get('/delitems/:id',(req,res)=>{
    const {id}= req.params;
    db.collection("items").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
        res.redirect('/item');
    }).catch(function (error) {
        console.error("Error removing document: ", error);
        res.redirect('/item');
    });   
});

router.post('/actualizarmedico',(req,res)=>{
    const {nombres,email,registro,telefono,id} = req.body;
    var washingtonRef = db.collection("medicos").doc(id);
  
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
 

module.exports = router;