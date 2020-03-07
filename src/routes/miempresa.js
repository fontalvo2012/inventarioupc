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


router.get('/facturips', (req, res) => {
    db.collection('facturas').get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
                valores.push(doc.data());
                fs.appendFile('file/AF00001.txt', `${doc.data().habilitacion},${doc.data().razon},NI,${doc.data().nit},CP${doc.data().consecutivo},${doc.data().fecha}\n`, (error) => {
                    if (error) {
                        throw error;
                    }
                });
            });
            res.send(valores[0].eps.rsocial);
        })
        .catch((err) => {
            console.log('Error getting documents', err);
            res.send(valores);
        });
});

router.get('/descargas', (req, res) => {
    res.download('file/ejemplo2.txt');
});

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