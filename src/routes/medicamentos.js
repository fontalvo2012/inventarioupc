const { Router } = require('express');
const router = Router();
const Insumo=require('../model/insumos');
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

module.exports = router;