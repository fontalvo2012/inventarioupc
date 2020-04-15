const { Router } = require('express');
const router = Router();
var pdf = require('html-pdf');



function crearPdf() {
    var contenido = `
    <h1>Esto es un test de html-pdf</h1>
    <p>Estoy generando PDF a partir de este código HTML sencillo</p>
    `;
    pdf.create(contenido).toFile('./file/nombre.pdf', function(err, res) {
        if (err){
            console.log(err);
        } else {
            console.log(res);
        }
    });
}

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
    db.collection('hclinica').where('cedula','==',cc).get()
    .then((snapshot) => {
        snapshot.forEach(element => {
            hc.push({data:element.data(),id:element.id});
        }); 
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
       
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('hclinicas/index');
    });   
}) 


router.post('/crearhc',checkAuthentication,(req,res)=>{ 
    const {cedula,nombres,id,motivo,actual,clinico,plan,terapeutico,impdiag,ordenes}= req.body;
    var fisicoArray={
        nariz:req.body.nariz,
        boca:req.body.boca,
        orofaringe: req.body.orofaringe,
        laringoscopia:req.body.laringoscopia,
        cuello:req.body.cuello,
        oido:req.body.oido
    };

    var antecedentesArray={
        medicos:req.body.medicos,
        quirurgico:req.body.quirurgico,
        toxico:req.body.toxico,
        traumatico:req.body.traumatico,
        familiares:req.body.familiares,
        otros:req.body.otros
    };
    /**aQUI DEBES CREAR LA FACTURA TEMP. */ 
    var med=[];
    var ccmedico=req.user.medico;
    db.collection('citas').doc(id).get()
    .then((snapshot) => { 
           facturar(snapshot.data());     
    });
    
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
                t='CONTROL';
            }
            var num= snapshot.docs.length+1;      
            const consulta={ 
                codigo: 'HC-'+num,       
                cedula,
                nombres,
                id,
                motivo,
                actual,
                antecedentes:antecedentesArray,
                fisico:fisicoArray,
                clinico,
                plan,
                impdiag,
                ordenes,
                terapeutico,
                medico:med,
                tipo:t,
                fecha:fechaActual(),
                pinicio:fechaActual(),
                pfinal:fechaActual(),
            }
            // console.log(consulta);
            let docRef = db.collection('hclinica').doc();    
            docRef.set(consulta);
            finalizarConsulta(id);
            res.redirect('/consultashclinicas');  
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

router.get('/verhc',checkAuthentication,(req,res)=>{
    db.collection('hclinica').get()
    .then((snapshot) => {        
        var valores=[];        
        snapshot.forEach((doc) =>{  
            valores.push({data:doc.data(),id:doc.id});
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
function Vencimiento() {
    vencimiento= new Date();
    vencimiento.setDate(diaActual.getDate()+30); 
    var day = vencimiento.getDate();
    var month = vencimiento.getMonth() + 1;
    var year = vencimiento.getFullYear();
    if(parseInt(day)<10) day='0'+day;
    if(parseInt(month)<10) month='0'+month;
    vence = day + '/' + month + '/' + year ;
    return vence;
}

function facturar(cita) {
    var factura = {
        razon: 'CARLOS PARRA BUSINESS MEDICAL CENTER SAS',
        nit: '90098069-3',
        habilitacion: '1300102937',
        direccion: '',
        telefonos: '6552095-3023513182',
        email: 'gerencia@carlosparra.co',
        prefijo: 'CP',
        total:cita.item.valor,
        vencimiento:'',
        fecha:'',
        estado:'pendiente',
        pinicio:cita.fecha,
        pfinal:cita.fecha,
        consecutivo: '',
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
    let fb= db.collection('citas');
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