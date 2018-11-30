function limpiar(){
  //inicializa la página
  $('#formInicio').remove();
  $('#formCrearPartida').remove();
  $('#mostrarListaPartidas').remove();
  $('#granCabecera').remove();
  $('#mostrarCabeceraJuego').remove();
  $('#mostrarAtaqueRival').remove()
  $('#mostrarAtaque').remove();
  $('#mostrarRival').remove();
  $('#mostrarElixir').remove();
  $('#mostrarMano').remove()
  $('#mostrarEsperando').remove();
}

function comprobarUsuario(){
  if ($.cookie("usr")){
    var usr=JSON.parse($.cookie("usr"));
    rest.comprobarUsuario(usr._id);
  }
  else{
    //mostrarFormularioNombre();
    mostrarLogin();
    mostrarRegistro();
  }
}
function abandonarPartida(){
  if ($.cookie("usr")){
      com.abandonarPartida();
      $.removeCookie("usr");
      location.reload();
  }
}

function mostrarLogin(){
  //limpiar();
  var cadena='<div id="formInicio">';
  cadena=cadena+'<h2>Inicio de sesión</h2>';
  cadena=cadena+'<input id="email" type="text" class="form-control" name="email" placeholder="Correo usuario">';
  cadena=cadena+'<input id="clave" type="text" class="form-control" name="clave" placeholder="Clave usuario">';
  cadena=cadena+'<button type="button" id="loginBtn" class="btn btn-primary btn-md">Iniciar Usuario</button>';
  cadena=cadena+'</div>';
  
  $('#inicio').append(cadena);

  $('#loginBtn').on('click',function(){
        var email=$('#email').val();
        var clave=$('#clave').val();
        $('#formInicio').remove();
        $('#formRegistro').remove();
        rest.loginUsuario(email,clave);
   });
}


function mostrarRegistro(){
  var cadena='<div id="formRegistro">';
  cadena=cadena+'<h2>Registro de cuenta</h2>';
  cadena=cadena+'<input id="email1" type="text" class="form-control" name="email1" placeholder="Escribe el email">';
  cadena=cadena+'<input id="clave1" type="text" class="form-control" name="clave1" placeholder="Escribe la clave">';
  cadena=cadena+'<input id="clave2" type="text" class="form-control" name="clave2" placeholder="Repite la clave">';
  cadena=cadena+'<button type="button" id="resgistroBtn" class="btn btn-primary btn-md">Registarse</button>';
 // cadena=cadena+'<p id="falloContRepetida" style="display:none">Las contraseñas no coinciden</p>';
  cadena=cadena+'</div>';
  
  $('#inicio').append(cadena);

  $('#resgistroBtn').on('click',function(){
        var email=$('#email1').val();
        var clave1=$('#clave1').val();
        var clave2=$('#clave2').val();
        if(comprobarCont(clave1,clave2)){
          $('#formInicio').remove();
          $('#formRegistro').remove();
          rest.registrarUsuario(email,clave1);
        }
        else{
          alert("Las contraseñas no coinciden");
          //mostrarAviso("Las contraseñas no coinciden");
          //$('#clave').css("border","3px solid red");
        }
     });
}

function comprobarCont(con1,con2){
  if (con1==con2){
    return true;
  }
  else{
    return false;
  }
}

function mostrarCrearPartida(){
  var cadena='<div id="formCrearPartida">';
  cadena=cadena+'<h3>Crear partida</h3>';
  cadena=cadena+'<input id="nombre" type="text" class="form-control" name="nombre" placeholder="Nombre partida">';
  cadena=cadena+'<button type="button" id="inicioBtn" class="btn btn-primary btn-md">Crear partida</button>';
  cadena=cadena+'</div>';
  
  $('#inicio').append(cadena);
  $('#formRegistro').remove();

  $('#inicioBtn').on('click',function(){
        var nombrePartida=$('#nombre').val();
        if (nombrePartida==""){
          nombrePartida="partidaAnonima";
        }
        $('#formCrearPartida').remove();
        com.crearPartida(nombrePartida);
    });
}

function mostrarInicio(){
  //mostrarListaPartidas();
  limpiar();
  mostrarCabecera();
  mostrarCrearPartida();
  rest.obtenerPartidas();
}

function mostrarCabecera(){
  $("#granCabecera").remove();
  var cadena='<div class="jumbotron text-center" id="granCabecera">';
  cadena=cadena+'<h1>CardBattle</h1>';
  cadena=cadena+"<img src='cliente/img/ImagenMenuPrincipal.jpg' style='width:40%' class='img-circle' alt='logo'>";
  cadena=cadena+'<p>Juego de cartas online</p></div>';
  $("#cabecera").append(cadena);
}

function mostrarAviso(cadena){
  $("#info span").text(cadena);
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

  $('.dropdown-menu li a').click(function(){
        var nombrePartida=$(this).text();
        if (nombrePartida!=""){
          $('#mostrarListaPartidas').remove();
          com.elegirPartida(nombrePartida);
        }
  });
}

function mostrarEsperandoRival(){
  limpiar();
  $('#mostrarEsperando').remove();
  var cadena='<div id="mostrarEsperando"><h3>Esperando rival...</h3>';
  cadena=cadena+'<img id="gif" src="cliente/img/download.gif"></div>';
  $('#cabecera').append(cadena);
}

function eliminarGif(){
  $('#gif').remove();
}

function mostrarRival(elixir,vidas){
  $('#mostrarRival').remove();
  var cadena='<div id="mostrarRival"><h3>Rival - Elixir:'+elixir+' - Vidas:'+vidas;
  cadena=cadena + '<div class="thumbnail"><img src="cliente/img/rival.png" class="img-rounded" id="rival" style="width:15%;"border:none"></div>';
  cadena=cadena+'</h3></div>';

  $('#rival').append(cadena);

  $('[id=Rival]').click(function(){
   atacarAlRival();
  //com.jugarCarta(nombreCarta);
  });
}

function mostrarAtaqueRival(datos){
  $('#mostrarAtaqueRival').remove();
  var cadena='<div id="mostrarAtaqueRival">';
  for(var i=0;i<=(5-datos.length)/2;i++){
    cadena=cadena+'<div class="col-md-1">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/nocartaataque.png" class="img-rounded" alt="carta" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  for(var i=0;i<datos.length;i++){    
    cadena=cadena+'<div class="col-md-1">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" id="'+datos[i].nombre+'" class="img-rounded" name="atacarRival" style="width:100%">';
    cadena=cadena+'<div class="col-md-1"></div>';
    cadena=cadena+'</div></div>'
  }
  for(var i=0;i<=(5-datos.length)/2;i++){
    cadena=cadena+'<div class="col-md-1">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/nocartaataque.png" class="img-rounded" alt="carta" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  cadena=cadena+'</div>';
  $('#ataqueRival').append(cadena);

  $('[name="atacarRival"]').dblclick(function(){
   var cartaObjetivo=$(this).attr("id");
    if (cartaObjetivo!=""){
      com.cartaObjetivo=cartaObjetivo;
    }
  });
}

function mostrarAtaque(datos){
  $('#mostrarAtaque').remove();
  var cadena='<div id="mostrarAtaque"><h3>Zona de Ataque</h3>';
  for(var i=0;i<=(5-datos.length)/2;i++){
    cadena=cadena+'<div class="col-md-1">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/nocartaataque.png" class="img-rounded" alt="carta" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  for(var i=0;i<datos.length;i++){   
    cadena=cadena+'<div class="col-md-1">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" id="'+datos[i].nombre+'" class="img-rounded" name="atacante" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  for(var i=0;i<=(5-datos.length)/2;i++){
    cadena=cadena+'<div class="col-md-1">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/nocartaataque.png" class="img-rounded" alt="carta" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  cadena=cadena+'</div>';
  $('#ataque').append(cadena);

  /*$('[name="atacante"]').dblclick(function(){
      console.log("ENTRA");
      var carta=$(this).attr("id");
      if (carta!=""){
        console.log("Se ha seleccionado el atacante");
        com.cartaAtacante=carta;
      }
  });*/

  $('[name="atacante"]').dblclick(function(){
        var carta=$(this).attr("id");
        if (carta!=""){
            com.atacar(carta,com.cartaObjetivo);
        }
  });
}

function atacarAlRival(){
  if (usr.cartaAtaque){
    com.atacarRival(usr.cartaAtaque);
  }
}

function mostrarElixir(datos){
  $('#mostrarElixir').remove();
  var cadena='<div id="mostrarElixir">';
  if (datos.turno){
    cadena=cadena+'<h3 style="color:white;background-color:Green">TURNO</h3>';
  }
  else{
    cadena=cadena+'<h3 style="color:white;background-color:Red">TURNO</h3>';
  }
  cadena=cadena+'<h3><button type="button" class="btn btn-success" onclick="com.pasarTurno();">Pasar turno</button> Elixir:'+datos.elixir+' - Vidas: '+datos.vidas+' <button type="button" class="btn btn-warning" onclick="abandonarPartida()">Abandonar partida</button></h3></div>';
  $('#elixir').append(cadena);
}

function mostrarMano(datos){
  $('#mostrarMano').remove();
  var numCol=Math.round(12/(datos.length));
  $('#mostrarMano').remove();
  var cadena='<div id="mostrarMano">';
  //cadena=cadena+'<div class="col-md-'+numCol+'"></div>';
  for(var i=0;i<datos.length;i++){
    cadena=cadena+'<div class="col-md-'+numCol+'">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" class="img-rounded" id="'+datos[i].nombre+'" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  // for(var i=0;i<10-datos.mano.length;i++){
  //   cadena=cadena+'<div class="col-md-1">';
  //   cadena=cadena+'<div class="thumbnail">';
  //   cadena=cadena+'<img src="cliente/img/nocarta.png" class="img-rounded" alt="carta" style="width:100%">';
  //   cadena=cadena+'</div></div>'
  // }
  //cadena=cadena+'<div class="col-md-1"></div>';
  cadena=cadena+'</div>';
  $('#mano').append(cadena);

  $('.img-rounded').dblclick(function(){
    var nombreCarta=$(this).attr("id");
    console.log(nombreCarta);
    //seleccionarCarta(nombreCarta);
    com.jugarCarta(nombreCarta);
  });
}

function seleccionarCarta(nombre){
  console.log(nombre);
  if (nombre && usr.turno){
    borrarSeleccionAtaque(usr.cartaAtaque);
    borrarSeleccionAtaque(nombre);
    $('#'+nombre).css("border","3px solid green");
    usr.cartaAtaque=nombre;
  }
}

function seleccionarCartaRival(nombre){
  console.log(nombre);
  if (nombre && usr.turno){
    borrarSeleccionRival(usr.cartaRival);
    borrarSeleccionRival(nombre);
    $('#'+nombre).css("border","3px solid green");
    usr.cartaRival=nombre;
  }
}

function comprobarFin(msg){
  if(msg=="final"){
    $('#msgFinal').modal();
    $('#modalBtn').on('click',function(){
      abandonarPartida();
    });
  }
}