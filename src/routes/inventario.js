const { Router } = require('express');
const router = Router();
const Productos = require('../model/productos');
const Proveedores = require('../model/proveedores');
const Compras = require('../model/compras');
const Pedidos = require('../model/pedidos');

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
router.get('/pedidos', checkAuthentication, async (req, res) => {   
    res.render('inventario/pedidos');
});
router.post('/pedidos', checkAuthentication, async (req, res) => {
    const {pedido}= req.body;
    const contador=await Pedidos.find();    
    if(pedido!=""){
        const p=JSON.parse(pedido);
        const pedi=new Pedidos({nro:contador.length,pedidos:p,estado:'solicitado',usuario:req.user.nombre});
        await pedi.save();
        console.log(p);
        req.flash('success',"PEDIDO FUE CREADO CORRECTAMENTE!")
    }else{
        req.flash('login',"NO SE ENTONTRARON DATOS EN EL PEDIDO!");
    }   
    res.redirect('/pedidos');
});

router.post('/verificarProducto', checkAuthentication, async (req, res) => {
    const {codigo,cantidad}= req.body;
    const producto=await Productos.findOne({codigo_Articulo:codigo});
    var can=parseInt(producto.cantidad_Total); 
    var total=0;   
    const pedidos= await Pedidos.find({estado:'solicitado'});
    pedidos.forEach(element => {
       for (let index = 0; index < element.pedidos.length; index++) {
          if(element.pedidos[index].codigo==codigo){
              total+=parseInt(element.pedidos[index].cantidad);
              
          }           
       }
    });  
    
    console.log(can-total);
    if(parseInt(cantidad)>(can-total)){        
        res.send((can-total)+"");
    }else{         
        res.send('si');
    }
    
});
router.get('/consultarPedidos', checkAuthentication, async (req, res) => { 
    const pedido=await Pedidos.find({usuario:req.user.nombre}).lean();  
    res.render('inventario/consultarPedidos',{pedido});
});
//PEDIDOS
// SUPERVISOR
router.get('/cordinador', checkAuthentication, async (req, res) => { 
    const pedido=await Pedidos.find({estado:'solicitado'}).lean();  
    res.render('inventario/cordinador',{pedido});
});

router.get('/verPedidoSedes/:id', checkAuthentication, async (req, res) => { 
    const {id}=req.params;
    const pedido=await Pedidos.findOne({_id:id}).lean();  
    res.render('inventario/verpedido',{pedido,id});
});

router.post('/saldos', checkAuthentication, async (req, res) => { 
    const {codigo}=req.body;
    var total=0;  
    const pedidos= await Pedidos.find({estado:'solicitado'});
    pedidos.forEach(element => {
       for (let index = 0; index < element.pedidos.length; index++) {
          if(element.pedidos[index].codigo==codigo){
              total+=parseInt(element.pedidos[index].cantidad);
              
          }           
       }
    });
    console.log(total);
    res.send(''+total);
});
//SUPERVISOR

async function validarCantidad (codigo) {
    var total=0;
    console.log('codigo: ',codigo);
    const pedidos= await Pedidos.find({estado:'solicitado'});
    pedidos.forEach(element => {
       for (let index = 0; index < element.pedidos.length; index++) {
          if(element.pedidos[index].codigo==codigo){
              total+=parseInt(element.pedidos[index].cantidad);
              
          }           
       }
    });   
    return total;
}

router.post('/actualizarCantidad', checkAuthentication, async (req, res) => { 
    const {id,cantidad,codigo}=req.body;

    const producto=await Productos.findOne({codigo_Articulo:codigo});
    var can=parseInt(producto.cantidad_Total); 
    var total=0;   
    const pedidos= await Pedidos.find({estado:'solicitado'});
    pedidos.forEach(element => {
       for (let index = 0; index < element.pedidos.length; index++) {
          if(element.pedidos[index].codigo==codigo){
              total+=parseInt(element.pedidos[index].autorizado);              
          }           
       }
    });  
    
    console.log(can-total);
    if(parseInt(cantidad)>(can-total)){        
        res.send((can-total)+"");
    }else{         
        const pedido=await Pedidos.findOne({_id:id}); 
        const pe=pedido.pedidos;
        for (let index = 0; index < pe.length; index++) {
            if(pe[index].codigo==codigo){
                pe[index].autorizado=cantidad;
            }        
        }
        await Pedidos.updateOne({_id:id},{pedidos:pe});
        res.send('si');
    }


});

module.exports = router;