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
router.get('/consultarFactura',(req,res)=>{
    db.collection("facturas").orderBy('consecutivo','desc').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {
            valores.push(doc.data());
        });       
        res.render('facturacion/consultar',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('facturacion/consultar');
    });
    
})

router.post('/consultasFactura',(req,res)=>{
   const {ini,fin}=req.body;
   console.log(req.body);
    db.collection("facturas").get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {
            if (Betwen2(ini,fin,doc.data().fecha)) {
                valores.push(doc.data());
            }
            
        });       
        res.send(valores);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send({'valor':'error'});
    });
})

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

function Betwen2(f1,f2,fc) {
    fc=formatDate2(fc);
    console.log(f1);
    console.log(f2);
    console.log(fc);
   
    if(combertirfecha2(fc)>=combertirfecha2(f1)){
       if(combertirfecha2(fc)<=combertirfecha2(f2)){
         return true;
       }else{
         return false;
       }
    }else{
      return false;
    }
   }
   
   function combertirfecha2(f) {
     var fecha=new Date(f);
     return Date.parse(fecha);
   }
   function formatDate2(fecha) {
    var dia = fecha.substr(0,2);
    var mes = fecha.substr(3,2);
    var ano = fecha.substr(6,4);
    return ano+'-'+mes+'-'+dia;

}

module.exports = router;