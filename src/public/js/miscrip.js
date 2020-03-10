// MEDICOS

var paciente = [];
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
  if (aut != "" && $('item').val() != "") {
    total+=parseInt(item.valor);
    item.autorizacion=aut;
    listitem.push(item);
    var cad = "";
    listitem.forEach(element => {
      cad += `   
        <tr>
        <th>${element.nombre}</th>
        <td>${element.cups}</td>
        <td>${element.autorizacion}</td>
        <td>${element.valor}</td>
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
    fecha:fecha,
    pinicio:pinicio,
    pfinal:pfinal,
    consecutivo: consecutivo,
    paciente: paciente,
    eps: eps,
    items: listitem
  }
  var fac = JSON.stringify(factura);

  if ($('#cc').val() != "" && $('#entidad').val() != "" && $('#autorizacion').val() != "" && listitem[0]) {
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
          <td>$${element.total}</td>
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