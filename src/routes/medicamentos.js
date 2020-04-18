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
router.get('/medicamentos',checkAuthentication,(req,res)=>{
    db.collection('medicamentos').orderBy('medicamento','asc').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {            
            valores.push({data:doc.data(),id:doc.id});            
        });       
        console.log(valores);
        res.render('medicamentos/index',{valores});
    });    
});

router.post('/medicamentos',checkAuthentication,(req,res)=>{
    const{ medicamento }= req.body;
    var m = {
        medicamento:medicamento.toUpperCase()
    };
    let docRef = db.collection('medicamentos').doc();
    docRef.set(m);
    res.redirect('/medicamentos');
});

router.post('/ajaxMedicamentos',checkAuthentication,(req,res)=>{
    db.collection('medicamentos').orderBy('medicamento','asc').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {            
            valores.push(doc.data());            
        });              
        res.send(valores);
    });    
});

router.get('/delmedicamento/:id', (req, res) => {
    const { id } = req.params;
    db.collection("medicamentos").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
        res.redirect('/medicamentos');
    })
});

module.exports = router;