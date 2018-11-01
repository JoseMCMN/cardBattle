function ClienteCom(){
	this.socket=undefined;
	this.nombrePartida=undefined;
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
	this.elegirPartida = function(nombre){	
		this.nombrePartida=nombre;	
    	this.socket.emit('elegirPartida',this.usrId,nombre);
	};
	this.obtenerCartasMano=function(){
		this.socket.emit("obtenerCartasMano",this.usrId,this.nombrePartida);
	}
	this.jugarCarta = function(nombreCarta){
		this.socket.emit('jugarCarta',this.usrId,this.nombrePartida,nombreCarta);
	}
	this.pasarTurno=function() {
       this.socket.emit('pasarTurno', this.usrId, this.nombrePartida);
   	}
	this.lanzarSocketSrv=function(){
		var cli=this;
		this.socket.on('connect', function() {   						
   			console.log("Usuario conectado al servidor de WebSockets");
		});
		this.socket.on('partidaCreada', function(partidaId) {   						
   			console.log("Usuario crea partida con id: "+partidaId);
   			//console.log("Mano: "+mano);
		});
		this.socket.on('unidoAPartida', function(partidaId,mano) {   						
   			console.log("Usuario unido a partida id: "+partidaId);
   			console.log("Mano: "+mano);
		});
		this.socket.on('noUnido', function(partidaId) {   						
   			console.log("El usuario no pudo unirse a la partida id: "+partidaId);
		});
		this.socket.on('mano',function(mano){
			console.log(mano);
		});
		this.socket.on('noJugada', function(carta) { 
			console.log("El usuario no pudo jugar la carta con coste: "+carta.coste);
		});
		this.socket.on('juegaCarta', function(usrid,carta,elixir) { 
			console.log("Usuario " + usrid + " juega la carta correctamente con coste: "+carta.coste+" elixir: "+elixir);
		});
		this.socket.on('pasaTurno', function(resultado) {
           console.log("El usuario tiene turno: "+resultado);
       	});
       	this.socket.on('recibeTurno', function() {
           console.log("Tienes el turno");
       	});
	}
}