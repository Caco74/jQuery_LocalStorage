const estudiante = [
];

window.onload = cargarEventos;

function cargarEventos() {
  limpiarInputs();
  mostrarTabla();
  document.getElementById('formulario').addEventListener('submit', validar, false);
}

function mostrarTabla() {
  let cuerpoTabla = document.getElementById('estudiante-tabla');
  let tablaCompleta = "";
  for (let i = 0; i < estudiante.length; i++) {
    tablaCompleta += "<tr><td>"+estudiante[i].codigo+"</td><td>"+estudiante[i].nombre+"</td><td id='nota-"+ (i+1) +"'>"+estudiante[i].nota+"</td><td><button onclick='editarEstudiante(\'"+estudiante[i].codigo+"\')'>Editar</button></td><td><button onclick='eliminarEstudiante(\'"+estudiante[i].codigo+"\')'>Eliminar</button></td></tr>";
  }
  cuerpoTabla.innerHTML = tablaCompleta;
}

function nuevoEstudiante() {
  event.preventDefault();
  //let codigo = document.getElementById('codigoEstudiante').value;
  //let nombre = document.getElementById('nombreEstudiante').value;
  // let nota = document.getElementById('notaEstudiante').value;
  let codigo = $('#codigoEstudiante').val();
  let nombre = $('#nombreEstudiante').val();
  let nota = $('#notaEstudiante').val();
  let nuevoEstudiante = { codigo: codigo, nombre: nombre, nota: nota };
  let busqueda = codigo;
  let indice = estudiante.findIndex(registro => registro.codigo === busqueda);
  if (indice != -1) {
    alert("El código de estudiante ya existe!");
  } else {
    estudiante.push(nuevoEstudiante);
    mostrarTabla();
  }
}

function limpiarErrores() {
  let errores = document.getElementsByClassName('text-danger');
  for (var i = 0; i < errores.length; i++) {
    errores[i].innerHTML = "";
  }
}

function limpiarInputs() {
  formulario.codigoEstudiante.value = "";
  formulario.nombreEstudiante.value = "";
  formulario.notaEstudiante.value = "";
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
// *********************************

// Mostrar PROMEDIO
function promedio() {
  let suma = 0;
  for (let i = 0; i < estudiante.length; i++) {
    suma = suma + parseInt(document.getElementById('nota-'+(i+1)).childNodes[0].nodeValue);
  }
  let prom = suma / estudiante.length;
  if (prom) {
    alert("Promedio estudiantes: " + prom);
  } else {
    alert("No existen notas para sacar un promedio.");
  }
}
//**********************************

// Mostrar Nota Mayor
function notaMayor() {
  let numeroMayor = document.getElementById('nota-1').childNodes[0].nodeValue;
  for (let i = 0; i < estudiante.length; i++) {
    let numeroComp = document.getElementById('nota-'+(i+1)).childNodes[0].nodeValue;
    if (numeroComp > numeroMayor) {
      numeroMayor = numeroComp;
    }
  }
  alert(numeroMayor);
}
//**********************************

//Mostrar Nota Menor
function notaMenor() {
  let numeroMenor = document.getElementById('nota-1').childNodes[0].nodeValue;
  for (let i = 0; i < estudiante.length; i++) {
    let numeroComp = document.getElementById('nota-'+(i+1)).childNodes[0].nodeValue;
    if (numeroComp < numeroMenor) {
      numeroMenor = numeroComp;
    }
  }
  alert(numeroMenor);
}
