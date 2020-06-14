const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db = admin.firestore();

const Empresa = require('../model/empresas');
const Hclincia = require('../model/hclinicas');
const Factura = require('../model/facturas');
const Medico = require('../model/medicos');
const Procedimiento = require('../model/procedimientos');
const Cita = require('../model/citas');
const Entidad = require('../model/entidad');
const Paciente = require('../model/pacientes');


function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/singIn");
    }
}

router.get('/hclinicas/:id/:cc', checkAuthentication, async (req, res) => {
    const { id, cc } = req.params;
    const hc = await Hclincia.find({ cedula: cc }).lean();
    const valores = await Cita.find({_id:id}).lean();
    res.render('hclinicas/index', { valores, hc });
});

router.get('/consultashclinicas', checkAuthentication, async(req, res) => {
    const citas= await Cita.find({estado:'ensala','item.tipo':'c',medico:req.user.medico}).lean();
    console.log(req.user.medico)
    res.render('hclinicas/consultas',{citas});
});
router.get('/cancelar/:id', checkAuthentication, async(req, res) => {
    const {id}=req.params;
    await Cita.updateOne({_id:id},
        {
        estado:''      
    }); 
    res.redirect('/consultashclinicas');
});
router.get('/procedimientoshclinicas', checkAuthentication, async(req, res) => {   
    const entidades= await Entidad.find().lean();
    const medicos= await Medico.find().lean();
    res.render('hclinicas/procedimientos',{entidades,medicos});
});

router.post('/crearhc', checkAuthentication, async (req, res) => {
    const { cedula, nombres, id, motivo, actual, clinico, plan, impdiag, ordenes, dg, recetaJson } = req.body;

    var fisico = {
        nariz: req.body.nariz,
        boca: req.body.boca,
        orofaringe: req.body.orofaringe,
        laringoscopia: req.body.laringoscopia,
        cuello: req.body.cuello,
        oidoderecho: req.body.oidoderecho,
        oidoIzquierdo: req.body.oidoIzquierdo,
        otrosfisico: req.body.otrosfisico
    };

    var antecedentes = {
        medicos: req.body.medicos,
        quirurgico: req.body.quirurgico,
        toxico: req.body.toxico,
        traumatico: req.body.traumatico,
        familiares: req.body.familiares,
        otros: req.body.otros
    };
    var impDiagnostico = {
        impdiag: impdiag,
        diag: dg.substr(0, 4),
        nombre: dg.substr(6, (dg.length) - 6)//probar
    }
    var ccmedico = req.user.medico; 
    const medico = await Medico.findOne({ cedula: ccmedico });
    const cita = await Cita.findOne({_id:id});
    var cups=cita.item.cups;
    var nombrecups = cita.item.nombre;
    var codigo = 'HC-' + (((await Hclincia.find()).length) + 1);
    var diagnostico = dg.substr(0, 4);    
    var receta =[];
    if(recetaJson==''){
        receta=[];        
    }else{
        receta= JSON.parse(recetaJson);
    }
    var fecha = fechaActual();
    var pinicio = fechaActual();
    var pfinal = fechaActual();
    var tipo = 'HC';
    if (await Hclincia.findOne({ cedula: cedula })) {
        tipo = '';
    }
    var o=[];
    if(ordenes!=""){
        o=JSON.parse(ordenes);
    }
    const newhclinica = new Hclincia({ codigo, cedula, nombres, id, cups, diagnostico, nombrecups, motivo, actual, antecedentes, fisico, clinico, plan, impDiagnostico, ordenes:o, receta, medico, tipo, fecha, pinicio, pfinal, cita });
    await newhclinica.save();
    const hc = Hclincia.findOne({ codigo: codigo });    
    const newFactura = new Factura({ codigo: 0, hc: cita, anexo: {}, estado: 'PREFACTURA', descripcion: 'FATURACION DE PACIENTES ATENDIDOS EN PROCEDIMIENTOS Y CONSULTAS' });     
    await Cita.findByIdAndUpdate(id,{estado:'atendido'});    
    await newFactura.save();
    res.redirect(`/verhc/${cedula}`);
  });

router.post('/colocarhc', checkAuthentication, async (req, res) => {
    const { codigo } = req.body;
    const hc = await Hclincia.findById(codigo);
    res.send(hc)
})


router.get('/imprimirhc/:codigo',async (req, res) => {
    const { codigo } = req.params;
    const valores = await Hclincia.findOne({ codigo: codigo }).lean();
    console.log(valores);
    const cita = valores.cita[0];
    const fisico = valores.fisico[0];
    const antecedentes = valores.antecedentes[0];
    const impdiag = valores.impDiagnostico[0];
    const medico = valores.medico[0];
    res.render('hclinicas/imprimir', { valores, cita, fisico, impdiag, medico, antecedentes });
});

router.get('/imprimirhc2/:codigo',async (req, res) => {
    const { codigo } = req.params;       
    const valores = await Hclincia.findOne({ _id: codigo }).lean();
    console.log(valores);
    const cita = valores.cita[0];
    const fisico = valores.fisico[0];
    const antecedentes = valores.antecedentes[0];
    const impdiag = valores.impDiagnostico[0];
    const medico = valores.medico[0];
    res.render('hclinicas/imprimir', { valores, cita, fisico, impdiag, medico, antecedentes });
});

router.get('/receta2/:codigo', async (req, res) => {
    const { codigo } = req.params;
    const hc = await Hclincia.findOne({ _id: codigo }).lean();
    const cita = hc.cita[0];
    const receta = hc.receta;
    const medico = hc.medico[0];
    res.render('hclinicas/receta', { hc, receta, cita, medico });
});
router.get('/orden2/:codigo', async (req, res) => {
    const { codigo } = req.params;
    const hc = await Hclincia.findOne({ _id: codigo }).lean();
    const cita = hc.cita[0];
    const receta = hc.receta;
    const medico = hc.medico[0];
    const ordenes = hc.ordenes;
    res.render('hclinicas/verOrdenes', { hc, ordenes,receta, cita, medico });
});
router.get('/receta/:codigo', async (req, res) => {
    const { codigo } = req.params;
    const hc = await Hclincia.findOne({ codigo: codigo }).lean();
    const cita = hc.cita[0];
    const receta = hc.receta;
    const medico = hc.medico[0];
    res.render('hclinicas/receta', { hc, receta, cita, medico });
});

router.get('/orden/:codigo', async (req, res) => {
    const { codigo } = req.params;
    const hc = await Hclincia.findOne({ codigo: codigo }).lean();
    const cita = hc.cita[0];
    const receta = hc.receta;
    const medico = hc.medico[0];
    const ordenes = hc.ordenes;
    res.render('hclinicas/verOrdenes', { hc, ordenes,receta, cita, medico });
});

router.get('/verhc/:cedula', checkAuthentication, async (req, res) => {
    const { cedula } = req.params;
    const valores = await Hclincia.find({ cedula: cedula }).lean();
    const paciente = await Paciente.findOne({ cedula: cedula });
    const email=paciente.email;
    res.render('hclinicas/verhc', { valores,email });
})

function fechaActual() {
    diaActual = new Date();
    var day = diaActual.getDate();
    var month = diaActual.getMonth() + 1;
    var year = diaActual.getFullYear();
    if (parseInt(day) < 10) day = '0' + day;
    if (parseInt(month) < 10) month = '0' + month;
    fecha = day + '/' + month + '/' + year;
    return fecha;
}

// FUNCION UPLOAD =>

router.get('/hcprocedimientos',checkAuthentication,async(req,res)=>{
    res.render('hclinicas/hcprocedimiento');
})

router.post('/hcprocedimientos',checkAuthentication,async(req,res)=>{
    const {imagen,codigo} = req.body;
    console.log(JSON.parse(imagen));
    const proced= new Procedimiento({imagen:JSON.parse(imagen),codigo});
    await proced.save();
    res.render('hclinicas/hcprocedimiento');
})
router.get('/verprocedimientos',async(req,res)=>{
    res.render('hclinicas/verprocedimientos');
})

router.post('/verimagen',async(req,res)=>{
    const {codigo} =req.body;
    const p= await Procedimiento.findOne({codigo:codigo});
    res.send(p);
})
//FUNCION UPLOAD <=

module.exports = router; 