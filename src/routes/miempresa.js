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
    db.collection("rips")
        .orderBy("consecutivo", "desc").limit(1).get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
                valores.push(doc.data());
            });
            const c = conseRit(valores[0].consecutivo);
            valores[0].nombre = c + ".txt"
            var datos=[{
                consecutivo:valores[0].consecutivo,
                nombre:conseRit(valores[0].consecutivo)
            }];
            console.log(datos);
            res.render('facturacion/rips', { datos });
        })
        .catch((err) => {
            console.log('Error getting documents', err);
            res.render('facturacion/rips');
        });

});

// router.post('/rips', async(req, res) => {
//     const { nombre, consecutivo, finicio, ffinal } = req.body;
//     const c = parseInt(consecutivo) + 1;
//     await CrearAF('0001', c, finicio, ffinal);
  
//     res.redirect('/descargaRips');
// });

router.post('/rips', async(req, res) => {
    const { nombre, consecutivo, finicio, ffinal } = req.body;
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
            });
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

            res.redirect('/descargaRips');
            fs.appendFile(`file/CT${nombre}.txt`, `${valores[0].habilitacion},${fechaA},AF${nombre},${cantAF}\n`, (error) => {});
            fs.appendFile(`file/CT${nombre}.txt`, `${valores[0].habilitacion},${fechaA},AP${nombre},${cantAP}\n`, (error) => {});
            fs.appendFile(`file/CT${nombre}.txt`, `${valores[0].habilitacion},${fechaA},AC${nombre},${cantAC}\n`, (error) => {});
            fs.appendFile(`file/CT${nombre}.txt`, `${valores[0].habilitacion},${fechaA},US${nombre},${cantUs}\n`, (error) => {});

            let docRef = db.collection('rips').doc();
            let setAda = docRef.set({consecutivo:c})
                .then(function () {
                    console.log('Ingresado')
                })
        })
   
});

router.get('/ct/:consecutivo/:nombre',(req,res)=>{
    const {consecutivo,nombre}=req.params;
     CrearCT(conseRit(parseInt(consecutivo)),parseInt(consecutivo));
     res.redirect('/rips');
});

router.get('/initrips', (req, res) => {
    var rips = { consecutivo: 0, perdido_init: '2020-01-01', perdido_fin: '2020-01-30', cantidad: 0, nombre: 'none', rip: 'In' };
    IngresarRips(rips);
    res.render('index');
});

router.get('/descargaRips', (req, res) => {
    db.collection("rips")
        .orderBy("consecutivo", "desc").limit(8).get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
                valores.push(doc.data());
            });
            res.render('facturacion/descargaRips', { valores });
        })
        .catch((err) => {
            console.log('Error getting documents', err);
            res.render('facturacion/descargaRips');
        });

});

router.get('/descarga/:consec/:nombre', (req, res) => {
    const { nombre,consec } = req.params;
    var file=nombre+conseRit(consec-1)+'.txt';
    console.log(file)    
    res.download(`file/${file}`);
});

function CrearCT(nombre, consecutivo) {
    var f = new Date();
    fechaA = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    db.collection('rips').where('consecutivo', '==', parseInt(consecutivo)).get()
        .then((snapshot) => {
            var valores = [];
            var cant = 0;
            snapshot.forEach((doc) => {
                cant++;
                console.log('se encuentra dentro del periodo');
                valores.push(doc.data());
                fs.appendFile(`file/CT${nombre}`, `${doc.data().habilitacion},${fechaA},${doc.data().rip}${doc.data().nombre.substr(0,6)},${doc.data().cantidad}\n`, (error) => {
                    if (error) {
                        throw error;
                    }
                });

            });
            var rips = { consecutivo: consecutivo, perdido_init: '', perdido_fin: '', cantidad: 4, nombre: nombre, rip: 'CT', fecha: '', habilitacion:''};
            IngresarRips(rips);
        })
        .catch((err) => {
            console.log('Error getting documents', err);

        });
}
function CrearAF(nombre, consecutivo, f1, f2) {
    var f = new Date();
    fechaA = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    db.collection('facturas').get()
        .then((snapshot) => {
            var valores = [];
            var cant = 0;
            snapshot.forEach((doc) => {   
                if (Betwen(f1, f2, doc.data().fecha)) {
                    cant++;
                    console.log('se encuentra dentro del periodo');
                    valores.push(doc.data());
                    fs.appendFile(`file/AF${nombre}`, `${doc.data().habilitacion},${doc.data().razon},NI,${doc.data().nit},CP${doc.data().consecutivo},${doc.data().fecha},${doc.data().pinicio},${doc.data().pfinal},${doc.data().eps.cdeps},${doc.data().eps.rsocial},${doc.data().eps.contrato},${doc.data().eps.beneficio},${doc.data().eps.poliza},${doc.data().eps.copago},${doc.data().eps.comision},${doc.data().eps.descuento},${doc.data().total}\n`, (error) => {
                        if (error) {
                            throw error;
                        }
                    });
                    fs.appendFile(`file/AP${nombre}`, `CP${doc.data().consecutivo},${doc.data().habilitacion},${doc.data().paciente.td},${doc.data().paciente.cedula},${doc.data().pinicio},${doc.data().items[0].autorizacion},${doc.data().items[0].cups},${doc.data().items[0].ambito},${doc.data().items[0].f_procedimiento},${doc.data().items[0].atiende},${doc.data().items[0].c_diagnostico},${doc.data().items[0].c_diagnostico2},${doc.data().items[0].complicacion},1,${doc.data().items[0].valor}\n`, (error) => {
                        if (error) {
                            throw error;
                        }
                    });    
                } else {
                    console.log('No se encuentra dentro del periodo');
                }
            });

            // if (valores[0]) {
            //     console.log('Creado AF')
            //     var rips = { consecutivo: consecutivo, perdido_init: f1, perdido_fin: f2, cantidad: cant, nombre: nombre, rip: 'AF', fecha: fechaA, habilitacion: valores[0].habilitacion };
            //     IngresarRips(rips);
            //     CrearAC(nombre, consecutivo, f1, f2);
            // } else {
            //     var rips = { consecutivo: parseInt(consecutivo), perdido_init: f1, perdido_fin: f2, cantidad: 0, nombre: 'ror.txt', rip: 'er', fecha: fechaA };
            //     IngresarRips(rips);
            // }

        })
     
}

router.get('/p', (req, res) => {
    CrearCT('AP9999', 1);
    res.send('probadno rips');
})

function CrearAP(nombre, consecutivo, f1, f2) {
    var f = new Date();
    fechaA = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    db.collection('facturas').get()
        .then((snapshot) => {
            var valores = [];
            var cant = 0;
            var c = "";
            snapshot.forEach((doc) => {                
                if (Betwen(f1, f2, doc.data().fecha)) {
                    console.log('se encuentra dentro del periodo');
                    valores.push(doc.data());
                    if(doc.data().items[0].tipo =='p'){
                        cant++;
                        fs.appendFile(`file/AP${nombre}`, `CP${doc.data().consecutivo},${doc.data().habilitacion},${doc.data().paciente.td},${doc.data().paciente.cedula},${doc.data().pinicio},${doc.data().items[0].autorizacion},${doc.data().items[0].cups},${doc.data().items[0].ambito},${doc.data().items[0].f_procedimiento},${doc.data().items[0].atiende},${doc.data().items[0].c_diagnostico},${doc.data().items[0].c_diagnostico2},${doc.data().items[0].complicacion},1,${doc.data().items[0].valor}\n`, (error) => {
                            if (error) {
                                throw error;
                            }
                        });    
                    }else{
                        console.log(doc.data());
                    }
                    
                } else {
                    console.log('No se encuentra dentro del periodo');
                }
            });

            if (valores[0]) {
                console.log('Creado AP')
                var rips = { consecutivo: consecutivo, perdido_init: f1, perdido_fin: f2, cantidad: cant, nombre: nombre, rip: 'AP', fecha: fechaA, habilitacion: valores[0].habilitacion };
                IngresarRips(rips);
                CrearUs(nombre, consecutivo, f1, f2);
            } else {
                var rips = { consecutivo: parseInt(consecutivo), perdido_init: f1, perdido_fin: f2, cantidad: 0, nombre: 'ror.txt', rip: 'er', fecha: fechaA };
                IngresarRips(rips);
            }

        })
        .catch((err) => {
            console.log('Error getting documents', err);

        });
}
function CrearAC(nombre, consecutivo, f1, f2) {
    var f = new Date();
    fechaA = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    db.collection('facturas').get()
        .then((snapshot) => {
            var valores = [];
            var cant = 0;
            var c = "";
            snapshot.forEach((doc) => {               
                if (Betwen(f1, f2, doc.data().fecha)) {
                    console.log('se encuentra dentro del periodo');
                    valores.push(doc.data());
                    if(doc.data().items[0].tipo =='c'){
                        cant++;
                        fs.appendFile(`file/AC${nombre}`,`CP${doc.data().consecutivo},${doc.data().habilitacion},${doc.data().paciente.td},${doc.data().paciente.cedula},${doc.data().pinicio},${doc.data().items[0].autorizacion},${doc.data().items[0].cups},${doc.data().items[0].f_consulta},${doc.data().items[0].c_externa},${doc.data().items[0].c_diagnostico},${doc.data().items[0].c_diagnostico2},${doc.data().items[0].c_diagnostico2},${doc.data().items[0].c_diagnostico3},1,${doc.data().items[0].valor},${doc.data().items[0].copago},${parseInt(doc.data().items[0].copago) + parseInt(doc.data().items[0].valor)}\n`, (error) => {
                            if (error) {
                                throw error;
                            }
                        });
                    }else{
                        console.log(doc.data())
                    }
                } else {
                    console.log('No se encuentra dentro del periodo');
                }
            });

            if (valores[0]) {
                console.log('Creado AC')
                var rips = { consecutivo: consecutivo, perdido_init: f1, perdido_fin: f2, cantidad: cant, nombre: nombre, rip: 'AC', fecha: fechaA, habilitacion: valores[0].habilitacion };
                IngresarRips(rips);
                CrearAP(nombre, consecutivo, f1, f2);

            } else {
                var rips = { consecutivo: parseInt(consecutivo), perdido_init: f1, perdido_fin: f2, cantidad: 0, nombre: 'ror.txt', rip: 'er', fecha: fechaA };
                IngresarRips(rips);
            }

        })
        .catch((err) => {
            console.log('Error getting documents', err);

        });
}

function CrearUs(nombre, consecutivo, f1, f2) {
    var f = new Date();
    fechaA = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    db.collection('facturas').get()
        .then((snapshot) => {
            var valores = [];
            var cant = 0;
            snapshot.forEach((doc) => {
                if (Betwen(f1, f2, doc.data().fecha)) {
                    console.log('Se encuentra en el rango');
                    valores.push(doc.data());
                } else {
                    console.log('No se encuentra dentro del periodo');
                }

            });
            if (valores[0]) {
                var US = removeDuplicates(valores);
                US.forEach(element => {
                    cant++;
                    fs.appendFile(`file/US${nombre}`, `${element.paciente.td},${element.paciente.cedula},${element.eps.cdeps},${element.eps.regimen},${element.paciente.apellido},${element.paciente.sapellido},${element.paciente.nombre},${element.paciente.snombre},${element.paciente.edad},${element.paciente.unidad},${element.paciente.sexo},${element.paciente.cddep},${element.paciente.cdM},${element.paciente.zresidencial}\n`, (error) => {
                        if (error) {
                            throw error;
                        } else {

                        }
                    });
                });

                var rips = { consecutivo: consecutivo, perdido_init: f1, perdido_fin: f2, cantidad: cant, nombre: nombre, rip: 'US', fecha: fechaA, habilitacion: US[0].habilitacion };
                IngresarRips(rips);
                CrearCT(nombre, consecutivo);

            }

        })
      
}



function IngresarRips(rip) {
    let docRef = db.collection('rips').doc();
    let setAda = docRef.set(rip)
        .then(function () {
            console.log('Ingresado')
        })
        .catch(function (error) {
            console.log('error');
        });

}
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
function removeDuplicates2(arrayIn) {
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