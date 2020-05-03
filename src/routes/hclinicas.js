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

router.get('/hclinicas/:id/:cc',checkAuthentication,(req,res)=>{ 
    const {id,cc} = req.params;
    var hc=[];
    db.collection('hclinica').orderBy('codigo','desc').get()
    .then((snapshot) => {
        snapshot.forEach(element => {
            if(element.data().cedula==cc){
                hc.push({data:element.data(),id:element.id});
            }
           
        }); 
        db.collection('citas').get()
        .then((snapshot) => {
            console.log(snapshot.docs.length)
            var valores=[];        
            snapshot.forEach((doc) =>{            
                if(doc.id==id){
                    valores.push({data:doc.data(),id:doc.id});
                }
            });         
            res.render('hclinicas/index',{valores,hc});
           
        });
    });  
}) 

router.post('/crearhc',checkAuthentication,(req,res)=>{ 
    const {cedula,nombres,id,motivo,actual,clinico,plan,impdiag,ordenes,dg,recetaJson}= req.body;
    console.log(req.body);
    var fisicoArray={
        nariz:req.body.nariz,
        boca:req.body.boca,
        orofaringe: req.body.orofaringe,
        laringoscopia:req.body.laringoscopia,
        cuello:req.body.cuello,
        oido:req.body.oido,
        otrosfisico:req.body.otrosfisico
    };

    var antecedentesArray={
        medicos:req.body.medicos,
        quirurgico:req.body.quirurgico,
        toxico:req.body.toxico,
        traumatico:req.body.traumatico,
        familiares:req.body.familiares,
        otros:req.body.otros
    };

    var impDiagnostico={
        impdiag:impdiag,
        diag:dg.substr(0,4),
        nombre:dg.substr(6,(dg.length)-6)//probar
    }
    
    var med=[];
    var ccmedico=req.user.medico;
    var cups='';
    var nombrecups='';

    db.collection('citas').doc(id).get()
    .then((snapshot) => { 
            var cita=snapshot.data();
            var diagnos=dg.substr(0,4);  
            var empresa=[];
           cups=snapshot.data().item.cups;     
           nombrecups=snapshot.data().item.nombre;

        db.collection('empresa').get()
            .then((snapshot) => {
                snapshot.forEach(element => {
                    empresa.push(element.data());
                });
                facturar(cita,diagnos,empresa[0]);
                db.collection('medicos').where('cedula','==',ccmedico).get()
                .then((snapshot) => { 
                    snapshot.forEach(element => {
                        med=element.data();
                    });
            
                    db.collection('hclinica').get()
                    .then((snapshot) => { 
                        var cont=0; 
                        var t ='HC';
                        snapshot.forEach(element => {
                            if (element.data().cedula==cedula) {
                                cont++;
                            }
                        });
                        if (cont > 0) {
                            t='';
                        }
                        var num= snapshot.docs.length+1;      
                        const consulta={ 
                            codigo: 'HC-'+num,       
                            cedula,
                            nombres,
                            id,
                            cups,
                            diagnostico:dg.substr(0,4),
                            nombrecups,
                            motivo,
                            actual,
                            antecedentes:antecedentesArray,
                            fisico:fisicoArray,
                            clinico,
                            plan,
                            impdiag:impDiagnostico,
                            ordenes,
                            receta:JSON.parse(recetaJson),                            
                            medico:med,
                            tipo:t,
                            fecha:fechaActual(),
                            pinicio:fechaActual(),
                            pfinal:fechaActual(),
                        }            
                        let docRef = db.collection('hclinica').doc();    
                        docRef.set(consulta);
                        finalizarConsulta(id);
                        res.redirect(`/verhc/${cedula}`);  
                    });
                    
                }); 
            });   
    });
    
 
});

router.post('/colocarhc',checkAuthentication,(req,res)=>{
    const {codigo}=req.body;
    db.collection('hclinica').doc(codigo).get()
    .then((snapshot) => { 
          res.send(snapshot.data());
    })
    .catch((err) => {
        console.log('Error getting documents', err);       
    }); 
})

router.get('/imprimirhc/:codigo/:cita',checkAuthentication,(req,res)=>{
    const {codigo,cita} = req.params;
    var hc=[];
    var ct=[];
    var valores=[];    
   
    db.collection('hclinica').doc(codigo).get()
    .then((snapshot) => {        
        hc=snapshot.data(); 
        db.collection('citas').doc(cita).get()
        .then((snapshot) => { 
             ct=snapshot.data();  
             valores.push({cita:ct,historia:hc});
             console.log(valores);
             res.render('hclinicas/imprimir',{valores});       
        });         
    });
});

router.get('/receta/:codigo/:cita',checkAuthentication,(req,res)=>{
    const {codigo,cita} = req.params;
    var hc=[];
    var ct=[];
    var valores=[];    
   
    db.collection('hclinica').doc(codigo).get()
    .then((snapshot) => {        
        hc=snapshot.data(); 
        db.collection('citas').doc(cita).get()
        .then((snapshot) => { 
             ct=snapshot.data();  
             valores.push({cita:ct,historia:hc});
             console.log(valores);
             res.render('hclinicas/receta',{valores});       
        });         
    });
});

router.get('/orden/:codigo/:cita',checkAuthentication,(req,res)=>{
    const {codigo,cita} = req.params;
    var hc=[];
    var ct=[];
    var valores=[];    
   
    db.collection('hclinica').doc(codigo).get()
    .then((snapshot) => {        
        hc=snapshot.data(); 
        db.collection('citas').doc(cita).get()
        .then((snapshot) => { 
             ct=snapshot.data();  
             valores.push({cita:ct,historia:hc});
             console.log(valores);
             res.render('hclinicas/ordenes',{valores});       
        });         
    });
});

router.get('/verhc/:cedula',checkAuthentication,(req,res)=>{
    const {cedula} = req.params;
    db.collection('hclinica').orderBy('codigo','desc').get()
    .then((snapshot) => {        
        var valores=[];        
        snapshot.forEach((doc) =>{ 
            if (doc.data().cedula==cedula) {
                valores.push({data:doc.data(),id:doc.id});
            } 
           
        });
        res.render('hclinicas/verhc',{valores});       
    })
})

function fechaActual() {
    diaActual = new Date();  
    var day = diaActual.getDate();
    var month = diaActual.getMonth() + 1;
    var year = diaActual.getFullYear();
    if(parseInt(day)<10) day='0'+day;
    if(parseInt(month)<10) month='0'+month;
    fecha = day + '/' + month + '/' + year ;
    return fecha;
}



function facturar(cita,diag,empresa) {     
         var factura = {
            razon: empresa.rsocial,
            nit: empresa.nit,
            habilitacion: empresa.habilitacion,
            direccion: empresa.direccion,
            diag,
            copago:cita.copago,
            telefonos: empresa.telefono,
            email: empresa.email,
            prefijo: empresa.prefijo,
            total:cita.item.valor,
            vencimiento:'',
            fecha:'',
            estado:'pendiente',
            pinicio:cita.fecha,
            pfinal:cita.fecha,
            consecutivo: '',
            anexo:[],
            paciente: cita.paciente,
            eps: cita.entidad,
            item: cita.item
          }
          let docRef = db.collection('fac_orl').doc();    
          docRef.set(factura);
      
   
}

router.get('/consultashclinicas',checkAuthentication,(req,res)=>{ 
    db.collection('citas').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) =>{              
            if(doc.data().medico==req.user.medico){
                if (doc.data().estado=='ensala') {
                    valores.push({data:doc.data(),id:doc.id});
                }               
            }             
        });
        var cadena =JSON.stringify(valores);
        res.render('hclinicas/consultas',{cadena});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('hclinicas/consultas');
    });   
})

function finalizarConsulta(id) {
    var washingtonRef = db.collection("citas").doc(id);  
    return washingtonRef.update({
        estado:'atendido'
    })
        .then(function () {
            console.log('actualizado')
        })
        .catch(function (error) {           
           console.log('error')
        });
}

router.get('/cons',(req,res)=>{ 
    let contenido=[{msg:'error'}];
    let fb= db.collection('citas');ver
    let query= fb.where('estado','==','ensala').get()
    .then((snapshot)=>{     
        snapshot.forEach(element => { 
               contenido.push(element.data());
            });
        }
    );
});

async function citas() {
    let contenido=[{msg:'error'}];
    let fb= db.collection('citas')   
    let query= await fb.where('estado','==','ensala').get()
    .then((snapshot)=>{     
        snapshot.forEach(element => {
               contenido.push(element.data());
            });
        }
    ); 
    return contenido;
}


module.exports = router;