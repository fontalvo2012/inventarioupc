const { Router } = require('express');
const router = Router();
const Productos = require('../model/productos');
const Proveedores = require('../model/proveedores');
const Compras = require('../model/compras');

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/singIn");
    }
}
// => MONGO DB
// PRODUCTOS
router.get('/inventario', checkAuthentication, async (req, res) => {
    res.render('inventario/index');
});

router.post('/crearInsumos', checkAuthentication, async (req, res) => {
    const { datos } = req.body;
    const p = JSON.parse(datos);
    const productos = new Productos({ codigo_Articulo: p.codigo_Articulo, nombre_Articulo: p.nombre_Articulo, Referencia: p.nombre_Articulo, fecha_Compra: p.fecha_Compra, proveedor: p.proveedor, linea: p.linea, marca: p.marca, medida: p.medida, cantidad_Total: p.cantidad_Total, costo: p.costo });
    await productos.save();
    res.send(p);
});

router.post('/validarProducto', checkAuthentication, async (req, res) => {
    const { codigo } = req.body;
    const cod = await Productos.findOne({ codigo_Articulo: codigo });
    if (cod) {
        res.send('si');
    } else {
        res.send('no');
    }

});

router.post('/completarProducto', checkAuthentication, async (req, res) => {
    const productos = await Productos.find();
    var array = []
    productos.forEach(element => {
        array.push(element.codigo_Articulo + '::' + element.nombre_Articulo + '::' + element.Referencia);
    });
    res.send(array);
});

router.post('/crearInsumosform', checkAuthentication, async (req, res) => {
    const { codigo, nombre, referencia, linea, marca, medida } = req.body;
    const productos = new Productos({ codigo_Articulo: codigo, nombre_Articulo: nombre, Referencia: referencia, linea: linea, marca: marca, medida: medida, cantidad_Total: '0', costo: '0' });
    await productos.save();
    req.flash('success', 'Datos registrados')
    res.redirect('/inventario');
});
// PRODUCTOS

// PROVEEDORES
router.get('/proveedores', checkAuthentication, async (req, res) => {
    res.render('inventario/proveedores');
});

router.post('/proveedores', checkAuthentication, async (req, res) => {
    const { nit, nombre, telefono, direccion, email } = req.body;
    const proveedor = new Proveedores({ nit, nombre, telefono, direccion, email });
    await proveedor.save();
    req.flash('success', 'Proveedor Creado!')
    res.render('inventario/proveedores');
});

// PROVEEDORES

//COMPRAS
router.get('/compras', checkAuthentication, async (req, res) => {
    const proveedores = await Proveedores.find().lean();
    res.render('inventario/compras', { proveedores });
});

router.post('/compras', checkAuthentication, async (req, res) => {
    const { datos,proveedor,factura,fecha } = req.body

    const d = JSON.parse(datos);

    for (let i = 0; i < d.length; i++) {
        const index = d[i].producto.indexOf(':');
        const codigo = d[i].producto.substr(0, index);
        const cantidad = await Productos.findOne({ codigo_Articulo: codigo });
        await Productos.updateOne({ codigo_Articulo: codigo }, { cantidad_Total: parseInt(cantidad.cantidad_Total) + parseInt(d[i].cantidad) });        
    }
    


    const nombre_factura = req.files.doc.name;
    let fac = req.files.doc;
    if (nombre_factura.substr(-3) == 'pdf') {
        fac.mv('./src/public/img/facturas/' + factura + '.png', (err) => {
            if (err) console.log(err);
        });
        const compra=new Compras({nro:factura,proveedor,productos:d,fecha});
        compra.save();
    } else {
        req.flash('login', 'El formato de la imagen no es correcto debe ser PDF');
    }

    res.redirect('/compras');

});
//COMPRAS
module.exports = router;