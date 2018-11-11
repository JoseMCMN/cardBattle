function limpiar(){
	//inicializa la página
	$('#formInicio').remove();
}

function mostrarFormularioNombre(){
	var cadena='<div id="formInicio">';
	cadena=cadena+'<h3>Iniciar sesión</h3>';
	cadena=cadena+'<input id="nombre" type="text" class="form-control" name="nombre" placeholder="Nombre usuario">';
	cadena=cadena+'<button type="button" id="inicioBtn" class="btn btn-primary btn-md">Iniciar Usuario</button>';
	cadena=cadena+'</div>';
	
	$('#inicio').append(cadena);

	$('#inicioBtn').on('click',function(){
        var nombre=$('#nombre').val();
        if (nombre==""){
        	nombre="Loli";
        }
        $('#formInicio').remove();
        rest.agregarUsuario(nombre);
     });
}

function mostrarCrearPartida(){
	var cadena='<div id="formCrearPartida">';
	cadena=cadena+'<h3>Crear partida</h3>';
	cadena=cadena+'<input id="nombre" type="text" class="form-control" name="nombre" placeholder="Nombre partida">';
	cadena=cadena+'<button type="button" id="inicioBtn" class="btn btn-primary btn-md">Crear partida</button>';
	cadena=cadena+'</div>';
	
	$('#inicio').append(cadena);

	$('#inicioBtn').on('click',function(){
        var nombrePartida=$('#nombre').val();
        if (nombrePartida==""){
        	nombrePartida="prueba";
        }
        $('#formCrearPartida').remove();
        com.crearPartida(nombrePartida);
    });
}

function mostrarListaPartidas(datos){

	$('#mostrarListaPartidas').remove();
	var cadena='<div id="mostrarListaPartidas"><h3>Elegir partida</h3>';
	cadena=cadena+'<div class="dropdown">';
  	cadena=cadena+'<button class="btn btn-primary dropdown-toggle" id="mostrarListaBtn" type="button" data-toggle="dropdown">Elegir partida ';
	cadena=cadena+'<span class="caret"></span></button>';
  	cadena=cadena+'<ul id="dropdown" class="dropdown-menu">';
  	cadena=cadena+'<li><a href="#">-</a></li>';
  	for(var i=0;i<datos.length;i++){
  		cadena=cadena+'<li><a href="#">'+datos[i].nombre+'</a></li>';
  	}
  	cadena=cadena+'</ul>';
	cadena=cadena+'</div></div>';

	$('#listaPartidas').append(cadena);

	$('#mostrarListaBtn').on('click',function(){
        var nombrePartida=$('#dropdown').val();
        if (nombrePartida!=""){
        	$('#mostrarListaPartidas').remove();
        	com.elegirPartida(nombrePartida);
        }
    });
}