const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db = admin.firestore();
const fs = require('fs');

const resultado='';

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
            res.render('facturacion/rips', { valores });
        })
        .catch((err) => {
            console.log('Error getting documents', err);
            res.render('facturacion/rips');
        });

});

router.post('/rips', (req, res) => {
    const { nombre, consecutivo, finicio, ffinal } = req.body;
    const c = parseInt(consecutivo) + 1;  
    CrearUs(nombre, c, finicio, ffinal);
    CrearAF(nombre, c, finicio, ffinal);
    
    const datos={
        nombre:`Rips ${nombre} Fue creado`
      };   
    res.render('index',{datos});
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

router.get('/descarga/:nombre', (req, res) => {
    const {nombre}=req.params;
    res.download(`file/${nombre}`);
});

function CrearAF(nombre,consecutivo,f1,f2) {
    db.collection('facturas').get()
        .then((snapshot) => {
            var valores = [];
            var cant = 0;
            snapshot.forEach((doc) => {
                cant++;
               
                if(Betwen(f1,f2,doc.data().fecha)){
                    console.log('se encuentra dentro del periodo');
                    valores.push(doc.data());
                    fs.appendFile(`file/AF${nombre}`, `${doc.data().habilitacion},${doc.data().razon},NI,${doc.data().nit},CP${doc.data().consecutivo},${doc.data().fecha},${doc.data().pinicio},${doc.data().pfinal},${doc.data().eps.cdeps},${doc.data().eps.rsocial},${doc.data().eps.contrato},${doc.data().eps.beneficio},${doc.data().eps.poliza},${doc.data().eps.copago},${doc.data().eps.comision},${doc.data().eps.descuento},${doc.data().total}\n`, (error) => {
                        if (error) {
                            throw error;
                        }
                    });
                }else{
                    console.log('No se encuentra dentro del periodo');                   
                }
            });
            
            if(valores[0]){
                console.log('Creado AF')
                var rips = { consecutivo: consecutivo, perdido_init: f1, perdido_fin: f2, cantidad: cant, nombre: nombre, rip: 'AF' };
                IngresarRips(rips);
             
            }else{
                var rips = { consecutivo: parseInt(consecutivo), perdido_init: f1, perdido_fin: f2, cantidad:0, nombre: 'ror.txt', rip: 'er' };
                IngresarRips(rips);
            }
           
        })
        .catch((err) => {
            console.log('Error getting documents', err);

        });
}

function CrearUs(nombre, consecutivo, f1, f2) {
    db.collection('facturas').get()
        .then((snapshot) => {
            var valores = [];
            var cant = 0;
            snapshot.forEach((doc) => {             
                if(Betwen(f1,f2,doc.data().fecha)){
                    console.log('Se encuentra en el rango');
                    valores.push(doc.data());
                }else{
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
                        }
                    });
                });            
                var rips = { consecutivo: consecutivo, perdido_init: f1, perdido_fin: f2, cantidad: cant, nombre: nombre, rip: 'US' };
                IngresarRips(rips);
            }

        })
        .catch((err) => {
            console.log('Error getting documents', err);

        });
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
    arrayIn.forEach(item=> {
      try {
        if (JSON.stringify(arrayOut[arrayOut.length-1].paciente.cedula) !== JSON.stringify(item.paciente.cedula)) {
          arrayOut.push(item);
        }
      } catch(err) {
        arrayOut.push(item);
       }
    })
    return arrayOut;
}

function formatDate(fecha) {
    var dia = fecha.substr(0,2);
    var mes = fecha.substr(3,2);
    var ano = fecha.substr(6,4);
    return ano+'-'+mes+'-'+dia;

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


function Betwen(f1,f2,fc) {
    fc=formatDate(fc);
    console.log(f1);
    console.log(f2);
    console.log(fc);
   
    if(combertirfecha(fc)>=combertirfecha(f1)){
       if(combertirfecha(fc)<=combertirfecha(f2)){
         return true;
       }else{
         return false;
       }
    }else{
      return false;
    }
   }
   
   function combertirfecha(f) {
     var fecha=new Date(f);
     return Date.parse(fecha);
   }
module.exports = router;