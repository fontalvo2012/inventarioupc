const { Router } = require('express');
const router = Router();
const Insumo=require('../model/insumos');
const Medicamentos=require('../model/medicamentos');
const Cie10=require('../model/cie10');
const Hclinicas =require('../model/hclinicas');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'citasorldelcaribe@gmail.com',
      pass: 'otorrinolaringologia2'
    }
  });
  
router.post('/mail',checkAuthentication,async(req,res)=>{
    const {contenido,mail}=req.body
   
    var mailOptions = {
        from: 'citasorldelcaribe@gmail.com',
        to: mail,
        subject: 'Historia Clinica',
        html: `<b>Descargar HC aqui: </b><a href="http://159.89.144.24:4400/imprimirhc2/${contenido}">HC</a><br>
               <b>Descargar ORDENES aqui: </b><a href="http://159.89.144.24:4400/orden2/${contenido}">ORDENES</a><br>
               <b>Descargar RECETA aqui: </b><a href="http://159.89.144.24:4400/receta2/${contenido}">RECETA</a><br>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('error',error);
          res.send('0');
        } else {
          console.log('Email sent: ' + info.response);
          res.send('1');
        }
      });
     
})
  

  
function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){        
        next();
    } else{
        res.redirect("/singIn");
    }
  }

router.get('/insumos',checkAuthentication, async(req, res) => {
   const insumos=await Insumo.find().lean(); 
   res.render('medicamentos/insumos',{insumos});
});

router.post('/insumos',checkAuthentication, async(req, res) => {
    const {nombre,valor}=req.body;
    const num = await Insumo.find();    
    const insumo= new Insumo({codigo:num.length,nombre,valor});
    await insumo.save();    
    res.redirect('/insumos');
 });

 router.post('/completeInsumos',checkAuthentication,async(req,res)=>{
     const i=await Insumo.find();
     var insumo=[];
     i.forEach(element => {
         insumo.push(element.nombre);
     });
     res.send(insumo);
 })
 router.post('/medicamentos',checkAuthentication,async(req,res)=>{
    const {nombre,presentacion,tipo}= req.body;
    const codigo=await Medicamentos.find();
    const medicamentos = new Medicamentos({codigo:codigo.length,nombre,presentacion,tipo});
    await medicamentos.save();
    res.redirect('/medicamentos');
 })

 router.post('/addmedicamentos',checkAuthentication,async(req,res)=>{
    const {nombre,uso}= req.body;
    const codigo=await Medicamentos.find();
    const m=await Medicamentos.findOne({nombre:nombre.trim()});
    if(m){
        res.send('El medicamento existe');
    }else{
        const medicamentos = new Medicamentos({codigo:codigo.length,nombre:nombre.trim(),uso});
        await medicamentos.save();
        res.send('Ingresado');
    } 
 })

 router.post('/ajaxUso',checkAuthentication,async(req,res)=>{
     const arrayUso=[];
     const {nombre}=req.body;
     const usos= await Hclinicas.find({'receta.medicamento':nombre}).sort('receta.medicamento');
     if(usos){
        usos.forEach(element => {
             for (let index = 0; index < element.receta.length; index++) {               
                if(element.receta[index].medicamento.trim() == nombre.trim()){
                    console.log(element.receta[index].uso);
                    arrayUso.push(element.receta[index].uso);
                } 
             }
         });
     }
    
     res.send(arrayUso)
 })
 router.post('/medicamentosAjax',checkAuthentication,async(req,res)=>{
    const {nombre,presentacion,tipo,codigo}= req.body;   
    const medicamentos = new Medicamentos({codigo,nombre,presentacion,tipo});
    await medicamentos.save();
    res.send('agreado:'+nombre);
 })
 router.get('/medicamentos',checkAuthentication,async(req,res)=>{
     const medicamentos= await Medicamentos.find().lean();
     res.render('medicamentos/medicamentos',{medicamentos});
})

router.get('/parametros',checkAuthentication,async(req,res)=>{   
    res.render('medicamentos/parametros');
})

router.post('/medicamentosArray',checkAuthentication,async(req,res)=>{
    const medicamentos= await Medicamentos.find().sort('nombre').lean();
    const medicamentoAr=[];
    medicamentos.forEach(element => {
        medicamentoAr.push(element.nombre);
    });
    res.send(medicamentoAr);
})

router.post('/addCie10',checkAuthentication,async(req,res)=>{
   const {codigo,nombre,tipo,capitulo}=req.body;
   const cie=new Cie10({codigo,nombre,tipo,capitulo});   
   await cie.save();
   res.send('creado: '+codigo);
})

router.post('/delCie10',checkAuthentication,async(req,res)=>{
    const {codigo}=req.body;     
    await Cie10.remove({codigo:codigo});
    res.send('Eliminado: '+codigo);
 })

router.post('/addCie10Complete',checkAuthentication,async(req,res)=>{
    const cieArray=[];
    const  cie10=await Cie10.find();
    cie10.forEach(element => {
        cieArray.push(element.codigo+' :: '+element.nombre);
    });
     res.send(cieArray);
 })

 router.post('/Cie10Ajax',checkAuthentication,async(req,res)=>{
    const {codigo}=req.body;
    const c =await Cie10.findOne({codigo:codigo});
    if (c) {
        res.send('si');
    }else{
        res.send('no');
    }
    
 })
 router.get('/firma',checkAuthentication,async(req,res)=>{   
    res.render('hclinicas/firma')
 })

module.exports = router;