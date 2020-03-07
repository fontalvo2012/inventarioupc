// MEDICOS

var paciente=[];
var eps=[];
var item=[];
var listitem=[];

function consultarmedico(id){
    $.ajax({
      url: '/ajaxmedico',
      type: 'POST',
      datatype: 'json',
      data:{      
        id:id  
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
  function blurMedicoCedula(){
    var id=$('#cedula').val();
    $.ajax({
      url: '/ajaxmedico',
      type: 'POST',
      datatype: 'json',
      data:{      
        id:id  
      },
      success: (data) => { 
        if(data[0]){
            $('#id').val(data[0].id);
            $('#cedula').val(data[0].cedula);
            $('#nombre').val(data[0].nombres);
            $('#email').val(data[0].email);
            $('#registro').val(data[0].registro);
            $('#telefono').val(data[0].telefono);
            $('#ingresar').css('visibility','hidden');
            $('#actualizar').css('visibility','visible');
        }else{           
            $('#nombre').val("");
            $('#email').val("");
            $('#registro').val("");
            $('#telefono').val("");
        }      
      }
    });  
  }
  function actualizarMedico(){      
    $.ajax({
      url: '/actualizarmedico',
      type: 'POST',
      datatype: 'json',
      data:{
        id:$('#id').val(),
        nombres:$('#nombre').val(),
        email:$('#email').val(),
        registro:$('#registro').val(),
        telefono:$('#telefono').val() 
      },
      success: (data) => { 
          console.log(data);
          location.href = "/addmedicos";
      }
    });  
  }
//   MEDICOS

// --- SELECT ---
function selectEntidad(){ 
  console.log('Select Entidad');
  $.ajax({
    url: '/selectEntidad',
    type: 'POST',
    datatype: 'json',   
    success: (data) => { 
      var cadena=`
      <select name="entidad" id="entidad" onchange="consultarEntidad();selectItems();" class="form-control form-control-sm">
      <option value="">Seleccionar Entidad</option>
      `;
      data.forEach(element => {
        cadena+=` <option value="${element.nit}">${element.rsocial}</option>`;
      });
      cadena+=`</select>`;
      $('.entidades').html(cadena);
    }
  });  
}

function selectItems(){ 
  console.log('Select Entidad');
  var entidad=$('#entidad').val();
  $.ajax({
    url: '/itemcups',
    type: 'POST',
    datatype: 'json',
    data:{      
      entidad:entidad  
    },   
    success: (data) => { 
      var cadena=`
      <select name="item" id="item" onchange="consultarItem();" class="form-control form-control-sm">
      <option value="">Seleccionar Item</option>`;
      data.forEach(element => {
        cadena+=` <option value="${element.id}">${element.nombre}</option>`;
      });
      cadena+=`</select>`;
      $('.items').html(cadena);
    }
  });  
}
// --- SELECT ---


//---PACIENTE---
function consultarPaciente(){
  var cedula=$('#cc').val();
  $.ajax({
    url: '/ajaxpaciente',
    type: 'POST',
    datatype: 'json',
    data:{      
      cedula:cedula  
    },
    success: (data) => {
      if (data[0]) {
        paciente=data[0];
        $('#nombres').val(data[0].nombre +" "+data[0].apellido+" "+data[0].sapellido);
        $('#edad').val(data[0].edad);
        selectEntidad();
      }else{
        if (confirm("El Paciente no Existe en la Base de datos desea crearlo ? ")) {
          location.href = "/addpacientes";
        } else {
          $('#cc').val("");
        }
      }
    }
  });  
}


function consultarEntidad(){
  var nit=$('#entidad').val();
  $.ajax({
    url: '/ajaxentidad',
    type: 'POST',
    datatype: 'json',
    data:{      
      nit:nit  
    },
    success: (data) => {
      eps=data[0];
    
    }
  });  
}
function consultarItem(){
  var id=$('#item').val();
  $.ajax({
    url: '/ajaxitems',
    type: 'POST',
    datatype: 'json',
    data:{      
      id:id  
    },
    success: (data) => {      
      console.log(data[0]);
      item=data[0];
    }
  });  
}

function additem() { 
  var aut=$('#autorizacion').val();
  if (aut!="" && $('item').val()!="") {
    listitem.push({cups:item.cups,tarifa:item.valor,procedimiento:item.nombre,autorizacion:aut}); 
    var cad="";
    listitem.forEach(element => {
      cad+=`   
        <tr>
        <th>${element.procedimiento}</th>
        <td>${element.cups}</td>
        <td>${element.autorizacion}</td>
        <td>${element.tarifa}</td>
        </tr>`;
    });
     $('#res').html(cad);
  }else{
    alert('Debe llenar los campos ');
  }

}

function facturar() {
  var consecutivo=parseInt($('#consecutivo').val());
  var factura={
    razon:'CARLOS PARRA BUSINESS MEDICAL CENTER SAS',
    nit:'90098069-3',
    habilitacion:'1300102937',
    direccion:'',
    telefonos:'6552095-3023513182',
    email:'gerencia@carlosparra.co',
    prefijo:'CP',
    consecutivo:consecutivo,
    paciente:paciente,
    eps:eps,
    items:listitem
  }
  var fac= JSON.stringify(factura);
 
if($('#cc').val()!="" && $('#entidad').val()!="" && $('#autorizacion').val()!="" && listitem[0]){
  $.ajax({
    url: '/facturar',
    type: 'POST',
    datatype: 'json',
    data:{      
      fac:fac  
    },
    success: (data) => {      
      console.log(data);
      if (data=="ingresado") {
        location.href = "/facturar";
      }
     
    }
  }); 
}else{
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
     $('#consecutivo').val(parseInt(data[0].cons)+1);
     
    }
  });  
   
}