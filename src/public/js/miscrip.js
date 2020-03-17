// MEDICOS

var paciente = [];
var factura = [];
var eps = [];
var item = [];
var listitem = [];
var total=0;



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
function blurMedicoCedula() {
  var id = $('#cedula').val();
  $.ajax({
    url: '/ajaxmedico',
    type: 'POST',
    datatype: 'json',
    data: {
      id: id
    },
    success: (data) => {
      if (data[0]) {
        $('#id').val(data[0].id);
        $('#cedula').val(data[0].cedula);
        $('#nombre').val(data[0].nombres);
        $('#email').val(data[0].email);
        $('#registro').val(data[0].registro);
        $('#telefono').val(data[0].telefono);
        $('#ingresar').css('visibility', 'hidden');
        $('#actualizar').css('visibility', 'visible');
      } else {
        $('#nombre').val("");
        $('#email').val("");
        $('#registro').val("");
        $('#telefono').val("");
      }
    }
  });
}
function actualizarMedico() {
  $.ajax({
    url: '/actualizarmedico',
    type: 'POST',
    datatype: 'json',
    data: {
      id: $('#id').val(),
      nombres: $('#nombre').val(),
      email: $('#email').val(),
      registro: $('#registro').val(),
      telefono: $('#telefono').val()
    },
    success: (data) => {
      console.log(data);
      location.href = "/addmedicos";
    }
  });
}
//   MEDICOS

// --- SELECT ---
function selectEntidad() {
  console.log('Select Entidad');
  $.ajax({
    url: '/selectEntidad',
    type: 'POST',
    datatype: 'json',
    success: (data) => {
      var cadena = `
      <select name="entidad" id="entidad" onchange="consultarEntidad();selectItems();" class="form-control form-control-sm">
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

function selectItems() {
  console.log('Select Entidad');
  var entidad = $('#entidad').val();
  $.ajax({
    url: '/itemcups',
    type: 'POST',
    datatype: 'json',
    data: {
      entidad: entidad
    },
    success: (data) => {
      var cadena = `
      <select name="item" id="item" onchange="consultarItem();" class="form-control form-control-sm">
      <option value="">Seleccionar Item</option>`;
      data.forEach(element => {
        cadena += ` <option value="${element.id}">${element.nombre}</option>`;
      });
      cadena += `</select>`;
      $('.items').html(cadena);
    }
  });
}
// --- SELECT ---


//---PACIENTE---
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
      if (data[0]) {
        paciente = data[0];
        $('#nombres').val(data[0].nombre + " " + data[0].apellido + " " + data[0].sapellido);
        $('#edad').val(data[0].edad);
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
function consultarItem() {
  var id = $('#item').val();
  $.ajax({
    url: '/ajaxitems',
    type: 'POST',
    datatype: 'json',
    data: {
      id: id
    },
    success: (data) => {
      console.log(data[0]);
      item = data[0];
    }
  });
}

function additem() {
  var aut = $('#autorizacion').val();
  var copa = $('#copa').val();
  var diag = $('#diag').val();
  if ( $('item').val() != "") {
    total+=parseInt(item.valor);
    item.autorizacion=aut;
    item.copago=copa;
    item.c_diagnostico=diag;
    listitem.push(item);
    var cad = "";
    listitem.forEach(element => {
      cad += `   
        <tr>
        <th>${element.nombre}</th>
        <td>${element.cups}</td>
        <td>${element.autorizacion}</td>
        <td>$ ${number_format(element.copago, 2)}</td>
        <td># ${number_format(element.valor, 2)}</td>
        </tr>`;
    });
    $('#res').html(cad);
  } else {
    alert('Debe llenar los campos ');
  }

}

function facturar() {
  diaActual = new Date();  
  var day = diaActual.getDate();
  var month = diaActual.getMonth() + 1;
  var year = diaActual.getFullYear();
  if(parseInt(day)<10) day='0'+day;
  if(parseInt(month)<10) month='0'+month;
  fecha = day + '/' + month + '/' + year ;

  vencimiento= new Date();
  vencimiento.setDate(diaActual.getDate()+30); 
  var day = vencimiento.getDate();
  var month = vencimiento.getMonth() + 1;
  var year = vencimiento.getFullYear();
  if(parseInt(day)<10) day='0'+day;
  if(parseInt(month)<10) month='0'+month;
  vence = day + '/' + month + '/' + year ;
  
  var fechai = new Date($('#inicio').val());
  var dias = 1; // Número de días a agregar
  fechai.setDate(fechai.getDate() + dias);  
  var day = fechai.getDate();
  var month = fechai.getMonth()+1;
  var year = fechai.getFullYear();
  if(parseInt(day)<10) day='0'+day;
  if(parseInt(month)<10) month='0'+month;
  pinicio = day + '/' + month + '/' + year ;
  console.log('inicio: '+pinicio);

  var fechaf = new Date($('#fin').val());
  var dias = 1; // Número de días a agregar
  fechaf.setDate(fechaf.getDate() + dias);
  var day = fechaf.getDate();
  var month = fechaf.getMonth()+1;
  var year = fechaf.getFullYear();
  if(parseInt(day)<10) day='0'+day;
  if(parseInt(month)<10) month='0'+month;
  pfinal = day + '/' + month + '/' + year ;
  console.log('Final: '+pfinal);

 

  var consecutivo = parseInt($('#consecutivo').val());
  var factura = {
    razon: 'CARLOS PARRA BUSINESS MEDICAL CENTER SAS',
    nit: '90098069-3',
    habilitacion: '1300102937',
    direccion: '',
    telefonos: '6552095-3023513182',
    email: 'gerencia@carlosparra.co',
    prefijo: 'CP',
    total:total,
    vencimiento:vence,
    fecha:fecha,
    pinicio:pinicio,
    pfinal:pfinal,
    consecutivo: consecutivo,
    paciente: paciente,
    eps: eps,
    items: listitem
  }
  var fac = JSON.stringify(factura);

  if ($('#cc').val() != "" && $('#entidad').val() != ""  && listitem[0]) {
    $.ajax({
      url: '/facturar',
      type: 'POST',
      datatype: 'json',
      data: {
        fac: fac
      },
      success: (data) => {
        console.log(data);
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
      console.log(data);
      $('#consecutivo').val(parseInt(data[0].cons) + 1);

    }
  });

}

function consularPaciente(){
  var cc=$('#cc').val();
  $.ajax({
    url: '/ajax_consultarpacientes',
    type: 'POST',
    datatype: 'json',
    data:{
      cc:cc
    },
    success: (data) => {
      var cadena="";
      data.forEach(element => {
        cadena+=`
          <tr>
            <td>${element.cedula}</td>
            <td>${element.nombre} ${element.apellido} ${element.sapellido}</td>
            <td>${element.telefono}</td>
            <td>${element.direccion}</td>
            <td> <a href="/delpaciente/${element.cedula}" class="btn btn-danger btn-sm">del</a></td>
          </tr>
        `;
      });
      $('#cuerpo').html(cadena);
      console.log(cadena);
    }
  });
}


function getfac(id) {
  $.ajax({
    url: '/getfac',
    type: 'POST',
    datatype: 'json',
    data:{
      con:id
    },
    success: (data) => {
      
      factura=data[0];
      console.log(factura);
    }
  });

}


function consultarFactura() {
  $.ajax({
    url: '/consultasFactura',
    type: 'POST',
    datatype: 'json',
    data:{
      ini:$('#ini').val(),
      fin:$('#fin').val()
    },
    success: (data) => {
      console.log(data);
      var cadena="";
      data.forEach(element => {
        cadena+=
        `<tr>
          <td><b>${element.prefijo}${element.consecutivo}</b></td>
          <td><${element.eps.rsocial}/td>
          <td>${element.fecha}</td>
          <td>${element.paciente.nombre}${element.paciente.apellido}${element.paciente.sapellido}</td>
          <td>$${ number_format(element.total, 2) }</td>
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
  ventimp.document.write( ficha.innerHTML );
  ventimp.document.close();
  ventimp.print( );
  ventimp.close();
}

function imprimirElemento() {
var cadena="";
var array=[];
array = factura.items;
var total=0;
array.forEach(element => {
  total+=parseInt(element.valor);
  cadena+=` 
  <div class="col-sm-3">${element.cups}</div>
  <div class="col-sm-3">${element.nombre}</div>
  <div class="col-sm-2">${element.autorizacion}</div>                                        
  <div class="col-sm-2">0%</div>                                        
  <div class="col-sm-2">$ ${number_format(element.valor,2)}</div>`;
});
  var cadena=` <div id="print">
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
               `+cadena+`
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
  ventana.onload = function() {
    ventana.print();
    ventana.close();
  };
  return true;
}

function number_format(amount, decimals) {

  amount += ''; // por si pasan un numero en vez de un string
  amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

  decimals = decimals || 0; // por si la variable no fue fue pasada

  // si no es un numero o es igual a cero retorno el mismo cero
  if (isNaN(amount) || amount === 0) 
      return parseFloat(0).toFixed(decimals);

  // si es mayor o menor que cero retorno el valor formateado como numero
  amount = '' + amount.toFixed(decimals);

  var amount_parts = amount.split('.'),
      regexp = /(\d+)(\d{3})/;

  while (regexp.test(amount_parts[0]))
      amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

  return amount_parts.join('.');
}