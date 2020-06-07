const { Router } = require('express');
const pdf = require('html-pdf');

const router = Router();
var admin = require("firebase-admin");
const db = admin.firestore();
const Entidad = require('../model/entidad');
const Factura = require('../model/facturas');
const Empresa = require('../model/empresas');
const Tarifas = require('../model/tarifas');
const Paciente = require('../model/pacientes');

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
router.post('/facturaItem',checkAuthentication,async(req,res)=>{
    const { entidad, ini, fin } = req.body;   
    var datos = [];
    const codigos = await Factura.find().distinct('codigo',
        {
        'hc.entidad.nit': entidad,
        estado: 'facturado',
        fecha: {
            $gte: new Date(ini),
            $lte: new Date(fin)
        }
    });

    for (let index = 0; index < codigos.length; index++) {
        var anexo = {};
        var fac = await Factura.find({ codigo: codigos[index] }).lean();
        var cont = 0;
        var total = 0;
        var v = 0;
        console.log(fac);
        fac.forEach(element => {
            cont++;
            anexo[cont] = element;
            v = element.hc.valor
            total += parseInt(v);
        });
        total = number_format(total, 2);

        if (fac[0].hc.entidad.tfac == 'capita') {
            total = number_format(parseInt(fac[0].hc.entidad.vcap), 2);
        }

        facturas = await Factura.findOne({ codigo: codigos[index] }).lean();
        datos[index] = { _id: facturas._id, codigo: codigos[index], anexo: anexo, item: facturas.hc.item, entidad: facturas.hc.entidad, hc: facturas.hc, total: total, fecha: fechafac(facturas.fecha) };
    }   
    console.log(datos);
    res.send(datos);

});
router.get('/facturas', checkAuthentication, async (req, res) => {
    var facturas = [];
    var datos = [];
    const entidades = await Entidad.find().lean();
    const codigos = await Factura.find().distinct('codigo', { estado: 'facturado' });
    for (let index = 0; index < codigos.length; index++) {
        var anexo = {};
        var fac = await Factura.find({ codigo: codigos[index] }).lean();
        var cont = 0;
        var total = 0;
        var v = 0;
        console.log(fac);
        fac.forEach(element => {
            cont++;
            anexo[cont] = element;
            v = element.hc.valor
            total += parseInt(v);
        });
        total = number_format(total, 2);

        if (fac[0].hc.entidad.tfac == 'capita') {
            total = number_format(parseInt(fac[0].hc.entidad.vcap), 2);
        }

        facturas = await Factura.findOne({ codigo: codigos[index] }).lean();

        datos[index] = { id: facturas._id, cd: codigos[index], anexo: anexo, item: facturas.hc.item, entidad: facturas.hc.entidad, hc: facturas.hc, total: total, fecha: fechafac(facturas.fecha) };
    }
    res.render('facturacion/facturas', { datos, entidades });
});
router.post('/prefacturaitem', checkAuthentication, async (req, res) => {
    const { entidad, ini, fin,opcion } = req.body;
    const op = { opcion: 'asc' }
    const prefacturas = await Factura.find(
        {
            'hc.entidad.nit': entidad,
            estado: 'PREFACTURA',
            fecha: {
                $gte: new Date(ini),
                $lte: new Date(fin)
            }
        });   
    var datos = [];    
    prefacturas.forEach(element => {
        datos.push(
            {
                id: element._id,
                fecha: element.fecha,
                nombres: element.hc.nombres,
                entidad: element.hc.entidad.rsocial,
                item: element.hc.item.nombre,
                autorizacion: element.hc.autorizacion,
                copago: parseInt(element.hc.copago),
                valor: parseInt(element.hc.valor),

            });
    });

    var oJSON = sortJSON(datos, opcion, 'asc');
    console.log(oJSON);
    res.send(oJSON);

});

function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
            y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}

router.post('/tipofactura', checkAuthentication, async (req, res) => {
    const { entidad } = req.body;
    var entidades = [];
    entidades = await Entidad.findOne({ nit: entidad });
    res.send(entidades);

});


router.post('/facturar', checkAuthentication, async (req, res) => {
    const { entidad, ini, fin } = req.body;
    const max = await Factura.findOne({ estado: 'facturado' }).sort({ codigo: 'desc' }).limit(1);
    const eps = await Entidad.findOne({ nit: entidad });
    if (eps.tfac != 'usuario') {
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
                fecha: Date.now(),
                vencimiento: Vencimiento(30)
            }
        );
    } else {
        const facUser = await Factura.find(
            {
                'hc.entidad.nit': entidad,
                estado: 'PREFACTURA',
                fecha: {
                    $gte: new Date(ini),
                    $lte: new Date(fin)
                }
            }
        );
        var con = max.codigo;
        facUser.forEach(async element => {
            con++;
            await Factura.findByIdAndUpdate(element._id,
                {
                    codigo: con,
                    estado: 'facturado',
                    fecha: Date.now(),
                    vencimiento: Vencimiento(30)
                })
        });
    }

    res.send('facturado');

});


router.post('/facturarporId', checkAuthentication, async (req, res) => {
    const { ids, eps } = req.body
    const i = JSON.parse(ids);
    var fa=await Factura.find({estado:'facturado'});
    var max =0;
    const entidad = await Entidad.findOne({ nit: eps });
    var cont = 0;
    if (fa[0]) {
        max = await Factura.findOne({ estado: 'facturado' }).sort({ codigo: 'desc' }).limit(1);
        cont = max.codigo + 1;
    } else {
        max = 1000;
        cont = 1000;
    }
    if (entidad.tfac != 'usuario') {
        for (let index = 0; index < i.length; index++) {
            await Factura.updateOne(
                { _id: i[index] },
                {
                    codigo: cont,
                    estado: 'facturado',
                    fecha: Date.now(),
                    vencimiento: Vencimiento(30)
                });
        }
    } else {

        for (let index = 0; index < i.length; index++) {
            await Factura.updateOne(
                { _id: i[index] },
                {
                    codigo: cont,
                    estado: 'facturado',
                    fecha: Date.now(),
                    vencimiento: Vencimiento(30)
                });
            cont++;
        }
    }


    res.send('facturado')
});




router.post('/facturarSiruigias', checkAuthentication, async (req, res) => {
    const { paciente, entidad, medico, autorizacion,ins } = req.body;
    const anexo = JSON.parse(req.body.sir);
    const eps = await Entidad.findOne({ nit: entidad });
    const pac = await Paciente.findOne({ cedula: paciente });
    const max = await Factura.findOne({ estado: 'facturado' }).sort({ codigo: 'desc' }).limit(1);
    const autoriz= await Factura.findOne({'hc.entidad.nit':entidad,'hc.autorizacion':autorizacion});

    const vencimiento = Vencimiento(30);
    var v = 0;
    var valor_insumo=0;
    anexo.forEach(element => {
        v = v + parseInt(element.total);
    });
    var insumo=JSON.parse(ins);
    insumo.forEach(element => {
        valor_insumo+=parseInt(element.precio);
    });
    const sirugia = {        
        anexo,
        insumos:insumo,
        entidad: eps,
        paciente: pac,
        autorizacion,
        fecha: fechaActual(),
        medico,
        valor: v+(valor_insumo)*1.12,
        tipo:'sirugia'
    }
    if (autoriz) {
        req.flash('login', 'El Nro de Autorizacion ya fue utilizado');
    }else{
        const fac = new Factura({ vencimiento, codigo: parseInt(max.codigo) + 1, hc: sirugia, copago: 0, estado: 'facturado', descripcion: 'FACTURACION POR SIRUGIA' });
        await fac.save();
    }
    
    res.redirect('/procedimientoshclinicas');
});

router.get('/imprimirprefac/:id', checkAuthentication, async (req, res) => {
    const { id } = req.params;
    const factura = await Factura.findOne({ _id: id }).lean();
    const entidad = await Entidad.find().lean();
    res.render('facturacion/impprefactura', { factura, entidad, id });
});
router.post('/imprimirprefac/:id', checkAuthentication, async (req, res) => {
    const { entidad, cups, autorizacion } = req.body;
    const { id } = req.params;      
    const eps = await Entidad.findOne({ nit: entidad });   
    const autoriz= await Factura.findOne({'hc.entidad.nit':entidad,'hc.autorizacion':autorizacion});
   
    if (autoriz) {
        console.log('El Numero autorizacion existe!');
        req.flash('login', 'El Numero autorizacion existe!');
    }else{
        const tarifa = await Tarifas.find({ entidad: entidad, cups: cups.substr(0, 6)});
        
        if (tarifa[0]) {
            await Factura.updateOne({ _id: id },
                {
                    'hc.autorizacion': autorizacion,
                    'hc.entidad': eps,
                    'hc.item': tarifa[0]
                });
    
        }else{
            console.log('El Cups no esta parametrizado para esta entidad!'); 
            req.flash('login', 'Este Cups no esta parametrizado para esta entidad!')           
        }
    }

    res.redirect('/imprimirprefac/'+id);
});

router.post('/facturas', checkAuthentication, async (req, res) => {
    const { entidad, ini, fin } = req.body;
    var facturas = [];
    var datos = [];
    const entidades = await Entidad.find().lean()
    codigos = await Factura.find().distinct('codigo',
        {
            'hc.entidad.nit': entidad,
            estado: 'facturado',
            fecha: {
                $gte: new Date(ini),
                $lte: new Date(fin)
            }
        });
    for (let index = 0; index < codigos.length; index++) {
        var anexo = {};
        var cont = 0;
        var total = 0;

        var fac = await Factura.find({ codigo: codigos[index] }).lean();
        fac.forEach(element => {
            cont++;
            anexo[cont] = element;
            var v = element.hc.valor
            total += parseInt(v);
        });
        total = number_format(total, 2);

        if (fac[0].hc.entidad.tfac == 'capita') {
            total = number_format(parseInt(fac[0].hc.entidad.vcap), 2);
        }

        facturas = await Factura.findOne({ codigo: codigos[index] }).lean();

        datos[index] = { id: facturas._id, cd: codigos[index], anexo: anexo, item: facturas.hc.item, entidad: facturas.hc.entidad, hc: facturas.hc, total: total, fecha: fechafac(facturas.fecha) };
    }
    res.render('facturacion/facturas', { datos, entidades });
});

router.get('/anexo/:cd', checkAuthentication, async (req, res) => {
    const { cd } = req.params;
    const f = await Factura.find({ codigo: cd }).lean();
    const i = await Factura.findOne({ codigo: cd }).lean();
    var total = 0;
    f.forEach(element => {
        var v = element.hc.valor
        total += parseInt(v);
    });
    total = number_format(total, 2)
    res.render('facturacion/anexo', { f, total, i });
});

router.get('/imprimirfac/:cd', checkAuthentication, async (req, res) => {
    const { cd } = req.params;
    const f = await Factura.findOne({ codigo: cd }).lean();    
    const e = await Empresa.findOne().lean();
    const fac = await Factura.find({ codigo: cd }).lean();
    var total = 0;
    var fecha = '';
    fac.forEach(element => {
        var v = element.hc.valor
        total += parseInt(v);
    });
    if (f.hc.anexo) {
        for (let index = 0; index < f.hc.anexo.length; index++) {
            f.hc.anexo[index].total=number_format(f.hc.anexo[index].total);            
        }
    }
    f.fecha = fechafac(f.fecha);
    f.hc.total=number_format(f.hc.total);
    
    if (f.hc.entidad.tfac == 'evento') {
        total = number_format(total, 2);
    }
    if (f.hc.entidad.tfac == 'capita') {
        total = number_format(parseInt(fac[0].hc.entidad.vcap), 2);
    }
    res.render('facturacion/imprimir', { f, e, total,fac })

})
function fechafac(fecha) {
    return fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
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