const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db=admin.firestore();
const fs = require('fs');


router.get('/miempresas',(req,res)=>{   
    let docRef = db.collection('carlosparra').doc();
    let setAda = docRef.set({
        nit: '111',
        rzocial: 'carlos parra',
        habilitacion:'130000012',
        direccion:'',
        telfonos:'',
        web:'',
        email:'',
        resolfac:''
    });
    res.redirect('/');
});

router.get('/file',(req,res)=>{
    fs.appendFile('file/ejemplo2.txt','Ejemplo texto\n',(error)=>{
        if (error) {
            throw error;
        }
        res.download('file/ejemplo2.txt');

        console.log('Archivos Creados'+__dirname);
    });
    res.redirect('/');
});

router.get('/descargas',(req,res)=>{  
    res.download('file/ejemplo2.txt');
});
module.exports = router;