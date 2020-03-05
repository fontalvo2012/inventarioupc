// MEDICOS
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