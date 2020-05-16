var orario = [];
var medico = [];
var citas=[];
var estado=false;

function agregarHorario() {
    var dia = $('#dia').val();
    var hi = $('#hi').val();
    var hf = $('#hf').val();
    var d = $('#duracion').val();
    if (hi < hf) {
        orario.push(
            {
                dia: dia,
                horaInicio: hi,
                horaFin: hf,
                duracion: d
            }
        );
        mostrarAgenda();
        
        $('#alert').html('');
    } else {
        $('#alert').html(` <div class="alert alert-danger" role="alert"><i class='fas fa-exclamation-triangle' style='font-size:24px'></i> La hora inicial es mayor que la final </div>`);
    }

}
function agregarMedico() {
    if (orario[0]) {
        medicos = {
            cedula: $('#cedula').val(),
            nombres: $('#nombre').val().toUpperCase(),
            registro: $('#registro').val(),
            especialidad: $('#especialidad').val(),
            telefono: $('#telefono').val(),
            email: $('#email').val(),
            agenda: orario
        };
        var medi = JSON.stringify(medicos);

        if (validarCamposMedicos() == '0') {
            $.ajax({
                url: '/ajaxaddmedicos',
                type: 'POST',
                datatype: 'json',
                data: {
                    medi: medi
                },
                success: (data) => {
                   
                    if (data == "ingresado") {
                        location.href = "/addmedicos";
                    }

                }
            });
            $('#alert').html('');
        } else {
            $('#alert').html(` <div class="alert alert-danger" role="alert"><i class='fas fa-exclamation-triangle' style='font-size:24px'></i> Debe ingresar datos al Medico </div>`);
        }
    } else {
        $('#alert').html(` <div class="alert alert-danger" role="alert"><i class='fas fa-exclamation-triangle' style='font-size:24px'></i> Debe ingresar agenda al Medico </div>`);
    }

}

function validarCamposMedicos() {
    var cont = 0;
    var dato = "";
    if ($('#cedula').val() == "") {
        cont++;
        $('#cedula').css('border-color', 'red');
        $('#cedula').css('color', 'black');
    } else {
        $('#cedula').css('border-color', 'black');
        $('#cedula').css('color', 'black');
    }
    if ($('#nombre').val() == "") {
        cont++;
        $('#nombre').css('border-color', 'red');
        $('#nombre').css('color', 'black');
    } else {
        $('#nombre').css('border-color', 'black');
        $('#nombre').css('color', 'black');
    }
    if ($('#registro').val() == "") {
        cont++;
        $('#registro').css('border-color', 'red');
        $('#registro').css('color', 'black');
    } else {
        $('#registro').css('border-color', 'black');
    }
    if ($('#especialidad').val() == "") {
        cont++;
        $('#especialidad').css('border-color', 'red');
        $('#especialidad').css('color', 'black');
    } else {
        $('#especialidad').css('border-color', 'black');
    }
    if ($('#telefono').val() == "") {
        cont++;
        $('#telefono').css('border-color', 'red');
        $('#telefono').css('color', 'black');
    } else {
        $('#telefono').css('border-color', 'black');
    }

    if ($('#email').val() == "") {
        cont++;
        $('#email').css('border-color', 'red');
        $('#email').css('color', 'black');
    } else {
        $('#email').css('border-color', 'black');
        $('#email').css('color', 'black');

    }
    return cont;
}

function mostrarAgenda() {
    var cadena = '';
    var cont = 0;
    orario.forEach(element => {

        cadena += `
            <tr>
            <td>${cont}</td>
            <td>${element.dia}</td>
            <td>${element.horaInicio}</td>
            <td>${element.horaFin}</td>
            <td><button class="btn-danger btn-danger btn-sm" onclick="borrarAgenda(${cont})"><i class="far fa-trash-alt" style="font-size='16px'"></i></button></td>
            </tr>
        `;
        cont++;
    });
    $('#agenda').html(cadena);
}

function borrarAgenda(id) {
    orario.splice(id, 1);
    mostrarAgenda();
}
function actualizarMedico() {
    medicos = {
        cedula: $('#cedula').val(),
        nombres: $('#nombre').val().toUpperCase(),
        registro: $('#registro').val(),
        especialidad: $('#especialidad').val(),
        telefono: $('#telefono').val(),
        email: $('#email').val(),
        agenda: orario
    };
    var medi = JSON.stringify(medicos);
    if (validarCamposMedicos() == 0) {
        $.ajax({
            url: '/actualizarmedico',
            type: 'POST',
            datatype: 'json',
            data: {
                id: $('#id').val(),
                medi: medi
            },
            success: (data) => {
               
                location.href = "/addmedicos";
                $('#alert').html(` <div class="alert alert-success" role="alert"><i class='fas fa-exclamation-triangle' style='font-size:24px'></i> Datos Actualizados</div>`);
            }
        });
    }

}

function blurMedicoCedula() {
    var cedula = $('#cedula').val();
    $.ajax({
        url: '/ajaxmedico',
        type: 'POST',
        datatype: 'json',
        data: {
            cedula: cedula
        },
        success: (data) => {           
            if (data) {
                $('#id').val(data._id)
                $('#cedula').val(data.cedula);
                $('#especialidad').val(data.especialidad);
                $('#nombre').val(data.nombres);
                $('#email').val(data.email);
                $('#registro').val(data.registro);
                $('#telefono').val(data.telefono);
                $('#ingresar').css('visibility', 'hidden');
                $('#actualizar').css('visibility', 'visible');
                orario = data.agenda;
                mostrarAgenda();
            } else {
                $('#nombre').val("");
                $('#especialidad').val("");
                $('#email').val("");
                $('#registro').val("");
                $('#telefono').val("");
                $('#ingresar').css('visibility', 'visible');
                $('#actualizar').css('visibility', 'hidden');
                orario = [];
                mostrarAgenda();
            }
        }
    });
}

function agenda(dia) {
    var cc = $('#medico').val();
    $.ajax({
        url: '/agendaMedicos',
        type: 'POST',
        datatype: 'json',
        data: {
            cc: cc
        },
        success: (data) => {
            var contenido = '<div class="row">';           
            data.agenda.forEach(element => {
                if (element.dia==dia) {                   
                contenido += '<div class="col-sm-12">';                
                var d = new Date("0001-01-01T" + element.horaFin);
                var hf = d.getHours() * 60 + d.getMinutes();
                var d = new Date("0001-01-01T" + element.horaInicio);
                var hi = d.getHours() * 60 + d.getMinutes();
                var tiempo = hf - hi;
                var h = 0;
                contenido += `
                <div class="row m-1 p-1 border"><div class="col-sm-12">
                <table border="0">               
                `;                   
                for (var x = 0; x <= tiempo; x += parseInt(element.duracion)) {                 
                    contenido+=` 
                        <tr>
                        <td><b class='small ml-3 mr-3'> ${comvertirHora(parseInt(hi) + h)}</b></td>
                        <td><b class="small ml-3 mr-3" id="${comvertirHora(parseInt(hi)+h).replace(':','')}" ><a href="#" onclick="crearCitas('${comvertirHora(parseInt(hi) + h)}')"><i class='far fa-address-book' style='font-size:16px'> Agendar</b></a></td>                        
                        </tr>`
                    h += parseInt(element.duracion);
                }
                contenido += '</table></div></div></div>';                
                }   
            });
            contenido += '</div>';
            $('#contenido').html(contenido);  
            citasUsadas(cc);
            }
    });
}
function comvertirHora(minutos) {
    var hora = minutos / 60;
    var min = minutos % 60;
    if (min < 10) {
        min = min + "0";
    }
    if (hora < 10) {
        hora = "0" + hora;
    }
    return Math.trunc(hora) + ':' + min;
}
function diasemana(fecha) {
    var dias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    var dt = new Date(fecha);
    return dias[dt.getUTCDay()];
}

function fechas(dia) {
   
    $("#datepicker").datepicker('destroy');
    agenda(''); 
    var dias={};
    dia.forEach(element => {
        dias[element.dia]=element.dia;
    });
         
    $("#datepicker").datepicker({
        onSelect : function (date) {           
           agenda(diasemana(date));
           $('#fecha').val(date);
        },
        beforeShowDay: function (date) {            
            var d=dias[diasemana(date)];
            if (d) {
                return [true, "event", "Si atiende"];
            } else {
                return [true, '', ''];
            }          
        }
    
    });
}

function diasmendicos() {
    var cedula = $('#medico').val();
    var diasfinal=[];
    $.ajax({
        url: '/ajaxmedico',
        type: 'POST',
        datatype: 'json',
        data: {
            cedula: cedula
        },
        success: (data) => {
            var c=0;
            data.agenda.forEach(element => {                
                var d=element.dia;
                diasfinal.push({dia:d});
                c++;
           });
          
           fechas(diasfinal);
           
        }
    });
}

function crearCitas(hora) {
    var nmedico=$('select[name="medico"] option:selected').text();
    var nentidad=$('select[name="entidad"] option:selected').text();
    var nitem=$('select[name="item"] option:selected').text(); 
    const cita={
        id:parseInt(hora.replace(':','')),
        medico:$('#medico').val(),
        fecha:$('#fecha').val(),
        hora:hora,
        estado:'',
        paciente:paciente,
        item:item,
        entidad:eps,
        nombres:$('#nombres').val(),      
        diagnostico:$('#diag').val(),
        motivo:$('#item').val(),
        telefono:$('#telefono').val(),
        copago:'0',
        autorizacion:'',
        nmedico:nmedico,
        nitem:nitem,
        valor:0,
        nentidad:nentidad
    };
    var c = JSON.stringify(cita);
    if ($('#cc').val()=="") {       
        $('#alert').html(` <div class="alert alert-danger" role="alert"><i class='fas fa-exclamation-triangle' style='font-size:24px'></i> Debe ingresar cedula</div>`);
    }else{
        $('#alert').html('');
        if( confirm("Desea crear la cita en la hora: "+hora)){
            $.ajax({
                url: '/addcitas',
                type: 'POST',
                datatype: 'json',
                data: {
                    cita: c
                },
                success: (data) => {                         
                    citasUsadas($('#medico').val());
                    location.href = "/citas";  
                    $('#cc').val('');
                    $('#nombres').val('');
                    $('#entidad').val('');
                }
            });
        }
       
       
    }

}
function citasUsadas(medico){    
    $.ajax({
        url: '/consultarcitas',
        type: 'POST',
        datatype: 'json',
        data: {
            fecha: $('#fecha').val(),
            medico:medico
        },           
        success: (data) => {           
           data.forEach(element => {              
               $('#'+element.hora.replace(':','')).html('<b>Asignada</b>');
           });
          
        }
    });  
}
function borrarCita(id) {
    $.ajax({
        url: '/borrarcita',
        type: 'POST',
        datatype: 'json',
        data: {
            id:id          
        },           
        success: (data) => {
            CitasApartadas();
        }
    });
}
function CitasApartadas(){ 
    $.ajax({
        url: '/apartadas',
        type: 'POST',
        datatype: 'json',
        data: {
            cedula: $('#cc').val()           
        },           
        success: (data) => {
         var cadena=`<table class="table small">       
         <tbody>`;
            data.forEach(element => {
                cadena+=` 
                     <tr>
                        <th scope="row">${element.fecha} - ${element.hora}</th>
                        <td>${element.nmedico}</td>
                        <td>${element.motivo}</td>
                        <td><a href="#" onclick="borrarCita('${element._id}')" class="btn btn-primary btn-sm">del</a></td>                             
                    </tr> `;
            });
       cadena+=` </tbody></table>`;
         console.log(data);
         $('#agendadas').html(cadena);
        }
    });  
}

function selectMedico() {
    $.ajax({
        url: '/selecmedico',
        type: 'POST',
        datatype: 'json',                  
        success: (data) => {           
           var contenido=`<select name="medico" id="medico" class="form-control form-control-sm">
           <option value="">Seleciones</option>
        `; 
           data.forEach(element => { 
               contenido+=`<option value="${element.cedula}">${element.nombres}</option>`;
           });
           contenido+=`</select>`;
           $('#selectmedico').html(contenido);          
        }
    }); 
}
