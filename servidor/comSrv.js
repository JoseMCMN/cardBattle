function ComSrv(){
	this.enviarRemitente=function(socket,mens,datos){
        socket.emit(mens,datos);
    }
    this.enviarATodos=function(io,nombre,mens,datos){
        io.sockets.in(nombre).emit(mens,datos);
    }
    this.enviarATodosMenosRemitente=function(socket,nombre,mens,datos){
        socket.broadcast.to(nombre).emit(mens,datos)
    };
	this.lanzarSocketSrv=function(io,juego){
		var cli=this;
		io.on('connection',function(socket){
		    socket.on('crearPartida', function(usrid,nombrePartida) {
		        //console.log('usuario id: '+usrid+" crea partida: "+nombrePartida);
		        var usr=juego.obtenerUsuario(usrid); //usuarios[usrid];
		        var partidaId;
				if (usr){
					console.log("usuario "+usrid+" crea partida "+nombrePartida);
					partidaId=usr.crearPartida(nombrePartida);				
		        	socket.join(nombrePartida);
		        	//io.sockets.in(nombrePartida).emit("partidaCreada",partidaId);
		        	cli.enviarRemitente(socket,"partidaCreada",partidaId)
		        }		        
		    });
		    socket.on('buscarPartida', function(usrid) {
		        //console.log('usuario id: '+usrid+" crea partida: "+nombrePartida);
		        var usr=juego.obtenerUsuario(usrid); //usuarios[usrid];
		        var partidaId;
				if (usr){
					console.log("usuario "+usrid+" busca partida");
					var json=usr.buscarPartida();
					//partidaId=usr.buscarPartida();
					cli.enviarRemitente(socket,"partidaBuscada",json.nombre);
					if(json.creada){
						socket.join(json.nombre);
		        		cli.enviarRemitente(socket,"partidaCreada",json.idPartida);
					}else{
						console.log("usuario "+usrid+" se une a la partida "+json.nombre);
						//var mano=usr.obtenerCartasMano();
				     	socket.join(json.nombre);
   			        	//socket.emit("unidoAPartida",partidaId,mano);
   			        	cli.enviarRemitente(socket,"unidoAPartida",json.idPartida);
   			        	cli.enviarATodos(io,json.nombre,"aJugar",json.idPartida);
					}
		        }		        
		    });
		    socket.on('elegirPartida',function(usrid,nombrePartida){
		        var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid]; 
		        var partidaId;
				if (usr){
					partidaId=usr.eligePartida(nombrePartida);
					if (partidaId<0){
						console.log("usuario "+usrid+" NO se pudo unir a la partida "+nombrePartida);
						//socket.emit("noUnido",partidaId);
						cli.enviarRemitente(socket,"noUnido",partidaId);
					}
					else{
						console.log("usuario "+usrid+" se une a la partida "+nombrePartida);
						//var mano=usr.obtenerCartasMano();
				     	socket.join(nombrePartida);
   			        	//socket.emit("unidoAPartida",partidaId,mano);
   			        	cli.enviarRemitente(socket,"unidoAPartida",partidaId);
   			        	cli.enviarATodos(io,nombrePartida,"aJugar",partidaId);
			     	}
				}
			});
			socket.on('elegirMazoFuego',function(usrid,variante){
		        var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid]; 
		        var elegido; 
				if (usr){
					elegido=usr.elegirMazoFuego(variante);
					if (elegido){
						//socket.emit("noUnido",partidaId);
						cli.enviarRemitente(socket,"elegido");
					}
					else{
						//console.log("algo ha fallado al elegir mazo");
						cli.enviarRemitente(socket,"noElegido");
			     	}
				}
			});
			socket.on('elegirMazoAgua',function(usrid,variante){
		        var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid]; 
		        var elegido;
				if (usr){
					elegido=usr.elegirMazoAgua(variante);
					if (elegido){
						//socket.emit("noUnido",partidaId);
						cli.enviarRemitente(socket,"elegido");
					}
					else{
						//console.log("algo ha fallado al elegir mazo");
						cli.enviarRemitente(socket,"noElegido");
			     	}
				}
			});
			socket.on('elegirMazoTierra',function(usrid,variante){
		        var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid]; 
		        var elegido;
				if (usr){
					elegido=usr.elegirMazoTierra(variante);
					if (elegido){
						//socket.emit("noUnido",partidaId);
						cli.enviarRemitente(socket,"elegido");
					}
					else{
						//console.log("algo ha fallado al elegir mazo");
						cli.enviarRemitente(socket,"noElegido");
			     	}
				}
			});
			socket.on('elegirMazoAire',function(usrid,variante){
		        var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid]; 
		        var elegido;
				if (usr){
					elegido=usr.elegirMazoAire(variante);
					if (elegido){
						//socket.emit("noUnido",partidaId);
						cli.enviarRemitente(socket,"elegido");
					}
					else{
						//console.log("algo ha fallado al elegir mazo");
						cli.enviarRemitente(socket,"noElegido");
			     	}
				}
			});
			socket.on('retomarPartida',function(usrid,nombrePartida){
				var usr=juego.obtenerUsuario(usrid); //usuarios[usrid]; 
		        var partidaId;
				if (usr){
					partidaId=usr.obtenerPartida(nombrePartida);
					if (partidaId<0/* || usr.partida.usuariosPartida.length<2*/){
						usr.abandonarPartida();
						cli.enviarATodos(io,nombrePartida,"rivalAbandona",partidaId);
					}
					//PENDIENTE: HACER AQUI EL TEMA DE REFRESCAR CUANDO ESTA ESPERANDO RIVAL
					else{
					 	socket.join(nombrePartida);
					 	cli.enviarRemitente(socket,"aJugar",partidaId);
					 	cli.enviarATodosMenosRemitente(socket,nombrePartida,"meToca",usr.rivalTeToca());
					}
				}
			});
			socket.on("meToca",function(usrid,nombrePartida){
				var usr=juego.obtenerUsuario(usrid); //usuarios[usrid];
				if (usr){
					//socket.emit("mano",usr.obtenerCartasMano());
					cli.enviarRemitente(socket,"meToca",usr.meToca());
				}
			});
			socket.on('obtenerCartasMano',function(usrid,nombrePartida){
				var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid];
				if (usr && usr.partida){
					//socket.emit("mano",usr.obtenerCartasMano());
					cli.enviarRemitente(socket,"mano",{"mano":usr.obtenerCartasMano(),"turno":usr.meToca(),"elixir":usr.elixir,"vidas":usr.vidas, "cementerio":usr.obtenerCartasCementerio(), "elemento":usr.obtenerElemento(), "mazo":usr.obtenerCartasMazo()});
				}
			});
			socket.on('obtenerCartasAtaque',function(usrid,nombrePartida){
				var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid];
				if (usr && usr.partida){
					//socket.emit("mano",usr.obtenerCartasMano());
					cli.enviarRemitente(socket,"cartasAtaque",{"ataque":usr.obtenerCartasAtaque()});
				}
			});
			socket.on('obtenerCartasCementerio',function(usrid,nombrePartida){
				var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid];
				if (usr && usr.partida){
					//socket.emit("mano",usr.obtenerCartasMano());
					cli.enviarRemitente(socket,"cartasCementerio",{"cementerio":usr.obtenerCartasCementerio()});
				}
			});
			socket.on('existenObjetivosGrito',function(usrid,nombrePartida,nombreCarta){
				var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid];
				if (usr){
					carta=usr.obtenerCartaMano(nombreCarta);
					if(carta){
						var existenObjetivos=carta.existenObjetivosGrito(usr);
						console.log("La carta "+carta.nombre+" tiene objetivos de grito: "+existenObjetivos);
						cli.enviarRemitente(socket,"existenObjetivosGrito",existenObjetivos);
						//return existenObjetivos;
					}else{
						console.log("usuario "+usrid+" NO pudo jugar la carta, no existe");
						cli.enviarRemitente(socket,"noJugada",nombreCarta);
					}
					//socket.emit("mano",usr.obtenerCartasMano());
				}
			});
			//PARA CARTAS SIMPLES
			socket.on('jugarCarta', function(usrid,nombrePartida,nombreCarta){ 
				var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid]; 
				var carta;
				if (usr && usr.partida){ 
					carta=usr.obtenerCartaMano(nombreCarta);
					if (carta){	
						//Miramos el tipo de la carta antes de jugarla
						if(carta.tipo=="invocacion" || carta.tipo=="token"){
							usr.jugarCarta(carta);
							if(carta.posicion=="ataque"){
								console.log("usuario "+usrid+" juega la carta con coste: "+carta.coste);
								//io.sockets.in(nombrePartida).emit("juegaCarta",usrid,carta,usr.elixir);
								cli.enviarATodos(io,nombrePartida,"juegaCarta",{"usrid":usrid,"carta":carta,"elixir":usr.elixir});
							 }
							else{
								console.log("usuario "+usrid+" NO pudo jugar la carta con coste: "+carta.coste);
								cli.enviarRemitente(socket,"noJugada",carta);
							}
						}/*

						else if(carta.tipo=="hechizo" && carta.tieneObjetivos==true){
								if(destinoObjetivo){
									var rival=usr.partida.obtenerRival(usr);
									var cartaObjetivo=rival.obtenerCartaAtaqueNombre(cartaDestino);
								}else{
									var cartaObjetivo=usr.obtenerCartaAtaqueNombre(cartaDestino);
								}
								//PENDIENTE -> OBTENERCARTA(CARTADESRINO)
								//carta.objetivo=cartaObjetivo;
								usr.seleccionaObjetivoCarta(carta,cartaObjetivo);
								usr.jugarCarta(carta);
								if(carta.posicion="cementerio"){
									console.log("usuario "+usrid+" juega la carta hechizo con coste: "+carta.coste+" con destino: "+carta.objetivo);
									//io.sockets.in(nombrePartida).emit("juegaCarta",usrid,carta,usr.elixir);
									cli.enviarATodos(io,nombrePartida,"juegaCarta",{"usrid":usrid,"carta":carta,"elixir":usr.elixir,"cartaObjetivo":cartaObjetivo});
								}
								else{
									console.log("usuario "+usrid+" NO pudo jugar la carta con coste: "+carta.coste);
									cli.enviarRemitente(socket,"noJugada",carta);
								}
							}

							else if(carta.tipo=="hechizo" && carta.tieneObjetivos==false){
								usr.jugarCarta(carta);
								if(carta.posicion="cementerio"){
									console.log("usuario "+usrid+" juega la carta hechizo con coste: "+carta.coste+" con destino: "+carta.objetivo);
									//io.sockets.in(nombrePartida).emit("juegaCarta",usrid,carta,usr.elixir);
									cli.enviarATodos(io,nombrePartida,"juegaCarta",{"usrid":usrid,"carta":carta,"elixir":usr.elixir,"cartaObjetivo":cartaObjetivo});
								}
								else{
									console.log("usuario "+usrid+" NO pudo jugar la carta con coste: "+carta.coste);
									cli.enviarRemitente(socket,"noJugada",carta);
								}
							}
					*/
					}else{
						console.log("usuario "+usrid+" NO pudo jugar la carta, no existe");
						cli.enviarRemitente(socket,"noJugada",nombreCarta);
					}
				} 
			});

			//PARA CARTAS CON GRITO DE BATALLA

			socket.on('jugarCartaGritoRival', function(usrid,nombrePartida,nombreCarta) {
				var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid]; 
				var carta;
				if (usr){ 
					carta=usr.obtenerCartaMano(nombreCarta);
					if (carta){
						//var rival=usr.partida.obtenerRival(usr);
						//usr.seleccionaObjetivoCarta(carta,rival);
						carta.setTipoObjetivo("rival");
						console.log(carta.tipoObjetivo);
						usr.jugarCarta(carta); 					
						if(carta.posicion=="ataque"){
							console.log("usuario "+usrid+" juega la carta con grito de batalla con coste: "+carta.coste+" con destino: "+carta.objetivo);
							//io.sockets.in(nombrePartida).emit("juegaCarta",usrid,carta,usr.elixir);
							cli.enviarATodos(io,nombrePartida,"juegaCarta",{"usrid":usrid,"carta":carta,"elixir":usr.elixir});
						}
						else{
							console.log("usuario "+usrid+" NO pudo jugar la carta con coste: "+carta.coste);
							cli.enviarRemitente(socket,"noJugada",carta);
						}
					}
					else{
						console.log("usuario "+usrid+" NO pudo jugar la carta, no existe");
						cli.enviarRemitente(socket,"noJugada",nombreCarta);
					}
				}
			}); 
			socket.on('jugarCartaGritoCartaRival', function(usrid,nombrePartida,nombreCarta,cartaDestino){
				var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid]; 
				var carta;
				if (usr){ 
					carta=usr.obtenerCartaMano(nombreCarta);
					if (carta){
						var rival=usr.partida.obtenerRival(usr);
						var cartaObjetivo=rival.obtenerCartaAtaqueNombre(cartaDestino);
						usr.seleccionaObjetivoCarta(carta,cartaObjetivo);
						carta.setTipoObjetivo("cartaRival");
						console.log(carta.tipoObjetivo);
						usr.jugarCarta(carta); 					
						if(carta.posicion=="ataque"){
							console.log("usuario "+usrid+" juega la carta con grito de batalla con coste: "+carta.coste+" con destino: "+carta.objetivo);
							//io.sockets.in(nombrePartida).emit("juegaCarta",usrid,carta,usr.elixir);
							cli.enviarATodos(io,nombrePartida,"juegaCarta",{"usrid":usrid,"carta":carta,"elixir":usr.elixir});
						}
						else{
							console.log("usuario "+usrid+" NO pudo jugar la carta con coste: "+carta.coste);
							cli.enviarRemitente(socket,"noJugada",carta);
						}
					}
					else{
						console.log("usuario "+usrid+" NO pudo jugar la carta, no existe");
						cli.enviarRemitente(socket,"noJugada",nombreCarta);
					}
				}
			});
			socket.on('jugarCartaGritoCartaJugador', function(usrid,nombrePartida,nombreCarta,cartaDestino) {
				var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid]; 
				var carta;
				if (usr){ 
					carta=usr.obtenerCartaMano(nombreCarta);
					if (carta){
						var cartaObjetivo=usr.obtenerCartaAtaqueNombre(cartaDestino);
						usr.seleccionaObjetivoCarta(carta,cartaObjetivo);
						carta.setTipoObjetivo("cartaJugador");
						console.log(carta.tipoObjetivo);
						usr.jugarCarta(carta); 					
						if(carta.posicion=="ataque"){
							console.log("usuario "+usrid+" juega la carta con grito de batalla con coste: "+carta.coste+" con destino: "+carta.objetivo);
							//io.sockets.in(nombrePartida).emit("juegaCarta",usrid,carta,usr.elixir);
							cli.enviarATodos(io,nombrePartida,"juegaCarta",{"usrid":usrid,"carta":carta,"elixir":usr.elixir});
						}
						else{
							console.log("usuario "+usrid+" NO pudo jugar la carta con coste: "+carta.coste);
							cli.enviarRemitente(socket,"noJugada",carta);
						}
					}
					else{
						console.log("usuario "+usrid+" NO pudo jugar la carta, no existe");
						cli.enviarRemitente(socket,"noJugada",nombreCarta);
					}
				}
			});
			socket.on('jugarCartaGritoJugador', function(usrid,nombrePartida,nombreCarta) {
				var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid]; 
				var carta;
				if (usr){ 
					carta=usr.obtenerCartaMano(nombreCarta);
					if (carta){
						//usr.seleccionaObjetivoCarta(carta,usr);
						carta.setTipoObjetivo("jugador");
						console.log(carta.tipoObjetivo);
						usr.jugarCarta(carta);
						console.log("carta: "+carta.nombre+" tipo objetivo: "+carta.tipoObjetivo+" objetivo: "+carta.objetivo); 					
						if(carta.posicion=="ataque"){
							console.log("usuario "+usrid+" juega la carta con grito de batalla con coste: "+carta.coste+" con destino: "+carta.objetivo);
							//io.sockets.in(nombrePartida).emit("juegaCarta",usrid,carta,usr.elixir);
							cli.enviarATodos(io,nombrePartida,"juegaCarta",{"usrid":usrid,"carta":carta,"elixir":usr.elixir});
						}
						else{
							console.log("usuario "+usrid+" NO pudo jugar la carta con coste: "+carta.coste);
							cli.enviarRemitente(socket,"noJugada",carta);
						}
					}
					else{
						console.log("usuario "+usrid+" NO pudo jugar la carta, no existe");
						cli.enviarRemitente(socket,"noJugada",nombreCarta);
					}
				}
			}); 


			// PARA CARTAS DE HECHIZO


			socket.on('jugarHechizoRival', function(usrid,nombrePartida,nombreCarta) {
				var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid]; 
				var carta;
				if (usr){ 
					carta=usr.obtenerCartaMano(nombreCarta);
					if (carta){
						//var rival=usr.partida.obtenerRival(usr);
						//usr.seleccionaObjetivoCarta(carta,rival);
						carta.setTipoObjetivo("rival");
						console.log(carta.tipoObjetivo);
						usr.jugarCarta(carta); 					
						if(carta.posicion=="cementerio"){
							console.log("usuario "+usrid+" juega la carta hechizo con coste: "+carta.coste+" con destino: "+carta.objetivo);
							//io.sockets.in(nombrePartida).emit("juegaCarta",usrid,carta,usr.elixir);
							cli.enviarATodos(io,nombrePartida,"juegaCarta",{"usrid":usrid,"carta":carta,"elixir":usr.elixir});
						}
						else{
							console.log("usuario "+usrid+" NO pudo jugar la carta con coste: "+carta.coste);
							cli.enviarRemitente(socket,"noJugada",carta);
						}
					}
					else{
						console.log("usuario "+usrid+" NO pudo jugar la carta, no existe");
						cli.enviarRemitente(socket,"noJugada",nombreCarta);
					}
				}
			}); 
			socket.on('jugarHechizoCartaRival', function(usrid,nombrePartida,nombreCarta,cartaDestino) {
				var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid]; 
				var carta;
				if (usr){ 
					carta=usr.obtenerCartaMano(nombreCarta);
					if (carta){
						var rival=usr.partida.obtenerRival(usr);
						var cartaObjetivo=rival.obtenerCartaAtaqueNombre(cartaDestino);
						usr.seleccionaObjetivoCarta(carta,cartaObjetivo);
						carta.setTipoObjetivo("cartaRival");
						console.log(carta.tipoObjetivo);
						usr.jugarCarta(carta); 					
						if(carta.posicion=="cementerio"){
							console.log("usuario "+usrid+" juega la carta hechizo con coste: "+carta.coste+" con destino: "+carta.objetivo);
							//io.sockets.in(nombrePartida).emit("juegaCarta",usrid,carta,usr.elixir);
							cli.enviarATodos(io,nombrePartida,"juegaCarta",{"usrid":usrid,"carta":carta,"elixir":usr.elixir});
						}
						else{
							console.log("usuario "+usrid+" NO pudo jugar la carta con coste: "+carta.coste);
							cli.enviarRemitente(socket,"noJugada",carta);
						}
					}
					else{
						console.log("usuario "+usrid+" NO pudo jugar la carta, no existe");
						cli.enviarRemitente(socket,"noJugada",nombreCarta);
					}
				}
			});
			socket.on('jugarHechizoCartaJugador', function(usrid,nombrePartida,nombreCarta,cartaDestino) {
				var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid]; 
				var carta;
				if (usr){ 
					carta=usr.obtenerCartaMano(nombreCarta);
					if (carta){
						//var rival=usr.partida.obtenerRival(usr);
						var cartaObjetivo=usr.obtenerCartaAtaqueNombre(cartaDestino);
						usr.seleccionaObjetivoCarta(carta,cartaObjetivo);
						carta.setTipoObjetivo("cartaJugador");
						console.log(carta.tipoObjetivo);
						usr.jugarCarta(carta); 					
						if(carta.posicion=="cementerio"){
							console.log("usuario "+usrid+" juega la carta hechizo con coste: "+carta.coste+" con destino: "+carta.objetivo);
							//io.sockets.in(nombrePartida).emit("juegaCarta",usrid,carta,usr.elixir);
							cli.enviarATodos(io,nombrePartida,"juegaCarta",{"usrid":usrid,"carta":carta,"elixir":usr.elixir});
						}
						else{
							console.log("usuario "+usrid+" NO pudo jugar la carta con coste: "+carta.coste);
							cli.enviarRemitente(socket,"noJugada",carta);
						}
					}
					else{
						console.log("usuario "+usrid+" NO pudo jugar la carta, no existe");
						cli.enviarRemitente(socket,"noJugada",nombreCarta);
					}
				}
			});
			socket.on('jugarHechizoJugador', function(usrid,nombrePartida,nombreCarta) {
				var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid]; 
				var carta;
				if (usr){ 
					carta=usr.obtenerCartaMano(nombreCarta);
					if (carta){
						//usr.seleccionaObjetivoCarta(carta,usr);
						carta.setTipoObjetivo("jugador");
						console.log(carta.tipoObjetivo);
						usr.jugarCarta(carta); 					
						if(carta.posicion=="cementerio"){
							console.log("usuario "+usrid+" juega la carta hechizo con coste: "+carta.coste+" con destino: "+carta.objetivo);
							//io.sockets.in(nombrePartida).emit("juegaCarta",usrid,carta,usr.elixir);
							cli.enviarATodos(io,nombrePartida,"juegaCarta",{"usrid":usrid,"carta":carta,"elixir":usr.elixir});
						}
						else{
							console.log("usuario "+usrid+" NO pudo jugar la carta con coste: "+carta.coste);
							cli.enviarRemitente(socket,"noJugada",carta);
						}
					}
					else{
						console.log("usuario "+usrid+" NO pudo jugar la carta, no existe");
						cli.enviarRemitente(socket,"noJugada",nombreCarta);
					}
				}
			}); 
			socket.on('jugarHechizoSinObjetivo', function(usrid,nombrePartida,nombreCarta) {
				var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid]; 
				var carta;
				if (usr){ 
					carta=usr.obtenerCartaMano(nombreCarta);
					if (carta){
						//usr.seleccionaObjetivoCarta(carta,usr);
						carta.setTipoObjetivo="sinObjetivo";
						usr.jugarCarta(carta); 					
						if(carta.posicion=="cementerio"){
							console.log("usuario "+usrid+" juega la carta hechizo con coste: "+carta.coste+" con destino: "+carta.objetivo);
							//io.sockets.in(nombrePartida).emit("juegaCarta",usrid,carta,usr.elixir);
							cli.enviarATodos(io,nombrePartida,"juegaCarta",{"usrid":usrid,"carta":carta,"elixir":usr.elixir});
						}
						else{
							console.log("usuario "+usrid+" NO pudo jugar la carta con coste: "+carta.coste);
							cli.enviarRemitente(socket,"noJugada",carta);
						}
					}
					else{
						console.log("usuario "+usrid+" NO pudo jugar la carta, no existe");
						cli.enviarRemitente(socket,"noJugada",nombreCarta);
					}
				}
			});
			socket.on('obtenerDatosRival',function(usrid,nombrePartida){
				var usr = juego.obtenerUsuario(usrid); //.usuarios[usrid];
                if (usr && usr.partida){
                	cli.enviarRemitente(socket,"datosRival",usr.obtenerDatosRival());
                }
			});
			socket.on('atacar',function(usrid,nombrePartida,idCarta1,idCarta2){
				var usr = juego.obtenerUsuario(usrid); //.usuarios[usrid];
                if (usr && usr.partida){
                	var json=usr.ataqueConNombre(idCarta1,idCarta2);
                	cli.enviarATodos(io,nombrePartida,"respuestaAtaque",json);
                }
			});
			socket.on('atacarRival',function(usrid,nombrePartida,idCarta1){
				var usr = juego.obtenerUsuario(usrid); //.usuarios[usrid];
                if (usr && usr.partida){
                	var json=usr.atacarRivalConNombre(idCarta1);
                	cli.enviarATodos(io,nombrePartida,"respuestaAtaqueRival",json);
                }
			});
			socket.on('pasarTurno', function(usrid, nombrePartida) {
                var usr = juego.obtenerUsuario(usrid); //.usuarios[usrid];
                if (usr && usr.partida) {
                   usr.pasarTurno();
                   console.log(usr.nombre + " ha pasado el turno");
                   cli.enviarRemitente(socket,"pasarTurno",{"mano":usr.obtenerCartasMano(),"turno":usr.meToca(),"elixir":usr.elixir,"vidas":usr.vidas,"elemento":usr.obtenerElemento(), "mazo":usr.obtenerCartasMazo()});
                   cli.enviarATodosMenosRemitente(socket,nombrePartida,"meToca",usr.rivalTeToca());
                } 
           	});
           	socket.on('abandonarPartida',function(usrid,nombrePartida){
           		var usr=juego.obtenerUsuario(usrid); //.usuarios[usrid];
           		var rival=usr.partida.obtenerRival(usr);
           		if (usr && rival){
           			usr.abandonarPartida();
           			rival.abandonarPartida();
					cli.enviarATodosMenosRemitente(socket,nombrePartida,"rivalAbandona");
					//cli.enviarATodos(io,nombrePartida,"rivalAbandona");        			
           		}
           	});
		});
	};
}


module.exports.ComSrv=ComSrv;