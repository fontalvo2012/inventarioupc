const { Router } = require('express');
const pdf = require('html-pdf');

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


router.get('/facturar',checkAuthentication,(req,res)=>{    
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

router.post('/facturar',checkAuthentication,(req,res)=>{
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
router.get('/consultarFactura',checkAuthentication,(req,res)=>{
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

router.post('/consultasFactura',checkAuthentication,(req,res)=>{
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

router.post('/consecutivo',checkAuthentication,(req,res)=>{    
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

router.post('/getfac',checkAuthentication,(req,res)=>{
    const {con}=req.body;  
    db.collection("facturas")
    .where("consecutivo", "==", parseInt(con)).get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {
            valores.push(doc.data());         
        });       
        res.send(valores);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send({'valor':'error'});
    });
});

router.get('/prefactura',checkAuthentication,(req,res)=>{
    var entidades=[];
    db.collection("entidades").get()
    .then((snapshot) => {       
        snapshot.forEach((doc) => {
            entidades.push(doc.data());         
        });  
        db.collection("fac_orl").get()
        .then((snapshot) => {
            var prefacturas=[];
            snapshot.forEach((doc) => {
                if (doc.data().estado!='facturado') {
                    prefacturas.push({data:doc.data(),id:doc.id});    
                }                                  
            }); 
                
            res.render('facturacion/prefactura',{prefacturas,entidades});
        })      
    }) 
   
});

router.get('/fac_evento/:id',checkAuthentication,(req,res)=>{
    const {id}=req.params;
    var factura=[];
    var c=0;
    db.collection('facturas').orderBy('consecutivo','desc').limit(1).get()
    .then((snapshot) => {        
        snapshot.forEach(element => {
          c=element.data().consecutivo;
         });
         db.collection('fac_orl').doc(id).get()
        .then((snapshot) => { 
           factura.push(snapshot.data());   
           factura[0].consecutivo=c+1;
           factura[0].estado='facturado';
           factura[0].vencimiento=Vencimiento(30);
           factura[0].fecha=fechaActual();
           factura[0].item.c_diagnostico=factura[0].diag;
           console.log(factura);
         
           var washingtonRef = db.collection("fac_orl").doc(id);  
           return washingtonRef.update({
               estado:'facturado'
           })
               .then(function () {
                let docRef = db.collection('facturas').doc();
                docRef.set(factura[0])
                .then(function () {
                    res.redirect('/prefactura');
                })
                 
               })
         });
         
         
        
    });  
  
   
})


router.post('/prefactura',checkAuthentication,(req,res)=>{
    const { entidad, ini, fin } = req.body;
    var entidades = [];
    db.collection("entidades").get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                entidades.push(doc.data());
            });
            db.collection("fac_orl").where('eps.nit', '==', entidad).get()
                .then((snapshot) => {
                    var prefacturas = [];
                    snapshot.forEach((doc) => {
                        if (Betwen3(ini, fin, doc.data().pinicio)) {
                            if (doc.data().estado != 'facturado') {
                                prefacturas.push({data:doc.data(),id:id});
                            }
                        }
                    });
                    console.log(prefacturas);
                    res.render('facturacion/prefactura', { prefacturas,entidades });
                })
        })

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
   function Betwen3(f1,f2,fc) {
    fc=formatDate3(fc);
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

function formatDate3(fecha) {
    var mes = fecha.substr(0,2);
    var dia = fecha.substr(3,2);
    var ano = fecha.substr(6,4);
    return ano+'-'+mes+'-'+dia;

}
function Vencimiento(cant) {
    var diaActual = new Date();  
    vencimiento= new Date();
    vencimiento.setDate(diaActual.getDate()+cant); 
    var day = vencimiento.getDate();
    var month = vencimiento.getMonth() + 1;
    var year = vencimiento.getFullYear();
    if(parseInt(day)<10) day='0'+day;
    if(parseInt(month)<10) month='0'+month;
    vence = day + '/' + month + '/' + year ;
    return vence;
}

function fechaActual() {
    var diaActual = new Date();  
    var day = diaActual.getDate();
    var month = diaActual.getMonth() + 1;
    var year = diaActual.getFullYear();
    if(parseInt(day)<10) day='0'+day;
    if(parseInt(month)<10) month='0'+month;
    fecha = day + '/' + month + '/' + year ;
    return fecha;
}

module.exports = router;