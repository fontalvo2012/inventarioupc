const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db=admin.firestore();

const Empresa=require('../model/empresas');
const Hclincia=require('../model/hclinicas');
const Factura=require('../model/facturas');


function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){        
        next();
    } else{
        res.redirect("/singIn");
    }
  }

router.get('/hclinicas/:id/:cc',checkAuthentication,async(req,res)=>{ 
    const {id,cc} = req.params;   
    const hc=await Hclincia.find({cedula:cc}).lean();
        db.collection('citas').get()
        .then((snapshot) => {          
            var valores=[];        
            snapshot.forEach((doc) =>{            
                if(doc.id==id){
                    valores.push({data:doc.data(),id:doc.id});
                }
            });         
            res.render('hclinicas/index',{valores,hc});
           
        });
      
}) 

router.post('/crearhc',checkAuthentication,async(req,res)=>{ 
    const {cedula,nombres,id,motivo,actual,clinico,plan,impdiag,ordenes,dg,recetaJson}= req.body;    
    var fisico={
        nariz:req.body.nariz,
        boca:req.body.boca,
        orofaringe: req.body.orofaringe,
        laringoscopia:req.body.laringoscopia,
        cuello:req.body.cuello,
        oido:req.body.oido,
        otrosfisico:req.body.otrosfisico
    };

    var antecedentes={
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

    var medico=[];
    // var cita=[];
    var ccmedico=req.user.medico;
    var cups='';
    var nombrecups='';
    const  empresa=Empresa.findOne().lean();//PENDIENTE
    

    db.collection('citas').doc(id).get()
    .then((snapshot) => {            
            cita=snapshot.data();
            cups=snapshot.data().item.cups;     
            nombrecups=snapshot.data().item.nombre;

                db.collection('medicos').where('cedula','==',ccmedico).get()
                .then(async(snapshot) => { 
                    snapshot.forEach(element => {
                        medico=element.data();
                    });

                        var codigo='HC-'+(((await Hclincia.find()).length)+1);
                        var diagnostico=dg.substr(0,4);
                        var receta=JSON.parse(recetaJson);
                        var fecha=fechaActual();
                        var pinicio=fechaActual();
                        var pfinal=fechaActual();
                        var tipo ='HC';
                        if (await Hclincia.findOne({cedula:cedula})) {
                            tipo='';
                        }                        

                        
                        const newhclinica= new Hclincia({codigo,cedula,nombres,id,cups,diagnostico,nombrecups,motivo,actual,antecedentes,fisico,clinico,plan,impDiagnostico,ordenes,receta,medico,tipo,fecha,pinicio,pfinal,cita});                                            
                        await newhclinica.save();    
                        const hc=Hclincia.findOne({codigo:codigo});
                        console.log(cita);
                        const newFactura= new Factura({codigo:0,hc:cita,anexo:{},estado:'PREFACTURA'});                                          
                        await newFactura.save();
                        finalizarConsulta(id);
                        res.redirect(`/verhc/${cedula}`);                  
                    
                }); 
              
    });
    
 
});

router.post('/colocarhc',checkAuthentication,async(req,res)=>{
    const {codigo}=req.body;
    const hc=await Hclincia.findById(codigo);
    res.send(hc)
})


router.get('/imprimirhc/:codigo',checkAuthentication,async(req,res)=>{
    const {codigo} = req.params;    
    const valores=await Hclincia.findOne({codigo:codigo}).lean();
    console.log(valores);
    const cita=valores.cita[0];
    const fisico=valores.fisico[0];
    const antecedentes=valores.antecedentes[0];
    const impdiag = valores.impDiagnostico[0];
    const medico = valores.medico[0];
    res.render('hclinicas/imprimir',{valores,cita,fisico,impdiag,medico,antecedentes}); 
});

router.get('/receta/:codigo',checkAuthentication,async(req,res)=>{
    const {codigo} = req.params;  
    const hc=await Hclincia.findOne({codigo:codigo}).lean();
    const cita=hc.cita[0];
    const receta=hc.receta;
    const medico = hc.medico[0];
    res.render('hclinicas/receta',{hc,receta,cita,medico}); 
});

router.get('/orden/:codigo',checkAuthentication,async(req,res)=>{
    const {codigo} = req.params;  
    const hc=await Hclincia.findOne({codigo:codigo}).lean();
    const cita=hc.cita[0];
    const receta=hc.receta;
    const medico = hc.medico[0];
    res.render('hclinicas/ordenes',{hc,receta,cita,medico}); 
});

router.get('/verhc/:cedula',checkAuthentication,async(req,res)=>{
    const {cedula} = req.params;
    const valores=await Hclincia.find({cedula:cedula}).lean();    
    res.render('hclinicas/verhc',{valores});
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
    res.render('hclinicas/consultas');   
})

function finalizarConsulta(id) {
    var washingtonRef = db.collection("citas").doc(id);  
    return washingtonRef.update({
        estado:'atendido'
    })
        .then(function () {
            console.log('actualizado')
        })
       
}




module.exports = router;