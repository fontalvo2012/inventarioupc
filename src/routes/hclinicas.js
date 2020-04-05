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
        var valores=[];
        var paciente=[];
        snapshot.forEach((doc) =>{            
            if(doc.id==id){              
                paciente.push(doc.data().paciente)
                valores.push({data:doc.data(),id:doc.id});
            }
        }); 
        
        res.render('hclinicas/index',{valores,paciente});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('hclinicas/index');
    });   
}) 


router.post('/crearhc',checkAuthentication,(req,res)=>{ 

    diaActual = new Date();  
    var day = diaActual.getDate();
    var month = diaActual.getMonth() + 1;
    var year = diaActual.getFullYear();
    if(parseInt(day)<10) day='0'+day;
    if(parseInt(month)<10) month='0'+month;
    fecha = day + '/' + month + '/' + year ;
  
    vencimiento= new Date();
    vencimiento.setDate(diaActual.getDate()+30); 
    var day = vencimiento.getDate();
    var month = vencimiento.getMonth() + 1;
    var year = vencimiento.getFullYear();
    if(parseInt(day)<10) day='0'+day;
    if(parseInt(month)<10) month='0'+month;
    vence = day + '/' + month + '/' + year ;

    const {cedula,nombres,id,motivo,actual,antecedentes,fisico,clinico,plan,terapeutico}= req.body;
    const consulta={
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
        fecha:fecha,
        pinicio:fecha,
        pfinal:fecha,
    }
    console.log(consulta)
    res.redirect('/consultashclinicas');
});

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
        res.render('hclinicas/consultas',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('hclinicas/consultas');
    });   
})

module.exports = router;