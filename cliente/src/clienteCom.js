function ClienteCom(){
	this.socket=undefined;
	this.nombrePartida=undefined;
	//Para invocaciones
	this.cartaObjetivo=undefined;
	this.cartaAtacante=undefined;
	//Para hechizos
	this.cartaOrigen=undefined;
	this.cartaDestino=undefined;
	this.destinoCartaRival=undefined;
	this.rivalObjetivo=undefined;
	//this.zonaCementerio=undefined;
	//Para gritos de batalla
	this.tieneObjetivosG=undefined;
	this.cartaOrigenGrito=undefined;
	this.cartaDestinoGrito=undefined;
	this.cementerioMostrado=false;
	
	this.usrId=undefined;
	this.ini=function(usrid){
		this.socket=io.connect();
		this.usrId=usrid;
		this.lanzarSocketSrv();
	}
	this.crearPartida=function(nombre){
		this.nombrePartida=nombre;
		this.socket.emit('crearPartida', this.usrId,nombre);
   			console.log("usuario "+this.usrId+" crea partida "+nombre);
	}
	this.buscarPartida=function(){
		this.socket.emit('buscarPartida', this.usrId);
   			console.log("usuario "+this.usrId+" busca partida");
	}
	this.elegirPartida = function(nombre){	
		this.nombrePartida=nombre;	
    	this.socket.emit('elegirPartida',this.usrId,nombre);
	};
	this.elegirMazoFuego = function(variante){		
    	this.socket.emit('elegirMazoFuego',this.usrId,variante);
	};
	this.elegirMazoAgua = function(variante){		
    	this.socket.emit('elegirMazoAgua',this.usrId,variante);
	};
	this.elegirMazoTierra = function(variante){		
    	this.socket.emit('elegirMazoTierra',this.usrId,variante);
	};
	this.elegirMazoAire = function(variante){		
    	this.socket.emit('elegirMazoAire',this.usrId,variante);
	};
	this.retomarPartida=function(){
		this.socket.emit("retomarPartida",this.usrId,this.nombrePartida);
	}
	this.meToca=function(){
		this.socket.emit("meToca",this.usrId,this.nombrePartida);
	}
	this.obtenerCartasMano=function(){
		this.socket.emit("obtenerCartasMano",this.usrId,this.nombrePartida);
	}
	this.obtenerCartasAtaque=function(){
		this.socket.emit("obtenerCartasAtaque",this.usrId,this.nombrePartida);
	}
	this.obtenerCartasCementerio=function(){
		this.socket.emit("obtenerCartasCementerio",this.usrId,this.nombrePartida);
	}
	this.jugarCarta = function(nombreCarta){
		this.socket.emit('jugarCarta',this.usrId,this.nombrePartida,nombreCarta);
	}
	this.existenObjetivosGrito = function(nombreCarta){
		this.socket.emit('existenObjetivosGrito',this.usrId,this.nombrePartida,nombreCarta);
	}
	//Para cartas con grito
	this.jugarCartaGritoRival = function(nombreCarta){
		this.socket.emit('jugarCartaGritoRival',this.usrId,this.nombrePartida,nombreCarta);
	}
	this.jugarCartaGritoCartaRival = function(nombreCarta,cartaDestinoGrito){
		this.socket.emit('jugarCartaGritoCartaRival',this.usrId,this.nombrePartida,nombreCarta,cartaDestinoGrito);
	}
	this.jugarCartaGritoCartaJugador = function(nombreCarta,cartaDestinoGrito){
		this.socket.emit('jugarCartaGritoCartaJugador',this.usrId,this.nombrePartida,nombreCarta,cartaDestinoGrito);
	}
	this.jugarCartaGritoJugador = function(nombreCarta){
		this.socket.emit('jugarCartaGritoJugador',this.usrId,this.nombrePartida,nombreCarta);
	}
	//Para hechizos
	this.lanzarHechizoRival = function(nombreCarta){
		this.socket.emit('jugarHechizoRival',this.usrId,this.nombrePartida,nombreCarta);
	}
	this.lanzarHechizoCartaRival = function(nombreCarta,cartaDestino){
		this.socket.emit('jugarHechizoCartaRival',this.usrId,this.nombrePartida,nombreCarta,cartaDestino);
	}
	this.lanzarHechizoCartaJugador = function(nombreCarta,cartaDestino){
		this.socket.emit('jugarHechizoCartaJugador',this.usrId,this.nombrePartida,nombreCarta,cartaDestino);
	}
	this.lanzarHechizoJugador = function(nombreCarta){
		this.socket.emit('jugarHechizoJugador',this.usrId,this.nombrePartida,nombreCarta);
	}
	this.lanzarHechizoSinObjetivo = function(nombreCarta){
		this.socket.emit('jugarHechizoSinObjetivo',this.usrId,this.nombrePartida,nombreCarta);
	}
	this.pasarTurno=function() {
       this.socket.emit('pasarTurno', this.usrId, this.nombrePartida);
   	}
   	this.obtenerDatosRival=function(){
   		this.socket.emit('obtenerDatosRival',this.usrId,this.nombrePartida);
   	}
   	this.atacar=function(idCarta1,idCarta2){
   		this.socket.emit('atacar',this.usrId,this.nombrePartida,idCarta1,idCarta2);
   	}
   	this.atacarRival=function(idCarta1){
   		this.socket.emit('atacarRival',this.usrId,this.nombrePartida,idCarta1);
   	}
   	this.abandonarPartida=function(){
   		if(this.nombrePartida){
   			this.socket.emit('abandonarPartida',this.usrId,this.nombrePartida);
   		}
   		
   	}
	this.lanzarSocketSrv=function(){
		var cli=this;
		this.socket.on('connect', function(){   						
   			console.log("Usuario conectado al servidor de WebSockets");
		});
		this.socket.on('elegido', function(){   			
			console.log("Usuario elige mazo");
   			mostrarMenu();
   			//console.log("Mano: "+mano);
		});		
		this.socket.on('noElegido', function(){   			
			console.log("Algo ha fallado al elegir mazo");
   			mostrarMenu();
   			//console.log("Mano: "+mano);
		});
		this.socket.on('partidaBuscada', function(nombre){   						
   			console.log("Partida buscada con nombre "+nombre);
   			cli.nombrePartida=nombre;
   			//rest.obtenerPartidas();
   			mostrarEsperandoRival();
   			//console.log("Mano: "+mano);
		});
		this.socket.on('partidaCreada', function(partidaId){   						
   			console.log("Usuario crea partida con id: "+partidaId);
   			//rest.obtenerPartidas();
   			mostrarEsperandoRival();
   			//console.log("Mano: "+mano);
		});
		this.socket.on('unidoAPartida', function(partidaId){   						
   			console.log("Usuario unido a partida id: "+partidaId);   			
		});
		this.socket.on('noUnido', function(partidaId){   						
   			console.log("El usuario no pudo unirse a la partida id: "+partidaId);
		});
		this.socket.on("aJugar",function(partidaId){
			console.log("La partida "+partidaId+" esta en fase Jugando");
			eliminarGif();
			cli.meToca();
		});
		this.socket.on("meToca",function(turno){	
			console.log("Mi turno está a: "+turno);
			limpiar();
			cli.obtenerCartasMano();
			cli.obtenerCartasAtaque();
			cli.obtenerDatosRival();

		});
		this.socket.on('mano',function(datos){
			console.log(datos);
			mostrarElixir(datos);
			mostrarMano(datos.mano,datos.elixir);
		});
		this.socket.on("cartasAtaque",function(datos){
			console.log(datos);
			mostrarAtaque(datos.ataque);
		});
		this.socket.on('cartasCementerio',function(datos){
			console.log(datos);
			mostrarCementerio(datos.cementerio);
		});
		this.socket.on('existenObjetivosGrito',function(datos){
			console.log(datos);
			//existenObjetivosGrito(datos);
			//return datos;
			tieneObjetivosDisponiblesGrito(datos);
			//cli.tieneObjetivosG=datos;
			//console.log(cli.tieneObjetivosG);

			//this.tieneObjetivosG=datos;
			//console.log(this.tieneObjetivosG);
		});
		this.socket.on('datosRival',function(datos){
			console.log(datos);
			//usr.datosRival=datos;
			mostrarRival(datos.elixir,datos.vidas,datos.mano,datos.cementerio,datos.elemento,datos.mazo);
			mostrarAtaqueRival(datos.cartas);
		});
		this.socket.on('noJugada', function(carta){ 
			console.log("El usuario no pudo jugar la carta con coste: "+carta.coste);
			cli.obtenerCartasMano();
			cli.obtenerCartasAtaque();
			cli.obtenerDatosRival();
		});
		this.socket.on('juegaCarta', function(datos) { 
			console.log("Usuario " + datos.usrid + " juega la carta con coste: "+datos.carta.coste+" elixir: "+datos.elixir);
			//limpiar();
			cli.obtenerCartasMano();
			cli.obtenerCartasAtaque();
			cli.obtenerDatosRival();
			//usr.elixir=datos.elixir;
			//usr.cartasAtaque.push(datos.carta);
			//mostrarAtaque(datos.carta);
		});
		this.socket.on('pasarTurno', function(datos){
           console.log("El usuario tiene turno: "+datos.turno);
           //cli.meToca();
           cli.obtenerCartasMano();
			cli.obtenerCartasAtaque();
			cli.obtenerDatosRival();
           mostrarElixir(datos);
       	});
       	this.socket.on("respuestaAtaque",function(datos){
       		console.log(datos);
       		cli.meToca();
       	});
       	this.socket.on("respuestaAtaqueRival",function(datos){
       		console.log(datos);
       		cli.meToca();
       	});
       	this.socket.on("rivalAbandona",function(data){
       		console.log("rival abandona");
       		//mostrarInicio();
       		abandonarPartida();
       		//limpiar();
      		//mostrarMenu();
      		//mostrarNavLogout();
       	});
	}
}