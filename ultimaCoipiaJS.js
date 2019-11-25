const estudiante = [];

$(document).ready(function() {

  limpiarInputs();
  limpiarErrores();
  mostrarTabla();
  contadorStorage();
  console.log(estudiante);
  console.log(estudianteJS);

  $('#formulario').on('submit', function(e) {
    e.preventDefault(); // Evita que se envíe el formulario
    var data = $('#formulario :input').serializeArray();
  });
});  // Document.Ready


// ■■■■■■■■■■■■■■■■■■■■■■■■■■    FUNCIONES EXTERNAS    ■■■■■■■■■■■■■■■■■■■■■■■■■■

function validar(formulario) {

    limpiarErrores();

    if (formulario.codigoEstudiante.value.trim().length == 0) {
      // document.getElementById('error-codigo').innerHTML = "Debe completar este campo";
      $('#error-codigo').html('Debe completar este campo');
      //formulario.codigoEstudiante.focus();
      $('#codigoEstudiante').focusin(function() {
        $(this).find('span').css('display','inline').fadeOut(3000);
        $(this).find('span').css('color','red');
      })
      return false;
    }
    if (formulario.codigoEstudiante.value.trim().length !== 3) {
      document.getElementById('error-codigo').innerHTML = "El código debe ser de 3 dígitos";
      formulario.codigoEstudiante.focus();
      return false;
    }
    if (isNaN(formulario.codigoEstudiante.value.trim())) {
      document.getElementById('error-codigo').innerHTML = "El código debe ser numérico.";
      formulario.codigoEstudiante.focus();
      return false;
    }
    if (formulario.nombreEstudiante.value.trim().length == 0) {
      document.getElementById('error-nombre').innerHTML = "Debe completar este campo";
      formulario.nombreEstudiante.focus();
      return false;
    }
    if (formulario.notaEstudiante.value.trim().length == 0) {
      document.getElementById('error-nota').innerHTML = "Debe completar este campo";
      formulario.notaEstudiante.focus();
      return false;
    }
    if (isNaN(formulario.notaEstudiante.value.trim())) {
      document.getElementById('error-nota').innerHTML = "La nota debe ser numérica.";
      formulario.notaEstudiante.focus();
      return false;
    }
    //mostrarTabla();
    nuevoEstudiante();
    //limpiarInputs();
    return true;
}

function mostrarTabla() {
  var cuerpoTabla = $('#estudiante-tabla');
  var tablaCompleta = "";
  var codigo = $('#nombreEstudiante');
  codigo.focus();

  for (var i = 0; i < localStorage.length; i++) {
    var clave = localStorage.key(i);
    var estudianteJS = $.parseJSON(localStorage.getItem(clave));
    tablaCompleta += "<tr>";
    tablaCompleta += "<td>"+estudianteJS.codigo+"</td>";
    tablaCompleta += "<td>"+estudianteJS.nombre+"</td>";
    tablaCompleta += "<td id='nota-"+(i+1)+"'>"+estudianteJS.nota+"</td>";
    tablaCompleta += "<td><button onclick='editarEstudiante("+estudianteJS.codigo+")'>Editar</button></td>";
    tablaCompleta += "<td><button onclick='eliminarEstudiante(\'"+estudianteJS.codigo+"\')'>Eliminar</button></td>";
    tablaCompleta += "</tr>";
  }
  $(cuerpoTabla).html(tablaCompleta);

}

function nuevoEstudiante() {
  event.preventDefault();
  var codigo = $('#codigoEstudiante').val();
  var nombre = $('#nombreEstudiante').val();
  var nota = $('#notaEstudiante').val();
  var nuevoEstudiante = {
    codigo: codigo,
    nombre: nombre,
    nota: nota
  };
  var busqueda = codigo;
  var indice = estudiante.findIndex(registro => registro.codigo === busqueda);
  if (indice != -1) {
    alert("El código de estudiante ya existe!");
  } else {
    localStorage.setItem(codigo,JSON.stringify(nuevoEstudiante));
    estudiante.push(nuevoEstudiante);
    mostrarTabla();
    limpiarErrores();
    limpiarInputs();
    contadorStorage();
  }
}

function limpiarErrores() {
  var errores = $('.text-danger');
  for (var i = 0; i < errores.length; i++) {
    $(errores).val('');
  }
}

function limpiarInputs() {
  $('#codigoEstudiante').val('');
  $('#nombreEstudiante').val('');
  $('#notaEstudiante').val('');
}

function contadorStorage() {
  let contador;
  if (localStorage.length > 0) {
    contador = localStorage.length + 1;
  } else {
    contador = 1;
  }
  console.log(contador);
  if (contador < 10) {
    $('#codigoEstudiante').val('00'+contador);
  } else if (contador >=10) {
    $('#codigoEstudiante').val('0'+contador);
  } else if (contador >= 100) {
    $('#codigoEstudiante').val(contador);
  } else {
    $('#codigoEstudiante').val('001');
  }
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■    Editar | Eliminar    ■■■■■■■■■■■■■■■■■■■■■■■■■■

// tablaCompleta += "<td><button onclick='editarEstudiante("+estudianteJS.codigo+")'>Editar</button></td>";
function editarEstudiante(codigo) {
  for (var i = 0; i < localStorage.length; i++) {
    var clave = localStorage.key(i);
    if (clave == codigo) {
      var estud = $.parseJSON(localStorage.getItem(clave));
      $('#codigoEstudiante').val(estud.codigo);
      $('#nombreEstudiante').val(estud.nombre);
      $('#notaEstudiante').val(estud.nota);
    }
  }
}
