var orario=[];
var medico=[];

function agregarHorario() {
    var dia=$('#dia').val();
    var hi=$('#hi').val();
    var hf=$('#hf').val();
    if(hi<hf){
        orario.push(   
            {
                dia : dia,
                horaInicio:hi,
                horaFin:hf
            }
        );
        mostrarAgenda();
        console.log(orario);
    }else{
        console.log('datos erroneos')
    }
    
}
function agregarMedico() {
    if(orario[0]){
        medico=[{
            cedula:$('#cedula').val(),
            nombres:$('#nombre').val(),
            registro:$('#registro').val(),
            epecialidad:$('#especialidad').val(),
            telefono:$('#telefono').val(),
            email:$('#email').val(),
            agenda:orario
        }];
        validarCamposMedicos();
        console.log(medico);
    }else{
        console.log('No hay agenda');        
    }
    
}

function validarCamposMedicos(){
    var cont=0;
    var dato="";
    if($('#cedula').val()==""){
        cont++;
        $('#cedula').css('border-color','red');
        $('#cedula').css('color','black');
    };
    if($('#nombre').val()==""){
        cont++;
        $('#nombre').css('border-color','red');
        $('#nombre').css('color','black');
     }
    if($('#registro').val()==""){
        cont++; 
        $('#registro').css('border-color','red');
        $('#registro').css('color','black');
    }
    if($('#especialidad').val()==""){
        cont++;
        $('#especialidad').css('border-color','red');
        $('#especialidad').css('color','black');
    }
    if($('#telefono').val()==""){
        cont++;
        $('#telefono').css('border-color','red');
        $('#telefono').css('color','black');    
    }
    if($('#email').val()==""){
        cont++;
        $('#email').css('border-color','red');
        $('#email').css('color','black'); 
    }

    
    console.log(cont);
}

function mostrarAgenda() {
    var cadena='';
    var cont=0;
    orario.forEach(element => {
        
        cadena+=`
            <tr>
            <td>${cont}</td>
            <td>${element.dia}</td>
            <td>${element.horaInicio}</td>
            <td>${element.horaFin}</td>
            <td><button class="btn-danger btn-danger btn-sm" onclick="borrarAgenda(${cont})">del</button></td>
            </tr>
        `;
        cont++;
    });
    $('#agenda').html(cadena);
}

function borrarAgenda(id){
    orario.splice(id,1);
    mostrarAgenda();
}