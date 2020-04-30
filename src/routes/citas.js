const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db=admin.firestore();

router.get('/localidades',(req,res)=>{
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

router.get('/citas',(req,res)=>{
    db.collection('medicos').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {            
            valores.push(doc.data());            
        });       
        res.render('citas/index',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('citas/index');
    });  
});


router.post('/apartadas',(req,res)=>{
    const {cedula}=req.body;
    db.collection('citas').where('paciente.cedula','==',cedula).get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {   
            if (doc.data().estado=="") {
                valores.push({data:doc.data(),id:doc.id});
            }                    
        });       
        res.send(valores);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send(valores);
    });  
});

router.post('/addcitas',(req,res)=>{
    const {cita}=req.body;
    console.log(JSON.parse(cita));
    let docRef = db.collection('citas').doc();
    docRef.set(JSON.parse(cita));
    res.send('realizado');
});

router.post('/consultarcitas',(req,res)=>{
    const {fecha,medico}=req.body;  
    db.collection('citas').where('fecha','==',fecha).get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {
            if(doc.data().medico==medico){
                valores.push(doc.data());
            }                    
        });       
        res.send(valores)
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.send('{error:error}');
    });
});

router.get('/vercitas',(req,res)=>{
    diaActual = new Date();  
    var day = diaActual.getDate();
    var month = diaActual.getMonth() + 1;
    var year = diaActual.getFullYear();
    if(parseInt(day)<10) day='0'+day;
    if(parseInt(month)<10) month='0'+month;
    fecha = month + '/' + day + '/' + year ;

    db.collection('citas').orderBy('id','asc').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {
            if(doc.data().fecha==fecha){
                if(doc.data().estado !='atendido'){
                    valores.push({data:doc.data(),id:doc.id});  
                }                
            }
        });
        console.log(valores) 
        res.render('citas/consultas',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('citas/consultas');
    });
});

function formatDate(fecha) {
    var ano = fecha.substr(0,4);
    var mes = fecha.substr(5,2);
    var dia = fecha.substr(8,2);
    return mes+'/'+dia+'/'+ano;

}
router.post('/vercitasfiltro',(req,res)=>{
   const {medico,fecha}=req.body;
    console.log(formatDate(fecha));
    db.collection('citas').orderBy('id','asc').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) => {
            console.log(doc.data().fecha)
            if(doc.data().fecha == formatDate(fecha) && doc.data().medico==medico){
                if(doc.data().estado !='atendido'){
                    valores.push({data:doc.data(),id:doc.id});  
                }  
            }        
        });
        console.log(valores); 
        res.render('citas/consultas',{valores});
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.render('citas/consultas');
    });
});

router.post('/vercitaspaciente',(req,res)=>{
    const {cc}=req.body;   
     db.collection('citas').orderBy('id','asc').get()
     .then((snapshot) => {
         var valores=[];
         snapshot.forEach((doc) => {            
             if(doc.data().paciente.cedula == cc){
                if(doc.data().estado!='atendido'){
                    valores.push({data:doc.data(),id:doc.id});  
                } 
             }        
         });
         console.log(valores); 
         res.render('citas/consultas',{valores});
     })
     .catch((err) => {
         console.log('Error getting documents', err);
         res.render('citas/consultas');
     });
 });

router.post('/ensala/:id',(req,res)=>{
    const {id}=req.params; 
    const {copago,autorizacion}=req.body;   
    var washingtonRef = db.collection("citas").doc(id);
    const cita={
        copago:copago,
        autorizacion:autorizacion,        
        estado:'ensala'
    }  
    return washingtonRef.update(cita)
        .then(function () {
            res.redirect('/vercitas');
        })
        .catch(function (error) {           
            res.redirect('/vercitas');
        });
});

router.get('/borrarcita/:id',(req,res)=>{
    const {id}= req.params;   
    db.collection("citas").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
        res.redirect('/vercitas');
    })  
});


router.post('/borrarcita',(req,res)=>{
    const {id}=req.body;   
    db.collection("citas").doc(id).delete().then(function () {      
        res.send('1');
    })  
});

module.exports = router;