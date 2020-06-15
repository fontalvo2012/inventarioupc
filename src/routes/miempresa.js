const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const db = admin.firestore();
const fs = require('fs');

const resultado = '';
const Empresa = require('../model/empresas');
const Entidad = require('../model/entidad');
const Factura = require('../model/facturas');
const Paciente = require('../model/pacientes');
const Hclinicas = require('../model/hclinicas');
const Citas = require('../model/citas');
const Rip = require('../model/rips');
const Medicos = require('../model/medicos');
const Tarifas = require('../model/tarifas');
const Users = require('../model/users');
const Procedimientos = require('../model/procedimientos');

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/singIn");
    }
}

//MONGO DB=>
router.get('/empresa', (req, res) => {
    res.render('empresa/index');
});

router.post('/empresa', async (req, res) => {
    const { nit, rsocial, direccion, habilitacion, resolucion, tresolucion, telefono, email } = req.body;
    const newEmpresa = Empresa({ nit, rsocial, direccion, habilitacion, resolucion, tresolucion, telefono, email });
    await newEmpresa.save();
    res.redirect('/empresa');
});
//MONGO DB <=


router.post('/ripscrear', async (req, res) => {
    const { finicio, ffinal, entidad } = req.body;
    const empresa = await Empresa.findOne();
    var cantAF = 0, cantAP = 0, cantAC = 0, cantUs = 0;
    const cs = await Rip.findOne().sort({ consecutivo: 'desc' });
    const nombre = conseRit(cs.consecutivo);


    const factura = await Factura.find(
        {
            'hc.entidad.nit': entidad,
            estado: 'facturado',
            fecha: {
                $gte: new Date(finicio),
                $lte: new Date(ffinal)
            }
        }
    );
    if (factura[0]) {
        const rip = new Rip({ consecutivo: cs.consecutivo + 1, entidad: entidad, nombre: nombre });
        await rip.save();
        const cedulas = await Factura.find().distinct('hc.paciente.cedula',
            {
                'hc.entidad.nit': entidad,
                estado: 'facturado',
                fecha: {
                    $gte: new Date(finicio),
                    $lte: new Date(ffinal)
                }
            });

        for (let index = 0; index < cedulas.length; index++) {
            cantUs++;
            var pacien = await Paciente.findOne({ cedula: cedulas[index] });
            fs.appendFile(`file/US${nombre}.txt`, `${pacien.td},${pacien.cedula},${factura[0].hc.entidad.cdeps},${factura[0].hc.entidad.regimen},${pacien.apellido},${pacien.sapellido},${pacien.nombre},${pacien.snombre},${pacien.edad},${pacien.unidad},${pacien.sexo},${pacien.cddep},${pacien.cdM},${pacien.zresidencial}\n`, (error) => {
                if (error) {
                    throw error;
                }
            });
        }
        if (factura[0].hc.entidad.tfac == "evento") {
            cantAF++;
            fs.appendFile(`file/AF${nombre}.txt`, `${empresa.habilitacion},${empresa.rsocial},NI,${empresa.nit},OR${factura[0].codigo},${fechafac(factura[0].fecha)},${factura[0].hc.fecha},${factura[0].hc.fecha},${factura[0].hc.entidad.cdeps},${factura[0].hc.entidad.rsocial},${factura[0].hc.entidad.contrato},,,0,0,0,${factura[0].hc.valor}\n`, (error) => {
                if (error) {
                    throw error;
                }
            });
        }
        if (factura[0].hc.entidad.tfac == "capita") {
            cantAF++;
            fs.appendFile(`file/AF${nombre}.txt`, `${empresa.habilitacion},${empresa.rsocial},NI,${empresa.nit},OR${factura[0].codigo},${fechafac(factura[0].fecha)},${factura[0].hc.fecha},${factura[0].hc.fecha},${factura[0].hc.entidad.cdeps},${factura[0].hc.entidad.rsocial},${factura[0].hc.entidad.contrato},,,0,0,0,${factura[0].hc.entidad.vcap}\n`, (error) => {
                if (error) {
                    throw error;
                }
            });
        }

        factura.forEach(element => {

            if (element.hc.entidad.tfac == "usuario") {
                cantAF++;
                fs.appendFile(`file/AF${nombre}.txt`, `${empresa.habilitacion},${empresa.rsocial},NI,${empresa.nit},OR${element.codigo},${fechafac(element.fecha)},${element.hc.fecha},${element.hc.fecha},${element.hc.entidad.cdeps},${element.hc.entidad.rsocial},${element.hc.entidad.contrato},,,${element.hc.copago},0,0,${element.hc.valor}\n`, (error) => {
                    if (error) {
                        throw error;
                    }
                });
            }

            if (element.hc.item.tipo == 'c') {
                cantAC++;
                fs.appendFile(`file/AC${nombre}.txt`, `OR${element.codigo},${empresa.habilitacion},${element.hc.paciente.td},${element.hc.paciente.cedula},${element.hc.fecha},${element.hc.autorizacion},${element.hc.item.cups},10,15,${element.hc.diagnostico},,,,1,${element.hc.valor},${element.hc.copago},${parseInt(element.hc.valor) + parseInt(element.hc.copago)}\n`, (error) => {
                    if (error) {
                        throw error;
                    }
                });
            }
            if (element.hc.item.tipo == 'p') {
                cantAP++
                fs.appendFile(`file/AP${nombre}.txt`, `OR${element.codigo},${empresa.habilitacion},${element.hc.paciente.td},${element.hc.paciente.cedula},${element.hc.fecha},${element.hc.autorizacion},${element.hc.item.cups},10,15,${element.hc.diagnostico},,,,1,${element.hc.valor},${element.hc.copago},${parseInt(element.hc.valor) + parseInt(element.hc.copago)}\n`, (error) => {
                    if (error) {
                        throw error;
                    }
                });
            }
        });

        fs.appendFile(`file/CT${nombre}.txt`, `${empresa.habilitacion},${fechafac(new Date())},AF${nombre},${cantAF}\n`, (error) => { });
        fs.appendFile(`file/CT${nombre}.txt`, `${empresa.habilitacion},${fechafac(new Date())},AP${nombre},${cantAP}\n`, (error) => { });
        fs.appendFile(`file/CT${nombre}.txt`, `${empresa.habilitacion},${fechafac(new Date())},AC${nombre},${cantAC}\n`, (error) => { });
        fs.appendFile(`file/CT${nombre}.txt`, `${empresa.habilitacion},${fechafac(new Date())},US${nombre},${cantUs}\n`, (error) => { });


    } else {
        console.log('No existen facturas')
    }
    res.redirect('/rips');
})

function fechafac(fecha) {
    return fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
}

// RIPS EVENTOS


// RIPS EVENTOS FIN

router.get('/ct/:consecutivo/:nombre', (req, res) => {
    const { consecutivo, nombre } = req.params;
    CrearCT(conseRit(parseInt(consecutivo)), parseInt(consecutivo));
    res.redirect('/rips');
});


router.post('/descargaRips', async (req, res) => {
    const { entidad } = req.body;
    const valores = await Rip.find({ entidad: entidad });
    res.send(valores);

});

router.get('/descarga/:nombre', (req, res) => {
    const { nombre } = req.params;
    fs.exists(`file/${nombre}`, function (exists) {
        if (exists) {
            res.download(`file/${nombre}`);
        } else {
            res.download(`file/none.txt`);
        }
    });

});


router.get('/rips', async (req, res) => {
    var entidad = []
    entidad = await Entidad.find().lean();
    res.render('facturacion/rips', { entidad });

});

router.get('/imagenes', checkAuthentication, async (req, res) => {
    const medico = await Medicos.find().lean();
    res.render('empresa/imagenes', { medico });
})
router.post('/imagenes', checkAuthentication, async (req, res) => {
    const nombre = req.body.medico;
    const firma_nombre = req.files.firma_img.name;
    let firma = req.files.firma_img;
    if (firma_nombre.substr(-3) == 'png') {
        firma.mv('./src/public/img/firmas/' + nombre + '.png', (err) => {
            if (err) console.log(err);
        });
    } else {
        req.flash('login','El formato de la imagen no es correcto debe ser PNG');
    }

    res.redirect('/imagenes');
})
router.post('/logo', checkAuthentication, async (req, res) => {   
    const logo_nombre = req.files.logo_img.name;
    let firma = req.files.logo_img;
    if (logo_nombre.substr(-3) == 'png') {
        firma.mv('./src/public/img/logo.png', (err) => {
            if (err) console.log(err);
        });
    } else {
        req.flash('login','El formato del logo no es correcto debe ser PNG');
    }

    res.redirect('/imagenes');
})



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


router.get('/backup', async (req, res) => {
    res.render('empresa/backup');
});

router.get('/descargar_backup', (req, res) => {
    fs.exists(`file/backup.txt`, function (exists) {
        if (exists) {
            res.download(`file/backup.txt`);
        }
    });
})

router.post('/backup', async (req, res) => {
    fs.unlinkSync('file/backup.txt');
    const hclincia = await Hclinicas.find();
    fs.appendFile('file/backup.txt', `>>>>HCLINICAS ${new Date()}<<<<< \n ${hclincia}`, (error) => { if (error) { throw error; } });
    const paciente = await Paciente.find();
    fs.appendFile('file/backup.txt', `>>>>PACIENTES ${new Date()}<<<<< \n ${paciente}`, (error) => { if (error) { throw error; } });
    const citas = await Citas.find();
    fs.appendFile('file/backup.txt', `>>>>CITAS ${new Date()}<<<<< \n ${citas}`, (error) => { if (error) { throw error; } });
    const entidades = await Entidad.find();
    fs.appendFile('file/backup.txt', `>>>>ENTIDADES ${new Date()}<<<<< \n ${entidades}`, (error) => { if (error) { throw error; } });
    const facturas = await Factura.find();
    fs.appendFile('file/backup.txt', `>>>>FACTURAS ${new Date()}<<<<< \n ${facturas}`, (error) => { if (error) { throw error; } });
    const medicos = await Medicos.find();
    fs.appendFile('file/backup.txt', `>>>>MEDICOS ${new Date()}<<<<< \n ${medicos}`, (error) => { if (error) { throw error; } });
    const procedimientos = await Procedimientos.find();
    fs.appendFile('file/backup.txt', `>>>>PROCEDIMIENTOS ${new Date()}<<<<< \n ${procedimientos}`, (error) => { if (error) { throw error; } });
    const tarifas = await Tarifas.find();
    fs.appendFile('file/backup.txt', `>>>>TARIFAS ${new Date()}<<<<< \n ${tarifas}`, (error) => { if (error) { throw error; } });
    const users = await Users.find();
    fs.appendFile('file/backup.txt', `>>>>USUARIOS ${new Date()}<<<<< \n ${users}`, (error) => { if (error) { throw error; } });

    req.flash('login', 'backup Creado');
    res.redirect('/backup');
});

module.exports = router;