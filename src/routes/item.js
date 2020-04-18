const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db = admin.firestore();

router.post('/ajaxitems2', (req, res) => {
    const { id,entidad } = req.body;
    db.collection('items').get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
                if (doc.data().cups == id && doc.data().entidad==entidad) {
                    valores.push({
                        id: doc.id,
                        cups: doc.data().cups,
                        valor: doc.data().valor,
                        nombre: doc.data().nombre,
                        entidad: doc.data().entidad,
                        f_consulta:doc.data().f_consulta,
                        c_externa: doc.data().c_externa,
                        c_diagnostico:doc.data().c_diagnostico,
                        c_diagnostico2: doc.data().c_diagnostico2,
                        c_diagnostico3: doc.data().c_diagnostico3,
                        t_diagnostico: doc.data().t_diagnostico,
                        copago: doc.data().copago,
                        ambito: doc.data().ambito,
                        f_procedimiento: doc.data().f_procedimiento,
                        atiende: doc.data().atiende,
                        complicacion:doc.data().complicacion,
                        a_quirurgico:doc.data().a_quirurgico,
                        autorizacion:doc.data().autorizacion,
                        tipo:doc.data().tipo
                    });
                }
            });
            res.send(valores);
        })
        .catch((err) => {
            console.log('Error getting documents', err);
            res.send({ 'valor': 'error' });
        });
});
router.post('/ajaxitems', (req, res) => {
    const { id } = req.body;
    db.collection('items').get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
                if (doc.id == id) {
                    valores.push({
                        id: doc.id,
                        cups: doc.data().cups,
                        valor: doc.data().valor,
                        nombre: doc.data().nombre,
                        entidad: doc.data().entidad,
                        f_consulta:doc.data().f_consulta,
                        c_externa: doc.data().c_externa,
                        c_diagnostico:doc.data().c_diagnostico,
                        c_diagnostico2: doc.data().c_diagnostico2,
                        c_diagnostico3: doc.data().c_diagnostico3,
                        t_diagnostico: doc.data().t_diagnostico,
                        copago: doc.data().copago,
                        ambito: doc.data().ambito,
                        f_procedimiento: doc.data().f_procedimiento,
                        atiende: doc.data().atiende,
                        complicacion:doc.data().complicacion,
                        a_quirurgico:doc.data().a_quirurgico,
                        autorizacion:doc.data().autorizacion,
                        tipo:doc.data().tipo
                    });
                }
            });
            res.send(valores);
        })
        .catch((err) => {
            console.log('Error getting documents', err);
            res.send({ 'valor': 'error' });
        });
});

router.post('/itemcups', (req, res) => {
    const { entidad } = req.body;
    db.collection('items').orderBy('nombre','asc').get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
               if (doc.data().entidad==entidad) {
                valores.push({
                    id: doc.id,
                    cups: doc.data().cups,
                    valor: doc.data().valor,
                    nombre: doc.data().nombre,
                    entidad: doc.data().entidad,
                    f_consulta:doc.data().f_consulta,
                    c_externa: doc.data().c_externa,
                    c_diagnostico:doc.data().c_diagnostico,
                    c_diagnostico2: doc.data().c_diagnostico2,
                    c_diagnostico3: doc.data().c_diagnostico3,
                    t_diagnostico: doc.data().t_diagnostico,
                    copago: doc.data().copago,
                    ambito: doc.data().ambito,
                    f_procedimiento: doc.data().f_procedimiento,
                    atiende: doc.data().atiende,
                    complicacion:doc.data().complicacion,
                    a_quirurgico:doc.data().a_quirurgico,
                    autorizacion:doc.data().autorizacion,
                    tipo:doc.data().tipo
                });
               }
            });
            res.send(valores);
        })
        .catch((err) => {
            console.log('Error getting documents', err);
            res.send({ 'valor': 'error' });
        });
});

router.get('/item', (req, res) => {
    db.collection('items').get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
                valores.push({ id: doc.id, cups: doc.data().cups, valor: doc.data().valor, nombre: doc.data().nombre, entidad: doc.data().entidad });
            });
            res.render('item/index', { valores });
        })
        .catch((err) => {
            console.log('Error getting documents', err);
            res.render('item/index');
        });
});

router.post('/items', (req, res) => {
    const { cups,tipo, nombre, valor, entidad, id, t_diagnostico, finalidad, copago, ambito, atiende, complicacion, a_quirurgico } = req.body;
    let docRef = db.collection('items').doc();
    let setAda = docRef.set({
        cups: cups,
        nombre: nombre,
        valor: valor,
        entidad: entidad,
        f_consulta: 10,
        c_externa: 15,
        c_diagnostico: '',
        c_diagnostico2: '',
        c_diagnostico3: '',
        t_diagnostico: t_diagnostico,
        copago: parseInt(copago),
        ambito: ambito,
        f_procedimiento: finalidad,
        atiende: atiende,
        complicacion: complicacion,
        a_quirurgico: a_quirurgico,
        autorizacion:'',
        tipo:tipo
    });
    res.redirect('/item');
});

router.get('/delitems/:id', (req, res) => {
    const { id } = req.params;
    db.collection("items").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
        res.redirect('/item');
    }).catch(function (error) {
        console.error("Error removing document: ", error);
        res.redirect('/item');
    });
});

router.post('/actualizarmedico', (req, res) => {
    const { nombres, email, registro, telefono, id } = req.body;
    var washingtonRef = db.collection("medicos").doc(id);

    return washingtonRef.update({
        nombres: nombres,
        email: email,
        registro: registro,
        telefono: telefono
    })
        .then(function () {
            res.send('Actualizado Correctamente');
        })
        .catch(function (error) {
            res.redirect('Error en Actualizar');
        });
});

router.post('/tarifas',(req,res)=>{
    const {item} =req.body;
    let docRef = db.collection('items').doc();    
    docRef.set(JSON.parse(item));
    res.send('tarifa creada');
});

router.get('/tarifas',(req,res)=>{
    db.collection('entidades').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) =>{              
           valores.push(doc.data());                       
        });      
        res.render('item/tarifas',{valores});
    })
   
});

router.post('/consultartarifas',(req,res)=>{
    const {entidad} = req.body;
    db.collection('items').orderBy('nombre','asc').get()
    .then((snapshot) => {
        var valores=[];
        snapshot.forEach((doc) =>{              
           if (doc.data().entidad==entidad) {
            valores.push({data:doc.data(),id:doc.id}); 
           }                      
        });      
        res.send(valores);
    })
   
});

router.post('/borraritem/:id',(req,res)=>{
    const {id}= req.body;   
    db.collection("items").doc(id).delete().then(function(){
        console.log("Document successfully deleted!");
        res.send('eliminado');
    });
});


module.exports = router;