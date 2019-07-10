function ClienteRest(){
	/*this.obtenerPartidas=function(){
		$.getJSON("/obtenerPartidas",function(data){    
    		console.log(data);
    		mostrarListaPartidas(data);
		});
	}*/
	this.obtenerPartidas=function(usrid){
		$.getJSON("/obtenerPartidas/"+usrid,function(data){    
    		console.log(data);
    		mostrarListaPartidas(data);
		});
	}
    this.comprobarUsuario=function(usrid){
		$.getJSON("/comprobarUsuario/"+usrid,function(data){    
			if (data.partida){
	    		console.log(data);
	    		usr=new ClienteUsuario();
	    		usr.nombre=data.nombreUsr;
	    		com.ini(usrid);
	    		com.partida=data.partida;
	    		com.retomarPartida();
	    		//mostrarNavLogin();
	    	}
	    	else{
	    		//PENDIENTE
	    		$.removeCookie("usr");
	    		mostrarNavLogin();
	    		mostrarCabecera();
	    		//com.ini(usrid);
	    		//mostrarMenu();
	    		//mostrarNavLogout();
	    	}
		});	
	}
	this.agregarUsuario=function(nombre){
	  	//var usr=JSON.parse($.cookie("usr"));	  
		/*var cli=this;
		$.ajax({
		    type:'GET',
		    url:'/agregarUsuario/'+nombre,
		    success:function(data){
		      console.log("Usuario agregado con id: "+data.usr);
		      //usr.id=data.usr;
		      $.cookie("usr",data.usr);
		      com.ini(data.usr);
		      mostrarCrearPartida();
		      cli.obtenerPartidas();
		      },
		    contentType:'application/json',
		    dataType:'json'
		  });*/
	}
	this.registrarUsuario=function(email,clave){
	  $.ajax({
	    type:'POST',
	    url:'/registrarUsuario',
	    data:JSON.stringify({email:email,clave:clave}),
	    success:function(data){
	      if (!data.email){
	        console.log('No se ha podido registrar');
	        mostrarLogin();
	        mostrarRegistro();
	        //mostrarAviso("Dirección de email invalida o usuario ya existente");
	        //mostrarSolicitarReenvioMail();
	      }
	      else{        		
	      	console.log("Debes confirmar la cuenta: "+data.email);
	      	alert("Se ha enviado un correo para confirmar la cuenta. Una vez confirmada se podrá iniciar sesión");
	      	mostrarLogin();
	      	//mostrarRegistro();
	        //mostrarAviso("Se ha enviado un email para confirmar la cuenta");
	      }
	     },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}
	this.loginUsuario=function(email,clave){
		cli=this;
	  	$.ajax({
		    type:'POST',
		    url:'/loginUsuario',
		    data:JSON.stringify({email:email,clave:clave}),
		    success:function(data){
		      if (!data.email){
		      	console.log("No se ha podido iniciar sesion");
		      	mostrarRegistro();
		        //mostrarRegistro();
		        //mostrarAviso("Dirección de email invalida o usuario ya existente");
		        //mostrarSolicitarReenvioMail();
		      }
		      else{        
		      	console.log("Sesion iniciada con exito 	" +data.email);
		        $.cookie("usr",	JSON.stringify(data));
		      	com.ini(data._id);
		      	//mostrarCrearPartida();
		      	//cli.obtenerPartidas();
		      	mostrarMenu();
		      	mostrarNavLogout();
				//mostrarCrearElegirPartida();
				console.log(data._id);
				//mostrarCrearPartida();
				//cli.obtenerPartidas(data._id);


		    	}
		    },
		    contentType:'application/json',
		    dataType:'json'
	  });
	}




	this.obtenerKey=function(email){
	  if (!email || email==""){
	    mostrarLogin();
	    console.log("Introduce usuario");
	  }
	  else{
	    $.getJSON("/obtenerKeyUsuario/"+email,function(data){    
	        if (!data.email){
	          mostrarRegistro();
	          console.log("El usuario no existe en el sistema");	          
	        }
	        else{
	           mostrarLogin();
	           console.log("Te hemos enviado un email para confirmar tu cuenta");
	        }
	      });
	  }
	}
	this.eliminarUsuario=function(){
	  var usr=JSON.parse($.cookie("usr"));
	  $.ajax({
	    type:'DELETE',
	    url:'/eliminarUsuario/'+usr._id,//$.cookie("uid"),
	    data:'{}',
	    success:function(data){
	      if (data.resultados==1)
	      {
	        //eliminarCookies();
	        $.removeCookie("usr");
	        mostrarLogin();
	        mostrarNavLogin();
	      }
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}
	this.actualizarUsuario=function(oldpass,newpass,newpass2){
	  var usr=JSON.parse($.cookie("usr"));
	 $.ajax({
	    type:'PUT',
	    url:'/actualizarUsuario',
	    data:JSON.stringify({uid:usr._id,email:usr.email,oldpass:oldpass,newpass:newpass,newpass2:newpass2}),
	    success:function(data){
	      if (!data.email){
	        mostrarRegistro();
	      }
	      else{
	        $.cookie("usr",JSON.stringify(data));
	        mostrarCabecera();
	      }
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}

}