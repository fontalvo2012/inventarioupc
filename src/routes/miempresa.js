const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db = admin.firestore();
const fs = require('fs');


router.get('/miempresas', (req, res) => {
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

router.get('/file', (req, res) => {

    var day = diaActual.getDate();
    var month = diaActual.getMonth() + 1;
    var year = diaActual.getFullYear();
    fecha = day + '/' + month + '/' + year;


    fs.appendFile('file/ejemplo2.txt', 'Ejemplo texto\n', (error) => {
        if (error) {
            throw error;
        }
    });
    res.redirect('/');
});

router.get('/AF', (req, res) => {
    db.collection('facturas').get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
                valores.push(doc.data());
               fs.appendFile('file/AF00001.txt',`${doc.data().habilitacion},${doc.data().razon},NI,${doc.data().nit},CP${doc.data().consecutivo},${doc.data().fecha},${doc.data().pinicio},${doc.data().pfinal},${doc.data().eps.cdeps},${doc.data().eps.rsocial},${doc.data().eps.contrato},${doc.data().eps.beneficio},${doc.data().eps.poliza},${doc.data().eps.copago},${doc.data().eps.comision},${doc.data().eps.descuento},${doc.data().total}\n`, (error) => {                
                    if (error) {
                        throw error;
                    }
                });             
            });       
            res.send(valores);

        })
        .catch((err) => {
            console.log('Error getting documents', err);
            res.send(valores);
        });
});

router.get('/US', (req, res) => {
    db.collection('facturas').get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
                valores.push(doc.data());             
            });
            var US=eliminarObjetosDuplicados(valores, 'cedula');
            US.forEach(element => {
                fs.appendFile('file/US00001.txt',`${element.paciente.td},${element.paciente.cedula},${element.eps.cdeps},${element.eps.regimen},${element.paciente.apellido},${element.paciente.sapellido},${element.paciente.nombre},${element.paciente.snombre},${element.paciente.edad},${element.paciente.unidad},${element.paciente.sexo},${element.paciente.cddep},${element.paciente.cdM},${element.paciente.zresidencial}\n`, (error) => {
                    if (error) {
                        throw error;
                    }
                });
            });
            res.send(valores);

        })
        .catch((err) => {
            console.log('Error getting documents', err);
            res.send(valores);
        });
});

router.get('/descargas', (req, res) => {
    res.download('file/ejemplo2.txt');
});

function eliminarObjetosDuplicados(arr, prop) {
     var nuevoArray = [];
     var lookup  = {};
 
     for (var i in arr) {
         lookup[arr[i][prop]] = arr[i];
     }
 
     for (i in lookup) {
         nuevoArray.push(lookup[i]);
     }
 
     return nuevoArray;
}

function conseRit(num) {
    switch (num) {
        case num < 10:
            return '00000' + num;
            break;
        case num < 100:
            return '0000' + num;
            break;
        case num < 1000:
            return '000' + num;
            break;
        case num < 10000:
            return '00' + num;
            break;
        case num < 100000:
            return '0' + num;
            break;
        default:
            return num;
            break;
    }
}

module.exports = router;