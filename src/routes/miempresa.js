const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db = admin.firestore();
const fs = require('fs');



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
            console.log(valores);
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
    console.log(req.body);
    CrearUs(nombre, c, finicio, ffinal);
    CrearAF(nombre, c, finicio, ffinal);
    const datos={
        nombre:`Rips ${nombre} Fue creado`
      };   
    res.render('index',{datos});
});

router.get('/descargaRips', (req, res) => {
    db.collection("rips")
        .orderBy("consecutivo", "desc").limit(8).get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
                valores.push(doc.data());
            });    
            console.log(valores);
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
                console.log(doc.id, '=>', doc.data());
                valores.push(doc.data());
                fs.appendFile(`file/AF${nombre}`, `${doc.data().habilitacion},${doc.data().razon},NI,${doc.data().nit},CP${doc.data().consecutivo},${doc.data().fecha},${doc.data().pinicio},${doc.data().pfinal},${doc.data().eps.cdeps},${doc.data().eps.rsocial},${doc.data().eps.contrato},${doc.data().eps.beneficio},${doc.data().eps.poliza},${doc.data().eps.copago},${doc.data().eps.comision},${doc.data().eps.descuento},${doc.data().total}\n`, (error) => {
                    if (error) {
                        throw error;
                    }
                });
            });
            console.log('Creado AF')
            var rips = { consecutivo: consecutivo, perdido_init: f1, perdido_fin: f2, cantidad: cant, nombre: nombre, rip: 'AF' };
            IngresarRips(rips);
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
                valores.push(doc.data());
            });
            var US = removeDuplicates(valores);
            console.log(US);
            US.forEach(element => {
                cant++;
                fs.appendFile(`file/US${nombre}`, `${element.paciente.td},${element.paciente.cedula},${element.eps.cdeps},${element.eps.regimen},${element.paciente.apellido},${element.paciente.sapellido},${element.paciente.nombre},${element.paciente.snombre},${element.paciente.edad},${element.paciente.unidad},${element.paciente.sexo},${element.paciente.cddep},${element.paciente.cdM},${element.paciente.zresidencial}\n`, (error) => {
                    if (error) {
                        throw error;
                    }
                });
            });
            console.log(valores);
            var rips = { consecutivo: consecutivo, perdido_init: f1, perdido_fin: f2, cantidad: cant, nombre: nombre, rip: 'US' };
            IngresarRips(rips);
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

function eliminarObjetosDuplicados(arr, prop) {
    var nuevoArray = [];
    var lookup = {};
    for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
    }
    for (i in lookup) {
        nuevoArray.push(lookup[i]);
    }
    return nuevoArray;
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

module.exports = router;