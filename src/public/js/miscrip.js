// MEDICOS

var paciente = [];
var factura = [];
var eps = [];
var item = [];
var listitem = [];
var total = 0;


firebase.initializeApp({
  apiKey: "AIzaSyARpTGPRFv1JsdapWAYqrh7YNp7htY7OxU",
  authDomain: "citas-orl.firebaseapp.com",
  projectId: "citas-orl",
});

var db = firebase.firestore();



function cantidadInv() {
  let cadena=` <span>Cantidad</span> <input type="number" max="${$("#materiales").val()}" id="cantidad" class="form-control form-control-sm" placeholder="Tienes ${$("#materiales").val()}">`
  $("#cantidadInv").html(cadena)
}
let lista=[]
let cadena=""
function cargarlistadescargas() {
  if (lista.find(objeto => objeto.ccosto === $("#ccostos option:selected").text()) || !lista[0]) {
    if (parseInt($("#cantidad").val())>parseInt($("#materiales").val()) || $("#cantidad").val()=="") {
      alert("no tienes esa cantidad de articulos!")
    }else{
      let obj={nombre:$("#materiales option:selected").text(),cantidad:parseInt($("#cantidad").val()),ccosto:$("#ccostos option:selected").text()}
      if (lista.find(objeto => objeto.nombre === obj.nombre)) {
          alert("El item ya fue agregado a lista!")
      }else{
        cadena +=`<input type="text" readonly class="form-control form-control-sm articulos" data-codigo="${$("#materiales option:selected").data("cd")}"  data-empleado="${$("#materiales option:selected").data("empleado")}" data-nombre="${$("#materiales option:selected").text()}" data-cantidad="${parseInt($("#cantidad").val())}"  name="articulo "value="${$("#materiales option:selected").text()} X cantidad ${parseInt($("#cantidad").val())}"><br>`
        $("#listaItems").html(cadena)
        lista.push(obj)
      } 
    }
  }else{
    alert(`Ya has ingresado algunos productos al centro de costo ${lista[0].ccosto} debes guardar este avence`)
  }
  

}

function guardarItemCentros(){
  if(!lista[0] || $("#ccostos option:selected").text()=="Seleccionar"){
    alert("debe agregar item a la lista o revisar el centro de costo")
  }else{
    if(confirm(`Desea Descargar los item en el centro de costo: ${$("#ccostos option:selected").text()}`)){
      const articulos = []
      $('input[name^="articulo"]').each(function () {
        articulos.push({
          codigo:$(this).data("codigo"),
          producto:$(this).data("nombre"),
          cantidad:$(this).data("cantidad"),
          empleado:$("#emp").val(),
          fecha:new Date()
        })
      })
      const arti = document.createElement('input')
      arti.type = 'hidden'
      arti.name = 'articulos'
      arti.value = JSON.stringify(articulos)
      $('#descargaCcostos').append(arti)
      $('#descargaCcostos').submit()
    }
  }
 
}

function consultarmedico(id) {
  $.ajax({
    url: '/ajaxmedico',
    type: 'POST',
    datatype: 'json',
    data: {
      id: id
    },
    success: (data) => {
      $('#cedula').val(data[0].cedula);
      $('#nombre').val(data[0].nombre);
      $('#email').val(data[0].email);
      $('#registro').val(data[0].registro);
      $('#telefono').val(data[0].telefono);

    }
  });
}


// --- SELECT ---
function selectEntidad() {

  $.ajax({
    url: '/selectEntidad',
    type: 'POST',
    datatype: 'json',
    success: (data) => {
      var cadena = `
      <select name="entidad" id="entidad" onchange="consultarEntidad();consultarTarifas();" class="form-control form-control-sm">
      <option value="">Seleccionar Entidad</option>
      `;
      data.forEach(element => {
        cadena += ` <option value="${element.nit}">${element.rsocial}</option>`;
      });
      cadena += `</select>`;
      $('.entidades').html(cadena);
    }
  });
}
function consultarPaciente() {
  var cedula = $('#cc').val();
  $.ajax({
    url: '/ajaxpaciente',
    type: 'POST',
    datatype: 'json',
    data: {
      cedula: cedula
    },
    success: (data) => {
      if (data) {
        paciente = data;
        $('#nombres').val(data.nombre.toUpperCase() + " " + data.apellido.toUpperCase() + " " + data.sapellido.toUpperCase());
        $('#edad').val(data.edad);
        selectEntidad();
      } else {
        if (confirm("El Paciente no Existe en la Base de datos desea crearlo ? ")) {
          location.href = "/addpacientes";
        } else {
          $('#cc').val("");
        }
      }
    }
  });
}

function MostarUpdatePaciente(cedula) {
  $.ajax({
    url: '/ajaxpaciente',
    type: 'POST',
    datatype: 'json',
    data: {
      cedula: cedula
    },
    success: (data) => {
      $('#td').val(data.td);
      $('#cedula').val(data.cedula);
      $('#nombre').val(data.nombre);
      $('#snombre').val(data.snombre);
      $('#apellido').val(data.apellido);
      $('#sapellido').val(data.sapellido);
      $('#sexo').val(data.sexo);
      $('#nacimiento').val(data.nacimiento);
      $('#edad').val(data.edad);
      $('#unidad').val(data.unidad);
      $('#ecivil').val(data.ecivil);
      $('#direccion').val(data.direccion);
      $('#telefono').val(data.telefono);
      $('#email').val(data.email);
      $('#nombre_acom').val(data.nombre_acom);
      $('#parentesco').val(data.parentesco);
      $('#tel_acom').val(data.tel_acom);
      $('#ciudad').val(data.ciudad);
      $('#cdm').val(data.cdm);
      $('#departamento').val(data.departamento);
      $('#cddep').val(data.cddep);
      $('#zresidencial').val(data.zresidencial);
      $('#id').val(data._id);
    }
  });
}
function MostarInputPaciente() {
  $.ajax({
    url: '/ajaxpaciente',
    type: 'POST',
    datatype: 'json',
    data: {
      cedula: $('#cedula').val()
    },
    success: (data) => {
      if (data != "") {
        $('#td').val(data.td);
        $('#cedula').val(data.cedula);
        $('#nombre').val(data.nombre);
        $('#snombre').val(data.snombre);
        $('#apellido').val(data.apellido);
        $('#sapellido').val(data.sapellido);
        $('#sexo').val(data.sexo);
        $('#nacimiento').val(data.nacimiento);
        $('#edad').val(data.edad);
        $('#unidad').val(data.unidad);
        $('#ecivil').val(data.ecivil);
        $('#direccion').val(data.direccion);
        $('#telefono').val(data.telefono);
        $('#email').val(data.email);
        $('#nombre_acom').val(data.nombre_acom);
        $('#parentesco').val(data.parentesco);
        $('#tel_acom').val(data.tel_acom);
        $('#ciudad').val(data.ciudad);
        $('#cdm').val(data.cdm);
        $('#departamento').val(data.departamento);
        $('#cddep').val(data.cddep);
        $('#zresidencial').val(data.zresidencial);
        $('#id').val(data._id);
      }else{
        $('#nombre').val("");
        $('#snombre').val("");
        $('#apellido').val("");
        $('#sapellido').val("");
        $('#sexo').val("");
        $('#nacimiento').val("");
        $('#edad').val("");
        $('#unidad').val("");
        $('#ecivil').val("");
        $('#direccion').val("");
        $('#telefono').val("");
        $('#email').val("");
        $('#nombre_acom').val("");
        $('#parentesco').val("");
        $('#tel_acom').val("");
        $('#ciudad').val("");
        $('#cdm').val("");
        $('#departamento').val("");
        $('#cddep').val("");
        $('#zresidencial').val("");
        $('#id').val("");
      }
    }
  });
}


function consultarEntidad() {
  var nit = $('#entidad').val();
  $.ajax({
    url: '/ajaxentidad',
    type: 'POST',
    datatype: 'json',
    data: {
      nit: nit
    },
    success: (data) => {
      eps = data[0];

    }
  });
}

function facturar() {
  diaActual = new Date();
  var day = diaActual.getDate();
  var month = diaActual.getMonth() + 1;
  var year = diaActual.getFullYear();
  if (parseInt(day) < 10) day = '0' + day;
  if (parseInt(month) < 10) month = '0' + month;
  fecha = day + '/' + month + '/' + year;

  vencimiento = new Date();
  vencimiento.setDate(diaActual.getDate() + 30);
  var day = vencimiento.getDate();
  var month = vencimiento.getMonth() + 1;
  var year = vencimiento.getFullYear();
  if (parseInt(day) < 10) day = '0' + day;
  if (parseInt(month) < 10) month = '0' + month;
  vence = day + '/' + month + '/' + year;

  var fechai = new Date($('#inicio').val());
  var dias = 1; // Número de días a agregar
  fechai.setDate(fechai.getDate() + dias);
  var day = fechai.getDate();
  var month = fechai.getMonth() + 1;
  var year = fechai.getFullYear();
  if (parseInt(day) < 10) day = '0' + day;
  if (parseInt(month) < 10) month = '0' + month;
  pinicio = day + '/' + month + '/' + year;
  console.log('inicio: ' + pinicio);

  var fechaf = new Date($('#fin').val());
  var dias = 1; // Número de días a agregar
  fechaf.setDate(fechaf.getDate() + dias);
  var day = fechaf.getDate();
  var month = fechaf.getMonth() + 1;
  var year = fechaf.getFullYear();
  if (parseInt(day) < 10) day = '0' + day;
  if (parseInt(month) < 10) month = '0' + month;
  pfinal = day + '/' + month + '/' + year;
  console.log('Final: ' + pfinal);

  var consecutivo = parseInt($('#consecutivo').val());
  var factura = {
    razon: 'CARLOS PARRA BUSINESS MEDICAL CENTER SAS',
    nit: '90098069-3',
    habilitacion: '1300102937',
    direccion: '',
    telefonos: '6552095-3023513182',
    email: 'gerencia@carlosparra.co',
    prefijo: 'CP',
    total: total,
    vencimiento: vence,
    fecha: fecha,
    pinicio: pinicio,
    pfinal: pfinal,
    consecutivo: consecutivo,
    paciente: paciente,
    eps: eps,
    items: listitem
  }
  var fac = JSON.stringify(factura);

  if ($('#cc').val() != "" && $('#entidad').val() != "" && listitem[0]) {
    $.ajax({
      url: '/facturar',
      type: 'POST',
      datatype: 'json',
      data: {
        fac: fac
      },
      success: (data) => {
        if (data == "ingresado") {
          location.href = "/facturar";
        }

      }
    });
  } else {
    alert('Ha datos que no han sido agregados!');
  }


}

function verConsecutivo() {
  $.ajax({
    url: '/consecutivo',
    type: 'POST',
    datatype: 'json',
    success: (data) => {
      $('#consecutivo').val(parseInt(data[0].cons) + 1);

    }
  });

}



function getfac(id) {
  $.ajax({
    url: '/getfac',
    type: 'POST',
    datatype: 'json',
    data: {
      con: id
    },
    success: (data) => {
      factura = data[0];
    }
  });

}


function consultarFactura() {
  $.ajax({
    url: '/consultasFactura',
    type: 'POST',
    datatype: 'json',
    data: {
      ini: $('#ini').val(),
      fin: $('#fin').val()
    },
    success: (data) => {
      var cadena = "";
      data.forEach(element => {
        cadena +=
          `<tr>
          <td><b>${element.prefijo}${element.consecutivo}</b></td>
          <td><${element.eps.rsocial}/td>
          <td>${element.fecha}</td>
          <td>${element.paciente.nombre}${element.paciente.apellido}${element.paciente.sapellido}</td>
          <td>$${ number_format(element.total, 2)}</td>
            <td><a href="#" class="btn btn-warning btn-sm">ver</a></td>
          </tr>`;
      });
      $('#res').html(cadena);
    }
  });

}

function imprSelec(nombre) {
  var ficha = document.getElementById(nombre);
  var ventimp = window.open(' ', 'popimpr');
  ventimp.document.write(ficha.innerHTML);
  ventimp.document.close();
  ventimp.print();
  ventimp.close();
}

function imprimirElemento() {
  var cadena = "";
  var array = [];
  array = factura.items;
  var total = 0;
  array.forEach(element => {
    total += parseInt(element.valor);
    cadena += ` 
  <div class="col-sm-3">${element.cups}</div>
  <div class="col-sm-3">${element.nombre}</div>
  <div class="col-sm-2">${element.autorizacion}</div>                                        
  <div class="col-sm-2">0%</div>                                        
  <div class="col-sm-2">$ ${number_format(element.valor, 2)}</div>`;
  });
  var cadena = ` <div id="print">
          <table border="1" style="width:100%;">
              <tr>
                  <td style="padding: 10px; "><img src="img/logo.png" alt="" width="200px"></td>
                  <td style="padding-left: 20px; font-size: 15px;"> 
                  <div style="padding: 20px;>                     
                      <p style="padding-left: 25%;"><b> CARLOS PARRA BUSINESS MEDICAL CENTER S.A.S</b></p>
                      <p style="padding-left: 25%;"> Nit: 900980769-3</p>
                      <p>CARTAGENA BRR BOCAGRANDE CR 37 133 L4</p>
                  </div>
                  </td>
                  <td style="padding-left: 20px; padding-right: 20px;"><b>FACTURA DE VENTA</b><br><b>Nro. ${factura.prefijo}${factura.consecutivo}</b></td>
              </tr>
              <tr>
              <td colspan="3"> <p style="padding-left: 25%;margin-bottom: 0px;">SOMOS REGIMEN COMUN RESPONSABLES DE IVA</p></td>                                
          </tr>
          <tr>
              <td colspan="3"> <p style="padding-left: 6%;margin-bottom: 0px;"><b>RESOLUCION DIAN</B> Nro 18763003744185 DEL 2020/01/29 VIGENCIA 24 MESES AUTORIZA PREFIJO # 125 AL 2250</p></td>
          </tr>
          <tr>
          <td colspan="3">
              <div class="row m-2">
                  <div class="col-sm-6">PACIENTE:${factura.paciente.nombre.toUpperCase()} ${factura.paciente.snombre.toUpperCase()} ${factura.paciente.apellido.toUpperCase()} ${factura.paciente.sapellido.toUpperCase()}</div>
                  <div class="col-sm-6">CC: ${factura.paciente.cedula}</div>
              </div>
              <div class="row m-2">                 
                  <div class="col-sm-4">DIRECCION: ${factura.paciente.direccion}</div>
                  <div class="col-sm-4">FECHA: ${factura.fecha}</div>                
                  <div class="col-sm-4">VENC:<b>${factura.vencimiento}</b></div>                  
              </div>
              <div class="row m-2">
              <div class="col-sm-6">CIUDAD: CARTAGENA</div>
              <div class="col-sm-6">MEDICO: CARLOS PARRA</div>
            </div>
          </td>
        
        </tr>
        <tr>
        <td colspan="3">
            <div class="row m-2 border">
                <div class="col-sm-3"><b>Cups</b></div>
                <div class="col-sm-3"><b>Procedimiento</b></div>
                <div class="col-sm-2"><b>Nro Aurizacion</b></div> 
                <div class="col-sm-2"><b>% IVA</b></div>
                <div class="col-sm-2"><b>Valor</b></div>
            </div>
            <div class="row m-2 border">
               `+ cadena + `
            </div>
        </td>
    </tr>
    <tr>
    <td colspan="3">
        <div class="row">
            <div class="col-sm-4">
                <div class="card pt-5 pb-5 pl-2 pr-2 mt-2 ml-2 mt-2 mb-2 mr-0">
                    <hr class="m-0 p-0">
                    <b class="small">Carlos Parra Bussiness Medical</b>
                </div>
            </div>
            <div class="col-sm-4">
                 <div class="card p-5 mt-2 ml-2 mt-2 mr-0 mb-2 ">
                    <hr class="m-0 p-0">
                    <b class="small">Guillet Veronique</b>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="card m-3 p-2 small">
                    <div class="row">
                        <div class="col-sm-6">SubTotal</div>
                        <div class="col-sm-6"> $ ${number_format(total, 2)}</div>                                                    
                    </div>
                     <div class="row">
                        <div class="col-sm-6">Descuento</div>
                        <div class="col-sm-6"> $0</div>                                                    
                    </div>
                     <div class="row">
                        <div class="col-sm-6">IVA</div>
                        <div class="col-sm-6"> 0%</div>                                                    
                    </div>
                     <div class="row">
                        <div class="col-sm-6">TOTAL</div>
                        <div class="col-sm-6"> $ ${number_format(total, 2)}</div>                                                    
                    </div>
                </div>
            </div>
        </div>
    </td>
</tr>
<tr>
<td colspan="3">
    <div class="row">
        <div class="col-sm-12" style="padding-left: 35%;">www.carlosparra.com.co</div>
    </div>
</td>
</tr>
          </table>
          </div>`;

  var ventana = window.open('', 'PRINT', 'height=400,width=600');
  ventana.document.write('<html><head><title>' + document.title + '</title>');
  ventana.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"     integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">'); //Aquí agregué la hoja de estilos
  ventana.document.write('</head><body >');
  ventana.document.write(cadena);
  ventana.document.write('</body></html>');
  ventana.document.close();
  ventana.focus();
  ventana.onload = function () {
    ventana.print();
    ventana.close();
  };
  return true;
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

// NUMERO  A LETRAS

function Unidades(num) {

  switch (num) {
    case 1: return "UN";
    case 2: return "DOS";
    case 3: return "TRES";
    case 4: return "CUATRO";
    case 5: return "CINCO";
    case 6: return "SEIS";
    case 7: return "SIETE";
    case 8: return "OCHO";
    case 9: return "NUEVE";
  }

  return "";
}

function Decenas(num) {

  decena = Math.floor(num / 10);
  unidad = num - (decena * 10);

  switch (decena) {
    case 1:
      switch (unidad) {
        case 0: return "DIEZ";
        case 1: return "ONCE";
        case 2: return "DOCE";
        case 3: return "TRECE";
        case 4: return "CATORCE";
        case 5: return "QUINCE";
        default: return "DIECI" + Unidades(unidad);
      }
    case 2:
      switch (unidad) {
        case 0: return "VEINTE";
        default: return "VEINTI" + Unidades(unidad);
      }
    case 3: return DecenasY("TREINTA", unidad);
    case 4: return DecenasY("CUARENTA", unidad);
    case 5: return DecenasY("CINCUENTA", unidad);
    case 6: return DecenasY("SESENTA", unidad);
    case 7: return DecenasY("SETENTA", unidad);
    case 8: return DecenasY("OCHENTA", unidad);
    case 9: return DecenasY("NOVENTA", unidad);
    case 0: return Unidades(unidad);
  }
}//Unidades()

function DecenasY(strSin, numUnidades) {
  if (numUnidades > 0)
    return strSin + " Y " + Unidades(numUnidades)

  return strSin;
}//DecenasY()

function Centenas(num) {

  centenas = Math.floor(num / 100);
  decenas = num - (centenas * 100);

  switch (centenas) {
    case 1:
      if (decenas > 0)
        return "CIENTO " + Decenas(decenas);
      return "CIEN";
    case 2: return "DOSCIENTOS " + Decenas(decenas);
    case 3: return "TRESCIENTOS " + Decenas(decenas);
    case 4: return "CUATROCIENTOS " + Decenas(decenas);
    case 5: return "QUINIENTOS " + Decenas(decenas);
    case 6: return "SEISCIENTOS " + Decenas(decenas);
    case 7: return "SETECIENTOS " + Decenas(decenas);
    case 8: return "OCHOCIENTOS " + Decenas(decenas);
    case 9: return "NOVECIENTOS " + Decenas(decenas);
  }

  return Decenas(decenas);
}//Centenas()

function Seccion(num, divisor, strSingular, strPlural) {
  cientos = Math.floor(num / divisor)
  resto = num - (cientos * divisor)

  letras = "";

  if (cientos > 0)
    if (cientos > 1)
      letras = Centenas(cientos) + " " + strPlural;
    else
      letras = strSingular;

  if (resto > 0)
    letras += "";

  return letras;
}//Seccion()

function Miles(num) {
  divisor = 1000;
  cientos = Math.floor(num / divisor)
  resto = num - (cientos * divisor)

  strMiles = Seccion(num, divisor, "MIL", "MIL");
  strCentenas = Centenas(resto);

  if (strMiles == "")
    return strCentenas;

  return strMiles + " " + strCentenas;

  //return Seccion(num, divisor, "UN MIL", "MIL") + " " + Centenas(resto);
}

function Millones(num) {
  divisor = 1000000;
  cientos = Math.floor(num / divisor)
  resto = num - (cientos * divisor)

  strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
  strMiles = Miles(resto);

  if (strMillones == "")
    return strMiles;

  return strMillones + " " + strMiles;

  //return Seccion(num, divisor, "UN MILLON", "MILLONES") + " " + Miles(resto);
}//Millones()


function NumeroALetras(num, centavos) {
  var data = {
    numero: num,
    enteros: Math.floor(num),
    centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
    letrasCentavos: "",
  };
  if (centavos == undefined || centavos == false) {
    data.letrasMonedaPlural = "EUROS";
    data.letrasMonedaSingular = "EURO";
  } else {
    data.letrasMonedaPlural = "CENTIMOS";
    data.letrasMonedaSingular = "CENTIMO";
  }

  if (data.centavos > 0)
    data.letrasCentavos = "CON " + NumeroALetras(data.centavos, true);

  if (data.enteros == 0)
    return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  if (data.enteros == 1)
    return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
  else
    return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
}//NumeroALetras()

//NUMERO  A LETRAS
function Imprimir() {

  var ventana = window.open('', 'PRINT', 'height=400,width=600');
  ventana.document.write('<html><head><title>' + document.title + '</title>');
  ventana.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"     integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">'); //Aquí agregué la hoja de estilos
  ventana.document.write('</head><body class="p-4" >');
  ventana.document.write('<div> <img src="/img/logo.png"  width="400" ></div>');
  ventana.document.write($('#imp').html());
  ventana.document.write('</body></html>');
  ventana.document.close();
  ventana.focus();
  ventana.onload = function() {
    ventana.print();
    ventana.close();
  };
  return true;
}


function compararPass() {
  var c1=$('#password').val();
  var c2=$('#password2').val();
  if (c1!=c2) {
    alert('Las contraseña no coinciden');
    $('#password').val('');
    $('#password2').val('');
  }

}

function consultarUsuario(user) {
  if (user==1) {
     user=$('#user').val();
  }
 
  $.ajax({
      url: '/consultarUsuario',
      type: 'POST',
      datatype: 'json',
      data: {
          user
      },
      success: (data) => {    
        let cont=0;   
         $('#nombre').val(data.nombre);
         $('#empleado').val(data.empleado);
         $('#firma').val(data.medico);
         $('#jefe').val(data.jefe);
       
        
         let li="";
         data.jefe.forEach(element => {
         
           jefes.push(element);
           li+=`<li>${element.nombre} <a href="#" onclick="quitarJefe(${cont})"> quitar</a></li>`;
           cont++;
         });
         $("#jef").html(`
            <ul>
            ${li}
          </ul>
         `);
       
         $('#jefes').val(JSON.stringify(jefes));
         if(data.admin==1){$('#c1').html(` Administrador <input type="checkbox" id="p1" name="p1" value="si" checked>`);}else{$('#c1').html(` Administrador <input type="checkbox" id="p1" name="p1" value="si">`);}
         if(data.sede==1){$('#c2').html(` Sede <input type="checkbox" id="p2" name="p2" value="si" checked>`);}else{$('#c2').html(` Sede <input type="checkbox" id="p2" name="p2" value="si" >`);}
         if(data.cordinador==1){$('#c3').html(` Cordinador <input type="checkbox" id="p3" name="p3" value="si" checked>`);}else{$('#c3').html(` Cordinador <input type="checkbox" id="p3" name="p3" value="si">`);}
         if(data.despacho==1){$('#c4').html(` Bodega <input type="checkbox" id="p4" name="p4" value="si" checked>`);}else{$('#c4').html(` Bodega <input type="checkbox" id="p4" name="p4" value="si">`);}
         
        
      }
  });
}