var orario = [];
var medico = [];

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
        console.log(orario);
        $('#alert').html('');
    } else {
        $('#alert').html(` <div class="alert alert-danger" role="alert"><i class='fas fa-exclamation-triangle' style='font-size:24px'></i> La hora inicial es mayor que la final </div>`);
    }

}
function agregarMedico() {
    if (orario[0]) {
        medicos = {
            cedula: $('#cedula').val(),
            nombres: $('#nombre').val(),
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
                    console.log(data);
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
        nombres: $('#nombre').val(),
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
                console.log(data);
                location.href = "/addmedicos";
                $('#alert').html(` <div class="alert alert-success" role="alert"><i class='fas fa-exclamation-triangle' style='font-size:24px'></i> Datos Actualizados</div>`);
            }
        });
    }

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
            console.log(data);
            if (data) {
                $('#id').val(data.id)
                $('#cedula').val(data.data.cedula);
                $('#especialidad').val(data.data.especialidad);
                $('#nombre').val(data.data.nombres);
                $('#email').val(data.data.email);
                $('#registro').val(data.data.registro);
                $('#telefono').val(data.data.telefono);
                $('#ingresar').css('visibility', 'hidden');
                $('#actualizar').css('visibility', 'visible');
                orario = data.data.agenda;
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
    console.log(diasemana('2020-06-06'));
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
                for (var x = 0; x <= tiempo; x += parseInt(element.duracion)) {
                    contenido += `<div class="row m-1 p-1 border"><div class="col-sm-12"><button class="btn btn-warning btn-sm btn-block"><i class='far fa-address-book' style='font-size:16px'></i> ${comvertirHora(parseInt(hi) + h)}</button></div></div>`;                   
                    h += parseInt(element.duracion);
                }
                contenido += '</div>';                
                }   
            });
            contenido += '</div>';
            $('#contenido').html(contenido);
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
function fechas() {
    agenda('');
    var medico = $('#medico').val(); 
    console.log(medico);
    $.datepicker.setDefaults($.datepicker.regional["es"]);
    $("#datepicker").datepicker({
        onSelect : function (date) {           
           agenda(diasemana(date))
           $('#fecha').val(date);
        },
        beforeShowDay: function (date) {           
            if (diasemana(date)=='lunes') {
                return [true, "event", medico];
            } else {
                return [true, '', ''];
            }
        }
    });
}