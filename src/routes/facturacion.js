const { Router } = require('express');
const pdf = require('html-pdf');

const router = Router();
var admin = require("firebase-admin");
const db = admin.firestore();
const Entidad = require('../model/entidad');
const Factura = require('../model/facturas');
const Empresa = require('../model/empresas');

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/singIn");
    }
}


//MONGO <=
router.get('/prefactura', checkAuthentication, async (req, res) => {
    const entidades = await Entidad.find().lean();
    const prefacturas = await Factura.find({ estado: 'PREFACTURA' }).lean();
    const max = await Factura.findOne({ estado: 'facturado' }).sort({ codigo: 'desc' }).limit(1);
    console.log(max.codigo);
    res.render('facturacion/prefactura', { prefacturas, entidades });
});

router.post('/prefactura', checkAuthentication, async (req, res) => {
    const { entidad, ini, fin } = req.body;
    const entidades = await Entidad.find().lean();
    const prefacturas = await Factura.find(
        {
            'hc.entidad.nit': entidad,
            estado: 'PREFACTURA',
            fecha: {
                $gte: new Date(ini),
                $lte: new Date(fin)
            }
        }).lean();

    res.render('facturacion/prefactura', { prefacturas, entidades });

});


router.post('/tipofactura', checkAuthentication, async (req, res) => {
    const { entidad } = req.body;
    var entidades = [];
    entidades = await Entidad.findOne({ nit: entidad });
    res.send(entidades);

});


router.post('/facturar', checkAuthentication, async (req, res) => {
    const { entidad, ini, fin } = req.body;
    const max = await Factura.findOne({ estado: 'facturado' }).sort({ codigo: 'desc' }).limit(1);
    const eps= await Entidad.findOne({nit:entidad});   
    if(eps.tfac != 'usuario'){       
        await Factura.updateMany(
            {
                'hc.entidad.nit': entidad,
                estado: 'PREFACTURA',
                fecha: {
                    $gte: new Date(ini),
                    $lte: new Date(fin)
                }
            },
            {
                codigo: max.codigo + 1,
                estado: 'facturado',
                fecha:Date.now(),
                vencimiento:Vencimiento(30) 
            }
        );
    }else{
        const facUser=await Factura.find(
            {
                'hc.entidad.nit': entidad,
                estado: 'PREFACTURA',
                fecha: {
                    $gte: new Date(ini),
                    $lte: new Date(fin)
                }
            }
        );
        var con=max.codigo;
        facUser.forEach(async element => {
            con++;
             await Factura.findByIdAndUpdate(element._id,
                {
                    codigo: con,
                    estado: 'facturado',
                    fecha:Date.now(),
                    vencimiento:Vencimiento(30) 
                })
        });
    }
  
    res.send('facturado');

});

function fechaformat() {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if (month < 10) {
         return (`${day}-0${month}-${year}`);
    } else {
        return (`${day}-${month}-${year}`);
    }
}
router.get('/facturas', checkAuthentication, async (req, res) => {
    var facturas = [];
    var datos = [];
    codigos = await Factura.find().distinct('codigo', { estado: 'facturado' });
    for (let index = 0; index < codigos.length; index++) {
        var anexo = {};    
        var fac = await Factura.find({ codigo: codigos[index] }).lean();
        var cont = 0;
        var total=0;
        fac.forEach(element => {
            cont++;
            anexo[cont] = element;
            var v=element.hc.valor
            total += parseInt(v);
        });
        total=number_format(total,2);
         
            if(fac[0].hc.entidad.tfac=='capita'){
                total=number_format(parseInt(fac[0].hc.entidad.vcap),2);
            }
            
        facturas = await Factura.findOne({ codigo: codigos[index] }).lean();
        
        datos[index] = { id: facturas._id, cd: codigos[index], anexo: anexo, item: facturas.hc.item, entidad: facturas.hc.entidad, hc: facturas.hc,total:total,fecha:fechafac(facturas.fecha) };
    }   
    res.render('facturacion/facturas', { datos });
});

router.get('/anexo/:cd', checkAuthentication, async (req, res) => {
    const { cd } = req.params;
    const f = await Factura.find({ codigo: cd }).lean();
    const i = await Factura.findOne({ codigo: cd }).lean();
    var total=0;
    f.forEach(element => {
        var v=element.hc.valor
        total += parseInt(v);              
    });
        total=number_format(total,2)
    res.render('facturacion/anexo', { f,total,i });
});

router.get('/imprimirfac/:cd', checkAuthentication, async (req, res) => {
    const { cd } = req.params;
    const f = await Factura.findOne({ codigo: cd }).lean(); 
    const e = await Empresa.findOne().lean();
    const fac = await Factura.find({ codigo: cd });
    var total=0;
    var fecha='';
    fac.forEach(element => {
        var v=element.hc.valor
        total += parseInt(v); 
    });
    f.fecha=fechafac(f.fecha); 
    if(f.hc.entidad.tfac=='evento'){
        total=number_format(total,2);
    }
    if(f.hc.entidad.tfac=='capita'){
        total=number_format(parseInt(fac[0].hc.entidad.vcap),2);
    }   
    
    res.render('facturacion/imprimir', { f, e,total })

})

//=> MONGO DB

router.get('/rips', async (req, res) => {
    var entidad = []
    entidad = await Entidad.find().lean();

    db.collection("rips")
        .orderBy("consecutivo", "desc").limit(1).get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
                valores.push(doc.data());
            });
            var datos = [{
                consecutivo: valores[0].consecutivo,
                nombre: conseRit(valores[0].consecutivo)
            }];
            console.log(datos);
            res.render('facturacion/rips', { datos, entidad });
        })
});






// router.get('/imprimirprefac/:id', checkAuthentication, (req, res) => {
//     const { id } = req.params;
//     var factura = [];
//     var empresa = [];
//     var dato = [];
//     db.collection('empresa').get()
//         .then((snapshot) => {
//             snapshot.forEach(element => {
//                 empresa.push(element.data());
//             });

//             db.collection('fac_orl').doc(id).get()
//                 .then((snapshot) => {
//                     factura.push(snapshot.data());

//                     dato.push({ factura: factura[0], empresa: empresa[0] });
//                     console.log(dato);
//                     res.render('facturacion/impprefactura', { dato })
//                 })
//         })

// })







function formatDate2(fecha) {
    var dia = fecha.substr(0, 2);
    var mes = fecha.substr(3, 2);
    var ano = fecha.substr(6, 4);
    return ano + '-' + mes + '-' + dia;

}
function fechafac(fecha) {
    return fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear();
}

function formatDate3(fecha) {
    var mes = fecha.substr(0, 2);
    var dia = fecha.substr(3, 2);
    var ano = fecha.substr(6, 4);
    return ano + '-' + mes + '-' + dia;

}

function Vencimiento(cant) {
    var diaActual = new Date();
    vencimiento = new Date();
    vencimiento.setDate(diaActual.getDate() + cant);
    var day = vencimiento.getDate();
    var month = vencimiento.getMonth() + 1;
    var year = vencimiento.getFullYear();
    if (parseInt(day) < 10) day = '0' + day;
    if (parseInt(month) < 10) month = '0' + month;
    vence = day + '/' + month + '/' + year;
    return vence;
}

function fechaActual() {
    var diaActual = new Date();
    var day = diaActual.getDate();
    var month = diaActual.getMonth() + 1;
    var year = diaActual.getFullYear();
    if (parseInt(day) < 10) day = '0' + day;
    if (parseInt(month) < 10) month = '0' + month;
    fecha = day + '/' + month + '/' + year;
    return fecha;
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

function number_format(amount, decimals) {
    amount += ''; 
    amount = parseFloat(amount.replace(/[^0-9\.]/g, ''));
    decimals = decimals || 0; 
    if (isNaN(amount) || amount === 0) 
        return parseFloat(0).toFixed(decimals);
    amount = '' + amount.toFixed(decimals);
    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;
    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');
    return amount_parts.join('.');
  }

module.exports = router;