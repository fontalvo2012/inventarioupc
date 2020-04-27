const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db = admin.firestore();
const fs = require('fs');

const resultado = '';

router.get('/inicial', (req, res) => {
    let docRef = db.collection('carlosparra').doc();
    let setAda = docRef.set({
        nit: '111',
        rzocial: 'carlos parra',
        habilitacion: '130000012',
        direccion: '',
        telfonos: '',
        web: '',
        email: '',
        resolfac: ''
    });
    res.redirect('/');
});

router.get('/rips', (req, res) => {
    var entidad=[]
    db.collection("entidades").get()
    .then((snapshot)=>{
        snapshot.forEach(element => {
            entidad.push(element.data());
        });
        db.collection("rips")
        .orderBy("consecutivo", "desc").limit(1).get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
                valores.push(doc.data());
            });          
            
            var datos=[{
                consecutivo:valores[0].consecutivo,
                nombre:conseRit(valores[0].consecutivo)                
            }];
            console.log(datos);
            res.render('facturacion/rips', { datos,entidad });
        })
    })
 
        

});
router.post('/rips', async(req, res) => {
    const { nombre, consecutivo, finicio, ffinal,entidad } = req.body;
    const c = parseInt(consecutivo) + 1;
    var f = new Date();
    fechaA = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    var valores = [];
    db.collection('facturas').get()
        .then((snapshot) => {            
            var usuarios=[];
            var cantAF = 0;
            var cantAC = 0;
            var cantAP = 0;
            var cantUs = 0;
            snapshot.forEach((doc) => {  
                console.log(doc.data());
                if (doc.data().eps.nit == entidad) {
                    if (Betwen(finicio, ffinal, doc.data().fecha)) {
                        cantAF++;                  
                        usuarios.push(doc.data().paciente);
                        valores.push(doc.data());
                        fs.appendFile(`file/AF${nombre}.txt`, `${doc.data().habilitacion},${doc.data().razon},NI,${doc.data().nit},CP${doc.data().consecutivo},${doc.data().fecha},${doc.data().pinicio},${doc.data().pfinal},${doc.data().eps.cdeps},${doc.data().eps.rsocial},${doc.data().eps.contrato},${doc.data().eps.beneficio},${doc.data().eps.poliza},${doc.data().eps.copago},${doc.data().eps.comision},${doc.data().eps.descuento},${doc.data().total}\n`, (error) => {
                            if (error) {
                                throw error;
                            }
                        });
                        if (doc.data().item.tipo=='p') {
                            cantAP++;
                        fs.appendFile(`file/AP${nombre}.txt`, `${doc.data().prefijo}${doc.data().consecutivo},${doc.data().habilitacion},${doc.data().paciente.td},${doc.data().paciente.cedula},${doc.data().pinicio},${doc.data().item.autorizacion},${doc.data().item.cups},${doc.data().item.ambito},${doc.data().item.f_procedimiento},${doc.data().item.atiende},${doc.data().item.c_diagnostico},${doc.data().item.c_diagnostico2},${doc.data().item.complicacion},1,${doc.data().item.valor}\n`, (error) => {
                            if (error) {
                                throw error;
                            }
                        }); 
                        }
                        if (doc.data().item.tipo=='c') {
                            cantAC++;
                            fs.appendFile(`file/AC${nombre}.txt`,`${doc.data().prefijo}${doc.data().consecutivo},${doc.data().habilitacion},${doc.data().paciente.td},${doc.data().paciente.cedula},${doc.data().pinicio},${doc.data().item.autorizacion},${doc.data().item.cups},${doc.data().item.f_consulta},${doc.data().item.c_externa},${doc.data().item.c_diagnostico},${doc.data().item.c_diagnostico2},${doc.data().item.c_diagnostico2},${doc.data().item.c_diagnostico3},1,${doc.data().item.valor},${doc.data().item.copago},${parseInt(doc.data().item.copago) + parseInt(doc.data().item.valor)}\n`, (error) => {
                                if (error) {
                                    throw error;
                                }
                            });     
                        }                  
                        
                     
                    } else {
                        console.log('No se encuentra dentro del periodo');
                    }
                } 
               
            });
           if (valores[0]) {
            var US = removeDuplicates(valores);                   
            US.forEach(element => {
                cantUs++;
                fs.appendFile(`file/US${nombre}.txt`, `${element.paciente.td},${element.paciente.cedula},${element.eps.cdeps},${element.eps.regimen},${element.paciente.apellido},${element.paciente.sapellido},${element.paciente.nombre},${element.paciente.snombre},${element.paciente.edad},${element.paciente.unidad},${element.paciente.sexo},${element.paciente.cddep},${element.paciente.cdM},${element.paciente.zresidencial}\n`, (error) => {
                    if (error) {
                        throw error;
                    } else {

                    }
                });
            });            
            fs.appendFile(`file/CT${nombre}.txt`, `${valores[0].habilitacion},${fechaA},AF${nombre},${cantAF}\n`, (error) => {});
            fs.appendFile(`file/CT${nombre}.txt`, `${valores[0].habilitacion},${fechaA},AP${nombre},${cantAP}\n`, (error) => {});
            fs.appendFile(`file/CT${nombre}.txt`, `${valores[0].habilitacion},${fechaA},AC${nombre},${cantAC}\n`, (error) => {});
            fs.appendFile(`file/CT${nombre}.txt`, `${valores[0].habilitacion},${fechaA},US${nombre},${cantUs}\n`, (error) => {});

            let docRef = db.collection('rips').doc();
            docRef.set({consecutivo:c,entidad:entidad})
                .then(function () {
                    console.log('Ingresado')
                })
           }
           res.redirect('/descargaRips');
        })
   
});
// RIPS EVENTOS
router.post('/ripseventos', async(req, res) => {
    const { nombre, consecutivo, finicio, ffinal,entidad } = req.body;
    const c = parseInt(consecutivo) + 1;
    var f = new Date();
    var factura='';
    fechaA = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    var valores = [];
    var anexo=[];
    var x=0;
    db.collection('facturas').get()
        .then((snapshot) => {            
            var usuarios=[];
            var cantAF = 0;
            var cantAC = 0;
            var cantAP = 0;
            var cantUs = 0;
            snapshot.forEach((doc) => {  
                // console.log(doc.data());
                if (doc.data().eps.nit == entidad) {
                    if (Betwen(finicio, ffinal, doc.data().fecha)) {
                        anexo=doc.data().anexo;
                        cantAF++; 
                        factura = doc.data().consecutivo; 
                        valores.push(doc.data());
                       
                        fs.appendFile(`file/AF${nombre}.txt`, `${doc.data().habilitacion},${doc.data().razon},NI,${doc.data().nit},CP${doc.data().consecutivo},${doc.data().fecha},${doc.data().pinicio},${doc.data().pfinal},${doc.data().eps.cdeps},${doc.data().eps.rsocial},${doc.data().eps.contrato},${doc.data().eps.beneficio},${doc.data().eps.poliza},${doc.data().eps.copago},${doc.data().eps.comision},${doc.data().eps.descuento},${doc.data().total}\n`, (error) => {
                            if (error) {
                                throw error;
                            }
                        });
                    } else {
                        console.log('No se encuentra dentro del periodo');
                    }
                } 
               
            });
           
            anexo.forEach(element => {
                if (element.item.tipo=='p') {
                    cantAP++;
                   fs.appendFile(`file/AP${nombre}.txt`, `${valores[0].prefijo}${valores[0].consecutivo},${valores[0].habilitacion},${element.paciente.td},${element.paciente.cedula},${valores[0].pinicio},${element.item.autorizacion},${element.item.cups},${element.item.ambito},${element.item.f_procedimiento},${element.item.atiende},${element.item.c_diagnostico},${element.item.c_diagnostico2},${element.item.complicacion},1,${element.item.valor}\n`, (error) => {
                    if (error) {
                        throw error;
                    }
                }); 
                }
                if (element.item.tipo=='c') {
                    cantAC++;
                    fs.appendFile(`file/AC${nombre}.txt`,`${valores[0].prefijo}${valores[0].consecutivo},${valores[0].habilitacion},${element.paciente.td},${element.paciente.cedula},${valores[0].pinicio},${element.item.autorizacion},${element.item.cups},${element.item.ambito},${element.item.f_procedimiento},${element.item.atiende},${element.item.c_diagnostico},${element.item.c_diagnostico2},${element.item.complicacion},1,${element.item.valor}\n`, (error) => {
                        if (error) {
                            throw error;
                        }
                    });     
                }  
            });
            
           if (valores[0]) {
               anexo.forEach(element => {
                   usuarios.push(element.paciente);
               });
            //    console.log(usuarios);
            var US = unicopaciente(usuarios);                   
            US.forEach(element => {
                cantUs++;
                fs.appendFile(`file/US${nombre}.txt`, `${element.td},${element.cedula},${valores[0].eps.cdeps},${valores[0].eps.regimen},${element.apellido},${element.sapellido},${element.nombre},${element.snombre},${element.edad},${element.unidad},${element.sexo},${element.cddep},${element.cdM},${element.zresidencial}\n`, (error) => {
                    if (error) {
                        throw error;
                    } else {

                    }
                });
            });            
            fs.appendFile(`file/CT${nombre}.txt`, `${valores[0].habilitacion},${fechaA},AF${nombre},${cantAF}\n`, (error) => {});
            fs.appendFile(`file/CT${nombre}.txt`, `${valores[0].habilitacion},${fechaA},AP${nombre},${cantAP}\n`, (error) => {});
            fs.appendFile(`file/CT${nombre}.txt`, `${valores[0].habilitacion},${fechaA},AC${nombre},${cantAC}\n`, (error) => {});
            fs.appendFile(`file/CT${nombre}.txt`, `${valores[0].habilitacion},${fechaA},US${nombre},${cantUs}\n`, (error) => {});

            let docRef = db.collection('rips').doc();
            docRef.set({consecutivo:c,entidad:entidad})
                .then(function () {
                    console.log('Ingresado')
                })
           }
           res.send(valores);
        })
   
});

// RIPS EVENTOS FIN

router.get('/ct/:consecutivo/:nombre',(req,res)=>{
    const {consecutivo,nombre}=req.params;
     CrearCT(conseRit(parseInt(consecutivo)),parseInt(consecutivo));
     res.redirect('/rips');
});


router.get('/descargaRips', (req, res) => {  

    db.collection("entidades").get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
                valores.push(doc.data());
            });
            res.render('facturacion/descargaRips', { valores });
        })

});

router.post('/descargaRips', (req, res) => { 
    const{entidad}=req.body;
    db.collection("rips")
        .orderBy("consecutivo", "desc").limit(8).get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
                if(doc.data().entidad==entidad){
                    valores.push(doc.data());
                }
               
            });
            res.send(valores);
        })

});

router.get('/descarga/:consec/:nombre', (req, res) => {
    const { nombre,consec } = req.params;
    var file=nombre+conseRit(consec-1)+'.txt';
    console.log(file)    
    res.download(`file/${file}`);
});


function removeDuplicates(arrayIn) {
    var arrayOut = [];
    arrayIn.forEach(item => {
        try {
            if (JSON.stringify(arrayOut[arrayOut.length - 1].paciente.cedula) !== JSON.stringify(item.paciente.cedula)) {
                arrayOut.push(item);
            }
        } catch (err) {
            arrayOut.push(item);
        }
    })
    return arrayOut;
}

function unicopaciente(arrayIn) {
    var arrayOut = [];
    arrayIn.forEach(item => {
        try {
            if (JSON.stringify(arrayOut[arrayOut.length - 1].cedula) !== JSON.stringify(item.cedula)) {
                arrayOut.push(item);
            }
        } catch (err) {
            arrayOut.push(item);
        }
    })
    return arrayOut;
}
function formatDate(fecha) {
    var dia = fecha.substr(0, 2);
    var mes = fecha.substr(3, 2);
    var ano = fecha.substr(6, 4);
    return ano + '-' + mes + '-' + dia;

}


function conseRit(num) {
    num = parseInt(num) + 1;
    if (num < 10) {
        return '00000' + num;
    } else if (num > 10 && num < 100) {
        return '0000' + num;
    } else if (num > 100 && num < 1000) {
        return '000' + num;
    } else if (num > 1000 && num < 10000) {
        return '00' + num;
    } else if (num > 10000 && num < 100000) {
        return '0' + num;
    } else {
        return num;
    }
}


function Betwen(f1, f2, fc) {
    fc = formatDate(fc);
    if (combertirfecha(fc) >= combertirfecha(f1)) {
        if (combertirfecha(fc) <= combertirfecha(f2)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function combertirfecha(f) {
    var fecha = new Date(f);
    return Date.parse(fecha);
}
module.exports = router;