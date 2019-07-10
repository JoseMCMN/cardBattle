function limpiar(){
  //inicializa la página
  $('#formInicio').remove();
  $('#formCrearPartida').remove();
  $('#mostrarListaPartidas').remove();
  $('#granCabecera').remove();
  borrarMostrarRegistro();
  $('#cabeceraLogin').remove();
  $('#cabeceraMenu').remove();
  $('#cabeceraConstruir').remove();
  $('#mostrarCabecera').remove();
  $('#cabeceraInicio').remove();
  $('#mostrarAtaqueRival').remove();
  $('#mostrarAtaque').remove();
  $('#mostrarLogin').remove();
  $('#formInicio').remove();
  $('#formInicio2').remove();
  $('#inicioPartidaBtn').remove();
  $('#mostrarRival').remove();
  $('#mostrarElixir').remove();
  $('#mostrarMano').remove();
  $('#mostrarEsperando').remove();
  $('#cabeceraModificarPerfil').remove();
  $('#cancelarBtn').remove();
  $("#cabeceraElegirConstruir").remove();
  $("#cabeceraConstruirFuego").remove();
  $("#cabeceraConstruirAgua").remove();
  $("#cabeceraConstruirAire").remove();
  $("#cabeceraConstruirTierra").remove();

  
}

function comprobarUsuario(){
  if ($.cookie("usr")){
    var usr=JSON.parse($.cookie("usr"));
    rest.comprobarUsuario(usr._id);
  }
  else{
    //mostrarFormularioNombre();
   // mostrarLogin();
   limpiar();   
   mostrarCabecera();
   mostrarNavLogin();
  }
}

function abandonarPartida(){
  if ($.cookie("usr")){
      com.abandonarPartida();
      $.removeCookie("usr");
      location.reload();
  }
}

function mostrarNavLogin(){
  var strLogin='<li><a href="#" onclick="mostrarRegistro();"><span class="glyphicon glyphicon-user-add"></span> Registrar usuario</a></li>';
  strLogin=strLogin+'<li><a href="#" onclick="mostrarLogin();"><span class="glyphicon glyphicon-log-in"></span> Iniciar sesión</a></li>';

  $('#inicioNav li').remove();
  $('#inicioNav').append(strLogin);
}

function mostrarNavLogout(){
  //var strLogout ='<li><a href="#" onclick="mostrarPerfil();"><span class="glyphicon glyphicon-user"></span> Ver perfil</a></li>';
  var strLogout = '<li><a href="#" onclick="mostrarModificarPerfil();"><span class="glyphicon glyphicon-user"></span> Modificar perfil</a></li>';
  //strLogout = strLogout+ '<li><a href="#" onclick="mostrarColeccion();"><span class="glyphicon glyphicon-list-alt"></span> Colección</a></li>';
  strLogout = strLogout+ '<li><a href="#" onclick="abandonarPartida();"><span class="glyphicon glyphicon-log-out"></span> Salir</a></li>';

  $('#inicioNav li').remove();
  $('#inicioNav').append(strLogout);
}

function mostrarNavBatalla(){
  var strLogB = '<li><a href="#" onclick="abandonarPartida();"><span class="glyphicon glyphicon-log-out"></span> Salir</a></li>';

  $('#inicioNav li').remove();
  $('[id=barraNav]').remove();
  //$('#inicioNav').append(strLogB);
}
/*
function mostrarLogin(){
  //limpiar();
  var cadena='<div id="formInicio">';
  //cadena=cadena+'<h2>Inicio de sesión</h2>';
  cadena=cadena+'<h2 style="color:rgb(31, 194, 16);">Inicio de sesión</h2>';
  cadena=cadena+'<input id="email" type="text" class="form-control" name="email" placeholder="Correo usuario" style="border:2px solid MediumSeaGreen;">';
  cadena=cadena+'<input id="clave" type="password" class="form-control" name="clave" placeholder="Clave usuario" style="border:2px solid MediumSeaGreen;">';
  cadena=cadena+'<button type="button" id="loginBtn" class="btn btn-primary btn-md" style="border:1px solid MediumSeaGreen; background-color:MediumSeaGreen;">Iniciar Sesion</button>';
  cadena=cadena+'</div>';
  
  $('#inicio').append(cadena);

  $("input").focus(function(){
      $(this).css("background-color", "#D4DAD4");
   });
   $("input").blur(function(){
      $(this).css("background-color", "#ffffff");
   });

  $('#loginBtn').on('click',function(){
        var email=$('#email').val();
        var clave=$('#clave').val();
        $('#formInicio').remove();
        $('#formRegistro').remove();
        rest.loginUsuario(email,clave);
   });

  $("#loginBtn").hover(function(){
      $(this).css("background-color", "#359D63");
  },
  function(){
      $(this).css("background-color", "#3CB371");
  });
}
*/
function mostrarLogin(){
  //borrarLogin();
  limpiar();
  //asociarEnter('#nombreBtn');
  //mostrarIntro();
  

  /*var cadena="<div id='formInicio' style='color:white'><h1>Card Battle Game</h1>";
  cadena=cadena+"<img src='cliente/img/ImagenMenuPrincipal.jpg' style='width:30%' class='img-circle' alt='logo'></div>";
  $('#cabecera').append(cadena);*/

  var cadena='<div class="jumbotron text-center" style="background-image: url(cliente/img/elementosJumb7.jpg); background-size: cover; height:10%" id="cabeceraLogin">';
  cadena=cadena+'<h2 style="color:#FFFFFF">Card Battle Game</h2>';
  cadena=cadena+'<img src="cliente/img/ImagenMenuPrincipal.jpg" style="width:20%" class="img-circle" alt="logo"></div>';
  $('#cabecera').append(cadena);


  var cadena='<div id="formInicio2" style="color:white">';
  cadena=cadena+'<h2>Inicio de sesión</h2><div id="ig1" class="input-group" style="margin-bottom:25px">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>';
  cadena=cadena+'<input id="email" type="text" class="form-control" name="email" placeholder="Escribe tu correo electrónico" style="border:2px solid MediumSeaGreen;"></div>';
  cadena=cadena+'<div id="ig2" class="input-group" style="margin-bottom:25px">';
  cadena=cadena+'<span class="input-group-addon" ><i class="glyphicon glyphicon-lock"></i></span>';
  cadena=cadena+'<input id="clave" type="password" class="form-control" name="password" placeholder="Escribe tu clave" style="border:2px solid MediumSeaGreen;"></div></div>';
  $('#cabecera').append(cadena);
  $('#cabecera').append('<p id="nombreBtn"><button type="button" style="border:1px solid MediumSeaGreen; background-color:MediumSeaGreen" id="inicioPartidaBtn" class="btn btn-primary btn-md">Iniciar sesión</button>');//' <a href="#" id="refRegistro" onclick="mostrarRegistro();">Registrar usuario</a>');
  $('#cabecera').append('<h4 id="info"><span class="label label-warning"></span></h4>');



  $('[id=inicioPartidaBtn]').on('click',function(){
      var email=$('#email').val();
      var clave=$('#clave').val();
      $('#formRegistro').remove();
      rest.loginUsuario(email,clave);
 });

  $("input").focus(function(){
      $(this).css("background-color", "#D4DAD4");
   });
   $("input").blur(function(){
      $(this).css("background-color", "#ffffff");
   });


  $("[id=inicioPartidaBtn]").hover(function(){
      $(this).css("background-color", "#359D63");
  },
  function(){
      $(this).css("background-color", "#3CB371");
  });
}


function mostrarRegistro(){
  limpiar();

  var cadena='<div class="jumbotron text-center" style="background-image: url(cliente/img/elementosJumb7.jpg); background-size: cover; height:10%" id="granCabecera">';
  cadena=cadena+'<h2 style="color:#FFFFFF">Card Battle Game</h2>';
  cadena=cadena+'<img src="cliente/img/ImagenMenuPrincipal.jpg" style="width:20%" class="img-circle" alt="logo"></div>';
  $('#cabecera').append(cadena);


  var cadena='<div id="formInicio3" style="color:white">';
  cadena=cadena+'<h2>Registro de cuenta</h2><div id="ig1" class="input-group" style="margin-bottom:20px">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>';
  cadena=cadena+'<input id="email1" type="text" class="form-control" name="email" placeholder="Escribe tu correo electrónico" style="border:2px solid MediumSeaGreen;"></div>';
  cadena=cadena+'<div id="ig2" class="input-group" style="margin-bottom:19px">';
  cadena=cadena+'<span class="input-group-addon" ><i class="glyphicon glyphicon-lock"></i></span>';
  cadena=cadena+'<input id="clave1" type="password" class="form-control" name="password" placeholder="Escribe tu clave" style="border:2px solid MediumSeaGreen;"></div>';
  cadena=cadena+'<div id="ig2" class="input-group" style="margin-bottom:19px">';
  cadena=cadena+'<span class="input-group-addon" ><i class="glyphicon glyphicon-lock"></i></span>';
  cadena=cadena+'<input id="clave2" type="password" class="form-control" name="password" placeholder="Repite tu clave" style="border:2px solid MediumSeaGreen;"></div></div>';
  $('#cabecera').append(cadena);
  $('#cabecera').append('<button id="registrarseBtn" type="button" style="border:1px solid MediumSeaGreen; background-color:MediumSeaGreen" class="btn btn-primary btn-md">Registrarse</button>');//' <a href="#" id="refRegistro" onclick="mostrarRegistro();">Registrar usuario</a>');
  //$('#cabecera').append('<h4 id="info"><span class="label label-warning"></span></h4>');

 /* var cadena='<div id="formRegistro">';
  cadena=cadena+'<h2 style="color:rgb(31, 194, 16);">Registro de cuenta</h2>';
  cadena=cadena+'<input id="email1" type="text" class="form-control" name="email1" placeholder="Escribe el correo" style="border:2px solid MediumSeaGreen;">';
  cadena=cadena+'<input id="clave1" type="password" class="form-control" name="clave1" placeholder="Escribe la clave" style="border:2px solid MediumSeaGreen;">';
  cadena=cadena+'<input id="clave2" type="password" class="form-control" name="clave2" placeholder="Repite la clave" style="border:2px solid MediumSeaGreen;">';
  cadena=cadena+'<button type="button" id="resgistroBtn" style="border:1px solid MediumSeaGreen; background-color:MediumSeaGreen;"class="btn btn-primary btn-md">Registarse</button>';
 // cadena=cadena+'<p id="falloContRepetida" style="display:none">Las contraseñas no coinciden</p>';
  cadena=cadena+'</div>';*/
  
  //$('#inicio').append(cadena);
  
  $("input").focus(function(){
    $(this).css("background-color", "#D4DAD4");
  });
  $("input").blur(function(){
    $(this).css("background-color", "#ffffff");
  });


  $("[id=registrarseBtn]").on('click',function(){
        var email=$('#email1').val();
        var clave1=$('#clave1').val();
        var clave2=$('#clave2').val();
        if(comprobarCont(clave1,clave2) && comprobarEmail(email)){
          //$('#formInicio').remove();
          //$('#formRegistro').remove();
          borrarMostrarRegistro();
          rest.registrarUsuario(email,clave1);
        }
        else{
          mostrarRegistro();
          //alert("Las contraseñas no coinciden o el correo no existe");
          //mostrarAviso("Las contraseñas no coinciden");
          //$('#clave').css("border","3px solid red");
        }
     });

    $("[id=registrarseBtn]").hover(function(){
      $(this).css("background-color", "#359D63");
    },
    function(){
        $(this).css("background-color", "#3CB371");
      });
}

function borrarMostrarRegistro(){
  $('#formInicio3').remove();
  $('#granCabecera').remove();
  $('#registrarseBtn').remove();  
}

function mostrarModificarPerfil(){
  //borrarLogin();
  limpiar();
  var uid;
  if ($.cookie("usr")!=undefined){
    var usr=JSON.parse($.cookie("usr"));
    uid=usr._id;
  }
  if(uid)
  {
    //$('#cabecera').append('<div class="container" id="cabeceraP"><div class="mainbox col-md-6 col-md-offset-3"><h2>Actualizar datos</h2><input type="text" id="email" class="form-control" placeholder="Email: '+usr.email+'"><input type="text" id="nombre" class="form-control" placeholder="Nombre: '+usr.nombre+'"><input type="password" id="newpass" class="form-control" placeholder="introduce tu nueva clave">');
    //$('#cabecera').append('<button type="button" id="actualizarBtn" class="btn btn-primary btn-md">Actualizar usuario</button> <button type="button" id="eliminarBtn" class="btn btn-danger btn-md">Eliminar usuario</button></div></div>');
    var cadena = '<div id="cabeceraModificarPerfil" class="bg4" style="padding-bottom:15px;color:white">';
    cadena = cadena + '<h2>Modificar datos del usuario</h2>';
    cadena = cadena + '<table class="table">';
    cadena = cadena + '<tr><td><label>Email: </label></td><td>'+usr.email+'</td></tr>';
    //cadena = cadena + '<tr><td><label>Nombre de jugador: </label></td><td><input id="nick" class="form-control" placeholder="Introduce tu nombre de jugador"></span></td></tr>';
    cadena = cadena + '<tr><td><label>Clave actual: </label></td><td><input type="password" id="oldpass" class="form-control" placeholder="Introduce tu clave actual"></td></td></tr>';
    cadena = cadena + '<tr><td><label>Nueva clave: </label></td><td><input type="password" id="newpass" class="form-control" placeholder="Introduce la nueva clave"></td></tr>';
    cadena = cadena + '<tr><td><label  style="margin-bottom:10px">Repite la nueva clave: </label></td><td><input type="password" id="newpass2" class="form-control" placeholder="Repite la nueva clave"></td></tr></table> ';
    cadena = cadena + '<h2><button type="button" id="atrasBtn" style="font-size: 20px" class="btn btn-warning btn-md">Atrás</button>  <button type="button" id="actualizarBtn" style="font-size: 20px" class="btn btn-primary btn-md">Actualizar usuario</button>  <button type="button" id="eliminarBtn" style="font-size: 20px" class="btn btn-danger btn-md">Eliminar usuario</button><h2></div>';
    $('#cabecera').append(cadena);

    $("input").focus(function(){
      $(this).css("background-color", "#e8f1ff");
   });
   $("input").blur(function(){
      $(this).css("background-color", "#ffffff");
   });


    $('#actualizarBtn').on('click',function(){
      var oldpass=$('#oldpass').val();
      var newpass=$('#newpass').val();
      var newpass2=$('#newpass2').val();
      //console.log("datos: "+oldpass+" "+newpass+" "+newpass2+" "+nick);
      if (oldpass=="" && newpass=="" && newpass2==""){
        alert("No hay nada que modificar");
      }
      else{
        if(!comprobarCont(newpass,newpass2)){
          mostrarModificarPerfil();
        }
        else{     
          $('#actualizarBtn').remove();   
          rest.actualizarUsuario(oldpass,newpass,newpass2);
          alert('La contraseña de ' + usr.email +' ha sido modificada');
          mostrarNavLogin();
        }
      }
    });
    
    $('#eliminarBtn').on('click',function(){
      var oldpass=$('#oldpass').val();
      if (oldpass!=""){
        //var clave=$('#clave').val();
        $('#nombre').remove();
        $('#eliminarBtn').remove();   
        rest.eliminarUsuario();
        alert('La cuenta de ' + usr.email +' ha sido eliminada');
      }
      else
        alert('Introduce tu clave actual');
    });

    $('#atrasBtn').on('click',function(){
      //mostrarNavLogin();
      //mostrarCabecera();
      //mostrarCrearElegirPartida();
      mostrarMenu();
    });
  }
  else{
    mostrarNavLogin();
    mostrarLogin();
  }
}

function comprobarEmail(email){
  if(((email.indexOf('@') != -1)) && ((email.indexOf('.com') != -1) || (email.indexOf('.es') != -1))) {
    return 1;
  }
  else{
    alert("El correo no existe");
    return 0;
  } 
}

function comprobarCont(con1,con2){
  if (con1==con2){
    return true;
  }
  else{
    alert("Las contraseñas no coinciden");
    return false;
  }
}
/*
function mostrarCrearElegirPartida(){
  mostrarCrearPartida();
  rest.obtenerPartidas();
  mostrarNavLogout();
}
*/

function mostrarCrearElegirPartida(){

  if ($.cookie("usr")){
    var usr=JSON.parse($.cookie("usr"));
    mostrarCrearPartida();
    rest.obtenerPartidas(usr._id);
    mostrarNavLogout();
  }
  else{
    //mostrarFormularioNombre();
   // mostrarLogin();
   limpiar();   
   mostrarCabecera();
   mostrarNavLogin();
  }


}


function mostrarCrearPartida(){
  //$('mostrarLogin').remove();
  limpiar();
  var cadena='<div class="jumbotron text-center" id="cabeceraInicio" style="background-image: url(cliente/img/elementosJumb7.jpg); background-size: cover; right:20%; height:20%">';
  //cadena=cadena+"<div id='formInicio' style='color:white'><h2>Card Battle Game</h2>";
  cadena=cadena+"<img src='cliente/img/imgJumboMenu.png' style='width:30%' class='img-circle' alt='logo'></div></div>";
  cadena=cadena+'<h2 id="formInicio" style="color:white;margin-bottom:10px"><span class="label label-primary"><b>Crea una partida o elige una ya creada</b></span></h2>';
  $('#cabecera').append(cadena);

  var cadena='<div id="formCrearPartida">';
  cadena=cadena+'<h3 style="color:white"><b>Crear partida</b></h3>';
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
        mostrarNavBatalla();
    });
/*
  $("[id=inicioBtn]").hover(function(){
      $(this).css("background-color", "#359D63");
  },
  function(){
      $(this).css("background-color", "#3CB371");
  });*/
}

function mostrarCabecera(){
  limpiar();
  //var cadena='<div class="jumbotron text-center" id="cabeceraInicio" style="background-image: url(https://i.ytimg.com/vi/xJzuMLz6bTU/maxresdefault.jpg); background-size: cover; height:10%">';
  //var cadena='<div class="jumbotron text-center" id="cabeceraInicio" style="background-image: url(https://data.whicdn.com/images/285235079/original.gif); background-size: cover; height:10%">';
  var cadena='<div class="jumbotron text-center" id="cabeceraInicio" style="background-image: url(cliente/img/elementosJumb5.jpg); background-size: cover; heingt:350px">';
  cadena=cadena+'<h1 style="color:#FFFFFF">Card Battle Game</h1>';
  cadena=cadena+"<img src='cliente/img/imgJumboMenu.png' style='width:40%' class='img-circle' alt='logo'>";
  cadena=cadena+'<h2 style="color:#FFFFFF">Juego de cartas online</h2></div>';
  $("#cabecera").append(cadena);
}


function mostrarListaPartidas(datos){

  $('#mostrarListaPartidas').remove();
  var cadena='<div id="mostrarListaPartidas"><h3 style="color:white"><b>Elegir partida</b></h3>';
  cadena=cadena+'<div class="dropdown">';
  cadena=cadena+'<button class="btn btn-primary dropdown-toggle" id="mostrarListaBtn" type="button" data-toggle="dropdown">Elegir partida ';
  cadena=cadena+'<span class="caret"></span></button>';
  cadena=cadena+'<ul id="dropdown" class="dropdown-menu">';
  //cadena=cadena+'<li><a href="#">-</a></li>';
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
          mostrarNavBatalla();
        }
  });
/*
  $("[id=mostrarListaBtn]").hover(function(){
      $(this).css("background-color", "#359D63");
  },
  function(){
      $(this).css("background-color", "#3CB371");
  });*/
}

function mostrarEsperandoRival(){
  limpiar();
  $('#mostrarEsperando').remove();
  mostrarNavBatalla();
  var cadena='<div id="mostrarEsperando"><h2 style="color:#ffffff;margin-bottom:25px">Esperando rival...</h2>';
  cadena=cadena+'<img id="gif" src="cliente/img/download.gif" style="width:400px; height:400px; border-radius:200px; margin-bottom:25px">';
  $('#cabecera').append(cadena);


  //var cadena='<button type="button" id="cancelarBtn" class="btn btn-danger btn-lg" style="position:center; border-radius: 12px; font-size: 40px; font-weight:bold;" onclick="abandonarPartida();">Cancelar</button></div>';
  //$('#subCabecera').append(cadena);

  $('[id=cancelarBtn]').hover(function() {
    $(this).css("box-shadow", "0 17px 50px 0 rgba(0,0,0,0.19)");
  },
  function(){
      $(this).css("box-shadow", "0 12px 16px 0 rgba(0,0,0,0.24)");
  });
}

function eliminarGif(){
  $('#gif').remove();
}

function mostrarRival(elixir,vidas,mano,cementerio,elemento,mazo){

  $('#mostrarRival').remove();
 
 /* var cadena='<div id="mostrarRival" style="color:#ffffff"><h3><img src="cliente/img/Mana.png"  id="mana" class="img-rounded" style="width:2%;"border:none">'+' Mana['+elixir+'] '+'<img src="cliente/img/Vidas.png"  id="vidas" class="img-rounded" style="width:3%;"border:none">'+' Vidas['+vidas+']';
  cadena=cadena+'</h3>';
  cadena=cadena+'<img src="cliente/img/rival.png" name="imgRival" id="jugadorRival" title="Héroe rival" class="img-rounded" style="width:15%;"border:none">';
  //cadena=cadena+'<h2 style="color:#ffffff">_________________________________________________________________</h2></div>'
  //cadena=cadena +'<div class="thumbnail"><img src="cliente/img/rival.png" class="img-rounded" id="rival" style="width:15%;"border:none"></div>';
  //cadena=cadena+'<img src="cliente/img/rival.png" class="img-rounded" id="rival" style="width:15%;"border:none"></div>';
 */
/*
  var cadena='<div id="mostrarRival" class="panel panel-default"><div class="panel-body">';
  //cadena=cadena+'<h4><div class="col-md-4"><span class="label label-default btn-block">Nombre: '+datos.nombre+'</span></div>';
  cadena=cadena+'<div class="col-md-4"><img src="cliente/img/rival.png" name="imgRival" id="jugadorRival" class="img-circle" width="50"></div>';
  cadena=cadena+'<div class="col-md-4"><span class="label label-info">Elixir:'+elixir+' Vidas:'+vidas+'</span></div></h4>';
  cadena=cadena+'</div></div>';*/

  var cadena='<div id="mostrarRival">';
  cadena=cadena+'<div class="panel panel-default>';
  cadena=cadena+'<div class="panel-body"><h3><div class="row">';
  //<div class="col-md-2">';

  //cadena=cadena+'<div class="col-md-9"><h4>';
  //cadena=cadena+'</h4></div></div>';
  cadena=cadena+'<div class="col-md-10"><div class="row">';
  //cadena=cadena+'<div class="col-md-3"><button type="button" class="btn btn-primary btn-block" onclick="com.atacarUsr();">Atacar</button></div>'; 
  //cadena=cadena+'<div class="col-md-4" style="margin-left:-35px; margin-right:20px"><span class="label label-default">Vidas: '+vidas+' | Mana: '+elixir+' | Cartas en mano: '+mano.length+' </span></div>';
  cadena=cadena+'<div class="col-md-2"; style="margin-left:0px; margin-right:0px"><span class="label label-default" style="background-color:black">Mazo: '+mazo.length+'</span></div>';
  cadena=cadena+'<div class="col-md-1"; style="margin-left:-40px; margin-right:30px"><span class="label label-default" style="background-color:#d90000">Vidas: '+vidas+'</span></div>';
  cadena=cadena+'<div class="col-md-1"; style="margin-right:10px"><span class="label label-default" style="background-color:#007efc">Mana: '+elixir+'</span></div>';
  cadena=cadena+'<div class="col-md-1"; style="margin-right:30px"><span class="label label-default" style="background-color:#c49300">Mano: '+mano.length+'</span></div>';
  cadena=cadena+'<div class="col-md-2"><img src="cliente/img/img'+elemento+'.jpg" class="img-rounded" name="imgRival" id="jugadorRival" style="position:absolute; index:-1; width:70%; right:15%; bottom:-48px"></div>';
  cadena=cadena+'<div class="col-md-2"><span class="label label-default" id="cementerio">Cementerio: '+cementerio.length+'</span></div>';

  //cadena=cadena+'<div class="col-md-2"><span class="label label-default" id="numCartasMano">'+datos.mano.length+'</span></div>';
  cadena=cadena+'</div></div></div></h3></div></div></div>';

  $('#rival').append(cadena);

  $('[id=jugadorRival]').click(function(){
    var nombre=$(this).attr("id");
    console.log(nombre);
    atacarAlRival();
    //com.jugarCarta(nombreCarta);
    if(com.cartaOrigen!=undefined){
      com.lanzarHechizoRival(com.cartaOrigen);
      com.cartaOrigen=undefined;
      com.cartaDestino=undefined;
    }
    if(com.cartaOrigenGrito!=undefined){
      com.jugarCartaGritoRival(com.cartaOrigenGrito);
      com.cartaOrigenGrito=undefined;
      com.cartaDestinoGrito=undefined;
      com.tieneObjetivosG=undefined;
    }
  });

  $('[id=jugadorRival]').hover(function(){
    if(com.cartaAtacante!=undefined){
      //$(this).css("border-style", "solid");
      $(this).css("border","2px solid #FB2115");
      $(this).css("border-style", "dashed");
    }},
    function(){
      if(com.cartaAtacante!=undefined){
        $(this).css("border","none");
    }});

  $('[id=jugadorRival]').hover(function(){
    if(com.cartaOrigen!=undefined){
      //$(this).css("border-style", "solid");
      $(this).css("border","2px solid blue");
      $(this).css("border-style", "dashed");
    }},
    function(){
      if(com.cartaOrigen!=undefined){
        $(this).css("border","none");
    }});

  $('[id=jugadorRival]').hover(function(){
    if(com.cartaOrigenGrito!=undefined){
      //$(this).css("border-style", "solid");
      $(this).css("border","2px solid orange");
      $(this).css("border-style", "dashed");
    }},
    function(){
      if(com.cartaOrigenGrito!=undefined){
        $(this).css("border","none");
    }});
}

function mostrarAtaqueRival(datos){
  $('#mostrarAtaqueRival').remove();
  var cadena='<div id="mostrarAtaqueRival">';
  for(var i=0;i<=(5-datos.length)/2;i++){
    cadena=cadena+'<div class="col-md-1" style="margin-right:50px">';
    cadena=cadena+'<div class="thumbnail" style="width:150%">';
    cadena=cadena+'<img src="cliente/img/nocartaataque.png" class="img-rounded" alt="carta" style="width:100%">';
    cadena=cadena+'</div></div>'    
  }

   for(var i=0;i<datos.length;i++){   
    cadena=cadena+'<div class="col-md-1" style="margin-right: 50px">';
      cadena=cadena+'<div class="thumbnail" name="contenedorCarta" style="opacity:1.0; border:none; background-color:transparent; width:200%">';
      cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" id="'+datos[i].nombre+'" class="img-rounded"  name="cartaRival" style="position:relative; width:100%">';
      //title="Coste: '+datos[i].coste+' Vidas: '+datos[i].vidas+' Ataque: '+datos[i].ataque+' Habilidades: '+datos[i].tipoHabilidad+'"
      cadena=cadena+'<h2 name="coste" style="position:absolute; top:-7%; left:34%; color:white">'+datos[i].coste+'</h2>';
      if(datos[i].ataque>=0){
        if(!datos[i].haAtacado && datos[i].turnosCongelado==0 && datos[i].ataque>0){
          cadena=cadena+'<img src="cliente/img/iconoAtaque.png" name="iconoAtaque" style="width:30%; position:absolute; bottom:12%; left:22%">';
        }else if(datos[i].turnosCongelado!=0){
          cadena=cadena+'<img src="cliente/img/iconoAtaqueCongelado.png" name="iconoAtaque" style="width:30%; position:absolute; bottom:12%; left:22%">';
        }else{
          cadena=cadena+'<img src="cliente/img/iconoAtaque.png" name="iconoAtaque" style="width:30%; position:absolute; bottom:12%; left:22%; filter:grayscale(100%)">';
        }
      cadena=cadena+'<h2 name="valorAtaque" style="position:absolute; bottom:7%; left:30%; color:black">'+datos[i].ataque+'</h2>';
      if(datos[i].vidas){
        cadena=cadena+'<img src="cliente/img/iconoVidasCarta2.png" name="iconoVidas" style="width:34%; position:absolute; bottom:11%; left:124%">';
        cadena=cadena+'<div name="vidas" style="position:absolute; text-align: center; bottom:7%; left:130%; color:black"><h2>'+datos[i].vidas+'</h2></div>';
      }
    cadena=cadena+'<div name="texto" style="position:absolute;  line-height: 75%; top:114px; left:37%; width:98px; height:50px; color:black; font-size:x-small; text-align:center;"';
    //cadena=cadena+'<p style="position:absolute; bottom:30%; left:50%; font-family:Arial; color:black; font-size: 12px;">'+datos[i].tipoHabilidad+'</p>';
    cadena=cadena+'<p><b>'+datos[i].texto+'</b></p></div>';
    cadena=cadena+'</div></div>';
    }
  }

  for(var i=0;i<=(5-datos.length)/2;i++){
    cadena=cadena+'<div class="col-md-1" style="margin-right:50px">';
    cadena=cadena+'<div class="thumbnail" style="width:150%">';
    cadena=cadena+'<img src="cliente/img/nocartaataque.png" class="img-rounded" alt="carta" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  cadena=cadena+'</div>';
  $('#ataqueRival').append(cadena);

  //Para invocaciones

  $('[name="cartaRival"]').click(function(){
      //console.log("ENTRA");
      var carta=$(this).attr("id");
      if (carta!="" && com.cartaAtacante!=undefined){
        console.log("Se ha seleccionado la carta objetivo");
        $('[name="cartaRival"]').css("border","none");
        $(this).css("border","2px solid red");
        com.cartaObjetivo=carta;
        atacarCarta();
      }
  });

  $('[name=cartaRival]').hover(function(){
    if(com.cartaAtacante!=undefined){
      //$(this).css("border-style", "solid");
      $(this).css("border","2px solid #FB2115");
      $(this).css("border-style", "dashed");
    }},
    function(){
      if(com.cartaAtacante!=undefined){
        $(this).css("border","none");
    }});
/*
  $('[name="contenedorCarta"]').hover(function(){
    if(com.cartaAtacante==undefined){
      $(this).animate({width: '260%'}, "fast");
      // $('[name="valorAtaque"]').css("bottom","20%");
    }
  },
  function(){
    //$(this).animate({bottom: '0px'});
    $(this).animate({width: '200%'},"fast");
  });
*/

  //Para hechizos y gritos

  $('[name="cartaRival"]').click(function(){
      //console.log("ENTRA");
      var carta=$(this).attr("id");
      if (carta!="" && com.cartaOrigen!=undefined && com.cartaOrigenGrito==undefined){
        console.log("Se ha seleccionado la carta destino");
        $('[name="cartaRival"]').css("border","none");
        $(this).css("border","2px solid red");
        com.cartaDestino=carta;
        //atacarCarta();
        console.log("origen: "+com.cartaOrigen+ " destino: "+com.cartaDestino);
        com.destinoCartaRival=true;
        //lanzarHechizo();
        com.lanzarHechizoCartaRival(com.cartaOrigen,com.cartaDestino);
        com.cartaOrigen=undefined;
        com.cartaDestino=undefined;
      }
      if (carta!="" && com.cartaOrigenGrito!=undefined && com.cartaOrigen==undefined){
        console.log("Se ha seleccionado la carta destino grito");
        $('[name="cartaRival"]').css("border","none");
        $(this).css("border","2px solid red");
        com.cartaDestinoGrito=carta;
        //atacarCarta();
        console.log("origen: "+com.cartaOrigenGrito+ " destino: "+com.cartaDestinoGrito);
        com.destinoCartaRival=true;
        //lanzarHechizo();
        com.jugarCartaGritoCartaRival(com.cartaOrigenGrito,com.cartaDestinoGrito);
        com.cartaOrigenGrito=undefined;
        com.cartaDestinoGrito=undefined;
        com.tieneObjetivosG=undefined;
      }
  });
/*
  $('[name=cartaRival]').hover(function(){
    if(com.cartaOrigen!=undefined){
      //$(this).css("border-style", "solid");
      $(this).css("border","2px solid blue");
      $(this).css("border-style", "dashed");
    }},
    function(){
      if(com.cartaOrigen!=undefined){
        $(this).css("border","none");
  }});*/

  $('[name=cartaRival]').hover(function(){
    if(com.cartaOrigen!=undefined && com.cartaOrigenGrito==undefined){
      //$(this).css("border-style", "solid");
      $(this).css("border","2px solid blue");
      $(this).css("border-style", "dashed");
    }
    if(com.cartaOrigenGrito!=undefined && com.cartaOrigen==undefined){
      //$(this).css("border-style", "solid");
      $(this).css("border","2px solid orange");
      $(this).css("border-style", "dashed");
    }
  },
    function(){
      if(com.cartaOrigen!=undefined){
        $(this).css("border","none");
      }
      if(com.cartaOrigenGrito!=undefined){
        $(this).css("border","none");
      }
  });


}

function mostrarAtaque(datos){
  $('#mostrarAtaque').remove();
  //var cadena='<div id="mostrarAtaque"><h3 style="color:#f2f2f2;">Zona de Ataque</h3>';
  var cadena='<div id="mostrarAtaque" align="center" style="margin-top: 1px">';
  for(var i=0;i<=(5-datos.length)/2;i++){
    cadena=cadena+'<div class="col-md-1" style="margin-right: 50px">';
    cadena=cadena+'<div class="thumbnail" style="opacity:1.0; width:150%">';
    cadena=cadena+'<img src="cliente/img/nocartaataque2.png" class="img-rounded" alt="carta" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  for(var i=0;i<datos.length;i++){   
    cadena=cadena+'<div class="col-md-1" style="margin-right: 50px">';
    cadena=cadena+'<div class="thumbnail" name="contenedorCarta" style="opacity:1.0; border:none; background-color:transparent; width:200%">';
   // if(!datos[i].haAtacado){
      cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" id="'+datos[i].nombre+'" class="img-rounded" name="atacante" style="position:relative; width:100%;">';
   //title="Coste: '+datos[i].coste+' Vidas: '+datos[i].vidas+' Ataque: '+datos[i].ataque+' Habilidades: '+datos[i].tipoHabilidad+'"
   // }else{
 //  cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" id="'+datos[i].nombre+'" class="img-rounded" title="Coste: '+datos[i].coste+' Vidas: '+datos[i].vidas+' Ataque: '+datos[i].ataque+' Habilidades: '+datos[i].tipoHabilidad+'" name="atacante" style="position:relative; width:100%; filter:grayscale(100%);">';
   // }
    cadena=cadena+'<h2 name="coste" style="position:absolute; top:-7%; left:34%; color:white">'+datos[i].coste+'</h2>';
    if(datos[i].ataque>=0){
      if(!datos[i].haAtacado && datos[i].turnosCongelado==0 && datos[i].ataque>0){
        cadena=cadena+'<img src="cliente/img/iconoAtaque.png" name="iconoAtaque" style="width:30%; position:absolute; bottom:12%; left:22%">';
      }else if(datos[i].turnosCongelado!=0){
        cadena=cadena+'<img src="cliente/img/iconoAtaqueCongelado.png" name="iconoAtaque" style="width:30%; position:absolute; bottom:12%; left:22%">';
      }else{
        cadena=cadena+'<img src="cliente/img/iconoAtaque.png" name="iconoAtaque" style="width:30%; position:absolute; bottom:12%; left:22%; filter:grayscale(100%)">';
      }
     // cadena=cadena+'<img src="cliente/img/iconoAtaque.png" name="iconoAtaque" style="width:30%; position:absolute; bottom:12%; left:22%">';
      cadena=cadena+'<h2 name="valorAtaque" style="position:absolute; bottom:7%; left:30%; color:black">'+datos[i].ataque+'</h2>';
    }
    if(datos[i].vidas){
      cadena=cadena+'<img src="cliente/img/iconoVidasCarta2.png" name="iconoVidas" style="width:34%; position:absolute; bottom:11%; left:124%">';
      cadena=cadena+'<div name="vidas" style="position:absolute; text-align: center; bottom:7%; left:130%; color:black"><h2>'+datos[i].vidas+'</h2></div>';
    }
    cadena=cadena+'<div name="texto" style="position:absolute;  line-height: 75%; top:114px; left:37%; width:98px; height:50px; color:black; font-size:x-small; text-align:center;"';
    //cadena=cadena+'<p style="position:absolute; bottom:30%; left:50%; font-family:Arial; color:black; font-size: 12px;">'+datos[i].tipoHabilidad+'</p>';
    cadena=cadena+'<p><b>'+datos[i].texto+'</b></p></div>';

    cadena=cadena+'</div></div>'
  }
  for(var i=0;i<=(5-datos.length)/2;i++){
    cadena=cadena+'<div class="col-md-1" style="margin-right:50px">';
    cadena=cadena+'<div class="thumbnail" style="width:150%">';
    cadena=cadena+'<img src="cliente/img/nocartaataque2.png" class="img-rounded" alt="carta" style="width:200%">';
    cadena=cadena+'</div></div>'
  }
  //cadena=cadena+'<h2 style="color:#ffffff">_________________________________________________________________</h2>'
  cadena=cadena+'</div>';
  //cadena=cadena+'<div id="zonaCementerio"></div>';
  $('#ataque').append(cadena);

  $('[name="atacante"]').click(function(){
      var carta=$(this).attr("id");      
      if(carta==com.cartaAtacante){
        console.log("Se ha eliminado la seleccion de atacante");
        com.cartaAtacante=undefined;
        $(this).css("border","none");
      }
      else if (carta!="" && com.cartaOrigen==undefined && com.cartaOrigenGrito==undefined){
        console.log("Se ha seleccionado el atacante");
        $('[name="atacante"]').css("border","none");
        $(this).css("border","2px solid red");
        com.cartaAtacante=carta;
      }
  });

  $('[name="atacante"]').hover(function(){
    //$(this).css("border-style", "solid");
    //$(this).animate({bottom: '50px'});
    //$(this).animate({width: '260%'});
    var carta=$(this).attr("id"); 
    if(carta!=com.cartaAtacante){
      $(this).css("border","3px solid green");
    }    
  },
  function(){
    //$(this).animate({bottom: '0px'});
    //$(this).animate({width: '200%'});
    var carta=$(this).attr("id"); 
    if(carta!=com.cartaAtacante){$(this).css("border","none");}
  });

/*
  $('[name="contenedorCarta"]').hover(function(){
      if(com.cartaAtacante==undefined){
        $(this).animate({width: '260%'}, "fast");
        $('[name="iconoAtaque"]').animate({width: '35%', bottom:'12%', left:'30%'}, "fast");
        $('[name="iconoVidas"]').animate({width: '39%', bottom:'11%', left:'160%'}, "fast");
        // $('[name="valorAtaque"]').css("bottom","20%");
      }
  },
  function(){
    //$(this).animate({bottom: '0px'});
    $(this).animate({width: '200%'}, "fast");
    $('[name="iconoAtaque"]').animate({width: '30%', bottom:'12%', left:'22%'}, "fast");
    $('[name="iconoVidas"]').animate({width: '34%', bottom:'11%', left:'127%'}, "fast");
  });*/


  //Para hechizos y gritos de batalla

  $('[name="atacante"]').click(function(){
      //console.log("ENTRA");
      var carta=$(this).attr("id");
      if (carta!="" && com.cartaOrigen!=undefined && com.cartaOrigenGrito==undefined){
        console.log("Se ha seleccionado la carta destino");
        $('[name="atacante"]').css("border","none");
        $(this).css("border","2px solid red");
        com.cartaDestino=carta;
        //atacarCarta();
        console.log("origen: "+com.cartaOrigen+ " destino: "+com.cartaDestino);
        com.destinoCartaRival=false;
        //lanzarHechizo();
        com.lanzarHechizoCartaJugador(com.cartaOrigen,com.cartaDestino);
        com.cartaOrigen=undefined;
        com.cartaDestino=undefined;
      }
      if (carta!="" && com.cartaOrigenGrito!=undefined && com.cartaOrigen==undefined){
        console.log("Se ha seleccionado la carta destino de grito");
        $('[name="atacante"]').css("border","none");
        $(this).css("border","2px solid orange");
        com.cartaDestinoGrito=carta;
        //atacarCarta();
        console.log("origen grito: "+com.cartaOrigenGrito+ " destino: "+com.cartaDestinoGrito);
        com.destinoCartaRival=false;
        //lanzarHechizo();
        com.jugarCartaGritoCartaJugador(com.cartaOrigenGrito,com.cartaDestinoGrito);
        com.cartaOrigenGrito=undefined;
        com.cartaDestinoGrito=undefined;
        com.tieneObjetivosG=undefined;
      }
  });

  $('[name=atacante]').hover(function(){
    if(com.cartaOrigen!=undefined && com.cartaOrigenGrito==undefined){
      //$(this).css("border-style", "solid");
      $(this).css("border","2px solid blue");
      $(this).css("border-style", "dashed");
    }
    if(com.cartaOrigenGrito!=undefined && com.cartaOrigen==undefined){
      //$(this).css("border-style", "solid");
      $(this).css("border","2px solid orange");
      $(this).css("border-style", "dashed");
    }
  },
    function(){
      if(com.cartaOrigen!=undefined ){
        $(this).css("border","none");
      }
      if(com.cartaOrigenGrito!=undefined){
        $(this).css("border","none");
      }
  });

}

/*
function lanzarHechizo(){
  if(com.cartaOrigen!=undefined && com.cartaDestino!=undefined){
    com.cartaOrigen.objetivo=com.cartaDestino;
    com.jugarCarta(com.cartaOrigen);
    //com.atacar(com.cartaAtacante,com.cartaObjetivo);
    com.cartaOrigen=undefined;
    com.cartaDestino=undefined;    
     $('#mostrarMano').remove();
    // mostrarMano();
  }
}*/

function atacarCarta(){
  if(com.cartaAtacante!=undefined && com.cartaObjetivo!=undefined){
    com.atacar(com.cartaAtacante,com.cartaObjetivo);
    com.cartaObjetivo=undefined;
    com.cartaAtacante=undefined;    
     $('#mostrarMano').remove();
    // mostrarMano();
  }
}

function atacarAlRival(){
  if (com.cartaAtacante!=undefined){
    com.atacarRival(com.cartaAtacante);
    com.cartaAtacante=undefined;
     $('#mostrarMano').remove();
     //mostrarMano();
  }  
  else{
    console.log("Debe seleccionarse el atacante");
    //alert("Debe seleccionar la carta que ataque");
  }
}
/*
function hechizoAlRival(){
  if (com.cartaOrigen!=undefined){
    com.rivalObjetivo=true;
    com.jugarCarta(com.cartaOrigen);
    com.cartaOrigen=undefined;
    com.rivalObjetivo=undefined;
     $('#mostrarMano').remove();
     //mostrarMano();
  }  
  else{
    console.log("Debe seleccionarse el atacante");
    alert("Debe seleccionar la carta que ataque");
  }
}*/

function mostrarElixir(datos){
  $('#mostrarElixir').remove();

  $('#mostrarCementerio').remove();
  $('#zonaCementerio').remove();
  var cadena='<div id="mostrarElixir">';
  cadena=cadena+'<div class="panel panel-default>';
  cadena=cadena+'<div class="panel-body"><h3><div class="row">';
  //<div class="col-md-2">';

  //cadena=cadena+'<div class="col-md-9"><h4>'
  /*if (datos.turno){
    cadena=cadena+'<span class="label label-success">TU TURNO</span>';
    $('[name="heroe"]').css("filter","grayscale(100%)");
  }
  else{
    cadena=cadena+'<span class="label label-danger" style="position:relative; top:20%">TURNO DEL RIVAL</span>';
  }*/

  //cadena=cadena+'</h4></div></div>';
  cadena=cadena+'<div class="col-md-11"><div class="row">';
  cadena=cadena+'<div class="col-md-2" style="margin-right:-20px"><span class="label label-default" style="background-color:black">Mazo: '+datos.mazo.length+'</span></div>';

  //cadena=cadena+'<div class="col-md-3"><button type="button" class="btn btn-primary btn-block" onclick="com.atacarUsr();">Atacar</button></div>'; 
  cadena=cadena+'<div class="col-md-1" style=" margin-left:-15px; margin-right:20px"><span class="label label-default" style="background-color:#d90000">Vidas: '+datos.vidas+'</span></div>';
  cadena=cadena+'<div class="col-md-1" style="margin-right:10px"><span class="label label-default" style="background-color:#007efc">Mana: '+datos.elixir+'</span></div>';
  cadena=cadena+'<div class="col-md-1" style="margin-right:50px"><span class="label label-default" style="background-color:#c49300">Mano: '+datos.mano.length+'</span></div>';
  //cadena=cadena+'<div class="col-md-4" style="margin-left:-35px; margin-right:20px"><span class="label label-default" style="background-color:red">Vidas: '+datos.vidas+' Mana: '+datos.elixir+' Cartas en mano: '+datos.mano.length+'</span></div>';
  cadena=cadena+'<div class="col-md-1" style="margin-right:-15px"><img src="cliente/img/img'+datos.elemento+'.jpg" class="img-rounded" name="heroe" id="heroe" style="position:absolute; index:-1; width:120%; right:15%; bottom:-48px"></div>';

  if(datos.cementerio.length){
    cadena=cadena+'<div class="col-md-1" style="margin-right:55px; margin-left;20px"><span class="label label-default" id="cementerio">Cementerio: '+datos.cementerio.length+'</span></div>';
  }else{
    cadena=cadena+'<div class="col-md-1" style="margin-right:55px; margin-left;20px"><span class="label label-default" id="cementerio">Cementerio: 0</span></div>';
   }

  if (datos.turno){
    cadena=cadena+'<div class="col-md-2"><button type="button" class="btn btn-success btn-block" onclick="com.pasarTurno();">Pasar turno</button></div>';
  }
  else{
    cadena=cadena+'<div class="col-md-2"><button type="button" class="btn btn-danger btn-block" onclick="com.pasarTurno();">Turno del rival</button></div>';
  }
  
  var cartasMano=datos.mano;
  //cadena=cadena+'<div class="col-md-2"><span class="label label-default" id="numCartasMano">'+datos.mano.length+'</span></div>';
  cadena=cadena+'<div class="col-md-2"><button type="button" class="btn btn-warning btn-block" onclick="abandonarPartida()">Abandonar</button></div>';
  cadena=cadena+'</div></div></div></h3></div></div></div>';
  cadena=cadena+'<div id="zonaCementerio"  align="center"></div>';


  $('#elixir').append(cadena);

  $('[id=cementerio]').hover(function(){
      //$(this).css("border-style", "solid");
      //$(this).css("border","5px solid #1583F0");
      //$(this).css("opacity","0.8");
      //com.obtenerCartasCementerio();
      //console.log("Ahora true");
      $(this).css("border-style", "solid");
      $(this).css("border","3px solid #8F00FF");
            //com.obtenerCartasCementerio();
      //com.zonaCementerio=true;
    },
    function(){
        //$(this).css("border","none");
        //$(this).css("opacity","1");
        //$('#mostrarCementerio').remove();
        //$('[id=cartasCementerio]').remove();
        //console.log("Ahora false");
        $(this).css("border-style", "none");
        //$('#mostrarCementerio').remove();
        //$('[id=cartasCementerio]').remove();
        //com.zonaCementerio=undefined;
    });

    $('[id=cementerio]').click(function(){  
      if(com.cementerioMostrado==false){
        $(this).fadeIn("slow");
        $(this).css("border-style", "solid");
        $(this).css("border","3px solid #8F00FF");
        com.obtenerCartasCementerio();
        com.cementerioMostrado=true;
      }else{
        $('[id=cementerio]').css("border-style", "none");
        $('#mostrarCementerio').remove();
        com.cementerioMostrado=false;
      }
    });

    /*$('[id=cementerio]').click(function(){  
      if(com.zonaCementerio==true){
        console.log("Ahora false");
        $(this).css("border-style", "none");
        $('#zonaCementerio').remove();
      }       
    });*/

    $('[id=heroe]').click(function(){
      var nombre=$(this).attr("id");
      console.log(nombre);
      //com.jugarCarta(nombreCarta);
      if(com.cartaOrigen!=undefined){
        com.lanzarHechizoJugador(com.cartaOrigen);
        com.cartaOrigen=undefined;
        com.cartaDestino=undefined;
      }
      if(com.cartaOrigenGrito!=undefined){
        com.jugarCartaGritoJugador(com.cartaOrigenGrito);
        com.cartaOrigenGrito=undefined;
        com.cartaDestinoGrito=undefined;
        com.tieneObjetivosG=undefined;
      }
    });

    $('[id=heroe]').hover(function(){
      if(com.cartaOrigen!=undefined && com.cartaOrigenGrito==undefined){
        //$(this).css("border-style", "solid");
        $(this).css("border","2px solid blue");
        $(this).css("border-style", "dashed");
      }
      if(com.cartaOrigenGrito!=undefined && com.cartaOrigen==undefined ){
        //$(this).css("border-style", "solid");
        $(this).css("border","2px solid orange");
        $(this).css("border-style", "dashed");
      }
      },
      function(){
        if(com.cartaOrigen!=undefined){
          $(this).css("border","none");
        }
        if(com.cartaOrigenGrito!=undefined){
          $(this).css("border","none");
        }
    });
}

function mostrarCementerio(datos){
  $('#mostrarCementerio').remove();
  $('[id=cartasCementerio]').remove();

  var numCol=Math.round(6/(datos.length));
  //var numCol=2;
  var cadena='<div id="mostrarCementerio" style="color:white">';
  cadena=cadena+'<h3 style="color:white;background-color:#8F00FF">CEMENTERIO</h3>';
  for(var i=0;i<datos.length;i++){
    cadena=cadena+'<div class="col-md-1" style="margin-right:-45px;">';
    cadena=cadena+'<div class="thumbnail" id="cartasCementerio" style="position:relative; width:250%; z-index:0; border-style:none;background-color:transparent;">';
    cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" name="cartasCementerio" class="img-rounded" id="'+datos[i].nombre+'" style="width:200%;">';
    cadena=cadena+'</div></div>';
  }
  //cadena=cadena+'<img src="cliente/img/volverCementerio.png" id="volverCementerio" class="img-rounded" style="width:5%;float:right">';
  //cadena=cadena+'<h2 style="color:#ffffff">_________________________________________________________________</h2></div>'
  
  $('#zonaCementerio').append(cadena);

  $('[id=volverCementerio]').click(function(){  
      $('[id=cementerio]').css("border-style", "none");
      $('#mostrarCementerio').remove();
    });

  $('[id="cartasCementerio"]').hover(function(){
      $(this).css("z-index","10000");
      $(this).css("margin-top","-13px");
  },
  function(){
      $(this).css("z-index","0");
      $(this).css("margin-top","0px");
  });
}

 /*function existenObjetivosGrito(datos){
   return datos;
 }*/

function tieneObjetivosDisponiblesGrito(datos){
  com.tieneObjetivosG=datos;
}

function mostrarMano(datos,elixir){

  mostrarNavBatalla();
  $('#mostrarMano').remove();
  var numCol=Math.round(12/(datos.length));
  $('#mostrarMano').remove();
  var cadena='<div id="mostrarMano" style=" width:83%; position:absolute; left:70px">';
  for(var i=0;i<datos.length;i++){
/*    cadena=cadena+'<div class="col-md-'+numCol+'">';
    cadena=cadena+'<div class="thumbnail" id="cartasMano" style="border-style:none;background-color:transparent">';
    cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" name="cartasMano" class="img-rounded" id="'+datos[i].nombre+'" tipo="'+datos[i].tipo+'" objetivos='+datos[i].tieneObjetivos+'  style="width:100%;">';
    
//cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" id="'+datos[i].nombre+'" class="img-rounded" title="Coste: '+datos[i].coste+' Vidas: '+datos[i].vidas+' Ataque: '+datos[i].ataque+' Habilidades: '+datos[i].tipoHabilidad+'" name="atacante" style="position:relative; width:100%">';
      cadena=cadena+'<h2 style="position:absolute; top:-4%; left:37%; color:white">'+datos[i].coste+'</h2>';
      if(datos[i].ataque){
        cadena=cadena+'<img src="cliente/img/iconoAtaque.png" style="width:35%; position:absolute; bottom:12%; left:25%">';
//      cadena=cadena+'<div style="position:absolute; bottom:8%; left:37%; color:black"><h2>'+datos[i].ataque+'</h2></div>';
        cadena=cadena+'<h2 style="position:absolute; bottom:7%; left:33%; color:black">'+datos[i].ataque+'</h2>';
      }
      if(datos[i].vidas){
        cadena=cadena+'<img src="cliente/img/iconoVidasCarta2.png" style="width:39%; position:absolute; bottom:11%; left:147%">';
        cadena=cadena+'<div style="position:absolute; text-align: center; bottom:7%; left:153%; color:black"><h2>'+datos[i].vidas+'</h2></div>';
      }
      cadena=cadena+'<div style="position:absolute; top:140px; left:47%; width:110px; height:60px; border:3px solid red; color:black; font-size:x-small; text-align:center;"';
      //cadena=cadena+'<p style="position:absolute; bottom:30%; left:50%; font-family:Arial; color:black; font-size: 12px;">'+datos[i].tipoHabilidad+'</p>';
      cadena=cadena+'<p style="text-align:center;">'+datos[i].texto+'</p></div>';

    cadena=cadena+'</div></div>';*/


    cadena=cadena+'<div class="col-md-1" style="margin-right: 16px">';
    cadena=cadena+'<div class="thumbnail" id="cartasMano" style="position:absolute; width:200%; z-index:-1; border-style:none; background-color:transparent">';
    cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png"  name="cartasMano" class="img-rounded" id="'+datos[i].nombre+'" tipo="'+datos[i].tipo+'" objetivos='+datos[i].tieneObjetivos+'  style="width:100%; position:relative; z-index:-10000">';  
    if(datos[i].coste<=elixir){
      cadena=cadena+'<h1 name="coste" style="position:absolute; top:-5%; left:8%; color:white"><b>'+datos[i].coste+'</b></h1>';
    }else{
      cadena=cadena+'<h1 name="coste" style="position:absolute; top:-5%; left:8%; color:red"><b>'+datos[i].coste+'</b></h1>';
    }
    if(datos[i].ataque){
      cadena=cadena+'<img src="cliente/img/iconoAtaque.png" name="iconoAtaque" style="width:25%; position:absolute; bottom:1%; left:0%">';
//    cadena=cadena+'<div style="position:absolute; bottom:8%; left:37%; color:black"><h2>'+datos[i].ataque+'</h2></div>';
      cadena=cadena+'<h1 name="valorAtaque" style="position:absolute; bottom:-1%; left:4%; color:black"><b>'+datos[i].ataque+'</b></h1>';
    }
    if(datos[i].vidas){
      cadena=cadena+'<img src="cliente/img/iconoVidasCarta2.png" name="iconoVidas" style="width:29%; position:absolute; bottom:1%; left:75%">';
      cadena=cadena+'<div name="vidas" style="position:absolute; text-align: center; bottom:-1%; left:80%; color:black"><h1><b>'+datos[i].vidas+'</b></h1></div>';
    }
    cadena=cadena+'<div name="texto" style="position:absolute;  line-height: 101%; bottom:11%; left:17%; width:129px; height:62px; color:black; font-size:x-small; text-align:center;"';
    //cadena=cadena+'<p style="position:absolute; bottom:30%; left:50%; font-family:Arial; color:black; font-size: 12px;">'+datos[i].tipoHabilidad+'</p>';
    cadena=cadena+'<p><b>'+datos[i].texto+'</b></p></div>';

    //cadena=cadena+'<div class="botton-left" style="posicion:absolute; bottom:8px; left:16px">ataque</div>';
    //cadena=cadena+'<p style="position: relative;height: -10px;">'+datos[i].vidas+'</p>';
    //cadena=cadena+'div class '
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

  $('[name="cartasMano"]').click(function(){
    var nombreCarta=$(this).attr("id");
    var tipoCarta=$(this).attr("tipo");
    var tieneObjetivos=$(this).attr("objetivos");
    //var existenObjetivosGrito=$(this).attr("existenobjetivosgrito");
    console.log(nombreCarta);
    
    //seleccionarCarta(nombreCarta);
    if(tipoCarta=="invocacion" || tipoCarta=="token"){
      com.cartaOrigen=undefined;
      com.cartaDestino=undefined;
      com.existenObjetivosGrito(nombreCarta);  
      //console.log(typeof tieneObjetivos);
      console.log(com.tieneObjetivosG);
      if(tieneObjetivos=="false" || com.tieneObjetivosG==false){
        com.jugarCarta(nombreCarta); 
      }else{
        //PENDIENTE SOLUCIONAR EL TEMA VISUAL DE OBJETIVOS
        if(com.cartaOrigenGrito==undefined || com.cartaOrigenGrito!=nombreCarta){
          $('[name="cartasMano"]').css("border","none");
          com.cartaOrigen=undefined;
          com.cartaDestino=undefined;
          console.log("se ha seleccionado la carta con grito");
          com.cartaOrigenGrito=nombreCarta;
          $(this).css("border","5px solid orange");
        }
        else /*if(com.cartaOrigenGrito==nombreCarta || com.cartaOrigenGrito!=nombreCarta)*/{
           $('[name="cartasMano"]').css("border","none");
          com.cartaOrigenGrito=undefined;
          com.cartaDestinoGrito=undefined;
          $(this).css("border","none");
        } 
      }
    }else if(tipoCarta=="hechizo"){
      com.cartaOrigenGrito=undefined;
      com.cartaDestinoGrito=undefined;
      if(tieneObjetivos=="true"){
        if(com.cartaOrigen==undefined || com.cartaOrigen!=nombreCarta){
          $('[name="cartasMano"]').css("border","none");
          com.cartaOrigenGrito=undefined;
          com.cartaDestinoGrito=undefined;
          console.log("se ha seleccionado la carta origen");
          com.cartaOrigen=nombreCarta;
          $(this).css("border","5px solid blue");
        }
        else /*if(com.cartaOrigen==nombreCarta || com.cartaOrigen!=nombreCarta)*/{
          $('[name="cartasMano"]').css("border","none");
          com.cartaOrigen=undefined;
          com.destinoCartaRival=undefined;
          $(this).css("border","none");
        } 
      }else{
        com.lanzarHechizoSinObjetivo(nombreCarta);
      }             
    }//CONTINUAR

  });

  $('[id="cartasMano"]').hover(function(){
    //$(this).animate({width: '500px'});
    if(com.cartaOrigen==undefined && com.cartaOrigenGrito==undefined){
      //$(this).css("border-style", "solid");
      //$(this).css("border","3px solid green");
      $(this).css("z-index","10000");
      $(this).css("margin-top","-13px");

    }   
  },
  function(){
    //$(this).animate({width: '10px'});
    if(com.cartaOrigen==undefined && com.cartaOrigenGrito==undefined){
      //$(this).css("border","none");
      $(this).css("z-index","-10000");
      $(this).css("margin-top","0px");
    }
  });
}



function mostrarInicio(){

  limpiar();
  var cadena='<div class="card" style="width: 18rem;">';
  cadena=cadena+'<img class="card-img-top" src="..." alt="Card image cap">';
  cadena=cadena+'<div class="card-body">';
  cadena=cadena+'<h5 class="card-title">Card title</h5>';
  //cadena=cadena+'<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>';
  cadena=cadena+'</div>';
  cadena=cadena+'</div>';
  $('#cabecera').append(cadena);
}

function mostrarColeccion(){
  limpiar();

}

function mostrarPerfil(){
  limpiar();

}

function mostrarLogin(){
  //borrarLogin();
  limpiar();
  //asociarEnter('#nombreBtn');
  //mostrarIntro();
  

  /*var cadena="<div id='formInicio' style='color:white'><h1>Card Battle Game</h1>";
  cadena=cadena+"<img src='cliente/img/ImagenMenuPrincipal.jpg' style='width:30%' class='img-circle' alt='logo'></div>";
  $('#cabecera').append(cadena);*/

  var cadena='<div class="jumbotron text-center" style="background-image: url(cliente/img/elementosJumb7.jpg); background-size: cover; right:20%; height:20%" id="cabeceraLogin">';
  //cadena=cadena+'<h2 style="color:#FFFFFF">Card Battle Game</h2>';
  cadena=cadena+'<img src="cliente/img/imgJumboMenu.png" style="width:30%" class="img-circle" alt="logo"></div>';
  $('#cabecera').append(cadena);


  var cadena='<div id="formInicio2" style="color:white">';
  cadena=cadena+'<h2><b>Inicio de sesión</b></h2><div id="ig1" class="input-group" style="margin-bottom:25px">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>';
  cadena=cadena+'<input id="email" type="text" class="form-control" name="email" placeholder="Escribe tu correo electrónico" style="border:2px solid gray;"></div>';
  cadena=cadena+'<div id="ig2" class="input-group" style="margin-bottom:25px">';
  cadena=cadena+'<span class="input-group-addon" ><i class="glyphicon glyphicon-lock"></i></span>';
  cadena=cadena+'<input id="clave" type="password" class="form-control" name="password" placeholder="Escribe tu clave" style="border:2px solid gray;"></div></div>';
  $('#cabecera').append(cadena);
  $('#cabecera').append('<p id="nombreBtn"><button type="button" style="border-radius: 12px; font-size: 20px;" id="inicioPartidaBtn" class="btn btn-primary btn-md">Iniciar sesión</button>');//' <a href="#" id="refRegistro" onclick="mostrarRegistro();">Registrar usuario</a>');
  $('#cabecera').append('<h4 id="info"><span class="label label-warning"></span></h4>');



  $('[id=inicioPartidaBtn]').on('click',function(){
      var email=$('#email').val();
      var clave=$('#clave').val();
      $('#formRegistro').remove();
      rest.loginUsuario(email,clave);
 });

  $("input").focus(function(){
      $(this).css("background-color", "#e8f1ff");
   });
   $("input").blur(function(){
      $(this).css("background-color", "#ffffff");
   });

/*
  $("[id=inicioPartidaBtn]").hover(function(){
      $(this).css("background-color", "#359D63");
  },
  function(){
      $(this).css("background-color", "#3CB371");
  });*/
}


function mostrarRegistro(){
  limpiar();

  var cadena='<div class="jumbotron text-center" style="background-image: url(cliente/img/elementosJumb7.jpg); background-size: cover; height:10%" id="granCabecera">';
  //cadena=cadena+'<h2 style="color:#FFFFFF">Card Battle Game</h2>';
  cadena=cadena+'<img src="cliente/img/imgJumboMenu.png" style="width:30%" class="img-circle" alt="logo"></div>';
  $('#cabecera').append(cadena);


  var cadena='<div id="formInicio3" style="color:white">';
  cadena=cadena+'<h2><b>Registro de cuenta</b></h2><div id="ig1" class="input-group" style="margin-bottom:20px">';
  cadena=cadena+'<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>';
  cadena=cadena+'<input id="email1" type="text" class="form-control" name="email" placeholder="Escribe tu correo electrónico" style="border:2px solid gray;"></div>';
  cadena=cadena+'<div id="ig2" class="input-group" style="margin-bottom:19px">';
  cadena=cadena+'<span class="input-group-addon" ><i class="glyphicon glyphicon-lock"></i></span>';
  cadena=cadena+'<input id="clave1" type="password" class="form-control" name="password" placeholder="Escribe tu clave" style="border:2px solid gray;"></div>';
  cadena=cadena+'<div id="ig2" class="input-group" style="margin-bottom:19px">';
  cadena=cadena+'<span class="input-group-addon" ><i class="glyphicon glyphicon-lock"></i></span>';
  cadena=cadena+'<input id="clave2" type="password" class="form-control" name="password" placeholder="Repite tu clave" style="border:2px solid gray;"></div></div>';
  $('#cabecera').append(cadena);
  $('#cabecera').append('<button id="registrarseBtn" type="button" style="border-radius: 12px; font-size: 20px" class="btn btn-primary btn-md">Registrarse</button>');//' <a href="#" id="refRegistro" onclick="mostrarRegistro();">Registrar usuario</a>');
  //$('#cabecera').append('<h4 id="info"><span class="label label-warning"></span></h4>');

 /* var cadena='<div id="formRegistro">';
  cadena=cadena+'<h2 style="color:rgb(31, 194, 16);">Registro de cuenta</h2>';
  cadena=cadena+'<input id="email1" type="text" class="form-control" name="email1" placeholder="Escribe el correo" style="border:2px solid MediumSeaGreen;">';
  cadena=cadena+'<input id="clave1" type="password" class="form-control" name="clave1" placeholder="Escribe la clave" style="border:2px solid MediumSeaGreen;">';
  cadena=cadena+'<input id="clave2" type="password" class="form-control" name="clave2" placeholder="Repite la clave" style="border:2px solid MediumSeaGreen;">';
  cadena=cadena+'<button type="button" id="resgistroBtn" style="border:1px solid MediumSeaGreen; background-color:MediumSeaGreen;"class="btn btn-primary btn-md">Registarse</button>';
 // cadena=cadena+'<p id="falloContRepetida" style="display:none">Las contraseñas no coinciden</p>';
  cadena=cadena+'</div>';*/
  
  //$('#inicio').append(cadena);
  
  $("input").focus(function(){
      $(this).css("background-color", "#e8f1ff");
   });
   $("input").blur(function(){
      $(this).css("background-color", "#ffffff");
   });


  $("[id=registrarseBtn]").on('click',function(){
        var email=$('#email1').val();
        var clave1=$('#clave1').val();
        var clave2=$('#clave2').val();
        if(comprobarCont(clave1,clave2) && comprobarEmail(email)){
          //$('#formInicio').remove();
          //$('#formRegistro').remove();
          borrarMostrarRegistro();
          rest.registrarUsuario(email,clave1);
        }
        else{
          mostrarRegistro();
          //alert("Las contraseñas no coinciden o el correo no existe");
          //mostrarAviso("Las contraseñas no coinciden");
          //$('#clave').css("border","3px solid red");
        }
     });

    $("[id=registrarseBtn]").hover(function(){
      $(this).css("background-color", "#359D63");
    },
    function(){
        $(this).css("background-color", "#3CB371");
      });
}



function mostrarMenu(){
  if ($.cookie("usr")){
  //borrarLogin();
  limpiar();
  //asociarEnter('#nombreBtn');
  //mostrarIntro();
  

  /*var cadena="<div id='formInicio' style='color:white'><h1>Card Battle Game</h1>";
  cadena=cadena+"<img src='cliente/img/ImagenMenuPrincipal.jpg' style='width:30%' class='img-circle' alt='logo'></div>";
  $('#cabecera').append(cadena);*/

  var cadena='<div class="container text-center" align="center" id="cabeceraMenu">'
  cadena=cadena+'<h1 style="color:white; margin-bottom:3%"><b>Card Battle Game</b></h1>';
  cadena=cadena+'<div class="row">';
  cadena=cadena+'<div class="col-xs-6 col-md-4">';
  //cadena=cadena+'<a href="#" class="thumbnail"><img src="http://placehold.it/360x240" alt="Miniatura"></a>';
  cadena=cadena+'<div class="thumbnail" name="jugarPartida">';
  cadena=cadena+'<img src="/cliente/img/imgJugar.jpg" name="MiniaturaJugar">';
  cadena=cadena+'<div class="caption"><h3>Jugar</h3>';
  cadena=cadena+'<div class="caption-jugar" style="display:none">Juega contra un rival una batalla uno contra uno usando tu mazo de cartas</div>';
  cadena=cadena+'</div></div></div>';


  cadena=cadena+'<div class="col-xs-6 col-md-4">';
  //cadena=cadena+'<a href="#" class="thumbnail"><img src="http://placehold.it/360x240" alt="Miniatura"><h3>Construir mazo</h3></a>';
  cadena=cadena+'<div class="thumbnail"  name="construirMazo">';
  cadena=cadena+'<img src="/cliente/img/imgConstruirMazo.jpg" name="MiniaturaConstruirMazo">';
  cadena=cadena+'<div class="caption">';
  cadena=cadena+'<h3>Seleccionar mazo</h3>';
  cadena=cadena+'<div class="caption-construir" style="display:none">Elige tu elemento y seleccion tu mazo para ganar las partidas. Existen tres mazos para cada elemento. Recuerda que cada elemento cuenta con propiedades únicas y que cada mazo contiene cartas de su elemento y de elemento vacío</div>';
  //cadena=cadena+'<p>Accede al constructor de mazos, para crear tu propio mazo con el que jugar tus partidas</p>'
  cadena=cadena+'</div></div></div>';

  cadena=cadena+'<div class="col-xs-6 col-md-4">';
  //cadena=cadena+'<a href="#" class="thumbnail"><img src="http://placehold.it/360x240" alt="Miniatura"><h3>Construir mazo</h3></a>';
  cadena=cadena+'<div class="thumbnail"  name="crearElegirPartida">';
  cadena=cadena+'<img src="/cliente/img/imgCrearElegirPartida.jpg" name="MiniaturaCrearElegir">';
  cadena=cadena+'<div class="caption"><h3>Crear/elegir partida</h3>';
  cadena=cadena+'<div class="caption-crearElegir" style="display:none">Crea una partida personalizada y espera a que otro jugador se una a ella para disputar una batalla.<br>También puedes unirte a partidas creadas por otros jugadores</div>';
  cadena=cadena+'</div></div></div>';
  //cadena=cadena+'<div class="col-xs-6 col-md-3">';
  //cadena=cadena+'<a href="#" class="thumbnail"><img src="http://placehold.it/360x240" alt="Miniatura"><h3>Crear/elegir partida</h3></a>';
  //cadena=cadena+'</div>';
/*
  cadena=cadena+'<div class="col-xs-6 col-md-3">';
  //cadena=cadena+'<a href="#" class="thumbnail"><img src="http://placehold.it/360x240" alt="Miniatura"><h3>Construir mazo</h3></a>';
  cadena=cadena+'<div class="thumbnail"  name="reglas">';
  cadena=cadena+'<img src="/cliente/img/imgReglas.jpg" alt="MiniaturaReglas">';
  cadena=cadena+'<div class="caption"><h3>Reglas</h3>';
  cadena=cadena+'<div class="caption-reglas" style="display:none">Conoce todo lo que debes saber para alzarte con la victoria en tus batallas:<ul align=left><li type="circle">Aprende como jugar a Card Battle Game</li> <li type="circle">Descubre consejos y técnicas</li> <li type="circle">Aprende todo sobre las habilidades y efectos de las cartas</li></ul></div>';
  cadena=cadena+'</div></div></div>';
*/
  //cadena=cadena+'<div class="col-xs-6 col-md-3">';
  //cadena=cadena+'<a href="#" class="thumbnail"><img src="http://placehold.it/360x240" alt="Miniatura"><h3>Reglas</h3></a>';
  //cadena=cadena+'</div></div>';
  $('#cabecera').append(cadena);

  $('[name="jugarPartida"]').hover(function(){
    $(this).find('.caption-jugar').slideDown(250);
    $('.caption-jugar').show(250);
    //$('.<h3>').css("color","orange");
    //$(this).animate({height: 400}, "slow");
    $('[name="MiniaturaJugar"]').animate({
      "border-radius": "30px"
    });
  },function(){
    $(this).find('.caption-jugar').slideUp(250);
    $('.caption-jugar').hide(250);
    //$(this).animate({height: 215}, "slow");
    $('[name="MiniaturaJugar"]').animate({
      "border-radius": "0px"
    });
  });


  $('[name="construirMazo"]').hover(function(){
    $(this).find('.caption-construir').slideDown(250);
    $('.caption-construir').show(250);
    $('[name="MiniaturaConstruirMazo"]').animate({
      "border-radius": "30px"
    });
    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-construir').slideUp(250);
    $('.caption-construir').hide(250);
    $('[name="MiniaturaConstruirMazo"]').animate({
      "border-radius": "0px"
    });
    //$(this).animate({height: 215}, "slow");
  });

  $('[name="crearElegirPartida"]').hover(function(){
    $(this).find('.caption-crearElegir').slideDown(250);
    $('.caption-crearElegir').show(250);
    $('[name="MiniaturaCrearElegir"]').animate({
      "border-radius": "30px"
    });
    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-crearElegir').slideUp(250);
    $('.caption-crearElegir').hide(250);
    $('[name="MiniaturaCrearElegir"]').animate({
      "border-radius": "0px"
    });
    //$(this).animate({height: 215}, "slow");
  });

  $('[name="reglas"]').hover(function(){
    $(this).find('.caption-reglas').slideDown(250);
    $('.caption-reglas').show(250);

    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-reglas').slideUp(250);
    $('.caption-reglas').hide(250);
    //$(this).animate({height: 215}, "slow");
  });

  $('[name="jugarPartida"]').click(function(){
    com.buscarPartida();
  });

  $('[name="crearElegirPartida"]').click(function(){
    mostrarCrearElegirPartida();
  });

  $('[name="construirMazo"]').click(function(){
    mostrarMenuConstruirMazo();
    //mostrarElegirConstruir();
  });
}
}

function mostrarElegirConstruir(){
  limpiar();

  var cadena='<div class="container text-center" align="center" id="cabeceraElegirConstruir">'
  cadena=cadena+'<h1 style="color:white">Modifica tu mazo o crea uno nuevo</h1>';
  cadena=cadena+'<div class="row">';
  cadena=cadena+'<div class="col-xs-6 col-md-4"  style="width:40%; left:8%">';
  //cadena=cadena+'<a href="#" class="thumbnail"><img src="http://placehold.it/360x240" alt="Miniatura"></a>';
  cadena=cadena+'<div class="thumbnail" name="miMazo">';
  cadena=cadena+'<img src="/cliente/img/imgMiMazo.jpg" alt="MiniaturaMiMazo" style="width:50%">';
  cadena=cadena+'<div class="caption"><h3>Mi mazo</h3>';
  cadena=cadena+'<div class="caption-miMazo" style="display:none">Juega contra un rival una batalla uno contra uno usando tu mazo de cartas</div>';
  cadena=cadena+'</div></div></div>';


  cadena=cadena+'<div class="col-xs-6 col-md-4"  style="width:40%; left:10%">';
  //cadena=cadena+'<a href="#" class="thumbnail"><img src="http://placehold.it/360x240" alt="Miniatura"><h3>Construir mazo</h3></a>';
  cadena=cadena+'<div class="thumbnail"  name="construirNuevoMazo">';
  cadena=cadena+'<img src="/cliente/img/imgNuevoMazo.jpg" alt="MiniaturaConstruirNuevoMazo" style="width:50%">';
  cadena=cadena+'<div class="caption">';
  cadena=cadena+'<h3>Construir nuevo mazo</h3>';
  cadena=cadena+'<div class="caption-construir" style="display:none">Elige tu elemento y construye tu mazo único para ganar las partidas. Recuerda que cada elemento cuenta con propiedades únicas y no podrás incluir cartas de otros elementos en tu mazo, pero si cartas de elemento vacío</div>';
  //cadena=cadena+'<p>Accede al constructor de mazos, para crear tu propio mazo con el que jugar tus partidas</p>'
  cadena=cadena+'</div></div></div>';

  $('#cabecera').append(cadena);


  $('[name="miMazo"]').hover(function(){
    //$('[alt="MiniaturaMiMazo"]').css("width","200%");
    $('[alt="MiniaturaMiMazo"]').animate({width: 500});
  },function(){
    //$('[alt="MiniaturaMiMazo"]').css("width","50%");
    $('[alt="MiniaturaMiMazo"]').animate({width: 200});
  });

  $('[name="construirNuevoMazo"]').hover(function(){
    //$('[alt="MiniaturaMiMazo"]').css("width","200%");
    $('[alt="MiniaturaConstruirNuevoMazo"]').animate({width: 500});
  },function(){
    //$('[alt="MiniaturaMiMazo"]').css("width","50%");
    $('[alt="MiniaturaConstruirNuevoMazo"]').animate({width: 200});
  });
}

function mostrarMenuConstruirMazo(){
  //borrarLogin();
  limpiar();
  //asociarEnter('#nombreBtn');
  //mostrarIntro();
  

  /*var cadena="<div id='formInicio' style='color:white'><h1>Card Battle Game</h1>";
  cadena=cadena+"<img src='cliente/img/ImagenMenuPrincipal.jpg' style='width:30%' class='img-circle' alt='logo'></div>";
  $('#cabecera').append(cadena);*/

  var cadena='<div class="container text-center" align="center" id="cabeceraConstruir">'
  cadena=cadena+'<h1 style="color:white">Elige el elemento de tu mazo</h1>';
  cadena=cadena+'<div class="row">';

  cadena=cadena+'<div class="col-xs-6 col-md-3">';
  //cadena=cadena+'<a href="#" class="thumbnail"><img src="http://placehold.it/360x240" alt="Miniatura"></a>';
  cadena=cadena+'<div class="thumbnail" name="elementoAire">';
  cadena=cadena+'<img src="/cliente/img/imgAire.jpg" name="MiniaturaAire">';
  cadena=cadena+'<div class="caption" name="nombreAire" style="color:black"><h3>Aire</h3></div>';
  cadena=cadena+'<div class="caption-aire" style="display:none">El elemento <b>aire</b> destaca por la invocación constante de aliados, el uso de hechizos que potencian tus invocaciones y el uso de poderosas cartas para conseguir una mesa insuperable</div>';
  cadena=cadena+'</div></div>';


  cadena=cadena+'<div class="col-xs-6 col-md-3">';
  //cadena=cadena+'<a href="#" class="thumbnail"><img src="http://placehold.it/360x240" alt="Miniatura"><h3>Construir mazo</h3></a>';
  cadena=cadena+'<div class="thumbnail"  name="elementoAgua">';
  cadena=cadena+'<img src="/cliente/img/imgAgua.jpg" name="MiniaturaAgua">';
  cadena=cadena+'<div class="caption" name="nombreAgua" style="color:black">';
  cadena=cadena+'<h3>Agua</h3></div>';
  cadena=cadena+'<div class="caption-agua" style="display:none">El elemento <b>agua</b> destaca por el robo de cartas, la curación y por la invocación de poderosas invocaciones y hechizos de congelación con los que controlar los recursos del rival</div>';
  //cadena=cadena+'<p>Accede al constructor de mazos, para crear tu propio mazo con el que jugar tus partidas</p>'
  cadena=cadena+'</div></div>';

  cadena=cadena+'<div class="col-xs-6 col-md-3">';
  //cadena=cadena+'<a href="#" class="thumbnail"><img src="http://placehold.it/360x240" alt="Miniatura"><h3>Construir mazo</h3></a>';
  cadena=cadena+'<div class="thumbnail"  name="elementoTierra">';
  cadena=cadena+'<img src="/cliente/img/imgTierra.jpg" name="MiniaturaTierra">';
  cadena=cadena+'<div class="caption" name="nombreTierra" style="color:black"><h3>Tierra</h3></div>';
  cadena=cadena+'<div class="caption-tierra" style="display:none">El elemento <b>tierra</b> destaca por la expansión, la aceleración de maná y la invocación de poderosas invocaciones con habilidades y efectos contundentes</div>';
  cadena=cadena+'</div></div>';
  //cadena=cadena+'<div class="col-xs-6 col-md-3">';
  //cadena=cadena+'<a href="#" class="thumbnail"><img src="http://placehold.it/360x240" alt="Miniatura"><h3>Crear/elegir partida</h3></a>';
  //cadena=cadena+'</div>';

  cadena=cadena+'<div class="col-xs-6 col-md-3">';
  //cadena=cadena+'<a href="#" class="thumbnail"><img src="http://placehold.it/360x240" alt="Miniatura"><h3>Construir mazo</h3></a>';
  cadena=cadena+'<div class="thumbnail"  name="elementoFuego">';
  cadena=cadena+'<img src="/cliente/img/imgFuego.jpg" name="MiniaturaFuego">';
  cadena=cadena+'<div class="caption" name="nombreFuego" style="color:black"><h3>Fuego</h3></div>';
  cadena=cadena+'<div class="caption-fuego" style="display:none">El elemento <b>fuego</b> destaca por la rapidez y el daño directo, empleando invocaciones veloces y hechizos con los que quemar la mesa del rival hasta alcanzar la victoria</div>';
  cadena=cadena+'</div></div>';

  //cadena=cadena+'<div class="col-xs-6 col-md-3">';
  //cadena=cadena+'<a href="#" class="thumbnail"><img src="http://placehold.it/360x240" alt="Miniatura"><h3>Reglas</h3></a>';
  //cadena=cadena+'</div></div>';
  $('#cabecera').append(cadena);

  $('[name="elementoAire"]').hover(function(){
    $(this).find('.caption-aire').slideDown(250);
    $('.caption-aire').show(250);
    $(this).css("border-color","#00bfff");
    $('[name="nombreAire"]').css("color","#00bfff");
    //$('[name="MiniaturaAire"]').css("border-radius","1000px");
    $('[name="MiniaturaAire"]').animate({
      "border-radius": "30px"
    });

    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-aire').slideUp(250);
    $('.caption-aire').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreAire"]').css("color","black");
    //$('[name="MiniaturaAire"]').css("border-radius","0px");
    //$(this).animate({height: 215}, "slow");
    $('[name="MiniaturaAire"]').animate({
      "border-radius": "0px"
    });
  });

  $('[name="elementoAgua"]').hover(function(){
    $(this).find('.caption-agua').slideDown(250);
    $('.caption-agua').show(250);    
    $(this).css("border-color","blue");
    $('[name="nombreAgua"]').css("color","blue");
    $('[name="MiniaturaAgua"]').animate({
      "border-radius": "30px"
    });
    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-agua').slideUp(250);
    $('.caption-agua').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreAgua"]').css("color","black");
    $('[name="MiniaturaAgua"]').animate({
      "border-radius": "0px"
    });
    //$(this).animate({height: 215}, "slow");
  });

  $('[name="elementoTierra"]').hover(function(){
    $(this).find('.caption-tierra').slideDown(250);
    $('.caption-tierra').show(250);
    $(this).css("border-color","green");
    $('[name="nombreTierra"]').css("color","green");
    $('[name="MiniaturaTierra"]').animate({
      "border-radius": "30px"
    });
    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-tierra').slideUp(250);
    $('.caption-tierra').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreTierra"]').css("color","black");
    $('[name="MiniaturaTierra"]').animate({
      "border-radius": "0px"
    });
    //$(this).animate({height: 215}, "slow");
  });

  $('[name="elementoFuego"]').hover(function(){
    $(this).find('.caption-fuego').slideDown(250);
    $('.caption-fuego').show(250);
    $(this).css("border-color","red");
    $('[name="nombreFuego"]').css("color","red");
    $('[name="MiniaturaFuego"]').animate({
      "border-radius": "30px"
    });
    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-fuego').slideUp(250);
    $('.caption-fuego').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreFuego"]').css("color","black");
    $('[name="MiniaturaFuego"]').animate({
      "border-radius": "00px"
    });
    //$(this).animate({height: 215}, "slow");
  });


  $('[name="elementoFuego"]').click(function(){
    //com.elegirMazoFuego();
    mostrarSeleccionFuego();
  });
  $('[name="elementoAgua"]').click(function(){
    mostrarSeleccionAgua();
  });
  $('[name="elementoAire"]').click(function(){
    mostrarSeleccionAire();
  });
  $('[name="elementoTierra"]').click(function(){
    mostrarSeleccionTierra();
  });
}


function mostrarSeleccionFuego(){
  limpiar();

  var cadena='<div class="container text-center" align="center" id="cabeceraConstruirFuego">'
  cadena=cadena+'<h1 style="color:white">Elige el mazo del elemento <b>fuego</b></h1>';
  cadena=cadena+'<div class="row">';

  cadena=cadena+'<div class="col-xs-6 col-md-4">';
  cadena=cadena+'<div class="thumbnail" name="mazoFuego1">';
  cadena=cadena+'<img src="/cliente/img/imgCombustionInstantanea.jpg" name="MiniaturaFuego1">';
  cadena=cadena+'<div class="caption" name="nombreFuego1" style="color:black"><h3>Llamas abrasantes</h3></div>';
  cadena=cadena+'<div class="caption-Fuego1" style="display:none">El mazo <b>Llamas abrasantes</b> destaca por sus poderosas invocaciones de fuego, centradas en causar daño al rival y sus invocaciones. Los hechizos de este mazo servirán para dominar la mesa y para infligir daño al rival</div>';
  cadena=cadena+'</div></div>';


  cadena=cadena+'<div class="col-xs-6 col-md-4">';
  cadena=cadena+'<div class="thumbnail"  name="mazoFuego2">';
  cadena=cadena+'<img src="/cliente/img/imgIncendiarElCamino.jpg" name="MiniaturaFuego2">';
  cadena=cadena+'<div class="caption" name="nombreFuego2" style="color:black">';
  cadena=cadena+'<h3>Incendiar el camino</h3></div>';
  cadena=cadena+'<div class="caption-Fuego2" style="display:none">El mazo <b>Incendiar el camino</b> representa la parte mas rápida y agresiva del elemento fuego, empleando hechizos de daño directo e invocaciones con <b>veloz</b> y de coste bajo para asaltar al rival sin que tenga la oportunidad de defenderse</div>';
  cadena=cadena+'</div></div>';

  cadena=cadena+'<div class="col-xs-6 col-md-4">';
  cadena=cadena+'<div class="thumbnail"  name="mazoFuego3">';
  cadena=cadena+'<img src="/cliente/img/imgSeguidoresDelFuego.jpg" name="MiniaturaFuego3">';
  cadena=cadena+'<div class="caption" name="nombreFuego3" style="color:black"><h3>Seguidores del fuego</h3></div>';
  cadena=cadena+'<div class="caption-Fuego3" style="display:none">El mazo <b>Seguidores del fuego</b> se compone en gran parte por invocaciones de elemento <b>vacío</b> que son afines al elemento fuego. Incluye fuertes invocaciones y hechizos de fuego para controlar la partida</div>';
  cadena=cadena+'</div></div>';

  $('#cabecera').append(cadena);

  $('[name="mazoFuego1"]').hover(function(){
    $(this).find('.caption-Fuego1').slideDown(250);
    $('.caption-Fuego1').show(250);
    $(this).css("border-color","red");
    $('[name="nombreFuego1"]').css("color","red");
    //$('[name="MiniaturaAire"]').css("border-radius","1000px");
    $('[name="MiniaturaFuego1"]').animate({
      "border-radius": "30px"
    });
    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-Fuego1').slideUp(250);
    $('.caption-Fuego1').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreFuego1"]').css("color","black");
    //$('[name="MiniaturaAire"]').css("border-radius","0px");
    //$(this).animate({height: 215}, "slow");
    $('[name="MiniaturaFuego1"]').animate({
      "border-radius": "0px"
    });
  });


  $('[name="mazoFuego2"]').hover(function(){
    $(this).find('.caption-Fuego2').slideDown(250);
    $('.caption-Fuego2').show(250);
    $(this).css("border-color","red");
    $('[name="nombreFuego2"]').css("color","red");
    //$('[name="MiniaturaAire"]').css("border-radius","1000px");
    $('[name="MiniaturaFuego2"]').animate({
      "border-radius": "30px"
    });

    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-Fuego2').slideUp(250);
    $('.caption-Fuego2').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreFuego2"]').css("color","black");
    //$('[name="MiniaturaAire"]').css("border-radius","0px");
    //$(this).animate({height: 215}, "slow");
    $('[name="MiniaturaFuego2"]').animate({
      "border-radius": "0px"
    });
  });

  $('[name="mazoFuego3"]').hover(function(){
    $(this).find('.caption-Fuego3').slideDown(250);
    $('.caption-Fuego3').show(250);
    $(this).css("border-color","red");
    $('[name="nombreFuego3"]').css("color","red");
    //$('[name="MiniaturaAire"]').css("border-radius","1000px");
    $('[name="MiniaturaFuego3"]').animate({
      "border-radius": "30px"
    });

    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-Fuego3').slideUp(250);
    $('.caption-Fuego3').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreFuego3"]').css("color","black");
    //$('[name="MiniaturaAire"]').css("border-radius","0px");
    //$(this).animate({height: 215}, "slow");
    $('[name="MiniaturaFuego3"]').animate({
      "border-radius": "0px"
    });
  });



  $('[name="mazoFuego1"]').click(function(){
    com.elegirMazoFuego(1);
    alert("Has elegido Llamas abrasantes como tu mazo para jugar");
  });
  $('[name="mazoFuego2"]').click(function(){
    com.elegirMazoFuego(2);
    alert("Has elegido Incinerar el camino como tu mazo para jugar");
  });
  $('[name="mazoFuego3"]').click(function(){
    com.elegirMazoFuego(3);
    alert("Has elegido Seguidores del fuego como tu mazo para jugar");
  });
}


function mostrarSeleccionAgua(){
  limpiar();

  var cadena='<div class="container text-center" align="center" id="cabeceraConstruirAgua">'
  cadena=cadena+'<h1 style="color:white">Elige el mazo del elemento <b>agua</b></h1>';
  cadena=cadena+'<div class="row">';

  cadena=cadena+'<div class="col-xs-6 col-md-4">';
  cadena=cadena+'<div class="thumbnail" name="mazoAgua1">';
  cadena=cadena+'<img src="/cliente/img/imgMareasImparables.jpg" name="MiniaturaAgua1">';
  cadena=cadena+'<div class="caption" name="nombreAgua1" style="color:black"><h3>Mareas imparables</h3></div>';
  cadena=cadena+'<div class="caption-Agua1" style="display:none">El mazo <b>Mareas imparables</b> representa la esencia del elemento agua, caracterizada por el control de la mesa, el robo de cartas y la invocación de poderosas invocaciones con las que finalizar la partida. Con hechizos de curación, congelación y control dominarás la partida</div>';
  cadena=cadena+'</div></div>';


  cadena=cadena+'<div class="col-xs-6 col-md-4">';
  cadena=cadena+'<div class="thumbnail"  name="mazoAgua2">';
  cadena=cadena+'<img src="/cliente/img/imgPoderGlacial.jpg" name="MiniaturaAgua2">';
  cadena=cadena+'<div class="caption" name="nombreAgua2" style="color:black">';
  cadena=cadena+'<h3>Poder glacial</h3></div>';
  cadena=cadena+'<div class="caption-Agua2" style="display:none">El mazo <b>Poder glacial</b> representa el demoledor poder de la congelación. Con hechizos e invocaciones con congelar detendrás los ataques de tu oponente y ralentizarás sus jugadas. Nada escapará al poder glacial</div>';
  cadena=cadena+'</div></div>';

  cadena=cadena+'<div class="col-xs-6 col-md-4">';
  cadena=cadena+'<div class="thumbnail"  name="mazoAgua3">';
  cadena=cadena+'<img src="/cliente/img/imgSeguidoresDelAgua.jpg" name="MiniaturaAgua3">';
  cadena=cadena+'<div class="caption" name="nombreAgua3" style="color:black"><h3>Seguidores del agua</h3></div>';
  cadena=cadena+'<div class="caption-Agua3" style="display:none">El mazo <b>Seguidores del agua</b> se compone en gran parte por invocaciones de elemento <b>vacío</b> que son afines al elemento agua. Gracias a los poderosos hechizos de agua, impulsarás tus fuerzas hacia la victoria</div>';
  cadena=cadena+'</div></div>';

  $('#cabecera').append(cadena);

  $('[name="mazoAgua1"]').hover(function(){
    $(this).find('.caption-Agua1').slideDown(250);
    $('.caption-Agua1').show(250);
    $(this).css("border-color","blue");
    $('[name="nombreAgua1"]').css("color","blue");
    //$('[name="MiniaturaAire"]').css("border-radius","1000px");
    $('[name="MiniaturaAgua1"]').animate({
      "border-radius": "30px"
    });
    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-Agua1').slideUp(250);
    $('.caption-Agua1').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreAgua1"]').css("color","black");
    //$('[name="MiniaturaAire"]').css("border-radius","0px");
    //$(this).animate({height: 215}, "slow");
    $('[name="MiniaturaAgua1"]').animate({
      "border-radius": "0px"
    });
  });


  $('[name="mazoAgua2"]').hover(function(){
    $(this).find('.caption-Agua2').slideDown(250);
    $('.caption-Agua2').show(250);
    $(this).css("border-color","blue");
    $('[name="nombreAgua2"]').css("color","blue");
    //$('[name="MiniaturaAire"]').css("border-radius","1000px");
    $('[name="MiniaturaAgua2"]').animate({
      "border-radius": "30px"
    });

    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-Agua2').slideUp(250);
    $('.caption-Agua2').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreAgua2"]').css("color","black");
    //$('[name="MiniaturaAire"]').css("border-radius","0px");
    //$(this).animate({height: 215}, "slow");
    $('[name="MiniaturaAgua2"]').animate({
      "border-radius": "0px"
    });
  });

  $('[name="mazoAgua3"]').hover(function(){
    $(this).find('.caption-Agua3').slideDown(250);
    $('.caption-Agua3').show(250);
    $(this).css("border-color","blue");
    $('[name="nombreAgua3"]').css("color","blue");
    //$('[name="MiniaturaAire"]').css("border-radius","1000px");
    $('[name="MiniaturaAgua3"]').animate({
      "border-radius": "30px"
    });

    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-Agua3').slideUp(250);
    $('.caption-Agua3').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreAgua3"]').css("color","black");
    //$('[name="MiniaturaAire"]').css("border-radius","0px");
    //$(this).animate({height: 215}, "slow");
    $('[name="MiniaturaAgua3"]').animate({
      "border-radius": "0px"
    });
  });



  $('[name="mazoAgua1"]').click(function(){
    com.elegirMazoAgua(1);
    alert("Has elegido Mareas imparables como tu mazo para jugar");
  });
  $('[name="mazoAgua2"]').click(function(){
    com.elegirMazoAgua(2);
    alert("Has elegido Poder glacial como tu mazo para jugar");
  });
  $('[name="mazoAgua3"]').click(function(){
    com.elegirMazoAgua(3);
    alert("Has elegido Seguidores del agua como tu mazo para jugar");
  });
}


function mostrarSeleccionTierra(){
  limpiar();

  var cadena='<div class="container text-center" align="center" id="cabeceraConstruirTierra">'
  cadena=cadena+'<h1 style="color:white">Elige el mazo del elemento <b>tierra</b></h1>';
  cadena=cadena+'<div class="row">';

  cadena=cadena+'<div class="col-xs-6 col-md-4">';
  cadena=cadena+'<div class="thumbnail" name="mazoTierra1">';
  cadena=cadena+'<img src="/cliente/img/imgExpansionRocosa.jpg" name="MiniaturaTierra1">';
  cadena=cadena+'<div class="caption" name="nombreTierra1" style="color:black"><h3>Expansion rocosa</h3></div>';
  cadena=cadena+'<div class="caption-Tierra1" style="display:none">El mazo <b>Expansión rocosa</b> representa el poder del elemento tierra. Mediante hechizos de aceleración de maná podrás jugar invocaciones y hechizos de coste alto con los que sobrepasar las defensas de tu oponente</div>';
  cadena=cadena+'</div></div>';


  cadena=cadena+'<div class="col-xs-6 col-md-4">';
  cadena=cadena+'<div class="thumbnail"  name="mazoTierra2">';
  cadena=cadena+'<img src="/cliente/img/imgDefensoresColosales.jpg" name="MiniaturaTierra2">';
  cadena=cadena+'<div class="caption" name="nombreTierra2" style="color:black">';
  cadena=cadena+'<h3>Defensores Colosales</h3></div>';
  cadena=cadena+'<div class="caption-Tierra2" style="display:none">El mazo <b>Defensores colosales</b> centra su estrategia en el uso de invocaciones con <b>defensor</b> para bloquear los ataques del oponente. Mediante los contundentes hechizos de tierra podrás convertir tu defensa en un fuerte ataque</div>';
  cadena=cadena+'</div></div>';

  cadena=cadena+'<div class="col-xs-6 col-md-4">';
  cadena=cadena+'<div class="thumbnail"  name="mazoTierra3">';
  cadena=cadena+'<img src="/cliente/img/imgSeguidoresDeLaTierra.jpg" name="MiniaturaTierra3">';
  cadena=cadena+'<div class="caption" name="nombreTierra3" style="color:black"><h3>Seguidores de la tierra</h3></div>';
  cadena=cadena+'<div class="caption-Tierra3" style="display:none">El mazo <b>Seguidores de la tierra</b> destaca por las poderosas invocaciones de elemento <b>vacío</b> que incluye. Gracias al elemento tierra podrás impulsar tu maná para jugar invocaciones contundentes a las que tu oponente no podrá hacer frente</div>';
  cadena=cadena+'</div></div>';

  $('#cabecera').append(cadena);

  $('[name="mazoTierra1"]').hover(function(){
    $(this).find('.caption-Tierra1').slideDown(250);
    $('.caption-Tierra1').show(250);
    $(this).css("border-color","green");
    $('[name="nombreTierra1"]').css("color","green");
    //$('[name="MiniaturaAire"]').css("border-radius","1000px");
    $('[name="MiniaturaTierra1"]').animate({
      "border-radius": "30px"
    });
    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-Tierra1').slideUp(250);
    $('.caption-Tierra1').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreTierra1"]').css("color","black");
    //$('[name="MiniaturaAire"]').css("border-radius","0px");
    //$(this).animate({height: 215}, "slow");
    $('[name="MiniaturaTierra1"]').animate({
      "border-radius": "0px"
    });
  });


  $('[name="mazoTierra2"]').hover(function(){
    $(this).find('.caption-Tierra2').slideDown(250);
    $('.caption-Tierra2').show(250);
    $(this).css("border-color","green");
    $('[name="nombreTierra2"]').css("color","green");
    //$('[name="MiniaturaAire"]').css("border-radius","1000px");
    $('[name="MiniaturaTierra2"]').animate({
      "border-radius": "30px"
    });

    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-Tierra2').slideUp(250);
    $('.caption-Tierra2').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreTierra2"]').css("color","black");
    //$('[name="MiniaturaAire"]').css("border-radius","0px");
    //$(this).animate({height: 215}, "slow");
    $('[name="MiniaturaTierra2"]').animate({
      "border-radius": "0px"
    });
  });

  $('[name="mazoTierra3"]').hover(function(){
    $(this).find('.caption-Tierra3').slideDown(250);
    $('.caption-Tierra3').show(250);
    $(this).css("border-color","green");
    $('[name="nombreTierra3"]').css("color","green");
    //$('[name="MiniaturaAire"]').css("border-radius","1000px");
    $('[name="MiniaturaTierra3"]').animate({
      "border-radius": "30px"
    });

    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-Tierra3').slideUp(250);
    $('.caption-Tierra3').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreTierra3"]').css("color","black");
    //$('[name="MiniaturaAire"]').css("border-radius","0px");
    //$(this).animate({height: 215}, "slow");
    $('[name="MiniaturaTierra3"]').animate({
      "border-radius": "0px"
    });
  });



  $('[name="mazoTierra1"]').click(function(){
    com.elegirMazoTierra(1);
    alert("Has elegido Expansion rocosa como tu mazo para jugar");
  });
  $('[name="mazoTierra2"]').click(function(){
    com.elegirMazoTierra(2);
    alert("Has elegido Defensores Colosales como tu mazo para jugar");
  });
  $('[name="mazoTierra3"]').click(function(){
    com.elegirMazoTierra(3);
    alert("Has elegido Seguidores de la tierra como tu mazo para jugar");
  });
}

function mostrarSeleccionAire(){
  limpiar();

  var cadena='<div class="container text-center" align="center" id="cabeceraConstruirAire">'
  cadena=cadena+'<h1 style="color:white">Elige el mazo del elemento <b>aire</b></h1>';
  cadena=cadena+'<div class="row">';

  cadena=cadena+'<div class="col-xs-6 col-md-4">';
  cadena=cadena+'<div class="thumbnail" name="mazoAire1">';
  cadena=cadena+'<img src="/cliente/img/imgVientoIncesante.jpg" name="MiniaturaAire1">';
  cadena=cadena+'<div class="caption" name="nombreAire1" style="color:black"><h3>Viento incesante</h3></div>';
  cadena=cadena+'<div class="caption-Aire1" style="display:none">El mazo <b>Viento incesante</b> combina todos los aspectos del elemento aire. Podrás invocar fuertes invocaciones con efectos devastadores para tu oponente y jugar hechizos con los que potenciar tu mesa o destruir la mesa del oponente</div>';
  cadena=cadena+'</div></div>';


  cadena=cadena+'<div class="col-xs-6 col-md-4">';
  cadena=cadena+'<div class="thumbnail"  name="mazoAire2">';
  cadena=cadena+'<img src="/cliente/img/imgPoderNumerico2.jpg" name="MiniaturaAire2">';
  cadena=cadena+'<div class="caption" name="nombreAire2" style="color:black">';
  cadena=cadena+'<h3>Poder numérico</h3></div>';
  cadena=cadena+'<div class="caption-Aire2" style="display:none">El mazo <b>Poder numérico</b> centra su estrategia en la continua invocacion de token con los que poblar tu mesa y en el uso de poderosos hechizos con los que convertirás tu ejercito en una fuerza imparable</div>';
  cadena=cadena+'</div></div>';

  cadena=cadena+'<div class="col-xs-6 col-md-4">';
  cadena=cadena+'<div class="thumbnail"  name="mazoAire3">';
  cadena=cadena+'<img src="/cliente/img/imgPoderNumerico.jpg" name="MiniaturaAire3">';
  cadena=cadena+'<div class="caption" name="nombreAire3" style="color:black"><h3>Seguidores del aire</h3></div>';
  cadena=cadena+'<div class="caption-Aire3" style="display:none">El mazo <b>Seguidores del aire</b> incluye numerosas invocaciones de elemento <b>vacío</b> que interactuan y apoyan a tus fuerzas del elemento aire. Gracias a tus cartas de elemento aire podrás modificar tu estrategia en cualquier momento</div>';
  cadena=cadena+'</div></div>';

  $('#cabecera').append(cadena);

  $('[name="mazoAire1"]').hover(function(){
    $(this).find('.caption-Aire1').slideDown(250);
    $('.caption-Aire1').show(250);
    $(this).css("border-color","#00bfff");
    $('[name="nombreAire1"]').css("color","#00bfff");
    //$('[name="MiniaturaAire"]').css("border-radius","1000px");
    $('[name="MiniaturaAire1"]').animate({
      "border-radius": "30px"
    });
    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-Aire1').slideUp(250);
    $('.caption-Aire1').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreAire1"]').css("color","black");
    //$('[name="MiniaturaAire"]').css("border-radius","0px");
    //$(this).animate({height: 215}, "slow");
    $('[name="MiniaturaAire1"]').animate({
      "border-radius": "0px"
    });
  });


  $('[name="mazoAire2"]').hover(function(){
    $(this).find('.caption-Aire2').slideDown(250);
    $('.caption-Aire2').show(250);
    $(this).css("border-color","#00bfff");
    $('[name="nombreAire2"]').css("color","#00bfff");
    //$('[name="MiniaturaAire"]').css("border-radius","1000px");
    $('[name="MiniaturaAire2"]').animate({
      "border-radius": "30px"
    });

    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-Aire2').slideUp(250);
    $('.caption-Aire2').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreAire2"]').css("color","black");
    //$('[name="MiniaturaAire"]').css("border-radius","0px");
    //$(this).animate({height: 215}, "slow");
    $('[name="MiniaturaAire2"]').animate({
      "border-radius": "0px"
    });
  });

  $('[name="mazoAire3"]').hover(function(){
    $(this).find('.caption-Aire3').slideDown(250);
    $('.caption-Aire3').show(250);
    $(this).css("border-color","#00bfff");
    $('[name="nombreAire3"]').css("color","#00bfff");
    //$('[name="MiniaturaAire"]').css("border-radius","1000px");
    $('[name="MiniaturaAire3"]').animate({
      "border-radius": "30px"
    });

    //$(this).animate({height: 400}, "slow");
  },function(){
    $(this).find('.caption-Aire3').slideUp(250);
    $('.caption-Aire3').hide(250);
    $(this).css("border-color","transparent");
    $('[name="nombreAire3"]').css("color","black");
    //$('[name="MiniaturaAire"]').css("border-radius","0px");
    //$(this).animate({height: 215}, "slow");
    $('[name="MiniaturaAire3"]').animate({
      "border-radius": "0px"
    });
  });



  $('[name="mazoAire1"]').click(function(){
    com.elegirMazoAire(1);
    alert("Has elegido Viento incesante como tu mazo para jugar");
  });
  $('[name="mazoAire2"]').click(function(){
    com.elegirMazoAire(2);
    alert("Has elegido Poder numerico como tu mazo para jugar");
  });
  $('[name="mazoAire3"]').click(function(){
    com.elegirMazoAire(3);
    alert("Has elegido Seguidores del aire como tu mazo para jugar");
  });
}