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

router.get('/hclinicas/:id',checkAuthentication,(req,res)=>{ 
    const {id} = req.params;
   
    db.collection('citas').get()
    .then((snapshot) => {
        console.log(snapshot.docs.length)
        var valores=[];        
        snapshot.forEach((doc) =>{            
            if(doc.id==id){
                valores.push({data:doc.data(),id:doc.id});
            }
        });         
        res.render('hclinicas/index',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('hclinicas/index');
    });   
}) 


router.post('/crearhc',checkAuthentication,(req,res)=>{ 
    const {cedula,nombres,id,motivo,actual,antecedentes,fisico,clinico,plan,terapeutico}= req.body;
    /**aQUI DEBES CREAR LA FACTURA TEMP. */ 

    db.collection('citas').doc(id).get()
    .then((snapshot) => { 
           facturar(snapshot.data());     
    })
    .catch((err) => {
        console.log('Error getting documents', err);       
    }); 

    
    db.collection('hclinica').get()
    .then((snapshot) => {  
        var num= snapshot.docs.length+1;      
        const consulta={ 
            codigo:'HC'+num,       
            cedula,
            nombres,
            id,
            motivo,
            actual,
            antecedentes,
            fisico,
            clinico,
            plan,
            terapeutico,
            fecha:fechaActual(),
            pinicio:fechaActual(),
            pfinal:fechaActual(),
        }
    
        let docRef = db.collection('hclinica').doc();    
        docRef.set(consulta);
        finalizarConsulta(id);
        res.redirect('/consultashclinicas');  
    })
    .catch((err) => {
        console.log('Error getting documents', err);   
        res.redirect('/consultashclinicas');     
    }); 

  
});

function crearConsulta(cod) {

    
}

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

      console.log(factura);
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