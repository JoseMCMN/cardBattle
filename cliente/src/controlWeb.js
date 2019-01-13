function limpiar(){
  //inicializa la página
  $('#formInicio').remove();
  $('#formCrearPartida').remove();
  $('#mostrarListaPartidas').remove();
  $('#granCabecera').remove();
  borrarMostrarRegistro();
  $('#cabeceraLogin').remove();
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
  var strLogout = '<li><a href="#" onclick="mostrarModificarPerfil();"><span class="glyphicon glyphicon-user"></span> Modificar perfil</a></li>';
  strLogout = strLogout+ '<li><a href="#" onclick="abandonarPartida();"><span class="glyphicon glyphicon-log-out"></span> Salir</a></li>';

  $('#inicioNav li').remove();
  $('#inicioNav').append(strLogout);
}

function mostrarNavBatalla(){
  var strLogB = '<li><a href="#" onclick="abandonarPartida();"><span class="glyphicon glyphicon-log-out"></span> Salir</a></li>';

  $('#inicioNav li').remove();
  $('#inicioNav').append(strLogB);
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

  var cadena='<div class="jumbotron text-center" style="background-image: url(https://i.ytimg.com/vi/xJzuMLz6bTU/maxresdefault.jpg); background-size: cover; height:10%" id="cabeceraLogin">';
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
  $('#cabecera').append('<p id="nombreBtn"><button type="button" style="border:1px solid MediumSeaGreen; background-color:MediumSeaGreen" id="inicioPartidaBtn" class="btn btn-primary btn-md">Iniciar partida</button>');//' <a href="#" id="refRegistro" onclick="mostrarRegistro();">Registrar usuario</a>');
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

  var cadena='<div class="jumbotron text-center" style="background-image: url(https://i.ytimg.com/vi/xJzuMLz6bTU/maxresdefault.jpg); background-size: cover; height:10%" id="granCabecera">';
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
  //if ($.cookie('uid')!=undefined)
  if(uid)
  {
    //$('#cabecera').append('<div class="container" id="cabeceraP"><div class="mainbox col-md-6 col-md-offset-3"><h2>Actualizar datos</h2><input type="text" id="email" class="form-control" placeholder="Email: '+usr.email+'"><input type="text" id="nombre" class="form-control" placeholder="Nombre: '+usr.nombre+'"><input type="password" id="newpass" class="form-control" placeholder="introduce tu nueva clave">');
    //$('#cabecera').append('<button type="button" id="actualizarBtn" class="btn btn-primary btn-md">Actualizar usuario</button> <button type="button" id="eliminarBtn" class="btn btn-danger btn-md">Eliminar usuario</button></div></div>');
    var cadena = '<div id="cabeceraModificarPerfil" class="bg4" style="padding-bottom:15px;color:white">';
    cadena = cadena + '<h2>Modificar datos del usuario</h2>';
    cadena = cadena + '<table class="table">';
    cadena = cadena + '<tr><td><label>Email: </label></td><td>'+usr.email+'</td></tr>';
    cadena = cadena + '<tr><td><label>Clave actual: </label></td><td><input type="password" id="oldpass" class="form-control" placeholder="Introduce tu clave actual"></span></td></tr>';
    cadena = cadena + '<tr><td><label>Nueva clave: </label></td><td><input type="password" id="newpass" class="form-control" placeholder="Introduce la nueva clave"></td></tr>';
    cadena = cadena + '<tr><td><label>Repite la nueva clave: </label></td><td><input type="password" id="newpass2" class="form-control" placeholder="Repite la nueva clave"></td></tr></table> ';
    cadena = cadena + '<p><button type="button" id="actualizarBtn" class="btn btn-primary btn-md">Actualizar usuario</button> <button type="button" id="eliminarBtn" class="btn btn-danger btn-md">Eliminar usuario</button> <button type="button" id="atrasBtn" class="btn btn-warning btn-md">Atrás</button><p></div>';
    $('#cabecera').append(cadena);
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
        alert('La cuenta de' + usr.email +' ha sido eliminada');
      }
      else
        alert('Introduce tu clave actual');
    });

    $('#atrasBtn').on('click',function(){
      mostrarNavLogin();
      mostrarCabecera();
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

function mostrarCrearElegirPartida(){
  mostrarCrearPartida();
  rest.obtenerPartidas();
  mostrarNavLogout();
}

function mostrarCrearPartida(){
  //$('mostrarLogin').remove();
  limpiar();
  var cadena='<div class="jumbotron text-center" id="cabeceraInicio" style="background-image: url(https://i.ytimg.com/vi/xJzuMLz6bTU/maxresdefault.jpg); background-size: cover; height:10%">';
  cadena=cadena+"<div id='formInicio' style='color:white'><h2>Card Battle Game</h2>";
  cadena=cadena+"<img src='cliente/img/ImagenMenuPrincipal.jpg' style='width:30%' class='img-circle' alt='logo'></div></div>";
  cadena=cadena+'<h3 id="formInicio" style="color:white;margin-bottom:10px">Crea una partida o elige una ya creada</h3>';
  $('#cabecera').append(cadena);

  var cadena='<div id="formCrearPartida">';
  cadena=cadena+'<h3 style="color:rgb(31, 194, 16);">Crear partida</h3>';
  cadena=cadena+'<input id="nombre" type="text" class="form-control" name="nombre" placeholder="Nombre partida">';
  cadena=cadena+'<button type="button" id="inicioBtn" style="border:1px solid MediumSeaGreen; background-color:MediumSeaGreen;" class="btn btn-primary btn-md">Crear partida</button>';
  cadena=cadena+'</div>';
  
  $('#inicio').append(cadena);
  $('#formRegistro').remove();

  $('#inicioBtn').on('click',function(){
        var nombrePartida=$('#nombre').val();
        if (nombrePartida==""){
          nombrePartida="partida Anonima";
        }
        $('#formCrearPartida').remove();
        com.crearPartida(nombrePartida);
    });

  $("[id=inicioBtn]").hover(function(){
      $(this).css("background-color", "#359D63");
  },
  function(){
      $(this).css("background-color", "#3CB371");
  });
}

function mostrarCabecera(){
  limpiar();
  var cadena='<div class="jumbotron text-center" id="cabeceraInicio" style="background-image: url(https://i.ytimg.com/vi/xJzuMLz6bTU/maxresdefault.jpg); background-size: cover; height:10%">';
  cadena=cadena+'<h1 style="color:#FFFFFF">Card Battle Game</h1>';
  cadena=cadena+"<img src='cliente/img/ImagenMenuPrincipal.jpg' style='width:40%' class='img-circle' alt='logo'>";
  cadena=cadena+'<h2 style="color:#FFFFFF">Juego de cartas online</h2></div>';
  $("#cabecera").append(cadena);
}


function mostrarListaPartidas(datos){

  $('#mostrarListaPartidas').remove();
  var cadena='<div id="mostrarListaPartidas"><h3 style="color:rgb(31, 194, 16);">Elegir partida</h3>';
  cadena=cadena+'<div class="dropdown">';
  cadena=cadena+'<button class="btn btn-primary dropdown-toggle" style="border:1px solid MediumSeaGreen; background-color:MediumSeaGreen;" id="mostrarListaBtn" type="button" data-toggle="dropdown">Elegir partida ';
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

  $("[id=mostrarListaBtn]").hover(function(){
      $(this).css("background-color", "#359D63");
  },
  function(){
      $(this).css("background-color", "#3CB371");
  });
}

function mostrarEsperandoRival(){
  limpiar();
  $('#mostrarEsperando').remove();
  var cadena='<div id="mostrarEsperando"><h2 style="color:#ffffff;margin-bottom:25px">Esperando rival...</h2>';
  cadena=cadena+'<img id="gif" src="cliente/img/download.gif" style="width:400px; height:400px; border-radius:200px;"></div>';
  $('#cabecera').append(cadena);
}

function eliminarGif(){
  $('#gif').remove();
}

function mostrarRival(elixir,vidas){
  $('#mostrarRival').remove();
  var cadena='<div id="mostrarRival" style="color:#ffffff"><h3><img src="cliente/img/Mana.png"  id="mana" class="img-rounded" style="width:2%;"border:none">'+' Mana['+elixir+'] '+'<img src="cliente/img/Vidas.png"  id="vidas" class="img-rounded" style="width:3%;"border:none">'+' Vidas['+vidas+']';
  cadena=cadena+'</h3>';
  cadena=cadena+'<img src="cliente/img/rival.png" name="imgRival" id="jugadorRival" title="Héroe rival" class="img-rounded" style="width:15%;"border:none">';
  cadena=cadena+'<h2 style="color:#ffffff">_________________________________________________________________</h2></div>'
  //cadena=cadena +'<div class="thumbnail"><img src="cliente/img/rival.png" class="img-rounded" id="rival" style="width:15%;"border:none"></div>';
  //cadena=cadena+'<img src="cliente/img/rival.png" class="img-rounded" id="rival" style="width:15%;"border:none"></div>';
   
  $('#rival').append(cadena);

  $('[id=jugadorRival]').click(function(){
    var nombre=$(this).attr("id");
    console.log(nombre);
    atacarAlRival();
    //com.jugarCarta(nombreCarta);
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
    cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" id="'+datos[i].nombre+'" class="img-rounded" title="Vidas: '+datos[i].vidas+'" name="cartaRival" style="width:100%">';
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
}

function mostrarAtaque(datos){
  $('#mostrarAtaque').remove();
  var cadena='<div id="mostrarAtaque"><h3 style="color:#f2f2f2;">Zona de Ataque</h3>';
  for(var i=0;i<=(5-datos.length)/2;i++){
    cadena=cadena+'<div class="col-md-1">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/nocartaataque2.png" class="img-rounded" alt="carta" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  for(var i=0;i<datos.length;i++){   
    cadena=cadena+'<div class="col-md-1">';
    cadena=cadena+'<div class="thumbnail" style="opacity:1.0">';
    cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" id="'+datos[i].nombre+'" class="img-rounded" title="Vidas: '+datos[i].vidas+'" name="atacante" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  for(var i=0;i<=(5-datos.length)/2;i++){
    cadena=cadena+'<div class="col-md-1">';
    cadena=cadena+'<div class="thumbnail">';
    cadena=cadena+'<img src="cliente/img/nocartaataque2.png" class="img-rounded" alt="carta" style="width:100%">';
    cadena=cadena+'</div></div>'
  }
  cadena=cadena+'<h2 style="color:#ffffff">_________________________________________________________________</h2>'
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
      else if (carta!=""){
        console.log("Se ha seleccionado el atacante");
        $('[name="atacante"]').css("border","none");
        $(this).css("border","2px solid red");
        com.cartaAtacante=carta;
      }
  });

  $('[name="atacante"]').hover(function(){
    //$(this).css("border-style", "solid");
    var carta=$(this).attr("id"); 
    if(carta!=com.cartaAtacante){$(this).css("border","1px solid green");}    
  },
  function(){
    var carta=$(this).attr("id"); 
    if(carta!=com.cartaAtacante){$(this).css("border","none");}
  });

}

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
    alert("Debe seleccionar la carta que ataque");
  }
}

function mostrarElixir(datos){
  $('#mostrarElixir').remove();

  $('#mostrarCementerio').remove();
  $('#zonaCementerio').remove();
  var cadena='<div id="mostrarElixir">';  
  cadena=cadena+'<h3 style="color:white"><img src="cliente/img/Mana.png"  id="mana" class="img-rounded" style="width:2%;"border:none">';
  cadena=cadena+' Mana['+datos.elixir+']     '+'<img src="cliente/img/Vidas.png"  id="mana" class="img-rounded" style="width:3%;"border:none">'+'Vidas['+datos.vidas+'] </h3>';
  //cadena=cadena+'<button type="button" class="btn btn-warning" onclick="abandonarPartida()">Abandonar partida</button> ';
  //cadena=cadena+'-----------------------';
  cadena=cadena+'<img src="cliente/img/heroe.png"  id="heroe" class="img-rounded" align="center" title="Tu héroe" style="width:15%;margin-bottom:12px"border:none">';
  //cadena=cadena+'-----------------------';
  //cadena=cadena+' <button type="button" class="btn btn-success" onclick="com.pasarTurno();">Pasar turno</button>';
  cadena=cadena+'<div id="mostrarElixir" align="center"><button type="button" class="btn btn-warning" onclick="abandonarPartida()">Abandonar</button> <img src="cliente/img/cementerio.png" id="cementerio" title="Cementerio" style="width:4%"> <button type="button" class="btn btn-success" onclick="com.pasarTurno();">Pasar turno</button></div>';
  if (datos.turno){
    cadena=cadena+'<h3 id="miTurno" style="color:white;background-color:Green">TU TURNO</h3>';
  }
  else{
    cadena=cadena+'<h3 id="miTurno" style="color:white;background-color:Red">TURNO DEL RIVAL</h3>';
  }
  cadena=cadena+'<div id="zonaCementerio"  align="center"></div>';
  //<button type="button" class="btn btn-warning" onclick="abandonarPartida()">Abandonar partida</button></h3></div>';
  $('#elixir').append(cadena);

  /*$('[id=cementerio]').hover(function(){
      //$(this).css("border-style", "solid");
      //$(this).css("border","5px solid #1583F0");
      //$(this).css("opacity","0.8");
      //com.obtenerCartasCementerio();
      //console.log("Ahora true");
      $(this).css("border-style", "solid");
      $(this).css("border","3px solid #8F00FF");
      com.obtenerCartasCementerio();
      //com.zonaCementerio=true;
    },
    function(){
        //$(this).css("border","none");
        //$(this).css("opacity","1");
        //$('#mostrarCementerio').remove();
        //$('[id=cartasCementerio]').remove();
        //console.log("Ahora false");
        $(this).css("border-style", "none");
        $('#mostrarCementerio').remove();
        $('[id=cartasCementerio]').remove();
        //com.zonaCementerio=undefined;
    });*/

    $('[id=cementerio]').click(function(){  
      if(com.zonaCementerio==undefined){
        $(this).fadeIn("slow");
        $(this).css("border-style", "solid");
        $(this).css("border","3px solid #8F00FF");
        com.obtenerCartasCementerio();
      }      
    });

    /*$('[id=cementerio]').click(function(){  
      if(com.zonaCementerio==true){
        console.log("Ahora false");
        $(this).css("border-style", "none");
        $('#zonaCementerio').remove();
      }       
    });*/
}

function mostrarCementerio(datos){
  $('#mostrarCementerio').remove();
  $('[id=cartasCementerio]').remove();

  var numCol=Math.round(6/(datos.length));
  var numCol=2;
  var cadena='<div id="mostrarCementerio" style="color:white">';
  cadena=cadena+'<h3 style="color:white;background-color:#8F00FF">CEMENTERIO</h3>';
  for(var i=0;i<datos.length;i++){
    cadena=cadena+'<div class="col-md-'+numCol+'">';
    cadena=cadena+'<div class="thumbnail" id="cartasCementerio" style="border-style:none;background-color:transparent;width:50%">';
    cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" name="cartasCementerio" class="img-rounded" id="'+datos[i].nombre+'" style="width:100%;">';
    cadena=cadena+'</div></div>';
  }
  cadena=cadena+'<img src="cliente/img/volverCementerio.png" id="volverCementerio" class="img-rounded" style="width:5%;float:right">';
  cadena=cadena+'<h2 style="color:#ffffff">_________________________________________________________________</h2></div>'
  $('#zonaCementerio').append(cadena);

  $('[id=volverCementerio]').click(function(){  
      $('[id=cementerio]').css("border-style", "none");
      $('#mostrarCementerio').remove();
    });
}

function mostrarMano(datos){
  $('#mostrarMano').remove();
  var numCol=Math.round(12/(datos.length));
  $('#mostrarMano').remove();
  var cadena='<div id="mostrarMano">';
  //cadena=cadena+'<div class="col-md-'+numCol+'"></div>';
  for(var i=0;i<datos.length;i++){
    cadena=cadena+'<div class="col-md-'+numCol+'">';
    cadena=cadena+'<div class="thumbnail" id="cartasMano" style="border-style:none;background-color:transparent">';
    cadena=cadena+'<img src="cliente/img/'+datos[i].nombre+'.png" name="cartasMano" class="img-rounded" id="'+datos[i].nombre+'" style="width:100%;">';
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
    console.log(nombreCarta);
    //seleccionarCarta(nombreCarta);
    com.jugarCarta(nombreCarta);  
    //$('#mostrarMano').remove(); 
  });

  $('[name="cartasMano"]').hover(function(){
    //$(this).css("border-style", "solid");
    $(this).css("border","5px solid green");
  },
  function(){
      $(this).css("border","none");
  });
}
