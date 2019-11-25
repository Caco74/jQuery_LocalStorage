const estudiantes = [];

$(document).ready(function() {

  limpiarErrores();
  limpiarInputs();
  mostrarTabla();

  $('#formulario').on('submit', function(e) {
    e.preventDefault();
  });

  $('#restablecer').on('click', function() {
    restablecer();
  });
});  // Document.Ready

// ■■■■■■■■■■■■■■■■■■■■■■■■■■    FUNCIONES    ■■■■■■■■■■■■■■■■■■■■■■■■■■

function restablecer() {
  $('#codigoEstudiante').val('');
  $('#nombreEstudiante').val('');
  $('#notaEstudiante').val('');
}

function validar(formulario) {
  limpiarErrores();

    if (formulario.codigoEstudiante.value.trim().length == 0) {
      document.getElementById('error-codigo').innerHTML = "Debe completar este campo";
      formulario.codigoEstudiante.focus();
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
    nuevoEstudiante();
    limpiarInputs();
    return true;
}

function mostrarTabla() {
  let cuerpoTabla = $('#estudiante-tabla');
  let tablaCompleta = "";
  $('#codigoEstudiante').focus();

  for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    let estudiante = $.parseJSON(localStorage.getItem(clave));
    estudiantes.push(estudiante);

    tablaCompleta += '<tr>';
    tablaCompleta += '<td>'+estudiante.codigo+'</td>';
    tablaCompleta += '<td>'+estudiante.nombre+'</td>';
    tablaCompleta += '<td id="nota-'+(i+1)+'">'+estudiante.nota+'</td>';
    tablaCompleta += '<td><button onclick="editarEstudiante(\''+estudiante.codigo+'\');">Editar</button></td>';
    tablaCompleta += '<td><button onclick="eliminarEstudiante(\''+estudiante.codigo+'\');">Eliminar</button></td>';
    tablaCompleta += '</tr>';
  }
  $(cuerpoTabla).html(tablaCompleta);
}

function nuevoEstudiante() {
  event.preventDefault();
  let codigo = $('#codigoEstudiante').val();
  let nombre = $('#nombreEstudiante').val();
  let nota = $('#notaEstudiante').val();

  let nuevoEstudiante = {
    codigo: codigo,
    nombre: nombre,
    nota: nota
  };

  localStorage.setItem(codigo,JSON.stringify(nuevoEstudiante));
  mostrarTabla();
  limpiarInputs();
}

function limpiarErrores() {
  let errores = $('.text-danger');
  for (let i = 0; i < errores.length; i++) {
    $(errores).val('');
  }
}

function limpiarInputs() {
  $('#codigoEstudiante').val('');
  $('#nombreEstudiante').val('');
  $('#notaEstudiante').val('');
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■    Editar | Eliminar    ■■■■■■■■■■■■■■■■■■■■■■■■■■

function editarEstudiante(codigo) {
  $('#nombreEstudiante').focus();

  for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    if (clave == codigo) {
      let estudiante = $.parseJSON(localStorage.getItem(clave));
      $('#codigoEstudiante').val(estudiante.codigo);
      $('#nombreEstudiante').val(estudiante.nombre);
      $('#notaEstudiante').val(estudiante.nota);
    }
  }
}

function eliminarEstudiante(codigo) {
  localStorage.removeItem(codigo);
  $('#codigoEstudiante').focus();
  mostrarTabla();
}

// ■■■■■■■■■■■■■■■■■■■■■■■■■■    Promedio | Nota Mayor | Nota Menor    ■■■■■■■■■■■■■■■■■■■■■■■■■■

function promedio() {
  var suma = 0;

  for (let i = 0; i < localStorage.length; i++) {
    suma = suma + parseFloat($('#nota-'+(i+1)).text());
  }
  let prom = parseFloat(suma / localStorage.length);
  if (prom) {
    alert("Promedio estudiantes: " + prom);
  } else {
    alert("No existen notas para sacar un promedio.");
  }
}

function notaMayor() {
  let numeroMayor = parseFloat($('#nota-1').text());

  for (let i = 0; i < localStorage.length; i++) {
    let numeroComp = parseFloat($('#nota-'+(i+1)).text());
    if (numeroComp > numeroMayor) {
      numeroMayor = numeroComp;
    }
  }
  alert('La nota mayor es : ' + numeroMayor);
}

function notaMenor() {
  let numeroMenor = parseFloat($('#nota-1').text());

  for (let i = 0; i < localStorage.length; i++) {
    let numeroComp = parseFloat($('#nota-'+(i+1)).text());
    if (numeroComp < numeroMenor) {
      numeroMenor = numeroComp;
    }
  }
  alert('La nota menor es : ' + numeroMenor);
}
