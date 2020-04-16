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
            valores.push({data:doc.data(),id:doc.id});            
        });       
        
        res.send(valores[0]);

    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send({'valor':'error'});
    });
});

router.post('/agendaMedicos',(req,res)=>{
    const {cc}=req.body;
    db.collection('medicos').where('cedula','==',cc).get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {            
            valores.push(doc.data());            
        });       
        res.send(valores[0]);
    })
   
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

router.post('/addmedicos',checkAuthentication,(req,res)=>{
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

router.post('/ajaxaddmedicos',checkAuthentication,(req,res)=>{
    const { medi } = req.body;
    let docRef = db.collection('medicos').doc();    
    let setAda = docRef.set(JSON.parse(medi));
    res.send('ingresado');
});

router.get('/delmedico/:id',checkAuthentication,(req,res)=>{
    const {id}= req.params;   
    db.collection("medicos").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
        res.redirect('/addmedicos');
    }).catch(function (error) {
        console.error("Error removing document: ", error);
        res.redirect('/addmedicos');
    });   
});

router.get('/vermedicos',checkAuthentication,(req,res)=>{
    db.collection('medicos').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            valores.push({id:doc.id,registro:doc.data().registro,especialidad:doc.data().especialidad,cedula:doc.data().cedula,telefono:doc.data().telefono,email:doc.data().email,nombres:doc.data().nombres});
        });       
        res.render('medicos/consultas',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('medicos/consultas');
    });
})

router.post('/actualizarmedico',checkAuthentication,(req,res)=>{
    const {id,medi} = req.body;
    var washingtonRef = db.collection("medicos").doc(id);  
    return washingtonRef.update(JSON.parse(medi))
        .then(function () {
            res.send('Actualizado Correctamente');
        })
        .catch(function (error) {           
            res.redirect('Error en Actualizar');
        });
});

router.post('/selecmedico',(req,res)=>{
    db.collection('medicos').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {           
            valores.push({id:doc.id,registro:doc.data().registro,cedula:doc.data().cedula,telefono:doc.data().telefono,email:doc.data().email,nombres:doc.data().nombres});
        });       
        res.send(valores);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send(valores);
    });
})

module.exports = router;