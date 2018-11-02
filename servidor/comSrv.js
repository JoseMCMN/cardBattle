function ComSrv(){
	this.lanzarSocketSrv=function(io,juego){
		var cli=this;
		io.on('connection',function(socket){
			socket.on('crearPartida', function(usrid,nombrePartida) {
				console.log('nueva partida: ',usrid,nombrePartida);
				var usr=juego.usuarios[usrid];
				var partidaId;
				if (usr){
					console.log("usuario "+usrid+" crea partida "+nombrePartida);
					partidaId=usr.crearPartida(nombrePartida); 
					socket.join(nombrePartida);
					io.sockets.in(nombrePartida).emit("partidaCreada",partidaId);
				} 
			});
			socket.on('elegirPartida',function(usrid,nombrePartida){
				var usr=juego.usuarios[usrid]; 
				var partidaId;
				if (usr){
					partidaId=usr.eligePartida(nombrePartida);
					if (partidaId<0){
						console.log("usuario "+usrid+" NO se pudo unir a la partida "+nombrePartida);
						socket.emit("noUnido",partidaId);
					}
					else{
						console.log("usuario "+usrid+" se une a la partida "+nombrePartida);
						socket.join(nombrePartida);
						io.sockets.in(nombrePartida).emit("unidoAPartida",partidaId);
					}
				}
			});
		});
	};
	this.enviarRemitente=function(socket,mens,datos){
    	socket.emit(mens,datos);
	}
	this.enviarATodos=function(io,nombre,mens,datos){
		io.sockets.in(nombre).emit(mens,datos);
	}
	this.enviarATodosMenosRemitente=function(socket,nombre,mens,datos){
	    socket.broadcast.to(nombre).emit(mens,datos)
	};
 }
 module.exports.ComSrv=ComSrv;