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
  

router.post('/ajaxmedico',(req,res)=>{
    const {id} = req.body;
    db.collection('medicos').where("cedula", "==", id ).get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {            
            valores.push({id:doc.id,registro:doc.data().registro,cedula:doc.data().cedula,telefono:doc.data().telefono,email:doc.data().email,nombres:doc.data().nombres});
        });       
        res.send(valores);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send({'valor':'error'});
    });
});

router.get('/addmedicos',checkAuthentication,(req,res)=>{
    db.collection('medicos').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            valores.push({id:doc.id,registro:doc.data().registro,cedula:doc.data().cedula,telefono:doc.data().telefono,email:doc.data().email,nombres:doc.data().nombres});
        });       
        res.render('medicos/index',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('medicos/index');
    });
});

router.post('/addmedicos',(req,res)=>{
    const { cedula,nombres,email,registro,telefono} = req.body;
    let docRef = db.collection('medicos').doc();
    let setAda = docRef.set({
        cedula: cedula,
        nombres: nombres,
        email: email,
        registro:registro,
        telefono:telefono
    });
    res.redirect('/addmedicos');
});

router.get('/delmedico/:id',(req,res)=>{
    const {id}= req.params;
   
    db.collection("medicos").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
        res.redirect('/addmedicos');
    }).catch(function (error) {
        console.error("Error removing document: ", error);
        res.redirect('/addmedicos');
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