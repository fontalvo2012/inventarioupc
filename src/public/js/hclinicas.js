$("#a").click(function () {
   $('#motivo').css('visibility','visible');  
   $('#actual').css('visibility','hidden');
   $('#antecedentes').css('visibility','hidden');
   $('#fisico').css('visibility','hidden');
   $('#clinico').css('visibility','hidden');
   $('#plan').css('visibility','hidden');
   $('#terapeutico').css('visibility','hidden');
   
   $('#a').css('background-color','#D2F1ED');
   $('#b').css('background-color','');
   $('#c').css('background-color','');
   $('#d').css('background-color','');
   $('#e').css('background-color','');
   $('#f').css('background-color','');
   $('#g').css('background-color','');
});
$("#b").click(function () {
   $('#motivo').css('visibility','hidden');
   $('#actual').css('visibility','visible');
   $('#antecedentes').css('visibility','hidden');
   $('#fisico').css('visibility','hidden');
   $('#clinico').css('visibility','hidden');
   $('#plan').css('visibility','hidden');
   $('#terapeutico').css('visibility','hidden');

   $('#a').css('background-color','');
   $('#b').css('background-color','#D2F1ED');
   $('#c').css('background-color','');
   $('#d').css('background-color','');
   $('#e').css('background-color','');
   $('#f').css('background-color','');
   $('#g').css('background-color','');
});
$("#c").click(function () {
    $('#motivo').css('visibility','hidden');
    $('#actual').css('visibility','hidden');
    $('#antecedentes').css('visibility','visible');
    $('#fisico').css('visibility','hidden');
    $('#clinico').css('visibility','hidden');
    $('#plan').css('visibility','hidden');
    $('#terapeutico').css('visibility','hidden');

    $('#a').css('background-color','');
    $('#b').css('background-color','');
    $('#c').css('background-color','#D2F1ED');
    $('#d').css('background-color','');
    $('#e').css('background-color','');
    $('#f').css('background-color','');
    $('#g').css('background-color','');
});
$("#d").click(function () {
    $('#motivo').css('visibility','hidden');
    $('#actual').css('visibility','hidden');
    $('#antecedentes').css('visibility','hidden');
    $('#fisico').css('visibility','visible');
    $('#clinico').css('visibility','hidden');
    $('#plan').css('visibility','hidden');
    $('#terapeutico').css('visibility','hidden');

    $('#a').css('background-color','');
    $('#b').css('background-color','');
    $('#c').css('background-color','');
    $('#d').css('background-color','#D2F1ED');
    $('#e').css('background-color','');
    $('#f').css('background-color','');
    $('#g').css('background-color','');
});
$("#e").click(function () {
    $('#motivo').css('visibility','hidden');
    $('#actual').css('visibility','hidden');
    $('#antecedentes').css('visibility','hidden');
    $('#fisico').css('visibility','hidden');
    $('#clinico').css('visibility','visible');
    $('#plan').css('visibility','hidden');
    $('#terapeutico').css('visibility','hidden');

    $('#a').css('background-color','');
    $('#b').css('background-color','');
    $('#c').css('background-color','');
    $('#d').css('background-color','');
    $('#e').css('background-color','#D2F1ED');
    $('#f').css('background-color','');
    $('#g').css('background-color','');
});
$("#f").click(function () {
    $('#motivo').css('visibility','hidden');
    $('#actual').css('visibility','hidden');
    $('#antecedentes').css('visibility','hidden');
    $('#fisico').css('visibility','hidden');
    $('#clinico').css('visibility','hidden');
    $('#plan').css('visibility','visible');
    $('#terapeutico').css('visibility','hidden');

    $('#a').css('background-color','');
    $('#b').css('background-color','');
    $('#c').css('background-color','');
    $('#d').css('background-color','');
    $('#e').css('background-color','');
    $('#f').css('background-color','#D2F1ED');
    $('#g').css('background-color','');
});
$("#g").click(function () {
    $('#motivo').css('visibility','hidden');
    $('#actual').css('visibility','hidden');
    $('#antecedentes').css('visibility','hidden');
    $('#fisico').css('visibility','hidden');
    $('#clinico').css('visibility','hidden');
    $('#plan').css('visibility','hidden');
    $('#terapeutico').css('visibility','visible');

    $('#a').css('background-color','');
    $('#b').css('background-color','');
    $('#c').css('background-color','');
    $('#d').css('background-color','');
    $('#e').css('background-color','');
    $('#f').css('background-color','');
    $('#g').css('background-color','#D2F1ED');
});


function colocarHc(hc){    
    $.ajax({
        url: '/colocarhc',
        type: 'POST',
        datatype: 'json',
        data: {
            codigo: hc
        },           
        success: (data) => {           
          console.log(data);
          $('#motivo').val(data.motivo);
          $('#actual').val(data.actual);
          $('#antecedentes').val(data.antecedentes);
          $('#fisico').val(data.fisico);
          $('#clinico').val(data.clinico);
          $('#plan').val(data.plan);
          $('#terapeutico').val(data.terapeutico);
          
        }
    });  
}

function ImprimirHc() {

  var ventana = window.open('', 'PRINT', 'height=400,width=600');
  ventana.document.write('<html><head><title>' + document.title + '</title>');
  ventana.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"     integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">'); //Aquí agregué la hoja de estilos
  ventana.document.write('</head><body >');
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