const { Router } = require('express');
const router = Router();
const Productos = require('../model/productos');
const Cliente = require('../model/clientes');
const Proveedores = require('../model/proveedores');
const Compras = require('../model/compras');
const Pedidos = require('../model/pedidos');
const Users = require('../model/users');
const Ccostos = require('../model/ccostos');
const Solicitud = require('../model/solicitudes');
let moment = require('moment');
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/singIn");
  }
}

router.get('/inventario', checkAuthentication, async (req, res) => {
  const productos = await Productos.find().sort({ _id:-1 }).lean();
  const codigo = parseInt(productos[0].codigo_Articulo)+1
  res.render('inventario/index',{productos,codigo});
});
router.get('/informeDespachado', checkAuthentication, async (req, res) => {
  const users = await Users.find({ sede: 1 }).lean();
  res.render('inventario/informe_despachado', { users });
});



router.get('/verpedido/:id', checkAuthentication, async (req, res) => {
  const { id } = req.params;
  const pedido = await Pedidos.findOne({ _id: id }).lean();
  var hora = pedido.fecha.getHours();
  var minuto = pedido.fecha.getMinutes();
  pedido.fecha = pedido.fecha.getDate() + '/' + (pedido.fecha.getMonth() + 1) + '/' + pedido.fecha.getFullYear() + ' ' + hora + ':' + minuto
  res.render('inventario/revisar', { pedido });
});

router.post('/informeDespachado', checkAuthentication, async (req, res) => {
  const { inicio, final, usuario, tipo } = req.body;
  var pedidos = [];
  var respedidos = [];

  if (tipo == "") {
    pedidos = await Pedidos.find(
      {
        usuario: usuario,
        fecha: {
          $gte: new Date(inicio),
          $lte: new Date(final)
        }
      });
  } else {
    pedidos = await Pedidos.find(
      {
        usuario: usuario,
        estado: tipo,
        fecha: {
          $gte: new Date(inicio),
          $lte: new Date(final)
        }
      });
  }
  var p = pedidos;
  for (let i = 0; i < p.length; i++) {
    var hora = p[i].fecha.getHours();
    var minuto = p[i].fecha.getMinutes();

    if (hora < 10) {
      hora = '0' + hora;
    }

    if (minuto < 10) {
      minuto = '0' + minuto;
    }

    var f = p[i].fecha.getDate() + '/' + (p[i].fecha.getMonth() + 1) + '/' + p[i].fecha.getFullYear() + ' ' + hora + ':' + minuto;
    respedidos.push({
      _id: p[i]._id,
      fecha: f,
      usuario: p[i].usuario,
      nro: p[i].nro,
      estado: p[i].estado
    });
 
  }

  res.send(respedidos);
});

router.post('/crearInsumos', checkAuthentication, async (req, res) => {
  const { datos } = req.body;
  const p = JSON.parse(datos);
  const productos = new Productos({ codigo_Articulo: p.codigo_Articulo, nombre_Articulo: p.nombre_Articulo, Referencia: p.nombre_Articulo, fecha_Compra: p.fecha_Compra, proveedor: p.proveedor, linea: p.linea, marca: p.marca, medida: p.medida, cantidad_Total: p.cantidad_Total, costo: p.costo });
  await productos.save();
  res.send(p.codigo_Articulo);
});

router.post('/validarProducto', checkAuthentication, async (req, res) => {
  const { codigo } = req.body;
  const cod = await Productos.findOne({ codigo_Articulo: codigo });
  if (cod) {
    res.send(cod);
  } else {
    res.send('no');
  }
});

router.post('/completarProducto', checkAuthentication, async (req, res) => {
  const productos = await Productos.find();
  var array = []
  productos.forEach(element => {
    array.push(element.codigo_Articulo + ':' + element.nombre_Articulo);
  });
  res.send(array);
});


router.post('/editarProducto', checkAuthentication, async (req, res) => {
  const {codigo_Articulo} = req.body;
  const producto = await Productos.findOne({ codigo_Articulo }).lean();
  res.send(producto);
});

router.post('/crearInsumosform', checkAuthentication, async (req, res) => {
  const { codigo, nombre, referencia, linea, marca, medida,cantidad_minima } = req.body;
  const producto = await Productos.findOne({ codigo_Articulo:codigo }).lean();
  const parametros={ codigo_Articulo: codigo, nombre_Articulo: nombre, Referencia: referencia, linea: linea, marca: marca, medida: medida, costo: '0',cantidad_minima }
  if(producto){
    await Productos.updateOne({codigo_Articulo:codigo},parametros)
    req.flash('success', 'Producto Actualizado')
  }else{
    const productos = new Productos(parametros);
    await productos.save();
    req.flash('success', 'Producto creado')
  }
  res.redirect('/inventario');
});
// PRODUCTOS

// PROVEEDORES
router.get('/proveedores', checkAuthentication, async (req, res) => {
  const proveedores = await Proveedores.find().lean();
  res.render('inventario/proveedores',{proveedores});
});

router.post('/proveedores', checkAuthentication, async (req, res) => {
  const { nit, nombre, telefono, direccion, email } = req.body;
  const proveedor = new Proveedores({ nit, nombre, telefono, direccion, email });
  await proveedor.save();
  req.flash('success', 'Proveedor Creado!')
  res.render('inventario/proveedores');
});

// PROVEEDORES
//VENTAS

router.get('/ventas', checkAuthentication, async (req, res) => {

  const clientes = await Cliente.find().lean()
  res.render('inventario/ventas',{clientes});
});
//FIN VENTAS


//CLIENTES
router.get('/clientes', checkAuthentication, async (req, res) => {
  const clientes = await Cliente.find().lean()
  res.render('inventario/clientes',{clientes});
});

router.post('/crearCliente', checkAuthentication, async (req, res) => {
  const {cedula,nombres,direccion,telefono,email} = req.body

  const cl = await Cliente.findOne({cedula})

  if(cl){
    await Cliente.updateOne({cedula},{nombres,direccion,telefono,email})
    req.flash('success', 'El cliente ha sido actualizado')
  }else{
    const cliente = new Cliente({cedula,nombres,direccion,telefono,email})
    await cliente.save()
    req.flash('success', 'Producto Creado')
  }
 
  
  res.redirect('clientes');
});
//FIN CLIENTES

//COMPRAS
router.get('/compras', checkAuthentication, async (req, res) => {
  const proveedores = await Proveedores.find().lean();
  res.render('inventario/compras', { proveedores });
});

router.post('/compras', checkAuthentication, async (req, res) => {
  const { datos, proveedor, factura, fecha } = req.body
  
  const d = JSON.parse(datos);
  const prove = await Proveedores.findOne({nit:proveedor})
  const nproveedor = prove.nombre
  const compras = await Compras.findOne({nro:factura})
  if (compras) {
    req.flash('login', "Ya existe una factura creada con el numero "+factura);
  } else {
    for (let i = 0; i < d.length; i++) {
      const codigo = d[i].codigo;
      let costo =parseFloat(d[i].subtotal)/parseInt(d[i].cantidad)
      const producto = await Productos.findOne({ codigo_Articulo: codigo });
      let nuevoCosto 
      if(producto.costo > 0){
        const cantidadActual = producto.cantidad_Total;
        const costoActual = producto.costo
        nuevoCosto = ((cantidadActual * costoActual) + (parseInt(d[i].cantidad)*costo)) / (cantidadActual + parseInt(d[i].cantidad));
      }else{
        nuevoCosto= costo
      }
      await Productos.updateOne({ codigo_Articulo: codigo }, { cantidad_Total: parseInt(producto.cantidad_Total) + parseInt(d[i].cantidad),costo:nuevoCosto});
    }
    const nombre_factura = req.files.doc.name;
    let fac = req.files.doc;
    let imagen =factura+"_"+nombre_factura.replace(/\s/g, "");
      fac.mv('./src/public/img/facturas/' + imagen, (err) => {
        if (err) console.log(err);
      });
      const compra = new Compras({ nro: factura, proveedor,nproveedor,productos: d, fecha,imagen });
      compra.save();
  }
  
  res.redirect('/compras');

});

router.get('/consolidadoCompras', checkAuthentication, async (req, res) => {
  const proveedores = await Proveedores.find().lean();
  const compras = await Compras.find().lean()
  for (let index = 0; index < compras.length; index++) {
      compras[index].productos=JSON.stringify(compras[index].productos)
     }
  res.render('inventario/informeCompras',{proveedores,compras});
});
//COMPRAS


router.get('/ccostos', checkAuthentication, async (req, res) => {
  const ccosto = await Ccostos.find().lean()
  res.render('inventario/ccostos',{ccosto});
});

router.post('/ccostos', checkAuthentication, async (req, res) => {
  const { nombre, descripcion } = req.body

  const ccostos = new Ccostos({ nombre, descripcion })
  await ccostos.save()
  req.flash('success', "Centro de costo creado");
  res.redirect('/ccostos');
});

router.get('/borrarsolicitud/:id', checkAuthentication, async (req, res) => {
  const { id } = req.params;
  await Pedidos.remove({ _id: id });

  req.flash('success', "Centro de costo creado");
  res.redirect('/pedidos');
});
router.get('/pedidos', checkAuthentication, async (req, res) => {
  invfinal = await Invetario(req.user._id)
   const cordinadores = await Users.find({cordinador:1}).lean()
   const ccosto = await Ccostos.find({estado:'open'}).lean()
  res.render('inventario/pedidos', { invfinal,cordinadores,ccosto });
});

router.post('/invetarioempleado', checkAuthentication, async (req, res) => {
const {_id}= req.body

//inventario = await Invetario(_id)
let user = await Users.findOne({_id})
let inventario=[]
if(user){
  inventario = user.inventario
}

res.send(inventario)
})

router.post('/pedidos', checkAuthentication, async (req, res) => {
  const { pedido, observacion, supervisor,empleado,ccempleado } = req.body;
  const contador = await Pedidos.find();
 

  if (pedido != "") {
    const p = JSON.parse(pedido);
    var fecha = new Date().toLocaleString("en-VE", { timeZone: "America/Bogota" });
    const pedi = new Pedidos({ nro: contador.length, pedidos: p, estado: 'solicitado', observacion, fecha, usuario: empleado, ccuser: ccempleado, supervisor });
    await pedi.save();
    req.flash('success', "PEDIDO FUE CREADO CORRECTAMENTE!")
  } else {
    req.flash('login', "NO SE ENTONTRARON DATOS EN EL PEDIDO!");
  }
  res.redirect('/pedidos');
});

router.post('/editarpedidos/:id', checkAuthentication, async (req, res) => {
  const { pedido } = req.body;
  const { id } = req.params;

  if (pedido != "") {
    await Pedidos.updateOne({ _id: id }, { pedidos: JSON.parse(pedido) })
    req.flash('success', "PEDIDO FUE ACTUALIZADO CORRECTAMENTE!")
  } else {
    req.flash('login', "NO SE ENTONTRARON DATOS EN EL PEDIDO!");
  }
  res.redirect('/pedidos');
});

router.post('/verificarProducto', checkAuthentication, async (req, res) => {
  const { codigo, cantidad } = req.body;
  const producto = await Productos.findOne({ codigo_Articulo: codigo });
  var can = parseInt(producto.cantidad_Total);
  var total = 0;
  const pedidos = await Pedidos.find({ estado: 'solicitado' });
  
  pedidos.forEach(element => {
    for (let index = 0; index < element.pedidos.length; index++) {
      if (element.pedidos[index].codigo == codigo) {
        total += parseInt(element.pedidos[index].cantidad);
      }
    }
  });
  if (parseInt(cantidad) > (can - total)) {
    res.send((can - total) + "");
  } else {
    res.send({opt:'si',producto});
  }
});
router.get('/consultarPedidos', checkAuthentication, async (req, res) => {
  const pedidos = await Pedidos.find({ usuario: req.user.nombre }).lean();
  for (let i = 0; i < pedidos.length; i++) {
    var hora = pedidos[i].fecha.getHours();
    var minuto = pedidos[i].fecha.getMinutes();
    if (hora < 10) {
      hora = '0' + hora;
    }
    if (minuto < 10) {
      minuto = '0' + minuto;
    }
    pedidos[i].fecha = pedidos[i].fecha.getDate() + '/' + (pedidos[i].fecha.getMonth() + 1) + '/' + pedidos[i].fecha.getFullYear() + ' ' + hora + ':' + minuto;
    if (pedidos[i].estado == 'solicitado') {
      pedidos[i].solicitado = 1;
    }
  }
  res.render('inventario/consultarPedidos', { pedidos });
});

router.get('/editarsolicitud/:id', checkAuthentication, async (req, res) => {
  const { id } = req.params;
  const pedidos = await Pedidos.findOne({ _id: id }).lean();
  var solicitud = JSON.stringify(pedidos.pedidos);
  res.render('inventario/editarsolicitud', { solicitud, pedidos });
})

//PEDIDOS
// SUPERVISOR
router.get('/cordinador', checkAuthentication, async (req, res) => {
  const pedido = await Pedidos.find({ estado: 'solicitado', supervisor: req.user.medico }).lean();

  for (let i = 0; i < pedido.length; i++) {
    var hora = pedido[i].fecha.getHours();
    var minuto = pedido[i].fecha.getMinutes();

    if (hora < 10) {
      hora = '0' + hora;
    }
    if (minuto < 10) {
      minuto = '0' + minuto;
    }

    pedido[i].fecha = pedido[i].fecha.getDate() + '/' + (pedido[i].fecha.getMonth() + 1) + '/' + pedido[i].fecha.getFullYear() + ' ' + hora + ':' + minuto;
  }

  res.render('inventario/cordinador', { pedido });
});

router.get('/verPedidoSedes/:id', checkAuthentication, async (req, res) => {
  const { id } = req.params;
  const pedido = await Pedidos.findOne({ _id: id }).lean();
  res.render('inventario/verpedido', { pedido, id });
});


router.get('/consolidadoCcostos', checkAuthentication, async (req, res) => {
  const pedidos = await Pedidos.find().lean()
  const ccostos = await Ccostos.find().lean()
  res.render('inventario/informesCcostos',{pedidos,ccostos});
});
router.get('/remplazarPuntos', checkAuthentication, async (req, res) => {
 await Productos.updateMany(
    { costo: { $regex: /^[0-9]{1,9}\.[0-9]+$/ } },
    [
      {
        $set: {
          costo: {
            $replaceAll: {
              input: "$costo",
              find: ".",
              replacement: ","
            }
          }
        }
      }
    ]
  )
  res.send('remplazados');
});

router.get('/productos', checkAuthentication, async (req, res) => {
  const productos = await Productos.find().sort({ nombre_Articulo: 'ASC' }).lean();
  let total=0;
  for (let index = 0; index < productos.length; index++) {
    total+=parseFloat(productos[index].costo)*parseInt(productos[index].cantidad_Total)
    let c =parseFloat(productos[index].costo).toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP'
    })
    productos[index].costo=c
  }



  total=total.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP'
  })
  res.render('inventario/productosver', { productos,total });
})
router.get('/eliminarproducto/:id', checkAuthentication, async (req, res) => {
  const { id } = req.params;
  await Productos.deleteOne({ _id: id })
  req.flash('success', 'Producto Eliminado');
  res.redirect('/productos')
})

router.get('/verPedidoDespacho/:id', checkAuthentication, async (req, res) => {
  const { id } = req.params;
  const pedido = await Pedidos.findOne({ _id: id }).lean();
  res.render('inventario/verpedidodespacho', { pedido, id });
});

router.post('/infCostos', checkAuthentication, async (req, res) => {
  const { ccostos } = req.body;
  const pedido = await Pedidos.find({ 'pedidos.ccostos': ccostos,estado:'despachado' }).sort({_id:-1}).lean();
  res.send(pedido);
});
router.post('/saldos', checkAuthentication, async (req, res) => {
  const { codigo } = req.body;
  var total = 0;
  const pedidos = await Pedidos.find({ estado: 'solicitado' });
  pedidos.forEach(element => {
    for (let index = 0; index < element.pedidos.length; index++) {
      if (element.pedidos[index].codigo == codigo) {
        total += parseInt(element.pedidos[index].cantidad);

      }
    }
  });

  res.send('' + total);
});


router.post('/actualizarCantidad', checkAuthentication, async (req, res) => {
  const { id, cantidad, codigo } = req.body;

  const producto = await Productos.findOne({ codigo_Articulo: codigo });
  var can = parseInt(producto.cantidad_Total);
  var total = 0;
  const pedidos = await Pedidos.find({ estado: 'solicitado' });
  pedidos.forEach(element => {
    for (let index = 0; index < element.pedidos.length; index++) {
      if (element.pedidos[index].codigo == codigo) {
        total += parseInt(element.pedidos[index].autorizado);
      }
    }
  });


  if (parseInt(cantidad) > (can - total)) {
    res.send((can - total) + "");
  } else {
    const pedido = await Pedidos.findOne({ _id: id });
    const pe = pedido.pedidos;
    for (let index = 0; index < pe.length; index++) {
      if (pe[index].codigo == codigo) {
        pe[index].autorizado = cantidad;
      }
    }
    await Pedidos.updateOne({ _id: id }, { pedidos: pe });
    res.send('si');
  }


});

router.post('/actualizarCantidadDespacho', checkAuthentication, async (req, res) => {
  const { id, cantidad, codigo } = req.body;

  const producto = await Productos.findOne({ codigo_Articulo: codigo });
  var can = parseInt(producto.cantidad_Total);
  var total = 0;
  const pedidos = await Pedidos.find({ estado: 'solicitado' });
  pedidos.forEach(element => {
    for (let index = 0; index < element.pedidos.length; index++) {
      if (element.pedidos[index].codigo == codigo) {
        total += parseInt(element.pedidos[index].autorizado);
      }
    }
  });


  if (parseInt(cantidad) > (can - total)) {
    res.send((can - total) + "");
  } else {
    const pedido = await Pedidos.findOne({ _id: id });
    const pe = pedido.pedidos;
    for (let index = 0; index < pe.length; index++) {
      if (pe[index].codigo == codigo) {
        pe[index].despachado = cantidad;
      }
    }
    await Pedidos.updateOne({ _id: id }, { pedidos: pe });
    res.send('si');
  }
});

router.post('/autorizar', checkAuthentication, async (req, res) => {
  const { id } = req.body;
  const pedido = await Pedidos.findOne({ _id: id })
  const user = await Users.findOne({medico: pedido.ccuser})
  let inventario = pedido.pedidos
  if (user.inventario) {
    inventario = inventario.concat(user.inventario)
  }
  await Users.updateOne({ medico: pedido.ccuser }, { inventario })
  await Pedidos.updateOne({ _id: id }, { estado: 'autorizado', supervisor: req.user.nombre });
  res.send('autorizado');
})

router.post('/cancelarPedido', checkAuthentication, async (req, res) => {
  const { id } = req.body
  await Pedidos.updateOne({ _id: id }, { estado: 'cancelado', supervisor: req.user.nombre });
  res.send('cancelado');
})


router.post('/despachar', checkAuthentication, async (req, res) => {
  const { id } = req.body;
  await Pedidos.updateOne({ _id: id }, { estado: 'despachado', supervisor: req.user.nombre });
  const pedido = await Pedidos.findOne({_id:id})

  for (let index = 0; index < pedido.pedidos.length; index++) {
    const element = pedido.pedidos[index];
    await Productos.updateOne({codigo_Articulo:element.codigo}, { $inc: { cantidad_Total: - parseFloat(element.cantidad) } })
  }
 
  res.send('despachado')
})
//DESPACHO
router.get('/despacho', checkAuthentication, async (req, res) => {
  const pedidos = await Pedidos.find({ estado: 'autorizado' }).lean();

  for (let i = 0; i < pedidos.length; i++) {
    var hora = pedidos[i].fecha.getHours();
    var minuto = pedidos[i].fecha.getMinutes();

    if (hora < 10) {
      hora = '0' + hora;
    }
    if (minuto < 10) {
      minuto = '0' + minuto;
    }

    pedidos[i].fecha = pedidos[i].fecha.getDate() + '/' + (pedidos[i].fecha.getMonth() + 1) + '/' + pedidos[i].fecha.getFullYear() + ' ' + hora + ':' + minuto;
  }

  
  res.render('inventario/despacho', { pedidos });
});
router.get('/verPedidoSedesDespacho/:id', checkAuthentication, async (req, res) => {
  const { id } = req.params;
  const pedido = await Pedidos.findOne({ _id: id }).lean();
  res.render('inventario/pedidosDespacho', { pedido, id });
});
//DESPACHO


router.get('/saldos', checkAuthentication, async (req, res) => {
  const productos = await Productos.find().lean();
  res.render('inventario/saldos', { productos });
});
router.post('/descargarinv', checkAuthentication, async (req, res) => {
  const {articulos,ccostos,} = req.body
  const cc = await Ccostos.findOne({_id:ccostos})
  const user = await Users.findOne({_id:req.user._id})
  let insumos=[]
  let despachos=[]

  if(cc.insumos){
    insumos= cc.insumos.concat(JSON.parse(articulos))
  }else{
    insumos=JSON.parse(articulos)
  }
  if (user.despachos){
    despachos=user.despachos.concat(JSON.parse(articulos))
  }else{
    despachos=JSON.parse(articulos)
  }


  await Ccostos.updateOne({_id:ccostos},{insumos})
  await Users.updateOne({ medico:req.user.medico }, {despachos})
  res.redirect('/descargarinv')
});

router.get('/descargarinv', checkAuthentication, async (req, res) => {
  const ccostos = await Ccostos.find().lean()
  invfinal = await Invetario(req.user._id)
  res.render('inventario/descargarInv', { ccostos,invfinal });
});

async function Invetario(_id) {
  const user= await Users.findOne({_id})
  const inventario = user.inventario;
  const despachos = user.despachos;
  let invent = []
  let desp=[]
  let invfinal=[]
  if (inventario) {
    invent = Object.values(inventario.reduce((acumulador, elemento) => {
      if (!acumulador[elemento.producto]) {
        acumulador[elemento.producto] = { ...elemento };
      } else {
        acumulador[elemento.producto].cantidad += parseInt(elemento.cantidad);
      }
      return acumulador;
    }, {}));
  }
  if (despachos) {
    desp = Object.values(despachos.reduce((acumulador, elemento) => {
      if (!acumulador[elemento.producto]) {
        acumulador[elemento.producto] = { ...elemento };
      } else {
        acumulador[elemento.producto].cantidad += parseInt(elemento.cantidad);
      }
      return acumulador;
    }, {}));
  
  }
  
  for (let i = 0; i < Math.max(invent.length, desp.length); i++) {
    const obj1 = invent[i] || { codigo: null, producto: null, cantidad: 0 };
    const obj2 = desp[i] || { codigo: null, producto: null, cantidad: 0 };
    const newValue = obj1.cantidad - obj2.cantidad;
    if(newValue>0){
      const newObj = {
        codigo: obj1.codigo,
        producto: obj1.producto,
        fecha: obj1.fecha,
        cantidad: newValue
      };
      invfinal.push(newObj);
    }
  
  }
 
  return invfinal
}

router.get('/solicitudes', checkAuthentication, async (req, res) => {
  const solicitudes = await Solicitud.find({ usuario: req.user.medico }).lean();

  res.render('inventario/solicitudes', { solicitudes });
});

router.post('/solicitudes', checkAuthentication, async (req, res) => {
  const { cantidad, producto } = req.body;
  const solicitud = new Solicitud({ productos: producto, cantidad, usuario: req.user.medico })
  await solicitud.save();
  res.redirect('/solicitudes');
});

router.post('/consultarUsuario', checkAuthentication, async (req, res) => {
  const { user } = req.body;
  const u = await Users.findOne({ username: user });
  res.send(u);
});

router.post('/consultarRfid', checkAuthentication, async (req, res) => {
  const { rfid } = req.body;
  const usuario = await Users.findOne({ rfid });
  res.send(usuario);
});

module.exports = router;