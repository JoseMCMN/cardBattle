var _=require("underscore");
var cf=require("./cifrado.js");
var dao=require("./dao.js");
var moduloEmail=require("./email.js");


//******************************************
//Parte dedicada al juego
//******************************************

function Juego(){
	this.cartas=[];
	this.usuarios=[];
	this.partidas=[];
	this.coleccion=[];
	this.dao=new dao.Dao();
	this.agregarCarta=function(carta){
		this.cartas.push(carta);
	}
	this.obtenerUsuario=function(id){
		/*return _.find(this.usuarios,function(usu){
			return usu.id==id
		});*/
		return this.usuarios[id];
	}
	this.registrarUsuario=function(email,clave,callback){
		var ju=this;
		var claveCifrada=cf.encrypt(clave);
		var key=(new Date().valueOf()).toString();
		this.dao.encontrarUsuarioCriterio({email:email},function(usr){
			if(!usr){
				ju.dao.insertarUsuario({email:email,clave:claveCifrada,key:key,confirmada:false},function(usu){
	       			moduloEmail.enviarEmail(email,key,"Confirmar cuenta"); 
	       			console.log("clave cifrada: "+claveCifrada);    
	       			console.log("clave desde modelo: "+clave);        
	                callback({email:'ok',clave:clave});
	 	        });
	        }
	        else{
	        	callback({email:undefined});
	        }
    	});
	}
	this.confirmarUsuario=function(email,key,callback){
		var ju=this;
		this.dao.encontrarUsuarioCriterio({email:email,key:key,confirmada:false},function(usr){
			if(usr){
				usr.confirmada=true;
				//actualizar la coleccion
				ju.dao.modificarColeccionUsuarios(usr,function(data){
					callback({res:"ok"});
				});
			}
			else{
				callback({res:"nook"});
			}
		});
	}
	this.obtenerKey=function(email,callback){
		var ju=this;
		this.dao.encontrarUsuarioCriterio({email:email,confirmada:false},function(usr){
			if(usr){
				callback({email:'ok',key:usr.key});
	        }
	        else{
	        	callback({email:undefined});
	        }
    	});
	}
	this.loginUsuario=function(email,pass,callback){
		var ju=this;
		var passCifrada=cf.encrypt(pass);
	    this.dao.encontrarUsuarioCriterio({email:email,clave:passCifrada,confirmada:true},function(usr){
		    if (usr){
	        	//ju.agregarUsuario(usr);
	            //console.log(usr);   	        	
	            callback(usr);
	            ju.agregarUsuario(new Usuario(usr.email,usr._id));    	
	        }
            else{
	            callback({'email':''});
	        }
	    });
	}
	this.agregarUsuario=function(usuario){
		usuario.mazo=_.shuffle(this.crearMazoFuego1());
		//usuario.mazo_.shuffle(this.crearMazoFuego());
		usuario.juego=this;
		//this.usuarios.push(usuario);
		this.usuarios[usuario.id]=usuario;
	}
	this.eliminarUsuario=function(uid,callback){
		var json={'resultados':-1};
		//if (ObjectID.isValid(uid)){
			this.dao.eliminarUsuario(uid,function(result){
	            if (result.result.n==0){
	                console.log("No se pudo eliminar de usuarios");
	            }
	            else{
	                json={"resultados":1};
	                console.log("Usuario eliminado de usuarios");
	                callback(json);
	            }
	        }); 
	}
	this.actualizarUsuario=function(nuevo,callback){
		//this.comprobarCambios(nuevo);
		//var usu=this;
		var oldC=cf.encrypt(nuevo.oldpass);
		var newC=cf.encrypt(nuevo.newpass);
		var pers=this.dao;
		//this.dao.conectar();
		this.dao.encontrarUsuarioCriterio({email:nuevo.email},function(usr){
			if(usr){
				if (nuevo.newpass!="" && nuevo.newpass==nuevo.newpass2){
					usr.clave=newC;
				}
		        pers.modificarColeccionUsuarios(usr,function(nusu){
		               console.log("Usuario modificado");
		               console.log("Nueva clave: "+nuevo.newpass);
		               callback(usr);
		               //ju.dao.cerrar();
		        });
		    }
		    else{
		    	callback({email:undefined});	
		    }
		    //ju.dao.cerrar();
		});
	}

	//CAMBIAR ESTE METODO, SE PARTE DE UNA COLECCIÓN COMÚN Y TENDREMOS 4 MAZOS A ELEGIR 1
	// function Carta(nombre,vidas,ataque,coste,clase,tipo,habilidad,tipoHabilidad,efecto,tieneObjetivos)
	this.crearColeccion=function(){
		var mazo=[];
		//10 ataque 5 coste 3 vida 5
		/*
		for (var i=0;i<5;i++){
			mazo.push(new Carta("Dragon"+i, 5, 5,3));
		}
		//10 ataque 3 coste 2 vida 3
		for (var i=0;i<5;i++){
			mazo.push(new Carta("Guerrero"+i, 3, 3,2));
		}
		//10 ataque 2 coste 1 vida 2
		for (var i=0;i<5;i++){
			mazo.push(new Carta("Esbirro"+i, 2, 2,1));
		}*/

		//**********
		/*for(var i=0;i<10;i++){
			mazo.push(new Carta("RoboMedio",undefined,undefined,1,"agua","hechizo",undefined,[0,0,2]));
		}*/
		/*for(var i=0;i<10;i++){
			mazo.push(new Carta("Esbirro"+i,2,2,1,"agua","invocacion",[3,12,3],["finTurno"],undefined,false));
		}*/



		for(var i=0;i<10;i++){
			mazo.push(new Carta("Esbirro"+i,2,2,1,"aire","invocacion",undefined,["escudoDivino"],undefined,false));
		}
		for(var i=0;i<10;i++){
			mazo.push(new Carta("Guerrero"+i,3,3,2,"agua","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("RemoverLasRocas"+i,undefined,undefined,3,"tierra","hechizo",undefined,undefined,[7,2,2],false));


		}
		for(var i=0;i<2;i++){
/*
				mazo.push(new Carta("HechiceroDeLava"+i,1,1,1,"fuego","invocacion",[7,12,1],["ultimaVoluntad"],undefined,false));

				mazo.push(new Carta("CriaVolcanica"+i,2,2,2,"fuego","invocacion",[7,12,2],["ultimaVoluntad"],undefined,false));

				mazo.push(new Carta("SiervoFundido"+i,3,3,3,"fuego","invocacion",[7,9,2],["ultimaVoluntad"],undefined,false));

				mazo.push(new Carta("ElementalDeFuego"+i,5,5,6,"fuego","invocacion",[7,6,2],["defensor","ultimaVoluntad"],undefined,false));

				mazo.push(new Carta("DragonDeHielo"+i,5,5,6,"agua","invocacion",[7,16,1],["congelar","ultimaVoluntad"],undefined,false));

				mazo.push(new Carta("TitanDeLasProfundidades"+i,9,9,10,"agua","invocacion",[7,5,7],["defensor","ultimaVoluntad"],undefined,false));

				mazo.push(new Carta("OjusaReinaDelMar"+i,6,6,8,"agua","invocacion",[7,29,1],["defensor","ultimaVoluntad"],undefined,false));

				mazo.push(new Carta("VigilanteMontado"+i,1,1,1,"aire","invocacion",[7,0,1],["ultimaVoluntad"],undefined,false));

				mazo.push(new Carta("CaballeroJusto"+i,7,7,7,"aire","invocacion",[7,12,5],["ultimaVoluntad"],undefined,true));

				mazo.push(new Carta("AvatarDeLaTierra"+i,7,7,8,"tierra","invocacion",[7,6,4],["defensor","ultimaVoluntad"],undefined,false));

				mazo.push(new Carta("TrepadorSombrio"+i,8,8,9,"tierra","invocacion",[7,15,2],["letalidad","ultimaVoluntad"],undefined,false));
*/
			//mazo.push(new Carta("JuntarLasMareas"+i,undefined,undefined,7,"agua","hechizo",undefined,undefined,[0,0,4],false));
			//mazo.push(new Carta("LluviaDeTempanos"+i,undefined,undefined,6,"agua","hechizo",undefined,undefined,[10,2,2],false));
			//mazo.push(new Carta("CorrienteViolenta"+i,undefined,undefined,6,"agua","hechizo",undefined,undefined,[6,4,2],false));
			//mazo.push(new Carta("DespertarDeLosAntiguos"+i,undefined,undefined,8,"tierra","hechizo",undefined,undefined,[5,4,1],false));

			//mazo.push(new Carta("AlimentoDelFuego"+i,undefined,undefined,3,"fuego","hechizo",undefined,undefined,[3,1,1],false));
			//mazo.push(new Carta("CreadorDeVacio"+i,3,2,2,"aire","invocacion",[7,20,"aire"],["gritoBatalla"],undefined,false));
			//mazo.push(new Carta("FuriaArdiente"+i,undefined,undefined,4,"fuego","hechizo",undefined,undefined,[9,1,"ataqueDoble"],true));
			//mazo.push(new Carta("Dragon"+i,7,2,1,"agua","invocacion",undefined,["congelar"],undefined,false));
			//mazo.push(new Carta("TrepadorSombrio"+i,8,8,9,"tierra","invocacion",[7,15,2],["ultimaVoluntad","letalidad"],undefined,false));
			//mazo.push(new Carta("ElegidoPorLaLlama"+i,4,3,1,"fuego","invocacion",undefined,["ataqueDoble"],undefined,false));
			//mazo.push(new Carta("SirvienteDeLaLuz"+i,4,4,1,"vacio","invocacion",undefined,["veloz","escudoDivino"],undefined,false));
			//mazo.push(new Carta("SirvienteDeLaOscuridad"+i,3,3,9,"agua","invocacion",[5,7,1],["gritoBatalla"],undefined,true));
		}



		//for(var i=0;i<10;i++){
		//	mazo.push(new Carta("Hechizo"+i,undefined,undefined,1,"fuego","hechizo",undefined,undefined,[1,1,3],true));
		//}



		/*for(var i=0;i<10;i++){
			mazo.push(new Carta("Area",undefined,undefined,1,"agua","hechizo",undefined,[1,0,2]));
		}*
		for(var i=0;i<10;i++){
			mazo.push(new Carta("AreaCartasRival",undefined,undefined,1,"fuego","hechizo",undefined,[1,2,2]));
		}
		for(var i=0;i<10;i++){
			mazo.push(new Carta("AreaMasivaTodos",undefined,undefined,1,"fuego","hechizo",undefined,[1,5,1]));
		}
		for(var i=0;i<10;i++){
			mazo.push(new Carta("Hechizo"+i,undefined,undefined,1,"fuego","hechizo",undefined,[3,2,2],false));
		}
		for(var i=0;i<10;i++){
			mazo.push(new Carta("Hechizo"+i,undefined,undefined,1,"fuego","hechizo",undefined,[2,1,1],false));
		}

		for(var i=0;i<10;i++){
			mazo.push(new Carta("Hechizo"+i,undefined,undefined,1,"fuego","hechizo",undefined,[2,0,1],true));
		}*/


		//PENDIENTE CAMBIAR LA CREACION DE OBJETOS DE AQUI
		// function Carta(nombre,vidas,ataque,coste,clase,tipo,habilidad,tipoHabilidad,efecto,tieneObjetivos)

		//Lightning bolt
		/*
		for(var i=0;i<10;i++){
			mazo.push(new Carta("Hechizo"+i,undefined,undefined,1,"fuego","hechizo",undefined,undefined,[1,1,8],true));
		}*/
		/*
		for(var i=0;i<10;i++){
			mazo.push(new Carta("Hechizo"+i,undefined,undefined,1,"fuego","hechizo",undefined,undefined,[2,12,1],false));
		}*/


/*
		for(var i=0;i<10;i++){
			mazo.push(new Carta("Hechizo"+i,undefined,undefined,1,"aire","hechizo",undefined,undefined,[4,1,1],false));
		}
		for(var i=0;i<10;i++){
			mazo.push(new Carta("Hechizo"+i,undefined,undefined,1,"aire","hechizo",undefined,undefined,[6,0,1],true));
		}

		for(var i=0;i<10;i++){
			mazo.push(new Carta("Hechizo"+i,undefined,undefined,1,"aire","hechizo",undefined,undefined,[7,6,3],false));
		}*/

/*
		for(var i=0;i<10;i++){
			mazo.push(new Carta("Hechizo"+i,undefined,undefined,0,"aire","hechizo",undefined,undefined,[5,0,2],false));
		}
*/
		//[0,3,X]
		/*
		for(var i=0;i<10;i++){
			mazo.push(new Carta("Hechizo"+i,undefined,undefined,1,"aire","hechizo",undefined,undefined,[0,3,2],false));
		}*/



		//***************
		//Cartas neutrales básicas
		//***************

		// function Carta(nombre,vidas,ataque,coste,clase,tipo,habilidad,tipoHabilidad,efecto,tieneObjetivos)

		//nombre,vidas,ataque,coste

		for(var i=0;i<2;i++){
		/*	
			//Coste 0 - 1
			mazo.push(new Carta("Aprendiz"+i,1,1,0,"vacio","invocacion",undefined,[],undefined,false));

			//Coste 1 - 9
			mazo.push(new Carta("Recluta"+i,1,2,1,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("Iniciado"+i,2,1,1,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("Caballero"+i,1,1,1,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("GuerreroAnciano"+i,1,1,1,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("LoboHambriento"+i,1,1,1,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("Sargento"+i,1,1,1,"vacio","invocacion",[4,2,2],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("ArqueroCiego"+i,1,1,1,"vacio","invocacion",[7,12,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("PerroGuardian"+i,2,1,1,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("AranaVenenosa"+i,1,1,1,"vacio","invocacion",undefined,["letalidad"],undefined,false));


			//Coste 2 - 14
			mazo.push(new Carta("Arquera"+i,2,3,2,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("GuerreroGuardia"+i,3,2,2,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("LoboProtector"+i,2,2,2,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("GuerreroConLanza"+i,1,4,2,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("TortugaSalvaje"+i,3,1,2,"vacio","invocacion",undefined,["absorcionVital"],undefined,false));
			mazo.push(new Carta("GuerreroEnCarga"+i,2,2,2,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("BestiaSagrada"+i,2,2,2,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("Escudero"+i,2,2,2,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("Protector"+i,2,1,2,"vacio","invocacion",[3,0,0],["finTurno"],undefined,false));
			mazo.push(new Carta("ApredizRestauradora"+i,2,1,2,"vacio","invocacion",[3,2,1],["finTurno"],undefined,false));
			mazo.push(new Carta("Asesino"+i,2,2,2,"vacio","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("ArqueroSigiloso"+i,2,2,2,"vacio","invocacion",[3,8,1],["finTurno"],undefined,false));
			mazo.push(new Carta("Cazadora"+i,2,1,2,"vacio","invocacion",[7,0,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("ViejoSabio"+i,1,1,2,"vacio","invocacion",[7,2,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("Sanador"+i,1,1,2,"vacio","invocacion",[4,6,2],["gritoBatalla"],undefined,true));

			//Coste 3 - 20
			mazo.push(new Carta("GuerreroArmado"+i,4,3,3,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("Mago"+i,3,4,3,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("ChamanJoven"+i,1,1,3,"vacio","invocacion",[7,6,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("Enano"+i,3,2,3,"vacio","invocacion",[4,2,3],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("GuerreroASueldo"+i,4,4,3,"vacio","invocacion",[7,8,3],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("ChamanSanador"+i,3,2,3,"vacio","invocacion",[4,6,4],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("SerpienteRoja"+i,1,3,3,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("BestiaAntigua"+i,3,3,3,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("EspirituGuardian"+i,4,3,3,"vacio","invocacion",[4,7,0],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("BrujaMaldita"+i,3,3,3,"vacio","invocacion",[3,7,1],["finTurno"],undefined,false));
			mazo.push(new Carta("ArqueraExploradora"+i,3,2,3,"vacio","invocacion",[7,0,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("CaballeroDePlata"+i,2,3,3,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("Nigromante"+i,3,1,3,"vacio","invocacion",[3,12,1],["finTurno"],undefined,false));
			mazo.push(new Carta("LiderDeBatalla"+i,2,2,3,"vacio","invocacion",[7,7,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("LuchadoraFuriosa"+i,1,5,3,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("GolemPacifico"+i,5,1,3,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("DruidaAnciano"+i,3,1,3,"vacio","invocacion",[3,6,1],["finTurno"],undefined,false));
			mazo.push(new Carta("Diablillo"+i,2,2,3,"vacio","invocacion",[5,0,2],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("TrollDeLaMontana"+i,3,3,3,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("AsesinoDeLaLunaLlena"+i,2,4,3,"vacio","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("EscorpionMarcado"+i,3,2,3,"vacio","invocacion",undefined,["letalidad","absorcionVital"],undefined,false));

			//Coste 4 - 19
			mazo.push(new Carta("AngelDeLuz"+i,5,4,4,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("DemonioOscuro"+i,4,5,4,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("CaballeroPesado"+i,3,3,4,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("HechiceraRestauradora"+i,4,3,4,"vacio","invocacion",[3,2,2],["finTurno"],undefined,false));
			mazo.push(new Carta("GuerreraBendecida"+i,1,1,4,"vacio","invocacion",[3,5,2],["finTurno"],undefined,false));
			mazo.push(new Carta("HerreroAnciano"+i,4,4,4,"vacio","invocacion",[4,2,2],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("GuerrerosEscudados"+i,6,2,4,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("GolemDelJardin"+i,4,2,4,"vacio","invocacion",[4,5,0],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("Centauro"+i,6,2,4,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("GuerrerosCombatientes"+i,2,2,4,"vacio","invocacion",[7,1,1],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("HeroeConocido"+i,4,3,4,"vacio","invocacion",[7,7,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("Renegado"+i,5,5,4,"vacio","invocacion",[7,10,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("LanzaHachas"+i,3,3,4,"vacio","invocacion",[7,9,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("MagoDelConocimiento"+i,3,2,4,"vacio","invocacion",[3,6,1],["finTurno"],undefined,false));
			mazo.push(new Carta("OsoDelBosque"+i,4,4,4,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("EsqueletoPerdido"+i,2,1,4,"vacio","invocacion",[5,3,2],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("DriadaDelBosqueProfundo"+i,5,3,4,"vacio","invocacion",[6,1,3],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("BrujoCentinela"+i,5,3,4,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("ArqueraSigilosa"+i,3,5,4,"vacio","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("AsesinoEnvenenador"+i,2,1,4,"vacio","invocacion",undefined,["oculto","letalidad"],undefined,false));


			//Coste 5 - 13
			mazo.push(new Carta("GuerreroGigante"+i,6,5,5,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("GrifoAcechante"+i,5,6,5,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("ChamanOscuro"+i,5,5,5,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("CombatientesEnPosicion"+i,4,4,5,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("DragonSalvaje"+i,3,4,5,"vacio","invocacion",[5,0,4],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("VampiroSediento"+i,4,3,5,"vacio","invocacion",[7,9,3],["gritoBatalla","absorcionVital"],undefined,false));
			mazo.push(new Carta("EsfingeSagrada"+i,3,3,5,"vacio","invocacion",[7,2,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("MinotauroEnCarga"+i,2,5,5,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("OrcosViolentos"+i,3,3,5,"vacio","invocacion",[7,7,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("ProtegidaDeLaLuz"+i,2,2,5,"vacio","invocacion",[7,0,3],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("CocodriloDelPantano"+i,5,4,5,"vacio","invocacion",[3,7,2],["finTurno"],undefined,false));
			mazo.push(new Carta("SombraTentadora"+i,4,4,5,"vacio","invocacion",[4,1,3],["gritoBatalla"],undefined,true));


			//Coste 6 - 12
			mazo.push(new Carta("CampeonDelReino"+i,6,6,6,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("SerpienteGigante"+i,5,6,6,"vacio","invocacion",undefined,["absorcionVital"],undefined,false));
			mazo.push(new Carta("PaladinDelNorte"+i,5,4,6,"vacio","invocacion",[7,5,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("InvocadoraDeRefuerzos"+i,4,4,6,"vacio","invocacion",[3,12,1],["finTurno"],undefined,false));
			mazo.push(new Carta("AngelGuardian"+i,7,6,6,"vacio","invocacion",[4,7,2],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("DefensoraDeLaLuz"+i,3,3,6,"vacio","invocacion",[3,5,1],["finTurno"],undefined,false));
			mazo.push(new Carta("MagoInvestigador"+i,1,1,6,"vacio","invocacion",[7,18,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("SombraFatal"+i,8,7,6,"vacio","invocacion",[7,8,5],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("GrifoDeBatalla"+i,5,3,6,"vacio","invocacion",[3,3,1],["finTurno"],undefined,false));
			mazo.push(new Carta("BalothGigante"+i,4,4,6,"vacio","invocacion",[5,0,4],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("GiganteDeLaNiebla"+i,4,6,6,"vacio","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("LoxodonProtector"+i,5,5,6,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));


			//Coste 7 - 14
			mazo.push(new Carta("MinotauroEnfurecido"+i,5,5,7,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("GolemViejo"+i,7,7,7,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("SirvienteDeLaLuz"+i,4,4,7,"vacio","invocacion",undefined,["veloz","escudoDivino"],undefined,false));
			mazo.push(new Carta("LoboGuardian"+i,8,6,7,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("GrifoDeLaTorre"+i,5,5,7,"vacio","invocacion",[7,1,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("TortugaDelGremio"+i,4,4,7,"vacio","invocacion",[7,2,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("DeidadPerdida"+i,6,4,7,"vacio","invocacion",[6,0,4],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("HerreroVolcanico"+i,4,4,7,"vacio","invocacion",[4,0,4],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("LiderDeGuerra"+i,5,7,7,"vacio","invocacion",[3,5,1],["finTurno"],undefined,false));
			mazo.push(new Carta("DruidaDelBosquePerdido"+i,6,3,7,"vacio","invocacion",[7,5,4],["finTurno"],undefined,false));
			mazo.push(new Carta("SombraAcechante"+i,5,7,7,"vacio","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("AranaGigante"+i,7,2,7,"vacio","invocacion",undefined,["letalidad"],undefined,false));
			mazo.push(new Carta("SacerdotesInamovibles"+i,9,5,7,"vacio","invocacion",undefined,["defensor"],undefined,false));

				//Legendaria
				mazo.push(new Carta("GrokMartilloNegro"+i,3,7,7,"vacio","invocacion",[5,0,7],["antimagia","gritoBatalla"],undefined,true));

				


			//Coste 8 - 14
			mazo.push(new Carta("GiganteDespertado"+i,8,8,8,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("BestiaDivina"+i,7,7,8,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("SirvienteDeLaOscuridad"+i,3,3,8,"vacio","invocacion",[5,7,1],["absorcionVital","gritoBatalla"],undefined,true));
			mazo.push(new Carta("MinotauroArmado"+i,8,5,8,"vacio","invocacion",undefined,["defensor","veloz"],undefined,false));
			mazo.push(new Carta("PrimeraLineaDelNorte"+i,4,4,8,"vacio","invocacion",[7,1,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("ArchimagoSabio"+i,6,6,8,"vacio","invocacion",[7,6,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("VigilanteDeLaFrontera"+i,8,3,8,"vacio","invocacion",undefined,["defensor","veloz"],undefined,false));
			mazo.push(new Carta("CaballeroDorado"+i,6,8,8,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("DefensorDelTrono"+i,9,6,8,"vacio","invocacion",undefined,["defensor"],undefined,false));			
			mazo.push(new Carta("MagoRepulsor"+i,6,6,8,"vacio","invocacion",[5,3,0],["gritoBatalla"],undefined,true));			
			mazo.push(new Carta("DemonioDeLaCatedral"+i,6,6,8,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("LicantropoFeroz"+i,6,8,8,"vacio","invocacion",undefined,["oculto"],undefined,false));

				//Legendaria
				mazo.push(new Carta("CaballeroNegro"+i,7,6,8,"vacio","invocacion",[3,8,3],["veloz","finTurno"],undefined,false));
				mazo.push(new Carta("ValdumHechiceroDeSangre"+i,6,6,8,"vacio","invocacion",[3,6,1],["absorcionVital","antimagia","finTurno"],undefined,false));


			//Coste 9 - 11
			mazo.push(new Carta("GiganteEjecutor"+i,9,9,9,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("CaballeroDeObsidiana"+i,10,8,9,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("GuardiaReal"+i,8,8,9,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("CaballeroDeSangre"+i,7,7,9,"vacio","invocacion",undefined,["defensor","absorcionVital"],undefined,false));
			mazo.push(new Carta("LiderCentauro"+i,6,6,9,"vacio","invocacion",[7,7,3],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("DestructorDeFrentes"+i,6,9,9,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("MaestroDeJade"+i,6,6,9,"vacio","invocacion",[3,5,2],["absorcionVital","finTurno"],undefined,false));
			mazo.push(new Carta("BestiaCelestialDelBosque"+i,8,8,9,"vacio","invocacion",[6,1,10],["antimagia","gritoBatalla"],undefined,true));
			mazo.push(new Carta("HeraldoDelInframundo"+i,7,9,9,"vacio","invocacion",[5,0,5],["gritoBatalla"],undefined,true));

				//Legendaria
			mazo.push(new Carta("DragonOscuro"+i,7,7,9,"vacio","invocacion",[7,14,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("SiveraEscudoDeLeon"+i,10,5,9,"vacio","invocacion",[7,5,4],["defensor","gritoBatalla"],undefined,false));

			//Coste 10 - 6
			mazo.push(new Carta("GuerreroDelEspadon"+i,10,10,10,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("SerpienteDelDesierto"+i,12,8,10,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("CargaMontanas"+i,11,7,10,"vacio","invocacion",[3,0,1],["finTurno"],undefined,false));
			mazo.push(new Carta("OsoGigante"+i,8,8,10,"vacio","invocacion",[7,5,5],["antimagia","gritoBatalla"],undefined,false));
			mazo.push(new Carta("SenorDeLaForja"+i,8,8,10,"vacio","invocacion",[4,0,5],["gritoBatalla"],undefined,true));

//CARTAS VACIAS: 132

 
			//Cartas clase fuego - 35
				//Invocaciones - 18
				mazo.push(new Carta("HechiceroDeLava"+i,1,1,1,"fuego","invocacion",[7,12,1],["ultimaVoluntad"],undefined,false));
				mazo.push(new Carta("AprendizSiniestra"+i,1,2,1,"fuego","invocacion",undefined,["oculto"],undefined,false));
				mazo.push(new Carta("CriaVolcanica"+i,2,2,2,"fuego","invocacion",[7,12,2],["ultimaVoluntad"],undefined,false));
				mazo.push(new Carta("LicantropoVolcanico"+i,3,3,3,"fuego","invocacion",undefined,["ataqueDoble"],undefined,false));
				mazo.push(new Carta("SiervoFundido"+i,3,3,3,"fuego","invocacion",[7,9,2],["ultimaVoluntad"],undefined,false));
				mazo.push(new Carta("ElegidoPorLaLlama"+i,4,3,4,"fuego","invocacion",undefined,["ataqueDoble"],undefined,false));
				mazo.push(new Carta("CaballeroDeLaLlamaOscura"+i,3,4,4,"fuego","invocacion",undefined,["veloz"],undefined,false));
				mazo.push(new Carta("DragonVolcanico"+i,5,5,5,"fuego","invocacion",[5,0,3],["gritoBatalla"],undefined,true));
				mazo.push(new Carta("DragonDeLlamaOscura"+i,4,4,5,"fuego","invocacion",undefined,["letalidad"],undefined,false));
				mazo.push(new Carta("ElementalDeFuego"+i,5,5,6,"fuego","invocacion",[7,6,2],["defensor","ultimaVoluntad"],undefined,false));
				mazo.push(new Carta("ElementalAbrasante"+i,7,4,6,"fuego","invocacion",[7,9,3],["gritoBatalla"],undefined,false));
				mazo.push(new Carta("CorcelDeLaLlama"+i,5,6,6,"fuego","invocacion",[7,21,"fuego"],["gritoBatalla"],undefined,false));
				mazo.push(new Carta("ElementalLatigoIgneo"+i,6,7,7,"fuego","invocacion",[3,1,3],["finTurno"],undefined,false));
				mazo.push(new Carta("DemonioInfernal"+i,10,10,10,"fuego","invocacion",[3,14,3],["defensor","finTurno"],undefined,false));
				mazo.push(new Carta("Fenix"+i,6,8,8,"fuego","invocacion",[7,16,3],["antimagia","ultimaVoluntad"],undefined,false));


				//Legendaria
				mazo.push(new Carta("AvatarDeLasLlamas"+i,6,6,8,"fuego","invocacion",[3,7,6],["finTurno"],undefined,false));
				mazo.push(new Carta("GigantesVolcanicos"+i,7,8,9,"fuego","invocacion",undefined,["antimagia","veloz"],undefined,false));
				mazo.push(new Carta("TitanDeFuego"+i,7,6,7,"fuego","invocacion",[3,9,1],["defensor","finTurno"],undefined,false));


				//Hechizos - 17
				mazo.push(new Carta("Electrocutar"+i,undefined,undefined,1,"fuego","hechizo",undefined,undefined,[1,0,3],false));
				mazo.push(new Carta("OrbeIgneo"+i,undefined,undefined,1,"fuego","hechizo",undefined,undefined,[1,1,2],true));
				mazo.push(new Carta("TajoLlameante"+i,undefined,undefined,2,"fuego","hechizo",undefined,undefined,[1,2,1],false));
				mazo.push(new Carta("EstallidoInterior"+i,undefined,undefined,2,"fuego","hechizo",undefined,undefined,[2,1,1],false));
				mazo.push(new Carta("Fulgor"+i,undefined,undefined,2,"fuego","hechizo",undefined,undefined,[2,6,4],true));
				mazo.push(new Carta("BolaDeFuego"+i,undefined,undefined,3,"fuego","hechizo",undefined,undefined,[1,1,4],true));
				mazo.push(new Carta("AlimentoDelFuego"+i,undefined,undefined,3,"fuego","hechizo",undefined,undefined,[3,1,1],false));
				mazo.push(new Carta("AlmaIgnea"+i,undefined,undefined,3,"fuego","hechizo",undefined,undefined,[2,0,3],true));
				mazo.push(new Carta("FuriaArdiente"+i,undefined,undefined,4,"fuego","hechizo",undefined,undefined,[9,1,"ataqueDoble"],true));
				mazo.push(new Carta("Contener"+i,undefined,undefined,4,"fuego","hechizo",undefined,undefined,[1,5,6],true));
				mazo.push(new Carta("PilarDeLlamas"+i,undefined,undefined,5,"fuego","hechizo",undefined,undefined,[1,5,8],true));
				mazo.push(new Carta("FuegoPurgador"+i,undefined,undefined,5,"fuego","hechizo",undefined,undefined,[1,3,3],false));
				mazo.push(new Carta("DefenderElNucleo"+i,undefined,undefined,6,"fuego","hechizo",undefined,undefined,[10,0,1],false));
				mazo.push(new Carta("Piromancia"+i,undefined,undefined,7,"fuego","hechizo",undefined,undefined,[7,3,4],false));
				mazo.push(new Carta("TormentaIgnea"+i,undefined,undefined,7,"fuego","hechizo",undefined,undefined,[1,2,4],false));
				mazo.push(new Carta("GranBolaDeFuego"+i,undefined,undefined,8,"fuego","hechizo",undefined,undefined,[1,1,9],true));
				mazo.push(new Carta("MundoEnLlamas"+i,undefined,undefined,9,"fuego","hechizo",undefined,undefined,[1,3,8],false));


			//Cartas clase agua - 35	
				//Invocaciones - 20
				mazo.push(new Carta("ElementalDeCorriente"+i,3,2,2,"agua","invocacion",undefined,["congelar"],undefined,false));
				mazo.push(new Carta("CangrejoDeLaMarea"+i,3,2,2,"agua","invocacion",undefined,["absorcionVital"],undefined,false));
				mazo.push(new Carta("LicantropoGlacial"+i,2,1,2,"agua","invocacion",[7,2,1],["gritoBatalla"],undefined,false));
				mazo.push(new Carta("ElementalDeAgua"+i,4,2,3,"agua","invocacion",[6,1,3],["defensor","gritoBatalla"],undefined,true));
				mazo.push(new Carta("TritonDeLaCorriente"+i,3,3,3,"agua","invocacion",[7,20,"agua"],["gritoBatalla"],undefined,false));
				mazo.push(new Carta("DragonSubmarino"+i,3,3,4,"agua","invocacion",[7,2,1],["oculto","gritoBatalla"],undefined,false));
				mazo.push(new Carta("DracoAzul"+i,1,4,4,"agua","invocacion",[7,13,1],["gritoBatalla"],undefined,false));
				mazo.push(new Carta("EspadachinDeEscarcha"+i,6,3,4,"agua","invocacion",undefined,["congelar"],undefined,false));
				mazo.push(new Carta("GuardianaDeLasProfundidades"+i,5,5,5,"agua","invocacion",undefined,["oculto"],undefined,false));
				mazo.push(new Carta("ConjuradoraDeHielo"+i,1,1,5,"agua","invocacion",[7,26,4],["gritoBatalla"],undefined,false));
				mazo.push(new Carta("MueveMareas"+i,6,5,6,"agua","invocacion",[7,5,2],["antimagia","gritoBatalla"],undefined,false));
				mazo.push(new Carta("DragonDeHielo"+i,5,5,6,"agua","invocacion",[7,16,1],["congelar","ultimaVoluntad"],undefined,false));
				mazo.push(new Carta("DefensorDeLasProfundidades"+i,7,6,7,"agua","invocacion",undefined,["defensor","antimagia"],undefined,false));
				mazo.push(new Carta("EspirituDeLaMarea"+i,8,5,7,"agua","invocacion",[7,19,1],["absorcionVital","ultimaVoluntad"],undefined,false));
				mazo.push(new Carta("TitanGlacial"+i,8,8,8,"agua","invocacion",[7,19,1],["congelar","gritoBatalla"],undefined,false));
				mazo.push(new Carta("GiganteDeHielo"+i,9,6,9,"agua","invocacion",undefined,["defensor","congelar"],undefined,false));
				mazo.push(new Carta("DragonBlanco"+i,6,6,9,"agua","invocacion",[7,13,1],["escudoDivino","oculto","gritoBatalla"],undefined,false));
				mazo.push(new Carta("TitanDeLasProfundidades"+i,9,9,10,"agua","invocacion",[7,5,7],["defensor","ultimaVoluntad"],undefined,false));

				
				//Legendaria
				//Ojusa: coste:8 ataque:6 vidas:6 grito de batalla: devuelve una carta rival a la mano de su propietario, ultima voluntad: destruye una carta rival aleatoria
				mazo.push(new Carta("OjusaReinaDelMar"+i,6,6,8,"agua","invocacion",[7,29,2],["defensor","ultimaVoluntad"],undefined,false));
				mazo.push(new Carta("AvatarDeLosMares"+i,5,4,5,"agua","invocacion",[3,6,1],["congelar","finTurno"],undefined,false));

				
				//Hechizos - 15
				mazo.push(new Carta("Congelar"+i,undefined,undefined,1,"agua","hechizo",undefined,undefined,[1,6,1],true));
				mazo.push(new Carta("Repulsion"+i,undefined,undefined,2,"agua","hechizo",undefined,undefined,[6,0,2],true));
				mazo.push(new Carta("Repeler"+i,undefined,undefined,2,"agua","hechizo",undefined,undefined,[2,0,-3],true));
				mazo.push(new Carta("ReordenarLaMente"+i,undefined,undefined,3,"agua","hechizo",undefined,undefined,[0,0,2],false));
				mazo.push(new Carta("CongelacionMasiva"+i,undefined,undefined,3,"agua","hechizo",undefined,undefined,[10,1,1],false));
				mazo.push(new Carta("AguaPunzante"+i,undefined,undefined,4,"agua","hechizo",undefined,undefined,[1,7,4],true));
				mazo.push(new Carta("FormaDelAgua"+i,undefined,undefined,4,"agua","hechizo",undefined,undefined,[9,3,"escudoDivino"],true));
				mazo.push(new Carta("Paralizar"+i,undefined,undefined,4,"agua","hechizo",undefined,undefined,[2,0,-5],true));
				mazo.push(new Carta("TormentaGlacial"+i,undefined,undefined,5,"agua","hechizo",undefined,undefined,[10,5,1],false));
				mazo.push(new Carta("Meditar"+i,undefined,undefined,5,"agua","hechizo",undefined,undefined,[0,0,3],false));
				mazo.push(new Carta("LlamadaAlMar"+i,undefined,undefined,5,"agua","hechizo",undefined,undefined,[7,3,3],false));
				mazo.push(new Carta("LluviaDeTempanos"+i,undefined,undefined,6,"agua","hechizo",undefined,undefined,[10,2,2],false));
				mazo.push(new Carta("CorrienteViolenta"+i,undefined,undefined,6,"agua","hechizo",undefined,undefined,[6,4,2],false));
				mazo.push(new Carta("JuntarLasMareas"+i,undefined,undefined,7,"agua","hechizo",undefined,undefined,[0,0,4],false));
				mazo.push(new Carta("Inundar"+i,undefined,undefined,7,"agua","hechizo",undefined,undefined,[2,8,4],false));
				mazo.push(new Carta("GranTorbellino"+i,undefined,undefined,8,"agua","hechizo",undefined,undefined,[10,4,5],false));



			//Cartas clase aire - 35
				//Invocaciones - 18
				mazo.push(new Carta("CanalizadorDelViento"+i,2,1,1,"aire","invocacion",undefined,["absorcionVital"],undefined,false));
				mazo.push(new Carta("VigilanteMontado"+i,1,1,1,"aire","invocacion",[7,0,1],["ultimaVoluntad"],undefined,false));
				mazo.push(new Carta("CreadorDeVacio"+i,3,2,2,"aire","invocacion",[7,20,"aire"],["gritoBatalla"],undefined,false));
				mazo.push(new Carta("ConjuradorEtereo"+i,3,3,3,"aire","invocacion",[4,0,1],["gritoBatalla"],undefined,true));
				mazo.push(new Carta("CaminanteDelViento"+i,2,2,3,"aire","invocacion",undefined,["oculto","ataqueDoble"],undefined,true));
				mazo.push(new Carta("ElementalDeAire"+i,4,4,4,"aire","invocacion",[5,3,1],["gritoBatalla"],undefined,true));
				mazo.push(new Carta("ElementalGris"+i,5,4,4,"aire","invocacion",[7,25,"aire"],["gritoBatalla"],undefined,false));
				mazo.push(new Carta("ProtectoraNocturna"+i,4,4,4,"aire","invocacion",[4,0,1],["gritoBatalla"],undefined,true));
				mazo.push(new Carta("CaballeroBlanco"+i,4,4,5,"aire","invocacion",undefined,["escudoDivino","absorcionVital"],undefined,false));
				mazo.push(new Carta("ElementalFrenteDeTormenta"+i,3,5,5,"aire","invocacion",[5,3,3],["antimagia","gritoBatalla"],undefined,true));
				mazo.push(new Carta("SirvienteDeKrat"+i,6,4,5,"aire","invocacion",undefined,["defensor"],undefined,false));
				mazo.push(new Carta("ElementalDeViento"+i,6,4,6,"aire","invocacion",[3,5,1],["finTurno"],undefined,false));
				mazo.push(new Carta("DragonDeLuz"+i,5,5,6,"aire","invocacion",[3,5,1],["escudoDivino","antimagia"],undefined,false));
				mazo.push(new Carta("CaballeroJusto"+i,5,7,7,"aire","invocacion",[7,12,5],["gritoBatalla"],undefined,true));
				mazo.push(new Carta("AvatarDelViento"+i,6,8,8,"aire","invocacion",[7,28,2],["antimagia","gritoBatalla"],undefined,false));
				mazo.push(new Carta("AparicionCeleste"+i,9,8,8,"aire","invocacion",[4,7,1],["defensor", "gritoBatalla"],undefined,true));
				mazo.push(new Carta("GuardianDeLaLuz"+i,8,9,9,"aire","invocacion",undefined,["absorcionVital","escudoDivino"],undefined,false));
				mazo.push(new Carta("TitanLuminoso"+i,7,6,9,"aire","invocacion",[3,12,3],["ataqueDoble","finTurno"],undefined,false));


				//Legendaria
				mazo.push(new Carta("KratGuardianDelTemplo"+i,6,5,7,"aire","invocacion",undefined,["escudoDivino","defensor","ataqueDoble"],undefined,false));

				//Hechizos - 16
				mazo.push(new Carta("BendicionLuminosa"+i,undefined,undefined,1,"aire","hechizo",undefined,undefined,[2,6,3],true));	
				mazo.push(new Carta("Proteger"+i,undefined,undefined,1,"aire","hechizo",undefined,undefined,[9,0,"escudoDivino"],true));	
				mazo.push(new Carta("SanarLasHeridas"+i,undefined,undefined,1,"aire","hechizo",undefined,undefined,[8,1,5],true));	
				mazo.push(new Carta("Desaparecer"+i,undefined,undefined,2,"aire","hechizo",undefined,undefined,[9,0,"oculto"],true));	
				mazo.push(new Carta("VientoCortante"+i,undefined,undefined,2,"aire","hechizo",undefined,undefined,[3,6,1],true));	
				mazo.push(new Carta("InvocarRefuerzos"+i,undefined,undefined,3,"aire","hechizo",undefined,undefined,[5,0,3],false));
				mazo.push(new Carta("InvocarFamiliar"+i,undefined,undefined,3,"aire","hechizo",undefined,undefined,[9,4,"escudoDivino"],true));	
				mazo.push(new Carta("EvocarElEspiritu"+i,undefined,undefined,4,"aire","hechizo",undefined,undefined,[2,0,4],true));
				mazo.push(new Carta("OndaDeChoque"+i,undefined,undefined,6,"aire","hechizo",undefined,undefined,[1,2,3],false));
				mazo.push(new Carta("ConjurarEspectros"+i,undefined,undefined,5,"aire","hechizo",undefined,undefined,[5,2,2],false));
				mazo.push(new Carta("LlamadaALaTormenta"+i,undefined,undefined,6,"aire","hechizo",undefined,undefined,[7,6,3],false));
				mazo.push(new Carta("EspirituDeBatalla"+i,undefined,undefined,5,"aire","hechizo",undefined,undefined,[2,11,3],false));
				mazo.push(new Carta("CanonDeAire"+i,undefined,undefined,5,"aire","hechizo",undefined,undefined,[3,0,2],true));
				mazo.push(new Carta("VueloCelestial"+i,undefined,undefined,7,"aire","hechizo",undefined,undefined,[5,2,3],false));
				mazo.push(new Carta("GritoDeGuerra"+i,undefined,undefined,8,"aire","hechizo",undefined,undefined,[2,0,10],true));
				mazo.push(new Carta("AlVacio"+i,undefined,undefined,8,"aire","hechizo",undefined,undefined,[3,2,1],false));


			//Cartas clase tierra - 35
				//Invocaciones - 18
				mazo.push(new Carta("GuardianDeLaMontana"+i,3,2,2,"tierra","invocacion",[7,27,1],["ultimaVoluntad"],undefined,false));
				mazo.push(new Carta("ExploradorDelBosque"+i,2,3,2,"tierra","invocacion",undefined,["oculto"],undefined,false));
				mazo.push(new Carta("ProtectorDeRoca"+i,4,3,3,"tierra","invocacion",undefined,["defensor"],undefined,false));
				mazo.push(new Carta("ElementalistaDePiedra"+i,3,3,3,"tierra","invocacion",[7,23,"tierra"],["gritoBatalla"],undefined,false));
				mazo.push(new Carta("LicantropoArboreo"+i,5,4,4,"tierra","invocacion",undefined,["defensor"],undefined,false));
				mazo.push(new Carta("GolemEncantado"+i,4,3,4,"tierra","invocacion",[5,0,2],["antimagia","gritoBatalla"],undefined,true));
				mazo.push(new Carta("ConstructoFurioso"+i,4,5,4,"tierra","invocacion",[7,6,1],["ultimaVoluntad"],undefined,false));
				mazo.push(new Carta("ElementalDePiedra"+i,5,4,5,"tierra","invocacion",undefined,["escudoDivino","antimagia"],undefined,false));
				mazo.push(new Carta("GolemDesatado"+i,3,5,5,"tierra","invocacion",[7,4,1],["gritoBatalla"],undefined,false));
				mazo.push(new Carta("DefensorDelBosque"+i,7,5,6,"tierra","invocacion",undefined,["defensor"],undefined,false));
				mazo.push(new Carta("DruidaArmaduraDeCorteza"+i,6,4,6,"tierra","invocacion",[7,27,1],["defensor","gritoBatalla"],undefined,false));
				mazo.push(new Carta("DragonDeRocaBrillante"+i,7,5,7,"tierra","invocacion",[3,6,1],["defensor","finTurno"],undefined,false));
				mazo.push(new Carta("GolemDePiedra"+i,7,6,7,"tierra","invocacion",undefined,["antimagia","defensor"],undefined,false));
				mazo.push(new Carta("BestiaDescomunal"+i,8,8,8,"tierra","invocacion",undefined,["defensor"],undefined,false));
				mazo.push(new Carta("AvatarDeLaTierra"+i,7,7,8,"tierra","invocacion",[7,6,4],["defensor","ultimaVoluntad"],undefined,false));
				mazo.push(new Carta("AntiguoDespertado"+i,9,9,10,"tierra","invocacion",[7,17,1],["defensor","gritoBatalla"],undefined,false));
				mazo.push(new Carta("TrepadorSombrio"+i,8,8,9,"tierra","invocacion",[7,15,2],["letalidad","ultimaVoluntad"],undefined,false));


				//Legendaria
				mazo.push(new Carta("ColosoRocaDorada"+i,8,7,9,"tierra","invocacion",[7,24,1],["defensor","gritoBatalla"],undefined,false));



				//Hechizos - 17
				mazo.push(new Carta("Cultivar"+i,undefined,undefined,2,"tierra","hechizo",undefined,undefined,[4,0,1],false));
				mazo.push(new Carta("Reforzar"+i,undefined,undefined,2,"tierra","hechizo",undefined,undefined,[9,2,"defensor"],true));
				mazo.push(new Carta("Aplastar"+i,undefined,undefined,3,"tierra","hechizo",undefined,undefined,[1,5,4],true));
				mazo.push(new Carta("PoderInterior"+i,undefined,undefined,4,"tierra","hechizo",undefined,undefined,[2,4,1],true));
				mazo.push(new Carta("RaicesEspinosas"+i,undefined,undefined,4,"tierra","hechizo",undefined,undefined,[1,2,2],false));
				mazo.push(new Carta("UnoConLaTierra"+i,undefined,undefined,4,"tierra","hechizo",undefined,undefined,[10,3,3],false));
				mazo.push(new Carta("RemoverLasRocas"+i,undefined,undefined,3,"tierra","hechizo",undefined,undefined,[7,2,2],false));
				mazo.push(new Carta("CanalizarLaPiedra"+i,undefined,undefined,3,"tierra","hechizo",undefined,undefined,[9,3,"defensor"],true));
				mazo.push(new Carta("CanalizarLaNaturaleza"+i,undefined,undefined,5,"tierra","hechizo",undefined,undefined,[0,0,3],false));
				mazo.push(new Carta("CrecimientoAbrumador"+i,undefined,undefined,5,"tierra","hechizo",undefined,undefined,[4,0,2],false));
				mazo.push(new Carta("Revivir"+i,undefined,undefined,5,"tierra","hechizo",undefined,undefined,[8,1,12],true));
				mazo.push(new Carta("Terremoto"+i,undefined,undefined,6,"tierra","hechizo",undefined,undefined,[1,3,5],false));
				mazo.push(new Carta("ProclamacionDeVictoria"+i,undefined,undefined,6,"tierra","hechizo",undefined,undefined,[3,4,1],false));
				mazo.push(new Carta("Resurgir"+i,undefined,undefined,7,"aire","hechizo",undefined,undefined,[7,7,2],false));
				mazo.push(new Carta("DespertarDeLosAntiguos"+i,undefined,undefined,8,"tierra","hechizo",undefined,undefined,[5,4,1],false));
				mazo.push(new Carta("DefenderElBosque"+i,undefined,undefined,9,"tierra","hechizo",undefined,undefined,[2,1,4],false));
*/
		
			
		}
		return mazo;
	}
	//Mazo equlibrado daño/control
	this.crearMazoFuego1=function(){
		var mazo=[];
		for (var i=0;i<2;i++){

			mazo.push(new Carta("CriaVolcanica"+i,2,2,2,"fuego","invocacion",[7,12,2],["ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("LicantropoVolcanico"+i,3,3,3,"fuego","invocacion",undefined,["ataqueDoble"],undefined,false));
			mazo.push(new Carta("ElegidoPorLaLlama"+i,4,3,4,"fuego","invocacion",undefined,["ataqueDoble"],undefined,false));
			mazo.push(new Carta("DragonVolcanico"+i,5,5,5,"fuego","invocacion",[5,0,3],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("DragonDeLlamaOscura"+i,4,4,5,"fuego","invocacion",undefined,["letalidad"],undefined,false));
			mazo.push(new Carta("ElementalDeFuego"+i,5,5,6,"fuego","invocacion",[7,6,2],["defensor","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("ElementalAbrasante"+i,7,4,6,"fuego","invocacion",[7,9,3],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("ElementalLatigoIgneo"+i,6,7,7,"fuego","invocacion",[3,1,3],["finTurno"],undefined,false));
			mazo.push(new Carta("DemonioInfernal"+i,10,10,10,"fuego","invocacion",[3,14,3],["defensor","finTurno"],undefined,false));
			mazo.push(new Carta("Fenix"+i,6,8,8,"fuego","invocacion",[7,16,3],["antimagia","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("AvatarDeLasLlamas"+i,6,6,8,"fuego","invocacion",[3,7,6],["finTurno"],undefined,false));
			mazo.push(new Carta("GigantesVolcanicos"+i,7,8,9,"fuego","invocacion",undefined,["antimagia","veloz"],undefined,false));
			mazo.push(new Carta("TitanDeFuego"+i,7,6,7,"fuego","invocacion",[3,9,1],["defensor","finTurno"],undefined,false));
			mazo.push(new Carta("OrbeIgneo"+i,undefined,undefined,1,"fuego","hechizo",undefined,undefined,[1,1,2],true));
			mazo.push(new Carta("TajoLlameante"+i,undefined,undefined,2,"fuego","hechizo",undefined,undefined,[1,2,1],false));
			mazo.push(new Carta("EstallidoInterior"+i,undefined,undefined,2,"fuego","hechizo",undefined,undefined,[2,1,1],false));
			mazo.push(new Carta("Fulgor"+i,undefined,undefined,2,"fuego","hechizo",undefined,undefined,[2,6,4],true));
			mazo.push(new Carta("BolaDeFuego"+i,undefined,undefined,3,"fuego","hechizo",undefined,undefined,[1,1,4],true));
			mazo.push(new Carta("AlimentoDelFuego"+i,undefined,undefined,3,"fuego","hechizo",undefined,undefined,[3,1,1],false));
			mazo.push(new Carta("AlmaIgnea"+i,undefined,undefined,3,"fuego","hechizo",undefined,undefined,[2,0,3],true));
			mazo.push(new Carta("FuriaArdiente"+i,undefined,undefined,4,"fuego","hechizo",undefined,undefined,[9,1,"ataqueDoble"],true));
			mazo.push(new Carta("Contener"+i,undefined,undefined,4,"fuego","hechizo",undefined,undefined,[1,5,6],true));
			mazo.push(new Carta("PilarDeLlamas"+i,undefined,undefined,5,"fuego","hechizo",undefined,undefined,[1,5,8],true));
			mazo.push(new Carta("FuegoPurgador"+i,undefined,undefined,5,"fuego","hechizo",undefined,undefined,[1,3,3],false));
			mazo.push(new Carta("Piromancia"+i,undefined,undefined,7,"fuego","hechizo",undefined,undefined,[7,3,4],false));
			mazo.push(new Carta("TormentaIgnea"+i,undefined,undefined,7,"fuego","hechizo",undefined,undefined,[1,2,4],false));
			mazo.push(new Carta("GranBolaDeFuego"+i,undefined,undefined,8,"fuego","hechizo",undefined,undefined,[1,1,9],true));
			mazo.push(new Carta("MundoEnLlamas"+i,undefined,undefined,9,"fuego","hechizo",undefined,undefined,[1,3,8],false));
			mazo.push(new Carta("Protector"+i,2,1,2,"vacio","invocacion",[3,0,0],["finTurno"],undefined,false));
			mazo.push(new Carta("Cazadora"+i,2,1,2,"vacio","invocacion",[7,0,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("Mago"+i,3,4,3,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("GuerreroASueldo"+i,4,4,3,"vacio","invocacion",[7,8,3],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("BestiaAntigua"+i,3,3,3,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("CaballeroDePlata"+i,2,3,3,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("Diablillo"+i,2,2,3,"vacio","invocacion",[5,0,2],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("EscorpionMarcado"+i,3,2,3,"vacio","invocacion",undefined,["letalidad","absorcionVital"],undefined,false));
			mazo.push(new Carta("LanzaHachas"+i,3,3,4,"vacio","invocacion",[7,9,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("GrifoAcechante"+i,5,6,5,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("CombatientesEnPosicion"+i,4,4,5,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("CocodriloDelPantano"+i,5,4,5,"vacio","invocacion",[3,7,2],["finTurno"],undefined,false));

		}
		mazo=_.shuffle(mazo);
		return mazo;
	}
	//Mazo aggro/veloz
	this.crearMazoFuego2=function(){
		var mazo=[];
		for (var i=0;i<2;i++){
			mazo.push(new Carta("Sargento"+i,1,1,1,"vacio","invocacion",[4,2,2],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("GuerreroEnCarga"+i,2,2,2,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("Enano"+i,3,2,3,"vacio","invocacion",[4,2,3],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("GuerreroASueldo"+i,4,4,3,"vacio","invocacion",[7,8,3],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("Diablillo"+i,2,2,3,"vacio","invocacion",[5,0,2],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("Renegado"+i,5,5,4,"vacio","invocacion",[7,10,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("AngelDeLuz"+i,5,4,4,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("MinotauroEnCarga"+i,2,5,5,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("CocodriloDelPantano"+i,5,4,5,"vacio","invocacion",[3,7,2],["finTurno"],undefined,false));
			mazo.push(new Carta("AngelGuardian"+i,7,6,6,"vacio","invocacion",[4,7,2],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("SombraFatal"+i,8,7,6,"vacio","invocacion",[7,8,5],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("MinotauroEnfurecido"+i,5,5,7,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("GrokMartilloNegro"+i,3,7,7,"vacio","invocacion",[5,0,7],["antimagia","gritoBatalla"],undefined,true));
			mazo.push(new Carta("CaballeroNegro"+i,7,6,8,"vacio","invocacion",[3,8,3],["veloz","finTurno"],undefined,false));
			mazo.push(new Carta("DeidadPerdida"+i,6,4,7,"vacio","invocacion",[6,0,4],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("HechiceroDeLava"+i,1,1,1,"fuego","invocacion",[7,12,1],["ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("AprendizSiniestra"+i,1,2,1,"fuego","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("CriaVolcanica"+i,2,2,2,"fuego","invocacion",[7,12,2],["ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("LicantropoVolcanico"+i,3,3,3,"fuego","invocacion",undefined,["ataqueDoble"],undefined,false));
			mazo.push(new Carta("SiervoFundido"+i,3,3,3,"fuego","invocacion",[7,9,2],["ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("ElegidoPorLaLlama"+i,4,3,4,"fuego","invocacion",undefined,["ataqueDoble"],undefined,false));
			mazo.push(new Carta("CaballeroDeLaLlamaOscura"+i,3,4,4,"fuego","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("DragonVolcanico"+i,5,5,5,"fuego","invocacion",[5,0,3],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("ElementalDeFuego"+i,5,5,6,"fuego","invocacion",[7,6,2],["defensor","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("ElementalAbrasante"+i,7,4,6,"fuego","invocacion",[7,9,3],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("CorcelDeLaLlama"+i,5,6,6,"fuego","invocacion",[7,21,"fuego"],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("AvatarDeLasLlamas"+i,6,6,8,"fuego","invocacion",[3,7,6],["finTurno"],undefined,false));
			mazo.push(new Carta("GigantesVolcanicos"+i,7,8,9,"fuego","invocacion",undefined,["antimagia","veloz"],undefined,false));
			mazo.push(new Carta("TitanDeFuego"+i,7,6,7,"fuego","invocacion",[3,9,1],["defensor","finTurno"],undefined,false));
			mazo.push(new Carta("Electrocutar"+i,undefined,undefined,1,"fuego","hechizo",undefined,undefined,[1,0,3],false));
			mazo.push(new Carta("OrbeIgneo"+i,undefined,undefined,1,"fuego","hechizo",undefined,undefined,[1,1,2],true));
			mazo.push(new Carta("TajoLlameante"+i,undefined,undefined,2,"fuego","hechizo",undefined,undefined,[1,2,1],false));
			mazo.push(new Carta("EstallidoInterior"+i,undefined,undefined,2,"fuego","hechizo",undefined,undefined,[2,1,1],false));
			mazo.push(new Carta("Fulgor"+i,undefined,undefined,2,"fuego","hechizo",undefined,undefined,[2,6,4],true));
			mazo.push(new Carta("AlimentoDelFuego"+i,undefined,undefined,3,"fuego","hechizo",undefined,undefined,[3,1,1],false));
			mazo.push(new Carta("AlmaIgnea"+i,undefined,undefined,3,"fuego","hechizo",undefined,undefined,[2,0,3],true));
			mazo.push(new Carta("FuriaArdiente"+i,undefined,undefined,4,"fuego","hechizo",undefined,undefined,[9,1,"ataqueDoble"],true));
			mazo.push(new Carta("Contener"+i,undefined,undefined,4,"fuego","hechizo",undefined,undefined,[1,5,6],true));
			mazo.push(new Carta("DefenderElNucleo"+i,undefined,undefined,6,"fuego","hechizo",undefined,undefined,[10,0,1],false));
			mazo.push(new Carta("GranBolaDeFuego"+i,undefined,undefined,8,"fuego","hechizo",undefined,undefined,[1,1,9],true));
		}
		mazo=_.shuffle(mazo);
		return mazo;
	}
	//Mazo basado en invocaciones
	this.crearMazoFuego3=function(){
		var mazo=[];
		for (var i=0;i<2;i++){
			mazo.push(new Carta("CriaVolcanica"+i,2,2,2,"fuego","invocacion",[7,12,2],["ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("LicantropoVolcanico"+i,3,3,3,"fuego","invocacion",undefined,["ataqueDoble"],undefined,false));
			mazo.push(new Carta("SiervoFundido"+i,3,3,3,"fuego","invocacion",[7,9,2],["ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("ElegidoPorLaLlama"+i,4,3,4,"fuego","invocacion",undefined,["ataqueDoble"],undefined,false));
			mazo.push(new Carta("ElementalDeFuego"+i,5,5,6,"fuego","invocacion",[7,6,2],["defensor","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("ElementalAbrasante"+i,7,4,6,"fuego","invocacion",[7,9,3],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("ElementalLatigoIgneo"+i,6,7,7,"fuego","invocacion",[3,1,3],["finTurno"],undefined,false));
			mazo.push(new Carta("DemonioInfernal"+i,10,10,10,"fuego","invocacion",[3,14,3],["defensor","finTurno"],undefined,false));
			mazo.push(new Carta("TajoLlameante"+i,undefined,undefined,2,"fuego","hechizo",undefined,undefined,[1,2,1],false));
			mazo.push(new Carta("Fulgor"+i,undefined,undefined,2,"fuego","hechizo",undefined,undefined,[2,6,4],true));
			mazo.push(new Carta("BolaDeFuego"+i,undefined,undefined,3,"fuego","hechizo",undefined,undefined,[1,1,4],true));
			mazo.push(new Carta("AlmaIgnea"+i,undefined,undefined,3,"fuego","hechizo",undefined,undefined,[2,0,3],true));
			mazo.push(new Carta("FuriaArdiente"+i,undefined,undefined,4,"fuego","hechizo",undefined,undefined,[9,1,"ataqueDoble"],true));
			mazo.push(new Carta("DefenderElNucleo"+i,undefined,undefined,6,"fuego","hechizo",undefined,undefined,[10,0,1],false));
			mazo.push(new Carta("GranBolaDeFuego"+i,undefined,undefined,8,"fuego","hechizo",undefined,undefined,[1,1,9],true));
			mazo.push(new Carta("VampiroSediento"+i,4,3,5,"vacio","invocacion",[7,9,3],["gritoBatalla","absorcionVital"],undefined,false));
			mazo.push(new Carta("OrcosViolentos"+i,3,3,5,"vacio","invocacion",[7,7,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("SerpienteGigante"+i,5,6,6,"vacio","invocacion",undefined,["absorcionVital"],undefined,false));
			mazo.push(new Carta("PaladinDelNorte"+i,5,4,6,"vacio","invocacion",[7,5,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("InvocadoraDeRefuerzos"+i,4,4,6,"vacio","invocacion",[3,12,1],["finTurno"],undefined,false));
			mazo.push(new Carta("SombraFatal"+i,8,7,6,"vacio","invocacion",[7,8,5],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("BalothGigante"+i,4,4,6,"vacio","invocacion",[5,0,4],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("GiganteDeLaNiebla"+i,4,6,6,"vacio","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("GolemViejo"+i,7,7,7,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("SombraAcechante"+i,5,7,7,"vacio","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("SacerdotesInamovibles"+i,9,5,7,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("GrokMartilloNegro"+i,3,7,7,"vacio","invocacion",[5,0,7],["antimagia","gritoBatalla"],undefined,true));
			mazo.push(new Carta("MinotauroArmado"+i,8,5,8,"vacio","invocacion",undefined,["defensor","veloz"],undefined,false));
			mazo.push(new Carta("ArchimagoSabio"+i,6,6,8,"vacio","invocacion",[7,6,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("VigilanteDeLaFrontera"+i,8,3,8,"vacio","invocacion",undefined,["defensor","veloz"],undefined,false));
			mazo.push(new Carta("DefensorDelTrono"+i,9,6,8,"vacio","invocacion",undefined,["defensor"],undefined,false));			
			mazo.push(new Carta("DemonioDeLaCatedral"+i,6,6,8,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("CaballeroNegro"+i,7,6,8,"vacio","invocacion",[3,8,3],["veloz","finTurno"],undefined,false));
			mazo.push(new Carta("CaballeroDeObsidiana"+i,10,8,9,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("GuardiaReal"+i,8,8,9,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("MaestroDeJade"+i,6,6,9,"vacio","invocacion",[3,5,2],["absorcionVital","finTurno"],undefined,false));
			mazo.push(new Carta("HeraldoDelInframundo"+i,7,9,9,"vacio","invocacion",[5,0,5],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("SenorDeLaForja"+i,8,8,10,"vacio","invocacion",[4,0,5],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("BestiaSagrada"+i,2,2,2,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("Escudero"+i,2,2,2,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
		}
		mazo=_.shuffle(mazo);
		return mazo;
	}
	//Mazo de robo/control
	this.crearMazoAgua1=function(){
		var mazo=[];
		for (var i=0;i<2;i++){
			mazo.push(new Carta("CangrejoDeLaMarea"+i,3,2,2,"agua","invocacion",undefined,["absorcionVital"],undefined,false));
			mazo.push(new Carta("LicantropoGlacial"+i,2,1,2,"agua","invocacion",[7,2,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("ElementalDeAgua"+i,4,2,3,"agua","invocacion",[6,1,3],["defensor","gritoBatalla"],undefined,true));
			mazo.push(new Carta("TritonDeLaCorriente"+i,3,3,3,"agua","invocacion",[7,20,"agua"],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("DragonSubmarino"+i,3,3,4,"agua","invocacion",[7,2,1],["oculto","gritoBatalla"],undefined,false));
			mazo.push(new Carta("DracoAzul"+i,1,4,4,"agua","invocacion",[7,13,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("GuardianaDeLasProfundidades"+i,5,5,5,"agua","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("ConjuradoraDeHielo"+i,1,1,5,"agua","invocacion",[7,26,4],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("MueveMareas"+i,6,5,6,"agua","invocacion",[7,5,2],["antimagia","gritoBatalla"],undefined,false));
			mazo.push(new Carta("DragonDeHielo"+i,5,5,6,"agua","invocacion",[7,16,1],["congelar","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("EspirituDeLaMarea"+i,8,5,7,"agua","invocacion",[7,19,1],["absorcionVital","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("DragonBlanco"+i,6,6,9,"agua","invocacion",[7,13,1],["escudoDivino","oculto","gritoBatalla"],undefined,false));
			mazo.push(new Carta("GiganteDeHielo"+i,9,6,9,"agua","invocacion",undefined,["defensor","congelar"],undefined,false));
			mazo.push(new Carta("TitanDeLasProfundidades"+i,9,9,10,"agua","invocacion",[7,5,7],["defensor","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("OjusaReinaDelMar"+i,6,6,8,"agua","invocacion",[7,29,2],["defensor","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("AvatarDeLosMares"+i,5,4,5,"agua","invocacion",[3,6,1],["congelar","finTurno"],undefined,false));
			mazo.push(new Carta("Repulsion"+i,undefined,undefined,2,"agua","hechizo",undefined,undefined,[6,0,2],true));
			mazo.push(new Carta("Repeler"+i,undefined,undefined,2,"agua","hechizo",undefined,undefined,[2,0,-3],true));
			mazo.push(new Carta("ReordenarLaMente"+i,undefined,undefined,3,"agua","hechizo",undefined,undefined,[0,0,2],false));
			mazo.push(new Carta("AguaPunzante"+i,undefined,undefined,4,"agua","hechizo",undefined,undefined,[1,7,4],true));
			mazo.push(new Carta("Paralizar"+i,undefined,undefined,4,"agua","hechizo",undefined,undefined,[2,0,-5],true));
			mazo.push(new Carta("Meditar"+i,undefined,undefined,5,"agua","hechizo",undefined,undefined,[0,0,3],false));
			mazo.push(new Carta("CorrienteViolenta"+i,undefined,undefined,6,"agua","hechizo",undefined,undefined,[6,4,2],false));
			mazo.push(new Carta("JuntarLasMareas"+i,undefined,undefined,7,"agua","hechizo",undefined,undefined,[0,0,4],false));
			mazo.push(new Carta("GranTorbellino"+i,undefined,undefined,8,"agua","hechizo",undefined,undefined,[10,4,5],false));
			mazo.push(new Carta("ArchimagoSabio"+i,6,6,8,"vacio","invocacion",[7,6,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("CaballeroDorado"+i,6,8,8,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("MagoRepulsor"+i,6,6,8,"vacio","invocacion",[5,3,0],["gritoBatalla"],undefined,true));			
			mazo.push(new Carta("ValdumHechiceroDeSangre"+i,6,6,8,"vacio","invocacion",[3,6,1],["absorcionVital","antimagia","finTurno"],undefined,false));
			mazo.push(new Carta("CaballeroDeObsidiana"+i,10,8,9,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("CaballeroDeSangre"+i,7,7,9,"vacio","invocacion",undefined,["defensor","absorcionVital"],undefined,false));
			mazo.push(new Carta("HeraldoDelInframundo"+i,7,9,9,"vacio","invocacion",[5,0,5],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("DragonOscuro"+i,7,7,9,"vacio","invocacion",[7,14,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("SerpienteDelDesierto"+i,12,8,10,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("GrokMartilloNegro"+i,3,7,7,"vacio","invocacion",[5,0,7],["antimagia","gritoBatalla"],undefined,true));
			mazo.push(new Carta("ViejoSabio"+i,1,1,2,"vacio","invocacion",[7,2,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("BrujaMaldita"+i,3,3,3,"vacio","invocacion",[3,7,1],["finTurno"],undefined,false));
			mazo.push(new Carta("AsesinoDeLaLunaLlena"+i,2,4,3,"vacio","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("AngelDeLuz"+i,5,4,4,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("MagoDelConocimiento"+i,3,2,4,"vacio","invocacion",[3,6,1],["finTurno"],undefined,false));
		}
		mazo=_.shuffle(mazo);
		return mazo;
	}
		//Mazo de congelar
	this.crearMazoAgua2=function(){
		var mazo=[];
		for (var i=0;i<2;i++){
			mazo.push(new Carta("ElementalDeCorriente"+i,3,2,2,"agua","invocacion",undefined,["congelar"],undefined,false));
			mazo.push(new Carta("CangrejoDeLaMarea"+i,3,2,2,"agua","invocacion",undefined,["absorcionVital"],undefined,false));
			mazo.push(new Carta("LicantropoGlacial"+i,2,1,2,"agua","invocacion",[7,2,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("ElementalDeAgua"+i,4,2,3,"agua","invocacion",[6,1,3],["defensor","gritoBatalla"],undefined,true));
			mazo.push(new Carta("TritonDeLaCorriente"+i,3,3,3,"agua","invocacion",[7,20,"agua"],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("DracoAzul"+i,1,4,4,"agua","invocacion",[7,13,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("EspadachinDeEscarcha"+i,6,3,4,"agua","invocacion",undefined,["congelar"],undefined,false));
			mazo.push(new Carta("ConjuradoraDeHielo"+i,1,1,5,"agua","invocacion",[7,26,4],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("MueveMareas"+i,6,5,6,"agua","invocacion",[7,5,2],["antimagia","gritoBatalla"],undefined,false));
			mazo.push(new Carta("DragonDeHielo"+i,5,5,6,"agua","invocacion",[7,16,1],["congelar","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("DefensorDeLasProfundidades"+i,7,6,7,"agua","invocacion",undefined,["defensor","antimagia"],undefined,false));
			mazo.push(new Carta("EspirituDeLaMarea"+i,8,5,7,"agua","invocacion",[7,19,1],["absorcionVital","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("TitanGlacial"+i,8,8,8,"agua","invocacion",[7,19,1],["congelar","gritoBatalla"],undefined,false));
			mazo.push(new Carta("GiganteDeHielo"+i,9,6,9,"agua","invocacion",undefined,["defensor","congelar"],undefined,false));
			mazo.push(new Carta("TitanDeLasProfundidades"+i,9,9,10,"agua","invocacion",[7,5,7],["defensor","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("OjusaReinaDelMar"+i,6,6,8,"agua","invocacion",[7,29,2],["defensor","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("AvatarDeLosMares"+i,5,4,5,"agua","invocacion",[3,6,1],["congelar","finTurno"],undefined,false));
			mazo.push(new Carta("Congelar"+i,undefined,undefined,1,"agua","hechizo",undefined,undefined,[1,6,1],true));
			mazo.push(new Carta("Repeler"+i,undefined,undefined,2,"agua","hechizo",undefined,undefined,[2,0,-3],true));
			mazo.push(new Carta("ReordenarLaMente"+i,undefined,undefined,3,"agua","hechizo",undefined,undefined,[0,0,2],false));
			mazo.push(new Carta("CongelacionMasiva"+i,undefined,undefined,3,"agua","hechizo",undefined,undefined,[10,1,1],false));
			mazo.push(new Carta("FormaDelAgua"+i,undefined,undefined,4,"agua","hechizo",undefined,undefined,[9,3,"escudoDivino"],true));
			mazo.push(new Carta("Paralizar"+i,undefined,undefined,4,"agua","hechizo",undefined,undefined,[2,0,-5],true));
			mazo.push(new Carta("TormentaGlacial"+i,undefined,undefined,5,"agua","hechizo",undefined,undefined,[10,5,1],false));
			mazo.push(new Carta("Meditar"+i,undefined,undefined,5,"agua","hechizo",undefined,undefined,[0,0,3],false));
			mazo.push(new Carta("LluviaDeTempanos"+i,undefined,undefined,6,"agua","hechizo",undefined,undefined,[10,2,2],false));
			mazo.push(new Carta("JuntarLasMareas"+i,undefined,undefined,7,"agua","hechizo",undefined,undefined,[0,0,4],false));
			mazo.push(new Carta("Inundar"+i,undefined,undefined,7,"agua","hechizo",undefined,undefined,[2,8,4],false));
			mazo.push(new Carta("GranTorbellino"+i,undefined,undefined,8,"agua","hechizo",undefined,undefined,[10,4,5],false));
			mazo.push(new Carta("DemonioOscuro"+i,4,5,4,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("BrujoCentinela"+i,5,3,4,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("AsesinoEnvenenador"+i,2,1,4,"vacio","invocacion",undefined,["oculto","letalidad"],undefined,false));
			mazo.push(new Carta("GrifoAcechante"+i,5,6,5,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("CombatientesEnPosicion"+i,4,4,5,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("VampiroSediento"+i,4,3,5,"vacio","invocacion",[7,9,3],["gritoBatalla","absorcionVital"],undefined,false));
			mazo.push(new Carta("AngelGuardian"+i,7,6,6,"vacio","invocacion",[4,7,2],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("BalothGigante"+i,4,4,6,"vacio","invocacion",[5,0,4],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("ArchimagoSabio"+i,6,6,8,"vacio","invocacion",[7,6,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("DemonioDeLaCatedral"+i,6,6,8,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("DragonOscuro"+i,7,7,9,"vacio","invocacion",[7,14,1],["gritoBatalla"],undefined,false));
		}
		mazo=_.shuffle(mazo);
		return mazo;
	}

	//Basado en invocaciones
	this.crearMazoAgua3=function(){
		var mazo=[];
		for (var i=0;i<2;i++){
			mazo.push(new Carta("GuerreroGuardia"+i,3,2,2,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("BestiaSagrada"+i,2,2,2,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("GuerreroArmado"+i,4,3,3,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("Mago"+i,3,4,3,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("EspirituGuardian"+i,4,3,3,"vacio","invocacion",[4,7,0],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("BrujaMaldita"+i,3,3,3,"vacio","invocacion",[3,7,1],["finTurno"],undefined,false));
			mazo.push(new Carta("DruidaAnciano"+i,3,1,3,"vacio","invocacion",[3,6,1],["finTurno"],undefined,false));
			mazo.push(new Carta("AngelDeLuz"+i,5,4,4,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("Centauro"+i,6,2,4,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("OsoDelBosque"+i,4,4,4,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("ArqueraSigilosa"+i,3,5,4,"vacio","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("GuerreroGigante"+i,6,5,5,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("ChamanOscuro"+i,5,5,5,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("EsfingeSagrada"+i,3,3,5,"vacio","invocacion",[7,2,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("CocodriloDelPantano"+i,5,4,5,"vacio","invocacion",[3,7,2],["finTurno"],undefined,false));
			mazo.push(new Carta("SombraFatal"+i,8,7,6,"vacio","invocacion",[7,8,5],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("BalothGigante"+i,4,4,6,"vacio","invocacion",[5,0,4],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("GrifoDeLaTorre"+i,5,5,7,"vacio","invocacion",[7,1,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("CaballeroDorado"+i,6,8,8,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("MagoRepulsor"+i,6,6,8,"vacio","invocacion",[5,3,0],["gritoBatalla"],undefined,true));			
			mazo.push(new Carta("CaballeroNegro"+i,7,6,8,"vacio","invocacion",[3,8,3],["veloz","finTurno"],undefined,false));
			mazo.push(new Carta("LiderCentauro"+i,6,6,9,"vacio","invocacion",[7,7,3],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("HeraldoDelInframundo"+i,7,9,9,"vacio","invocacion",[5,0,5],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("ElementalDeCorriente"+i,3,2,2,"agua","invocacion",undefined,["congelar"],undefined,false));
			mazo.push(new Carta("ElementalDeAgua"+i,4,2,3,"agua","invocacion",[6,1,3],["defensor","gritoBatalla"],undefined,true));
			mazo.push(new Carta("EspadachinDeEscarcha"+i,6,3,4,"agua","invocacion",undefined,["congelar"],undefined,false));
			mazo.push(new Carta("GuardianaDeLasProfundidades"+i,5,5,5,"agua","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("ConjuradoraDeHielo"+i,1,1,5,"agua","invocacion",[7,26,4],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("MueveMareas"+i,6,5,6,"agua","invocacion",[7,5,2],["antimagia","gritoBatalla"],undefined,false));
			mazo.push(new Carta("DragonDeHielo"+i,5,5,6,"agua","invocacion",[7,16,1],["congelar","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("EspirituDeLaMarea"+i,8,5,7,"agua","invocacion",[7,19,1],["absorcionVital","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("TitanGlacial"+i,8,8,8,"agua","invocacion",[7,19,1],["congelar","gritoBatalla"],undefined,false));
			mazo.push(new Carta("DragonBlanco"+i,6,6,9,"agua","invocacion",[7,13,1],["escudoDivino","oculto","gritoBatalla"],undefined,false));
			mazo.push(new Carta("OjusaReinaDelMar"+i,6,6,8,"agua","invocacion",[7,29,2],["defensor","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("Repulsion"+i,undefined,undefined,2,"agua","hechizo",undefined,undefined,[6,0,2],true));
			mazo.push(new Carta("AguaPunzante"+i,undefined,undefined,4,"agua","hechizo",undefined,undefined,[1,7,4],true));
			mazo.push(new Carta("FormaDelAgua"+i,undefined,undefined,4,"agua","hechizo",undefined,undefined,[9,3,"escudoDivino"],true));
			mazo.push(new Carta("Paralizar"+i,undefined,undefined,4,"agua","hechizo",undefined,undefined,[2,0,-5],true));
			mazo.push(new Carta("LluviaDeTempanos"+i,undefined,undefined,6,"agua","hechizo",undefined,undefined,[10,2,2],false));
			mazo.push(new Carta("Inundar"+i,undefined,undefined,7,"agua","hechizo",undefined,undefined,[2,8,4],false));
		}
		mazo=_.shuffle(mazo);
		return mazo;
	}

	//Basado en equilibro de hechizos e invocaciones de aire
	this.crearMazoAire1=function(){
		var mazo=[];
		for (var i=0;i<2;i++){
			mazo.push(new Carta("BestiaSagrada"+i,2,2,2,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("Enano"+i,3,2,3,"vacio","invocacion",[4,2,3],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("ChamanSanador"+i,3,2,3,"vacio","invocacion",[4,6,4],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("EspirituGuardian"+i,4,3,3,"vacio","invocacion",[4,7,0],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("ArqueraExploradora"+i,3,2,3,"vacio","invocacion",[7,0,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("CaballeroNegro"+i,7,6,8,"vacio","invocacion",[3,8,3],["veloz","finTurno"],undefined,false));
			mazo.push(new Carta("CaballeroDeObsidiana"+i,10,8,9,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("MaestroDeJade"+i,6,6,9,"vacio","invocacion",[3,5,2],["absorcionVital","finTurno"],undefined,false));
			mazo.push(new Carta("CanalizadorDelViento"+i,2,1,1,"aire","invocacion",undefined,["absorcionVital"],undefined,false));
			mazo.push(new Carta("VigilanteMontado"+i,1,1,1,"aire","invocacion",[7,0,1],["ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("CreadorDeVacio"+i,3,2,2,"aire","invocacion",[7,20,"aire"],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("ConjuradorEtereo"+i,3,3,3,"aire","invocacion",[4,0,1],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("CaminanteDelViento"+i,2,2,3,"aire","invocacion",undefined,["oculto","ataqueDoble"],undefined,true));
			mazo.push(new Carta("ElementalDeAire"+i,4,4,4,"aire","invocacion",[5,3,1],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("ElementalGris"+i,5,4,4,"aire","invocacion",[7,25,"aire"],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("ProtectoraNocturna"+i,4,4,4,"aire","invocacion",[4,0,1],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("CaballeroBlanco"+i,4,4,5,"aire","invocacion",undefined,["escudoDivino","absorcionVital"],undefined,false));
			mazo.push(new Carta("ElementalFrenteDeTormenta"+i,3,5,5,"aire","invocacion",[5,3,3],["antimagia","gritoBatalla"],undefined,true));
			mazo.push(new Carta("SirvienteDeKrat"+i,6,4,5,"aire","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("ElementalDeViento"+i,6,4,6,"aire","invocacion",[3,5,1],["finTurno"],undefined,false));
			mazo.push(new Carta("DragonDeLuz"+i,5,5,6,"aire","invocacion",[3,5,1],["escudoDivino","antimagia"],undefined,false));
			mazo.push(new Carta("CaballeroJusto"+i,5,7,7,"aire","invocacion",[7,12,5],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("AvatarDelViento"+i,6,8,8,"aire","invocacion",[7,28,2],["antimagia","gritoBatalla"],undefined,false));
			mazo.push(new Carta("AparicionCeleste"+i,9,8,8,"aire","invocacion",[4,7,1],["defensor", "gritoBatalla"],undefined,true));
			mazo.push(new Carta("GuardianDeLaLuz"+i,8,9,9,"aire","invocacion",undefined,["absorcionVital","escudoDivino"],undefined,false));
			mazo.push(new Carta("TitanLuminoso"+i,7,6,9,"aire","invocacion",[3,12,3],["ataqueDoble","finTurno"],undefined,false));
			mazo.push(new Carta("KratGuardianDelTemplo"+i,6,5,7,"aire","invocacion",undefined,["escudoDivino","defensor","ataqueDoble"],undefined,false));
			mazo.push(new Carta("BendicionLuminosa"+i,undefined,undefined,1,"aire","hechizo",undefined,undefined,[2,6,3],true));	
			mazo.push(new Carta("SanarLasHeridas"+i,undefined,undefined,1,"aire","hechizo",undefined,undefined,[8,1,5],true));	
			mazo.push(new Carta("VientoCortante"+i,undefined,undefined,2,"aire","hechizo",undefined,undefined,[3,6,1],true));	
			mazo.push(new Carta("InvocarRefuerzos"+i,undefined,undefined,3,"aire","hechizo",undefined,undefined,[5,0,3],false));
			mazo.push(new Carta("EvocarElEspiritu"+i,undefined,undefined,4,"aire","hechizo",undefined,undefined,[2,0,4],true));
			mazo.push(new Carta("OndaDeChoque"+i,undefined,undefined,6,"aire","hechizo",undefined,undefined,[1,2,3],false));
			mazo.push(new Carta("ConjurarEspectros"+i,undefined,undefined,5,"aire","hechizo",undefined,undefined,[5,2,2],false));
			mazo.push(new Carta("LlamadaALaTormenta"+i,undefined,undefined,6,"aire","hechizo",undefined,undefined,[7,6,4],false));
			mazo.push(new Carta("EspirituDeBatalla"+i,undefined,undefined,5,"aire","hechizo",undefined,undefined,[2,11,3],false));
			mazo.push(new Carta("CanonDeAire"+i,undefined,undefined,5,"aire","hechizo",undefined,undefined,[3,0,2],true));
			mazo.push(new Carta("VueloCelestial"+i,undefined,undefined,7,"aire","hechizo",undefined,undefined,[5,2,3],false));
			mazo.push(new Carta("GritoDeGuerra"+i,undefined,undefined,8,"aire","hechizo",undefined,undefined,[2,0,10],true));
			mazo.push(new Carta("AlVacio"+i,undefined,undefined,8,"aire","hechizo",undefined,undefined,[3,2,1],false));
		}
		mazo=_.shuffle(mazo);
		return mazo;
	}
	//Basado en token
	this.crearMazoAire2=function(){
		var mazo=[];
		for (var i=0;i<2;i++){
			mazo.push(new Carta("VigilanteMontado"+i,1,1,1,"aire","invocacion",[7,0,1],["ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("ConjuradorEtereo"+i,3,3,3,"aire","invocacion",[4,0,1],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("ElementalDeAire"+i,4,4,4,"aire","invocacion",[5,3,1],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("ProtectoraNocturna"+i,4,4,4,"aire","invocacion",[4,0,1],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("ElementalDeViento"+i,6,4,6,"aire","invocacion",[3,5,1],["finTurno"],undefined,false));
			mazo.push(new Carta("DragonDeLuz"+i,5,5,6,"aire","invocacion",undefined,["escudoDivino","antimagia"],undefined,false));
			mazo.push(new Carta("CaballeroJusto"+i,5,7,7,"aire","invocacion",[7,12,5],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("AvatarDelViento"+i,6,8,8,"aire","invocacion",[7,28,2],["antimagia","gritoBatalla"],undefined,false));
			mazo.push(new Carta("TitanLuminoso"+i,7,6,9,"aire","invocacion",[3,12,3],["ataqueDoble","finTurno"],undefined,false));
			mazo.push(new Carta("KratGuardianDelTemplo"+i,6,5,7,"aire","invocacion",undefined,["escudoDivino","defensor","ataqueDoble"],undefined,false));
			mazo.push(new Carta("BendicionLuminosa"+i,undefined,undefined,1,"aire","hechizo",undefined,undefined,[2,6,3],true));	
			mazo.push(new Carta("Proteger"+i,undefined,undefined,1,"aire","hechizo",undefined,undefined,[9,0,"escudoDivino"],true));	
			mazo.push(new Carta("Desaparecer"+i,undefined,undefined,2,"aire","hechizo",undefined,undefined,[9,0,"oculto"],true));	
			mazo.push(new Carta("VientoCortante"+i,undefined,undefined,2,"aire","hechizo",undefined,undefined,[3,6,1],true));	
			mazo.push(new Carta("InvocarRefuerzos"+i,undefined,undefined,3,"aire","hechizo",undefined,undefined,[5,0,3],false));
			mazo.push(new Carta("InvocarFamiliar"+i,undefined,undefined,3,"aire","hechizo",undefined,undefined,[9,4,"escudoDivino"],true));	
			mazo.push(new Carta("EvocarElEspiritu"+i,undefined,undefined,4,"aire","hechizo",undefined,undefined,[2,0,4],true));
			mazo.push(new Carta("ConjurarEspectros"+i,undefined,undefined,5,"aire","hechizo",undefined,undefined,[5,2,2],false));
			mazo.push(new Carta("LlamadaALaTormenta"+i,undefined,undefined,6,"aire","hechizo",undefined,undefined,[7,6,3],false));
			mazo.push(new Carta("EspirituDeBatalla"+i,undefined,undefined,5,"aire","hechizo",undefined,undefined,[2,11,3],false));
			mazo.push(new Carta("VueloCelestial"+i,undefined,undefined,7,"aire","hechizo",undefined,undefined,[5,2,3],false));
			mazo.push(new Carta("GritoDeGuerra"+i,undefined,undefined,8,"aire","hechizo",undefined,undefined,[2,0,10],true));
			mazo.push(new Carta("Caballero"+i,1,1,1,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("GuerreroAnciano"+i,1,1,1,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("Protector"+i,2,1,2,"vacio","invocacion",[3,0,0],["finTurno"],undefined,false));
			mazo.push(new Carta("Cazadora"+i,2,1,2,"vacio","invocacion",[7,0,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("ArqueraExploradora"+i,3,2,3,"vacio","invocacion",[7,0,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("LiderDeBatalla"+i,2,2,3,"vacio","invocacion",[7,7,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("HerreroAnciano"+i,4,4,4,"vacio","invocacion",[4,2,2],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("GuerrerosCombatientes"+i,2,2,4,"vacio","invocacion",[7,1,1],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("HeroeConocido"+i,4,3,4,"vacio","invocacion",[7,7,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("DriadaDelBosqueProfundo"+i,5,3,4,"vacio","invocacion",[6,1,3],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("InvocadoraDeRefuerzos"+i,4,4,6,"vacio","invocacion",[3,12,1],["finTurno"],undefined,false));
			mazo.push(new Carta("GrifoDeBatalla"+i,5,3,6,"vacio","invocacion",[3,3,1],["finTurno"],undefined,false));
			mazo.push(new Carta("GrifoDeLaTorre"+i,5,5,7,"vacio","invocacion",[7,1,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("LiderDeGuerra"+i,5,7,7,"vacio","invocacion",[3,5,1],["finTurno"],undefined,false));
			mazo.push(new Carta("PrimeraLineaDelNorte"+i,4,4,8,"vacio","invocacion",[7,1,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("LiderCentauro"+i,6,6,9,"vacio","invocacion",[7,7,3],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("MaestroDeJade"+i,6,6,9,"vacio","invocacion",[3,5,2],["absorcionVital","finTurno"],undefined,false));
			mazo.push(new Carta("SiveraEscudoDeLeon"+i,10,5,9,"vacio","invocacion",[7,5,4],["defensor","gritoBatalla"],undefined,false));
		}
		mazo=_.shuffle(mazo);
		return mazo;
	}
	//Basado en invocaciones en curva
	this.crearMazoAire3=function(){
		var mazo=[];
		for (var i=0;i<2;i++){
			mazo.push(new Carta("Aprendiz"+i,1,1,0,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("Recluta"+i,1,2,1,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("LoboHambriento"+i,1,1,1,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("AranaVenenosa"+i,1,1,1,"vacio","invocacion",undefined,["letalidad"],undefined,false));
			mazo.push(new Carta("Escudero"+i,2,2,2,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("ApredizRestauradora"+i,2,1,2,"vacio","invocacion",[3,2,1],["finTurno"],undefined,false));
			mazo.push(new Carta("Asesino"+i,2,2,2,"vacio","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("Sanador"+i,1,1,2,"vacio","invocacion",[4,6,2],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("Mago"+i,3,4,3,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("ArqueraExploradora"+i,3,2,3,"vacio","invocacion",[7,0,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("CaballeroDePlata"+i,2,3,3,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("Nigromante"+i,3,1,3,"vacio","invocacion",[3,12,1],["finTurno"],undefined,false));
			mazo.push(new Carta("AsesinoDeLaLunaLlena"+i,2,4,3,"vacio","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("DemonioOscuro"+i,4,5,4,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("GuerreraBendecida"+i,1,1,4,"vacio","invocacion",[3,5,2],["finTurno"],undefined,false));
			mazo.push(new Carta("HerreroAnciano"+i,4,4,4,"vacio","invocacion",[4,2,2],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("OsoDelBosque"+i,4,4,4,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("OrcosViolentos"+i,3,3,5,"vacio","invocacion",[7,7,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("SombraTentadora"+i,4,4,5,"vacio","invocacion",[4,1,3],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("CampeonDelReino"+i,6,6,6,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("PaladinDelNorte"+i,5,4,6,"vacio","invocacion",[7,5,2],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("BalothGigante"+i,4,4,6,"vacio","invocacion",[5,0,4],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("GiganteDeLaNiebla"+i,4,6,6,"vacio","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("VientoCortante"+i,undefined,undefined,2,"aire","hechizo",undefined,undefined,[3,6,1],true));	
			mazo.push(new Carta("InvocarRefuerzos"+i,undefined,undefined,3,"aire","hechizo",undefined,undefined,[5,0,3],false));
			mazo.push(new Carta("InvocarFamiliar"+i,undefined,undefined,3,"aire","hechizo",undefined,undefined,[9,4,"escudoDivino"],true));	
			mazo.push(new Carta("EvocarElEspiritu"+i,undefined,undefined,4,"aire","hechizo",undefined,undefined,[2,0,4],true));
			mazo.push(new Carta("ConjurarEspectros"+i,undefined,undefined,5,"aire","hechizo",undefined,undefined,[5,2,2],false));
			mazo.push(new Carta("LlamadaALaTormenta"+i,undefined,undefined,6,"aire","hechizo",undefined,undefined,[7,6,3],false));
			mazo.push(new Carta("EspirituDeBatalla"+i,undefined,undefined,5,"aire","hechizo",undefined,undefined,[2,11,3],false));
			mazo.push(new Carta("CanonDeAire"+i,undefined,undefined,5,"aire","hechizo",undefined,undefined,[3,0,2],true));
			mazo.push(new Carta("VueloCelestial"+i,undefined,undefined,7,"aire","hechizo",undefined,undefined,[5,2,3],false));
			mazo.push(new Carta("AlVacio"+i,undefined,undefined,8,"aire","hechizo",undefined,undefined,[3,2,1],false));
			mazo.push(new Carta("ConjuradorEtereo"+i,3,3,3,"aire","invocacion",[4,0,1],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("CaminanteDelViento"+i,2,2,3,"aire","invocacion",undefined,["oculto","ataqueDoble"],undefined,true));
			mazo.push(new Carta("ElementalDeAire"+i,4,4,4,"aire","invocacion",[5,3,1],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("ElementalFrenteDeTormenta"+i,3,5,5,"aire","invocacion",[5,3,3],["antimagia","gritoBatalla"],undefined,true));
			mazo.push(new Carta("AvatarDelViento"+i,6,8,8,"aire","invocacion",[7,28,2],["antimagia","gritoBatalla"],undefined,false));
			mazo.push(new Carta("GuardianDeLaLuz"+i,8,9,9,"aire","invocacion",undefined,["absorcionVital","escudoDivino"],undefined,false));
			mazo.push(new Carta("TitanLuminoso"+i,7,6,9,"aire","invocacion",[3,12,3],["ataqueDoble","finTurno"],undefined,false));
		}
		mazo=_.shuffle(mazo);
		return mazo;
	}
	//Basado en cartas de tierra y ramp
	this.crearMazoTierra1=function(){
		var mazo=[];
		for (var i=0;i<2;i++){
			mazo.push(new Carta("GuardianDeLaMontana"+i,3,2,2,"tierra","invocacion",[7,27,1],["ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("ExploradorDelBosque"+i,2,3,2,"tierra","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("ElementalistaDePiedra"+i,3,3,3,"tierra","invocacion",[7,23,"tierra"],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("GolemEncantado"+i,4,3,4,"tierra","invocacion",[5,0,2],["antimagia","gritoBatalla"],undefined,true));
			mazo.push(new Carta("ConstructoFurioso"+i,4,5,4,"tierra","invocacion",[7,6,1],["ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("ElementalDePiedra"+i,5,4,5,"tierra","invocacion",undefined,["escudoDivino","antimagia"],undefined,false));
			mazo.push(new Carta("GolemDesatado"+i,3,5,5,"tierra","invocacion",[7,4,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("DefensorDelBosque"+i,7,5,6,"tierra","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("DruidaArmaduraDeCorteza"+i,6,4,6,"tierra","invocacion",[7,27,1],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("GolemDePiedra"+i,7,6,7,"tierra","invocacion",undefined,["antimagia","defensor"],undefined,false));
			mazo.push(new Carta("BestiaDescomunal"+i,8,8,8,"tierra","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("AvatarDeLaTierra"+i,7,7,8,"tierra","invocacion",[7,6,4],["defensor","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("AntiguoDespertado"+i,9,9,10,"tierra","invocacion",[7,17,1],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("TrepadorSombrio"+i,8,8,9,"tierra","invocacion",[7,15,2],["letalidad","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("ColosoRocaDorada"+i,8,7,9,"tierra","invocacion",[7,24,1],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("Cultivar"+i,undefined,undefined,2,"tierra","hechizo",undefined,undefined,[4,0,1],false));
			mazo.push(new Carta("Reforzar"+i,undefined,undefined,2,"tierra","hechizo",undefined,undefined,[9,2,"defensor"],true));
			mazo.push(new Carta("Aplastar"+i,undefined,undefined,3,"tierra","hechizo",undefined,undefined,[1,5,4],true));
			mazo.push(new Carta("PoderInterior"+i,undefined,undefined,4,"tierra","hechizo",undefined,undefined,[2,4,1],true));
			mazo.push(new Carta("RaicesEspinosas"+i,undefined,undefined,4,"tierra","hechizo",undefined,undefined,[1,2,2],false));
			mazo.push(new Carta("UnoConLaTierra"+i,undefined,undefined,4,"tierra","hechizo",undefined,undefined,[10,3,3],false));
			mazo.push(new Carta("RemoverLasRocas"+i,undefined,undefined,3,"tierra","hechizo",undefined,undefined,[7,2,2],false));
			mazo.push(new Carta("CanalizarLaNaturaleza"+i,undefined,undefined,5,"tierra","hechizo",undefined,undefined,[0,0,3],false));
			mazo.push(new Carta("CrecimientoAbrumador"+i,undefined,undefined,5,"tierra","hechizo",undefined,undefined,[4,0,2],false));
			mazo.push(new Carta("Revivir"+i,undefined,undefined,5,"tierra","hechizo",undefined,undefined,[8,1,12],true));
			mazo.push(new Carta("Terremoto"+i,undefined,undefined,6,"tierra","hechizo",undefined,undefined,[1,3,5],false));
			mazo.push(new Carta("ProclamacionDeVictoria"+i,undefined,undefined,6,"tierra","hechizo",undefined,undefined,[3,4,1],false));
			mazo.push(new Carta("Resurgir"+i,undefined,undefined,7,"aire","hechizo",undefined,undefined,[7,7,2],false));
			mazo.push(new Carta("DespertarDeLosAntiguos"+i,undefined,undefined,8,"tierra","hechizo",undefined,undefined,[5,4,1],false));
			mazo.push(new Carta("DefenderElBosque"+i,undefined,undefined,9,"tierra","hechizo",undefined,undefined,[2,1,4],false));
			mazo.push(new Carta("MinotauroEnfurecido"+i,5,5,7,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("AranaGigante"+i,7,2,7,"vacio","invocacion",undefined,["letalidad"],undefined,false));
			mazo.push(new Carta("BestiaDivina"+i,7,7,8,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("DestructorDeFrentes"+i,6,9,9,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("HeraldoDelInframundo"+i,7,9,9,"vacio","invocacion",[5,0,5],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("OsoGigante"+i,8,8,10,"vacio","invocacion",[7,5,5],["antimagia","gritoBatalla"],undefined,false));
			mazo.push(new Carta("OsoDelBosque"+i,4,4,4,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("DragonSalvaje"+i,3,4,5,"vacio","invocacion",[5,0,4],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("CaballeroNegro"+i,7,6,8,"vacio","invocacion",[3,8,3],["veloz","finTurno"],undefined,false));
		}
		mazo=_.shuffle(mazo);
		return mazo;
	}
	//Basado en mecanica de defensor
	this.crearMazoTierra2=function(){
		var mazo=[];
		for (var i=0;i<2;i++){
			mazo.push(new Carta("Cultivar"+i,undefined,undefined,2,"tierra","hechizo",undefined,undefined,[4,0,1],false));
			mazo.push(new Carta("Reforzar"+i,undefined,undefined,2,"tierra","hechizo",undefined,undefined,[9,2,"defensor"],true));
			mazo.push(new Carta("Aplastar"+i,undefined,undefined,3,"tierra","hechizo",undefined,undefined,[1,5,4],true));
			mazo.push(new Carta("RaicesEspinosas"+i,undefined,undefined,4,"tierra","hechizo",undefined,undefined,[1,2,2],false));
			mazo.push(new Carta("UnoConLaTierra"+i,undefined,undefined,4,"tierra","hechizo",undefined,undefined,[10,3,3],false));
			mazo.push(new Carta("RemoverLasRocas"+i,undefined,undefined,3,"tierra","hechizo",undefined,undefined,[7,2,2],false));
			mazo.push(new Carta("CanalizarLaPiedra"+i,undefined,undefined,3,"tierra","hechizo",undefined,undefined,[9,3,"defensor"],true));
			mazo.push(new Carta("CrecimientoAbrumador"+i,undefined,undefined,5,"tierra","hechizo",undefined,undefined,[4,0,2],false));
			mazo.push(new Carta("Terremoto"+i,undefined,undefined,6,"tierra","hechizo",undefined,undefined,[1,3,5],false));
			mazo.push(new Carta("Resurgir"+i,undefined,undefined,7,"aire","hechizo",undefined,undefined,[7,7,2],false));
			mazo.push(new Carta("DespertarDeLosAntiguos"+i,undefined,undefined,8,"tierra","hechizo",undefined,undefined,[5,4,1],false));
			mazo.push(new Carta("DefenderElBosque"+i,undefined,undefined,9,"tierra","hechizo",undefined,undefined,[2,1,4],false));
			mazo.push(new Carta("GuardianDeLaMontana"+i,3,2,2,"tierra","invocacion",[7,27,1],["ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("ProtectorDeRoca"+i,4,3,3,"tierra","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("ElementalistaDePiedra"+i,3,3,3,"tierra","invocacion",[7,23,"tierra"],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("LicantropoArboreo"+i,5,4,4,"tierra","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("ConstructoFurioso"+i,4,5,4,"tierra","invocacion",[7,6,1],["ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("ElementalDePiedra"+i,5,4,5,"tierra","invocacion",undefined,["escudoDivino","antimagia"],undefined,false));
			mazo.push(new Carta("GolemDesatado"+i,3,5,5,"tierra","invocacion",[7,4,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("DefensorDelBosque"+i,7,5,6,"tierra","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("DruidaArmaduraDeCorteza"+i,6,4,6,"tierra","invocacion",[7,27,1],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("DragonDeRocaBrillante"+i,7,5,7,"tierra","invocacion",[3,6,1],["defensor","finTurno"],undefined,false));
			mazo.push(new Carta("GolemDePiedra"+i,7,6,7,"tierra","invocacion",undefined,["antimagia","defensor"],undefined,false));
			mazo.push(new Carta("BestiaDescomunal"+i,8,8,8,"tierra","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("AvatarDeLaTierra"+i,7,7,8,"tierra","invocacion",[7,6,4],["defensor","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("AntiguoDespertado"+i,9,9,10,"tierra","invocacion",[7,17,1],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("TrepadorSombrio"+i,8,8,9,"tierra","invocacion",[7,15,2],["letalidad","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("ColosoRocaDorada"+i,8,7,9,"tierra","invocacion",[7,24,1],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("LoboProtector"+i,2,2,2,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("TrollDeLaMontana"+i,3,3,3,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("Centauro"+i,6,2,4,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("BrujoCentinela"+i,5,3,4,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("SombraFatal"+i,8,7,6,"vacio","invocacion",[7,8,5],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("LoboGuardian"+i,8,6,7,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("DefensorDelTrono"+i,9,6,8,"vacio","invocacion",undefined,["defensor"],undefined,false));			
			mazo.push(new Carta("CaballeroDeSangre"+i,7,7,9,"vacio","invocacion",undefined,["defensor","absorcionVital"],undefined,false));
			mazo.push(new Carta("SiveraEscudoDeLeon"+i,10,5,9,"vacio","invocacion",[7,5,4],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("SerpienteDelDesierto"+i,12,8,10,"vacio","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("DemonioDeLaCatedral"+i,6,6,8,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("ValdumHechiceroDeSangre"+i,6,6,8,"vacio","invocacion",[3,6,1],["absorcionVital","antimagia","finTurno"],undefined,false));
		}
		mazo=_.shuffle(mazo);
		return mazo;
	}
	//Basado en invocaciones
	this.crearMazoTierra3=function(){
		var mazo=[];
		for (var i=0;i<2;i++){
			mazo.push(new Carta("GuardianDeLaMontana"+i,3,2,2,"tierra","invocacion",[7,27,1],["ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("ExploradorDelBosque"+i,2,3,2,"tierra","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("ProtectorDeRoca"+i,4,3,3,"tierra","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("LicantropoArboreo"+i,5,4,4,"tierra","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("ConstructoFurioso"+i,4,5,4,"tierra","invocacion",[7,6,1],["ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("GolemDesatado"+i,3,5,5,"tierra","invocacion",[7,4,1],["gritoBatalla"],undefined,false));
			mazo.push(new Carta("DefensorDelBosque"+i,7,5,6,"tierra","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("DruidaArmaduraDeCorteza"+i,6,4,6,"tierra","invocacion",[7,27,1],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("DragonDeRocaBrillante"+i,7,5,7,"tierra","invocacion",[3,6,1],["defensor","finTurno"],undefined,false));
			mazo.push(new Carta("BestiaDescomunal"+i,8,8,8,"tierra","invocacion",undefined,["defensor"],undefined,false));
			mazo.push(new Carta("AntiguoDespertado"+i,9,9,10,"tierra","invocacion",[7,17,1],["defensor","gritoBatalla"],undefined,false));
			mazo.push(new Carta("TrepadorSombrio"+i,8,8,9,"tierra","invocacion",[7,15,2],["letalidad","ultimaVoluntad"],undefined,false));
			mazo.push(new Carta("Cultivar"+i,undefined,undefined,2,"tierra","hechizo",undefined,undefined,[4,0,1],false));
			mazo.push(new Carta("Reforzar"+i,undefined,undefined,2,"tierra","hechizo",undefined,undefined,[9,2,"defensor"],true));
			mazo.push(new Carta("Aplastar"+i,undefined,undefined,3,"tierra","hechizo",undefined,undefined,[1,5,4],true));
			mazo.push(new Carta("PoderInterior"+i,undefined,undefined,4,"tierra","hechizo",undefined,undefined,[2,4,1],true));
			mazo.push(new Carta("RaicesEspinosas"+i,undefined,undefined,4,"tierra","hechizo",undefined,undefined,[1,2,2],false));
			mazo.push(new Carta("CrecimientoAbrumador"+i,undefined,undefined,5,"tierra","hechizo",undefined,undefined,[4,0,2],false));
			mazo.push(new Carta("Revivir"+i,undefined,undefined,5,"tierra","hechizo",undefined,undefined,[8,1,12],true));
			mazo.push(new Carta("Terremoto"+i,undefined,undefined,6,"tierra","hechizo",undefined,undefined,[1,3,5],false));
			mazo.push(new Carta("ProclamacionDeVictoria"+i,undefined,undefined,6,"tierra","hechizo",undefined,undefined,[3,4,1],false));
			mazo.push(new Carta("Resurgir"+i,undefined,undefined,7,"aire","hechizo",undefined,undefined,[7,7,2],false));
			mazo.push(new Carta("DespertarDeLosAntiguos"+i,undefined,undefined,8,"tierra","hechizo",undefined,undefined,[5,4,1],false));
			mazo.push(new Carta("DefenderElBosque"+i,undefined,undefined,9,"tierra","hechizo",undefined,undefined,[2,1,4],false));
			mazo.push(new Carta("GuerreroArmado"+i,4,3,3,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("SerpienteRoja"+i,1,3,3,"vacio","invocacion",undefined,["veloz"],undefined,false));
			mazo.push(new Carta("CaballeroPesado"+i,3,3,4,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("ChamanOscuro"+i,5,5,5,"vacio","invocacion",undefined,["antimagia"],undefined,false));
			mazo.push(new Carta("CocodriloDelPantano"+i,5,4,5,"vacio","invocacion",[3,7,2],["finTurno"],undefined,false));
			mazo.push(new Carta("InvocadoraDeRefuerzos"+i,4,4,6,"vacio","invocacion",[3,12,1],["finTurno"],undefined,false));
			mazo.push(new Carta("AngelGuardian"+i,7,6,6,"vacio","invocacion",[4,7,2],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("LoxodonProtector"+i,5,5,6,"vacio","invocacion",undefined,["escudoDivino"],undefined,false));
			mazo.push(new Carta("SirvienteDeLaLuz"+i,4,4,7,"vacio","invocacion",undefined,["veloz","escudoDivino"],undefined,false));
			mazo.push(new Carta("DeidadPerdida"+i,6,4,7,"vacio","invocacion",[6,0,4],["gritoBatalla"],undefined,true));
			mazo.push(new Carta("GrokMartilloNegro"+i,3,7,7,"vacio","invocacion",[5,0,7],["antimagia","gritoBatalla"],undefined,true));
			mazo.push(new Carta("GiganteDespertado"+i,8,8,8,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("SirvienteDeLaOscuridad"+i,3,3,8,"vacio","invocacion",[5,7,1],["absorcionVital","gritoBatalla"],undefined,true));
			mazo.push(new Carta("LicantropoFeroz"+i,6,8,8,"vacio","invocacion",undefined,["oculto"],undefined,false));
			mazo.push(new Carta("GiganteEjecutor"+i,9,9,9,"vacio","invocacion",undefined,[],undefined,false));
			mazo.push(new Carta("GuerreroDelEspadon"+i,10,10,10,"vacio","invocacion",undefined,[],undefined,false));
		}
		mazo=_.shuffle(mazo);
		return mazo;
	}
	/*this.crearColeccionJuego=funcion(){
		coleccion.
	}*/
	this.agregarPartida=function(partida){
		this.partidas.push(partida);
	}
	this.crearPartida=function(nombre,usuario){
		var partida=new Partida(nombre);
		this.agregarPartida(partida);
		partida.asignarUsuario(usuario);
		partida.id=this.partidas.length-1;
		console.log("crearPartida: idPartida: "+partida.id);
		return partida.id;
	}	
	this.asignarPartida=function(nombre, usuario){
		var idPartida=-1;
		var partida=undefined;		
		for (var i=0;i<this.partidas.length;i++){
			if (this.partidas[i].nombre==nombre && this.partidas[i].fase.nombre=="inicial"){
				partida=this.partidas[i];
			}
		}
		if (partida){
			idPartida=partida.asignarUsuario(usuario);
		}
		console.log("asignarPartida: idPartida: "+idPartida);
		return idPartida;
	}

	//localhost:5000/buscarPartida/usrId
	this.buscarPartida=function(usuario){
		var existe;
		var idPartida;
		var json={"idPartida":-1,"creada":undefined,"nombre":undefined};
		existe=this.obtenerPartidasInicial();
		if(existe){
			//idPartida=usuario.asignarPartida(existe);
			idPartida=usuario.eligePartida(existe.nombre,usuario);
			json={"idPartida":idPartida,"creada":false,"nombre":existe.nombre};
		}else{
			var nombrePartida=(new Date().valueOf()).toString();
			idPartida=usuario.crearPartida(nombrePartida);
			json={"idPartida":idPartida,"creada":true,"nombre":nombrePartida};
		}
		console.log("buscarPartida: idPartida: "+json.idPartida+" creada: "+json.creada+" nombre: "+json.nombre);
		return json;
	}
	this.obtenerPartidasInicial=function(){
		return this.partidas.find(function(each){
			return each.fase.esInicial();
		}); 
	}
	this.obtenerPartidas=function(){
		return this.partidas;
	}
	this.eliminarPartida=function(partida){
		this.partidas.splice(this.partidas.indexOf(partida),1);
		console.log("partida eliminada: "+partida.nombre);
	}
    this.dao.conectar(function(db){
	 	console.log("conectado a la base de datos");
	});	
}


//******************************************
//Parte dedicada a la partida
//******************************************

function Partida(nombre){
	this.nombre=nombre;
	this.id=undefined;
	this.usuariosPartida=[];
	this.fase=new Inicial();
	//this.tablero=undefined;
	// this.crearTablero=function(){
	// 	this.tablero=new Tablero();
	// }
	this.asignarUsuario=function(usuario){
		// usuario.asignarPartida(this);
		// this.usuariosPartida.push(usuario);
		// this.tablero.asignarUsuario(usuario);
		// this.comprobarInicio();
		return this.fase.asignarUsuario(usuario,this);
		//this.puedeAsignarUsuario(usuario);
	}
	this.puedeAsignarUsuario=function(usuario){
		if(!usuario.Partida){
			usuario.asignarPartida(this);
			this.usuariosPartida.push(usuario);
			//this.tablero.asignarUsuario(usuario);
			this.comprobarInicio();
			console.log("puedeAsignarUsuario: this.id: "+this.id);
			return this.id;
		}
		console.log("puedeAsignarUsuario: this.id: -1");
		return -1;
	}
	this.comprobarInicio=function(){
		if (this.usuariosPartida.length==2){
			this.turnoInicial();
			this.asignarManoInicial();
			this.fase=new Jugando();
		}
	}
	this.asignarManoInicial=function(){
		for(var i=0;i<this.usuariosPartida.length;i++){
			this.usuariosPartida[i].manoInicial();
		}
	}
	this.turnoInicial=function(){
		var num=Math.round(Math.random());
		this.usuariosPartida[num].esMiTurno();

	}
	this.cambiarTurno=function(){
		for(var i=0;i<this.usuariosPartida.length;i++){
			this.usuariosPartida[i].cambiarTurno();
			//this.usuariosPartida[i].cartasFinTurno();
		}
	}
	this.quitarTurno=function(){
		for(var i=0;i<this.usuariosPartida.length;i++){
			this.usuariosPartida[i].turno=new NoMiTurno();
		}
	}
	this.finPartida=function(usr){
		console.log("La partida ha terminado");
		this.fase=new Final();
		this.quitarTurno();
		//this.eliminarPartida();
		for(var i=0;i<this.usuariosPartida.length;i++){
			this.usuariosPartida[i].mazo=[];
			//this.usuariosPartida[i].partida=undefined;
			//this.usuariosPartida[i]=undefined;
			//this.usuariosPartida[i].mazo=this.usuariosPartida[i].elegirMazoFuego(1);
			
			//this.usuariosPartida.pop(this.usuariosPartida[i]);
		}
		//this.usuariosPartida=[];
		//this.id=-1;
		usr.juego.eliminarPartida(this);
	}
	this.obtenerRival=function(usr){
		var i=this.usuariosPartida.indexOf(usr);
		var j=(i+1)%2;
		return this.usuariosPartida[j];
	}
	this.abandonarPartida=function(usr){
		this.fase.abandonarPartida(usr,this);
		//this.finPartida(usr);
	}
	//this.crearTablero();
}

function Inicial(){
	this.nombre="inicial";
	this.esInicial=function(){
		return true;
	}
	this.asignarUsuario=function(usr,partida){
		return partida.puedeAsignarUsuario(usr);
	}
	this.usrPasaTurno=function(usuario){
		console.log("La partida no ha comenzado");
	}
	this.usrAtaca=function(carta,obj,usuario){
		console.log("La partida no ha comenzado");
	}
	this.usrJugarCarta=function(carta,usuario){
		console.log("La partida no ha comenzado");
	}
	this.abandonarPartida=function(usr,partida){
		partida.finPartida(usr);
	}
}

function Jugando(){
	this.nombre="jugando";
	this.esInicial=function(){
		return false;
	}
	this.asignarUsuario=function(usr,partida){
		console.log("La partida ya tiene 2 jugadores");
	}
	this.usrPasaTurno=function(usuario){
		usuario.puedePasarTurno();
	}
	this.usrJugarCarta=function(carta,usuario){
		usuario.fasePuedeJugarCarta(carta);
	}
	this.usrAtaca=function(carta,objetivo,usuario){
		usuario.puedeAtacar(carta,objetivo);
	}
	this.abandonarPartida=function(usr,partida){
		partida.finPartida(usr);
	}
}

function Final(){
	this.nombre="final";
	this.esInicial=function(){
		return false;
	}
	this.asignarUsuario=function(usr,partida){
		console.log("La partida ha terminado");
	}	
	this.usrPasaTurno=function(usuario){
		console.log("La partida ya ha terminado");
	}
	this.usrAtaca=function(carta,obj,usuario){
		console.log("La partida ha terminado");
	}
	this.abandonarPartida=function(usr,partida){
		console.log('No se puede abandonar un partida que ha terminado');
		//partida.finPartida(usr);
	}
}


// function Tablero(){
// 	this.zonas=[];
// 	this.agregarZona=function(zona){
// 		this.zonas.push(zona);
// 	}
// 	this.crearZonas=function(){
// 		this.agregarZona(new Zona("arriba"));
// 		this.agregarZona(new Zona("abajo"));
// 	}
// 	this.asignarUsuario=function(usuario){
// 		for(var i=0;i<this.zonas.length;i++){
// 			if(this.zonas[i].libre){
// 				usuario.agregarZona(this.zonas[i]);
// 				this.zonas[i].libre=false;
// 				break;
// 			}
// 		}
// 	}
// 	this.crearZonas();
// }

// function Zona(nombre){
// 	this.nombre=nombre;
// 	this.ataque=[];
// 	this.mano=[];
// 	this.mazo=[];
// 	this.libre=true;
// 	this.agregarAtaque=function(carta){
// 		this.ataque.push(carta);
// 	}
// 	this.agregarMano=function(carta){
// 		this.mano.push(carta);
// 	}
// 	this.agregarMazo=function(mazo){
// 		this.mazo=mazo;
// 	}
// }



//******************************************
//Parte dedicada a los turnos
//******************************************

function MiTurno(){
	this.pasarTurno=function(usr){
		usr.partida.cambiarTurno();
	}
	this.jugarCarta=function(carta,usr){
		usr.puedeJugarCarta(carta);
	}
	this.cambiarTurno=function(usr){
		usr.turno=new NoMiTurno();
		//****Aqui cambiar el tema de elixir maximo
		//usr.elixir=usr.elixir+usr.consumido+1;
		usr.elixir=usr.elixir+usr.consumido;
		if(usr.elixir<10){
			usr.elixir++;
		}else{
			usr.elixir=10;
		}
		usr.consumido=0;
		usr.ponerNoHaAtacado();
		usr.condicionesFinTurno();
		usr.actualizarTextoCartas();
		//usr.cartasFinTurno();
	}
	this.meToca=function(){
		return true;
	}
	this.esMiTurno=function(usr){
		//usr.turno=new MiTurno();
		usr.cogerCarta();		
	}
	this.obtenerCartaMano=function(nombre,usr){
		return usr.puedeObtenerCartaMano(nombre);
	}
	this.puedeAtacar=function(carta,objetivo,usr){
		usr.atacaConCarta(carta,objetivo);
	}
}

function NoMiTurno(){
	this.esMiTurno=function(usr){
		console.log("Ahora te toca");
		usr.turno=new MiTurno();
		usr.cogerCarta();
	}
	this.pasarTurno=function(usr){
		console.log("No se puede pasar el turno si no se tiene");
	}
	this.jugarCarta=function(carta,usr){
		console.log("No es tu turno");
	}
	this.cambiarTurno=function(usr){
		//usr.turno=new MiTurno();
		this.esMiTurno(usr);
	}
	this.meToca=function(){
		return false;
	}
	this.obtenerCartaMano=function(nombre,usr){
		console.log("No te toca, no puedes jugar carta");
	}
	this.puedeAtacar=function(carta,objetivo,usr){
		console.log("No te toca, no puedes atacar");
	}
}

//******************************************
//Parte dedicada a los poderes elementales
//******************************************

function PoderElemental(nombre,clase,coste){
	this.nombre=nombre;
	this.clase=clase;
	this.coste=coste;

	this.activarEfecto=function(usuario){

	}
}


//******************************************
//Parte dedicada al usuario
//******************************************

function Usuario(nombre,id){
	this.nombre=nombre;
	this.id=id;
	this.juego=undefined;
	this.vidas=40;
	this.vidasMax=40;
	this.mazo=[];
	this.elixir=1;
	this.turno=new NoMiTurno();
	this.partida=undefined;
	this.consumido=0;
	this.idToken=-1;
	this.fatiga=0;
	this.elemento="Fuego";

	this.elegirMazoFuego=function(variante){
		if(variante=1){
			this.mazo=this.juego.crearMazoFuego1();
		}else if(variante=2){
			this.mazo=this.juego.crearMazoFuego2();
		}else if(variante=3){
			this.mazo=this.juego.crearMazoFuego3();
		}
		if(this.mazo){
			this.elemento="Fuego";
			return true;			
		}else{
			return false;
		}
	}

	this.elegirMazoAgua=function(variante){
		if(variante=1){
			this.mazo=this.juego.crearMazoAgua1();
		}else if(variante=2){
			this.mazo=this.juego.crearMazoAgua2();
		}else if(variante=3){
			this.mazo=this.juego.crearMazoAgua3();
		}
		if(this.mazo){
			this.elemento="Agua";
			return true;			
		}else{
			return false;
		}
	}

	this.elegirMazoTierra=function(variante){
		if(variante=1){
			this.mazo=this.juego.crearMazoTierra1();
		}else if(variante=2){
			this.mazo=this.juego.crearMazoTierra2();
		}else if(variante=3){
			this.mazo=this.juego.crearMazoTierra3();
		}
		if(this.mazo){
			this.elemento="Tierra";
			return true;			
		}else{
			return false;
		}
	}

	this.elegirMazoAire=function(variante){
		if(variante=1){
			this.mazo=this.juego.crearMazoAire1();
		}else if(variante=2){
			this.mazo=this.juego.crearMazoAire2();
		}else if(variante=3){
			this.mazo=this.juego.crearMazoAire3();
		}
		if(this.mazo){
			this.elemento="Aire";
			return true;
		}else{
			return false;
		}
	}

	this.obtenerElemento=function(){
		return this.elemento;
	}

	this.obtenerPartida=function(nombre){
		return this.partida.id;//this.juego.obtenerPartida(nombre,this);
	}
	this.asignarPartida=function(partida){
		this.partida=partida;
	}
	// this.agregarZona=function(zona){
	// 	this.zona=zona;
	// }
	this.crearPartida=function(nombre){
		return this.juego.crearPartida(nombre,this);
	}
	this.eligePartida=function(nombre){
		return this.juego.asignarPartida(nombre,this);
	}
	this.buscarPartida=function(){
		return this.juego.buscarPartida(this);
	}
	this.cambiarTurno=function(){
		this.turno.cambiarTurno(this);
	}
	this.pasarTurno=function(){
		this.partida.fase.usrPasaTurno(this);
		//this.turno.pasarTurno(this);
	}
	this.puedePasarTurno=function(){
		this.turno.pasarTurno(this);	
	}
	this.meToca=function(){
		return this.turno.meToca();
	}
	this.esMiTurno=function(){
		this.turno.esMiTurno(this);
		// this.turno=true;
		// this.cogerCarta();
		// this.elixir=this.consumido+1;
		// this.consumido=0;
	}
	this.cogerCarta=function(){
		var carta;
		//var partida=this.partida;
		carta= this.mazo.find(function(each){
			return each.posicion=="mazo";
		});
		//Solo puede haber max 10 cartas en mano
		if (carta){
			var cartasMano=this.obtenerCartasMano();
			if(cartasMano.length<10){
				carta.posicion="mano";
			}else{
				carta.posicion="cementerio";
			}
		}
		else //Si no quedan cartas en el mazo se obtiene 1 punto de daño por cada turno que no se tienen cartas en el mazo
		{
			this.fatiga++;
			this.vidas=this.vidas-this.fatiga;
			this.comprobarVidas();
			//this.partida.finPartida(this);
		}
	}
	this.fasePuedeJugarCarta=function(carta){
		this.turno.jugarCarta(carta,this);
	}
	this.jugarCarta=function(carta){
		this.partida.fase.usrJugarCarta(carta,this);
		//this.turno.jugarCarta(this,carta);
	}
	this.puedeJugarCarta=function(carta){
		if (this.elixir>=carta.coste){
			var cartasAtaque=this.obtenerCartasAtaque();
			if((carta.tipo=="invocacion" || carta.tipo=="token") && cartasAtaque.length<7){
				if(carta.tieneHabilidad("gritoBatalla") && (carta.existenObjetivosGrito(this))){
					carta.activarGritoBatalla(this);
					if(carta.posicion=="ataque"){
						//carta.propietario=this.id;
						carta.haAtacado=true;
						if(carta.tieneHabilidad("veloz")){
							carta.haAtacado=false;
						}
						this.elixir=this.elixir-carta.coste;
						this.consumido=this.consumido+carta.coste;
						this.comprobarUltimaVoluntad();
					}
				}
				else{
					carta.posicion="ataque";
					//carta.propietario=this.id;
					//En el turno en el que se juega la carta no puede atacar
					carta.haAtacado=true;
					if(carta.tieneHabilidad("veloz")){
						carta.haAtacado=false;
					}
					//carta.activarHabilidad(this);
					this.elixir=this.elixir-carta.coste;
					this.consumido=this.consumido+carta.coste;
				}				
			}else if(carta.tipo=="hechizo"){		
				if(carta.puedeHacerObjetivo()){
					carta.activarEfecto(this);
					if(carta.posicion=="cementerio" && this.vidas>0){
						this.elixir=this.elixir-carta.coste;
						this.consumido=this.consumido+carta.coste;
						this.comprobarUltimaVoluntad();
					}
					//carta.esUsado();
				}		
			}
			//carta.asignarUsuario(this);
		}else{			
			console.log("No tienes suficiente mana");
		}
		this.actualizarTextoCartas();
	}
	this.puedeAtacar=function(carta,objetivo){
		this.turno.puedeAtacar(carta,objetivo,this);/*
		if(!carta.haAtacado && carta.ataque!=0){
			objetivo.esAtacado(carta);
			carta.haAtacado=true;
			this.comprobarCartasAtaque();
		}else{
			console.log("Esta carta ya ha atacado o no puede atacar");
			this.comprobarCartasAtaque();
		}*/
	}

	this.atacaConCarta=function(carta,objetivo){
		var existenCartasConDefensor=this.existenCartasConDefensor();
		if(!carta.haAtacado && carta.ataque!=0 && (!existenCartasConDefensor || objetivo.tieneHabilidad("defensor")) && !objetivo.tieneHabilidad("oculto") && carta.turnosCongelado==0){
			//Habilidad de ataque doble
			if(carta.tieneHabilidad("ataqueDoble") && carta.numAtaques>0){
				carta.numAtaques--;
			}else{
				carta.haAtacado=true;
			}

			var rival=this.partida.obtenerRival(this);
			//Absorcion vital
			if(carta.tieneHabilidad("absorcionVital") && !objetivo.tieneHabilidad("escudoDivino")){
				carta.restaurarVidasObjetivo(this,carta.ataque);
			}
			if(objetivo.tieneHabilidad("absorcionVital") && !carta.tieneHabilidad("escudoDivino")){
				objetivo.restaurarVidasObjetivo(rival,objetivo.ataque);
			}
			//Intercambio de daño
			objetivo.esAtacado(carta);

			this.comprobarCartasAtaque();
			this.comprobarUltimaVoluntad();
			this.actualizarTextoCartas();
		}
		else{
			console.log("Esta carta ya ha atacado o no puede atacar");
			this.comprobarCartasAtaque();
		}
	}
	this.ataque=function(carta,objetivo){
		this.partida.fase.usrAtaca(carta,objetivo,this);
	}
	this.esAtacado=function(carta){
		this.vidas=this.vidas-carta.ataque;
		/*if(carta.tieneHabilidad("absorcionVital")){
			var rival=this.partida.obtenerRival(this);
			carta.restaurarVidasObjetivo(rival,carta.ataque);
		}*/
		if(carta.tieneHabilidad("oculto")){
			carta.quitarHabilidad("oculto");
		}
		this.comprobarVidas();
	}
	this.comprobarVidas=function(){
		if (this.vidas<=0){
			//this.partida.finPartida(this);
			//this.partida.finPartida(this);   
			this.abandonarPartida(); 		
		}
	}
	this.manoInicial=function(){
		for(var i=0;i<5;i++){
			this.cogerCarta();
		}if(!this.meToca()){
			this.cogerCarta();
		}
	}
	this.localizarCarta=function(coste){
		return this.mazo.find(function(each){
			return each.posicion=="mano" && each.coste==coste;
		});
	}
	this.obtenerUnaCarta=function(){
		return this.mazo.find(function(each){
			return each.posicion=="mano";
		});	
	}
	this.obtenerCartasMazo=function(){
		return this.mazo.filter(function(each){
			return each.posicion=="mazo";
		}); 
	}
	this.obtenerCartasMazoNombre=function(nombre){
		return this.mazo.filter(function(each){
			return each.posicion=="mazo" && each.nombre==nombre;
		}); 
	}
	this.obtenerCartasAtaque=function(){
		return this.mazo.filter(function(each){
			return each.posicion=="ataque";
		}); 
	}
	this.obtenerCartasAtaqueOculto=function(){
		return this.mazo.filter(function(each){
			return each.posicion=="ataque" && each.tieneHabilidad("oculto");
		}); 
	}
	this.obtenerCartasToken=function(){
		return this.mazo.filter(function(each){
			return (each.posicion=="ataque" && each.tipo=="token");
		}); 
	}
	this.obtenerCartasTokenMuerto=function(){
		return this.mazo.filter(function(each){
			return (each.posicion=="nada" && each.tipo=="token");
		}); 
	}
	this.darIdToken=function(){
		this.idToken=this.idToken+1;
		if(this.idToken>6){
			this.idToken=0;
		}
		return this.idToken;
	}
	//this.eliminarCartaMazo=function(carta){
	//	this.mazo.pop(carta);
	//}
	this.obtenerCartasCementerio=function(){
		return this.mazo.filter(function(each){
			return each.posicion=="cementerio";
		});
	}
	//Metodo necesario para activar la ultima voluntad de las cartas
	this.obtenerCartasCementerioUltVol=function(){
		return this.mazo.filter(function(each){
			return each.posicion=="cementerio" && each.ultVolActivada==false;
		});
	}
	this.obtenerInvocacionesCementerio=function(){
		return this.mazo.filter(function(each){
			return each.posicion=="cementerio" && each.tipo=="invocacion";
		});
	}
	this.obtenerHechizosCementerio=function(){
		return this.mazo.filter(function(each){
			return each.posicion=="cementerio" && each.tipo=="hechizo";
		});
	}
	this.obtenerCartaAtaqueNombre=function(nombre){
		return this.mazo.find(function(each){
			return each.posicion=="ataque" && each.nombre==nombre;
		});
	}	
	this.existenCartasConDefensor=function(){
		var rival=this.partida.obtenerRival(this);
		var cartasAtaqueRival=rival.obtenerCartasAtaque();
		for(var i=0;i<cartasAtaqueRival.length;i++){
			if(cartasAtaqueRival[i].tieneHabilidad("defensor")){
				return true;
			}
		}
		return false;
	}
	this.comprobarCartasAtaque=function(){
		var carta;
		var cartasAtaque;
		cartasAtaque=this.obtenerCartasAtaque();
		if (cartasAtaque){
			carta=cartasAtaque.find(function(each){
				return !each.haAtacado;
			});
			// if (carta==undefined){
			// 	this.pasarTurno();
			// 	this.ponerNoHaAtacado();
			// }
		}
	}
	this.comprobarUltimaVoluntad=function(){
		var rival;
		var cartasCementerioUltVol;
		var cartasCementerioUltVolRival;
		cartasCementerioUltVol=this.obtenerCartasCementerioUltVol();
		if (cartasCementerioUltVol){
			for(var i=0;i<cartasCementerioUltVol.length;i++){
				cartasCementerioUltVol[i].activarUltimaVoluntad(this);
			}
		}
		rival=this.partida.obtenerRival(this);
		cartasCementerioUltVolRival=rival.obtenerCartasCementerioUltVol();
		if (cartasCementerioUltVolRival){
			for(var i=0;i<cartasCementerioUltVolRival.length;i++){
				cartasCementerioUltVolRival[i].activarUltimaVoluntad(rival);
			}
		}
	}
	this.ponerNoHaAtacado=function(){
		_.each(this.obtenerCartasAtaque(),function(item){
			//item.haAtacado=false;
			if(item.tieneHabilidad("ataqueDoble")){
				item.numAtaques=1;
			}
			if(item.turnosCongelado>0){
				item.turnosCongelado--;
				//item.haAtacado=true;
			}else{
				item.haAtacado=false;
			}
		});
	}
	this.obtenerCartasMano=function(){
		return this.mazo.filter(function(each){
			return each.posicion=="mano";
		});
	}
	this.cartasFinTurno=function(){
		var cartasMano;
		cartasMano=this.obtenerCartasMano();
		if(cartasMano.length>10){
			for(var i=0;i<cartasMano.length-10;i++){
				this.descartarCarta(cartasMano[i]);
			}
		}
	}
	this.descartarCarta=function(carta){
		carta.posicion="cementerio";
		carta.establecerDatosBase();
		if(carta.tieneHabilidad("ultimaVoluntad")){
			carta.ultVolActivada=true;
		}
	}
	this.obtenerCartaMano=function(nombre){
		return this.turno.obtenerCartaMano(nombre,this);
	}
	this.puedeObtenerCartaMano = function(nombre){
        return carta=this.mazo.find(function(each){
			return each.posicion=="mano" && each.nombre==nombre;
		});	
    }
    this.puedeObtenerCartaMazo = function(nombre){
        return carta=this.mazo.find(function(each){
			return each.posicion=="mazo" && each.nombre==nombre;
		});	
    }
    this.obtenerDatosRival=function(){
    	var json={"elixir":-1,"cartas":[],"vidas":-1,"mano":[],"cementerio":[],"elemento":"Fuego","mazo":[]};
    	if(this.partida){
    		var rival=this.partida.obtenerRival(this);
			if (rival){
				json={"elixir":rival.elixir,"cartas":rival.obtenerCartasAtaque(),"vidas":rival.vidas,"mano":rival.obtenerCartasMano(),"cementerio":rival.obtenerCartasCementerio(),"elemento":rival.obtenerElemento(), "mazo":rival.obtenerCartasMazo()};
			}
    	}
    	return json;

    }
    this.rivalTeToca=function(){
    	var rival=this.partida.obtenerRival(this);
    	return rival.meToca();
    }
    this.ataqueConNombre=function(idCarta1,idCarta2){
    	var carta=this.obtenerCartaAtaqueNombre(idCarta1);
    	var rival=this.partida.obtenerRival(this);
    	var objetivo=rival.obtenerCartaAtaqueNombre(idCarta2);
    	this.ataque(carta,objetivo);
    	var json={"carta":carta,"objetivo":objetivo,"fase":this.partida.fase.nombre};
    	return json;
    }
    this.atacarRivalConNombre=function(idCarta1){
    	var carta=this.obtenerCartaAtaqueNombre(idCarta1);
    	var rival=this.partida.obtenerRival(this);
    	this.ataque(carta,rival);
    	if(this.partida){
    		var json={"carta":carta,"vidas":rival.vidas,"fase":this.partida.fase.nombre};
    		return json;
    	}
    	
    }
    this.abandonarPartida=function(){
    	if (this.partida){   
    		var rival=this.partida.obtenerRival(this); 		
    		this.partida.abandonarPartida(this);  
    		rival.partida.abandonarPartida(this);   		 		
    	}
    }
    this.tieneHabilidad=function(habilidad){
    	return false;
    }
    this.seleccionaObjetivoCarta=function(carta,cartaObjetivo){
    	carta.objetivo=cartaObjetivo;
    }
    this.actualizarTextoCartas=function(){
    	var cartasAtaqueUsuario=this.obtenerCartasAtaque();
		for(var i=0;i<cartasAtaqueUsuario.length;i++){
			cartasAtaqueUsuario[i].texto=cartasAtaqueUsuario[i].mostrarTexto();
		}
		var rival=this.partida.obtenerRival(this);
		var cartasAtaqueRival=rival.obtenerCartasAtaque();
		for(var i=0;i<cartasAtaqueRival.length;i++){
			cartasAtaqueRival[i].texto=cartasAtaqueRival[i].mostrarTexto();
		}
    }
    this.condicionesFinTurno=function(){
    	var cartasAtaqueUsuario=this.obtenerCartasAtaque();
    	if(cartasAtaqueUsuario){
    		for(var i=0;i<cartasAtaqueUsuario.length;i++){
	    		if(cartasAtaqueUsuario[i].tieneHabilidad("finTurno")){
	    			cartasAtaqueUsuario[i].activarHabilidad(this);
	    		}
    			cartasAtaqueUsuario[i].retirarEfectosTurno();
    		}
    	}
    	//Para retirar los efectos que hagan objetivo a una carta del rival con un "hasta el final del turno"
    	var rival=this.partida.obtenerRival(this);
    	var cartasAtaqueRival=rival.obtenerCartasAtaque();
    	if(cartasAtaqueRival){
	    	for(var i=0;i<cartasAtaqueRival.length;i++){
	    		/*if(castasAtaque[i].tieneHabilidad("finTurno")){
	    			cartasAtaque[i].activarHabilidad(this);
	    			//cartasAtaque[i].
	    		}*/
	    		cartasAtaqueRival[i].retirarEfectosTurno();
	    	}
	    }
	    this.comprobarUltimaVoluntad();
    }
/*
    this.habilidadesComienzoTurno=function(){
    	var cartas=this.obtenerCartasAtaque();
    	for(var i=0;i<cartas.length;i++){

    	}
    }*/
}




//******************************************
//Parte dedicada a las cartas
//******************************************
/*
function Carta(nombre,vidas,ataque,coste){
	this.vidas=vidas;
	this.ataque=ataque;
	this.nombre=nombre;
	this.coste=coste;
	this.posicion="mazo";
	this.haAtacado=false;
	this.tipo="invocacion";
	//Si tiene habilidad se le asigna una
	this.habilidad=undefined;
	this.esAtacado=function(carta){
		this.vidas=this.vidas-carta.ataque;
		carta.vidas=carta.vidas-this.ataque;
		this.comprobarVidas();
		carta.comprobarVidas();
	}
	this.comprobarVidas=function(){
		if (this.vidas<=0){
			this.posicion="cementerio";
		}
	}

	//Incluir aqui las habilidades que existan para las cartas
}*/

function Carta(nombre,vidas,ataque,coste,clase,tipo,habilidad,tipoHabilidad,efecto,tieneObjetivos){
	this.vidas=vidas;
	this.vidasMax=vidas;
	this.ataque=ataque;
	this.nombre=nombre;
	this.coste=coste;
	this.clase=clase;
	this.posicion="mazo";
	this.haAtacado=false;
	this.tipo=tipo;
	this.habilidad=habilidad;
	this.tipoHabilidad=tipoHabilidad;		//Valores posibles:"veloz","gritoBatalla","ultimaVoluntad",
											//"escudoDivino","antimagia" "congelar","inspirar","absorcionVital"
											//"letalidad","defensor","oculto", "finTurno"
								//pueden hacerse tambien "provocar","sigilo" solamente mirando el objetivo y comprobando el tipoHabilidad

	this.estado="sinJugar";		//PENDIENTE	Valores posibles: "sinJugar","enMesa","comienzoTurno","finTurno","atacando","atacada","alCementerio"
	this.efecto=efecto;
	this.objetivo=undefined;
	this.tieneObjetivos=tieneObjetivos;
	this.tipoObjetivo=undefined;  //Valores posibles: "rival","cartaRival","cartaJugador","jugador","sinObjetivo"

	this.numAtaques=undefined;
	this.turnosCongelado=0;
	this.ultVolActivada=undefined;

	//Variables para conservar los datos originales de las invocaciones
	this.vidasBase=vidas;
	this.ataqueBase=ataque;
	this.costeBase=coste;
	this.tipoHabilidadBase=tipoHabilidad;
	//this.tipoHabilidadBase=this.tipoHabilidad;

	//Datos para indicar que deben ser devueltas las estadisticas previas a un efecto
	this.vidasAux=0;
	this.ataqueAux=0;
	this.costeAux=0;
	this.tipoHabilidadAux=[];

	//Usuario necesario para usar la ultimaVoluntad
	this.propietario=undefined;

	//this.asignarUsuario=function(usuario){
	//	this.usuario=usuario;
	//}

	//Funcion para establecer los datos de una carta a sus originales
	this.establecerDatosBase=function(){
		this.vidas=this.vidasBase;
		this.vidasMax=this.vidasBase;
		this.ataque=this.ataqueBase;
		this.coste=this.costeBase;
		this.tipoHabilidad=this.tipoHabilidadBase;
		this.turnosCongelado=0;
		this.haAtacado=true;
	}

	//Funcion para retirar los efectos del tipo "hasta el final del turno"
	this.retirarEfectosTurno=function(){
		//Parte para el ataque
		this.ataque=this.ataque-this.ataqueAux;
		//Parte para las habilidades agregadas
		for(var i=0;i<this.tipoHabilidadAux.length;i++){
			this.quitarHabilidad(this.tipoHabilidadAux[i]);
		}
		//Reestablecemos los valores para el siguiente turno
		this.vidasAux=0;
		this.ataqueAux=0;
		this.costeAux=0;
		this.tipoHabilidadAux=[];
	}


	//Metodo que registra el daño que recibe cada carta cuando se atacan
	//Se tiene en cuenta los casos de escudo divino, absorcion vital, letalidad y oculto
	this.esAtacado=function(carta){
		//Caso de que ninguna de las dos cartas tenga escudo divino
		if(!this.tieneHabilidad("escudoDivino") && !carta.tieneHabilidad("escudoDivino")){
			//Casos en que se tenga la habilidad de letalidad
			if(this.tieneHabilidad("letalidad") && carta.tieneHabilidad("letalidad")){
				this.vidas=0;
				carta.vidas=0;
			}else if(!this.tieneHabilidad("letalidad") && carta.tieneHabilidad("letalidad")){
				this.vidas=0;
				carta.vidas=carta.vidas-this.ataque;
			}else if(this.tieneHabilidad("letalidad") && !carta.tieneHabilidad("letalidad")){
				this.vidas=this.vidas-carta.ataque;
				carta.vidas=0;
			}//Comprobacion de las habilidades de congelar
			else{
				if(this.tieneHabilidad("congelar") && carta.tieneHabilidad("congelar")){
					this.turnosCongelado=1;
					carta.turnosCongelado=1;
				}else if(this.tieneHabilidad("congelar") && !carta.tieneHabilidad("congelar")){
					carta.turnosCongelado=1;
				}else if(!this.tieneHabilidad("congelar") && carta.tieneHabilidad("congelar")){
					this.turnosCongelado=1;
				}
				this.vidas=this.vidas-carta.ataque;
				carta.vidas=carta.vidas-this.ataque;
			}			
			this.comprobarVidas();
			carta.comprobarVidas();
		}//Caso de que las dos cartas tengan escudoDivino	
		else if(this.tieneHabilidad("escudoDivino") && carta.tieneHabilidad("escudoDivino")){
			this.quitarHabilidad("escudoDivino");
			carta.quitarHabilidad("escudoDivino");
		}//Caso de que la primera tenga escudo divino y la segunda no
		else if(this.tieneHabilidad("escudoDivino") && !carta.tieneHabilidad("escudoDivino")){
			if(this.tieneHabilidad("letalidad")){
				carta.vidas=0;
			}else{
				if(this.tieneHabilidad("congelar")){
					carta.turnosCongelado=1;
				}
				carta.vidas=carta.vidas-this.ataque;
			}
			this.quitarHabilidad("escudoDivino");
			carta.comprobarVidas();
		}//Caso de que la primera no tenga escudo divino y la segunda si
		else if(!this.tieneHabilidad("escudoDivino") && carta.tieneHabilidad("escudoDivino")){
			if(carta.tieneHabilidad("letalidad")){
				this.vidas=0;
			}else{
				if(carta.tieneHabilidad("congelar")){
					this.turnosCongelado=1;
				}
				this.vidas=this.vidas-carta.ataque;
			}
			carta.quitarHabilidad("escudoDivino");
			this.comprobarVidas();
		}

		//Comprobacion de habilidad de "oculto": si la carta que ataque tiene esta habilidad, la pierde
		if(carta.tieneHabilidad("oculto")){
			carta.quitarHabilidad("oculto");
		}		
	}

	this.comprobarVidas=function(){
		if (this.vidas<=0 && this.tipo=="invocacion"){
			if(this.tieneHabilidad("ultimaVoluntad")){
				this.ultVolActivada=false;
				//this.activarUltimaVoluntad();
			}
			this.posicion="cementerio";
			this.establecerDatosBase();
		}
		else if(this.vidas<=0 && this.tipo=="token"){
			if(this.tieneHabilidad("ultimaVoluntad")){
				this.ultVolActivada=false;
				//this.activarUltimaVoluntad();
			}
			this.posicion="nada";
			this.establecerDatosBase();
		}
	}


	this.setVidas=function(vidas){
		this.vidas=vidas;
		this.vidasMax=this.vidasMax+vidas;
	}
	this.getVidas=function(){
		return this.vidas;
	}
	this.setAtaque=function(ataque){
		this.ataque=ataque;
	}
	this.getAtaque=function(){
		return this.ataque;
	}
	this.setCoste=function(coste){
		this.coste=coste;
	}
	this.getCoste=function(){
		return this.coste;
	}
	this.setEstado=function(estado){
		this.estado=estado;
	}
	this.getEstado=function(){
		return this.estado;
	}
/*
	this.getObjetivoRivalAleatorio=function(usuario){
		var rival=usuario.partida.obtenerRival(usuario);
		var cartasAtaqueRival=rival.obtenerCartasAtaque();
		var indice=0;
		indice=Math.floor((Math.random() * (cartasAtaqueRival.length+1)) + 0);
		if(indice>cartasAtaqueRival.length){
			return rival;
		}else{
			return cartasAtaqueRival[indice];
		}
	}
	this.getCartaRivalAleatoria=function(usuario){
		var rival=usuario.partida.obtenerRival(usuario);
		var cartasAtaqueRival=rival.obtenerCartasAtaque();
		var indice=0;
		indice=Math.floor((Math.random() * (cartasAtaqueRival.length)) + 0);
		return cartasAtaqueRival[indice];
	}
*/
//Habilidades de las invocaciones

	this.getHabilidades=function(){
		return this.tipoHabilidad;
	}
	this.quitarHabilidad=function(tipoHabilidad){
		var indiceHabilidad=this.tipoHabilidad.indexOf(tipoHabilidad);
		if(indiceHabilidad > -1){
			this.tipoHabilidad.splice(indiceHabilidad,1);
		}
		//this.tipoHabilidad.pop(tipoHabilidad);
	}
	//Agrega una habilidad extra, en caso de tenerla se queda igual
	this.insertarHabilidad=function(tipoHabilidad){
		if(!this.tieneHabilidad(tipoHabilidad)){
			this.tipoHabilidad.unshift(tipoHabilidad);
		}		
	}
	//Funcion para comprobar si la carta puede hacer objetivo, no pudiendo en el caso de que la carta tenga antimagia u oculto
	this.puedeHacerObjetivo=function(){
		if(!this.tieneObjetivos){
			return true
		}
		else if(this.tipoObjetivo=="cartaRival" || this.tipoObjetivo=="cartaJugador"){
			if(this.objetivo.tieneHabilidad("antimagia") || (this.objetivo.tieneHabilidad("oculto"))){
				return false;
			}
		}
		return true;
	}

	this.existenObjetivosGrito=function(usuario){
		//console.log(usuario.nombre);
		if(this.habilidad!=undefined){
			if(this.habilidad[0]==4){
				var cartasAtaque=usuario.obtenerCartasAtaque();
				var cartasAtaqueOculto=usuario.obtenerCartasAtaqueOculto();
				if(cartasAtaque.length>0 && cartasAtaque.length>cartasAtaqueOculto.length){
					return true;
				}else{
					return false;
				}
			}else if(this.habilidad[0]==5){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				var cartasAtaqueOculto=rival.obtenerCartasAtaqueOculto();
				if(cartasAtaqueRival.length>0 && cartasAtaqueRival.length>cartasAtaqueOculto.length){
					return true;
				}else{
					return false;
				}
			}else{
				return true;
			}
		}else{
			return false;
		}
	}

	this.restaurarVidasObjetivo=function(objetivo,X){
		objetivo.vidas=objetivo.vidas+X;
		if(objetivo.vidas>objetivo.vidasMax){
			objetivo.vidas=objetivo.vidasMax;
		}
	}

	this.tieneHabilidad=function(habilidad){
		if(this.tipoHabilidad){
			for(var i=0;i<this.tipoHabilidad.length;i++){
				if(this.tipoHabilidad[i]==habilidad){
					return true;
				}
			}
		}
		return false;
	}

	this.activarUltimaVoluntad=function(usuario){
		this.activarGritoBatalla(usuario);
		this.ultVolActivada=true;
		this.posicion="cementerio";
	}

	this.activarHabilidad=function(usuario){
		/*
		//[0,_,_] -> habilidad de atacar en el turno que se juega = "veloz"
		if(this.habilidad[0]==0){
			//[0,0,X] -> mientras
			if(this.habilidad[1]==0){
				haAtacado=false;
			}
			//[0,1,X] -> mientras que la carta esté en el campo, las invocaciones aliadas reciben "veloz" PENDIENTE
			if(this.habilidad[1]==1){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
					for(var i=0;i<cartasAtaqueUsuario.length;i++){
					cartasAtaqueUsuario[i].haAtacado=false;
				}
			}			
		}
		*/

		//[3,_,_] -> habilidades que se activan al final del turno
		if(this.habilidad[0]==3){
			//[3,0,X] -> Da escudo divino a una invocacion aliada aleatoria
			if(this.habilidad[1]==0){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				var cartasSinEscudoDivino=[];
				var indice=0;
				if(cartasAtaqueUsuario.length!=0){
					//console.log("cartas ataque: "+cartasAtaqueUsuario);	
					for(var i=0;i<cartasAtaqueUsuario.length;i++){
						//console.info("tiene escudo: "+cartasAtaqueUsuario[i].tieneHabilidad("escudoDivino"));
						if(!cartasAtaqueUsuario[i].tieneHabilidad("escudoDivino") && cartasAtaqueUsuario[i]!=this){
							cartasSinEscudoDivino.push(cartasAtaqueUsuario[i]);
						}
					}
					//console.log("cartasSinEscudoDivino: "+cartasSinEscudoDivino.length);
					if(cartasSinEscudoDivino.length!=0){
						//cartasSinEscudoDivino.pop(this);
						indice=Math.floor((Math.random() * (cartasSinEscudoDivino.length)) + 0);
						if(cartasSinEscudoDivino[indice]!=undefined){
							cartasSinEscudoDivino[indice].insertarHabilidad("escudoDivino");
						}else{
							this.activarHabilidad(usuario);
						}
					}		
				}
			}
			//[3,1,X] -> Da +X de ataque a otra invocacion aliada
			else if(this.habilidad[1]==1){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				var restoCartas=[];
				var indice=0;
				if(cartasAtaqueUsuario!=0){
					//console.log("cartas ataque: "+cartasAtaqueUsuario);	
					for(var i=0;i<cartasAtaqueUsuario.length;i++){
						//console.info("tiene escudo: "+cartasAtaqueUsuario[i].tieneHabilidad("escudoDivino"));
						if(cartasAtaqueUsuario[i]!=this){
							restoCartas.push(cartasAtaqueUsuario[i]);
						}
					}
					if(restoCartas.length!=0){
						indice=Math.floor((Math.random() * (restoCartas.length)) + 0);
						restoCartas[indice].setAtaque(restoCartas[indice].ataque+this.habilidad[2]);		
					}
				}
			}
			//[3,2,X] -> Da +X de salud a otra invocacion aliada 
			else if(this.habilidad[1]==2){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				var restoCartas=[];
				var indice=0;
				if(cartasAtaqueUsuario!=0){
					//console.log("cartas ataque: "+cartasAtaqueUsuario);	
					for(var i=0;i<cartasAtaqueUsuario.length;i++){
						//console.info("tiene escudo: "+cartasAtaqueUsuario[i].tieneHabilidad("escudoDivino"));
						if(cartasAtaqueUsuario[i]!=this){
							restoCartas.push(cartasAtaqueUsuario[i]);
						}
					}
					if(restoCartas.length!=0){
						indice=Math.floor((Math.random() * (restoCartas.length)) + 0);
						restoCartas[indice].setVidas(restoCartas[indice].vidas+this.habilidad[2]);	
						restoCartas[indice].vidasMax=cartasAtaqueUsuario[indice].vidasMax+habilidad[2];	
					}
				}
			}

			//[3,3,X] -> Da +X de ataque a todas las demas invocaciones aliadas
			else if(this.habilidad[1]==3){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					if(cartasAtaqueUsuario[i]!=this){
						cartasAtaqueUsuario[i].ataque=cartasAtaqueUsuario[i].ataque+habilidad[2];
					}					
				}
			}

			//[3,4,X] -> Da +X de salud a todas las demas invocaciones aliadas
			else if(this.habilidad[1]==4){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					if(cartasAtaqueUsuario[i]!=this){
						cartasAtaqueUsuario[i].vidas=cartasAtaqueUsuario[i].vidas+habilidad[2];
						cartasAtaqueUsuario[i].vidasMax=cartasAtaqueUsuario[i].vidasMax+habilidad[2];
					}							
				}
			}

			//[3,5,X] -> Da +X/+X a todas las demas invocaciones aliadas
			if(this.habilidad[1]==5){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					if(cartasAtaqueUsuario[i]!=this){
						cartasAtaqueUsuario[i].cambiarAtaqueVidas(habilidad[2]);
					}
				}
			}

			//[3,6,X] -> Roba X cartas
			else if(this.habilidad[1]==6){
				for(var i=0;i<habilidad[2];i++){
					var cartasMano=usuario.obtenerCartasMano();
					usuario.cogerCarta();
				}
			}

			//[3,7,X] -> Hace X daños a una invocacion rival aleatoria
			else if(this.habilidad[1]==7){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				var indice=Math.floor((Math.random() * (cartasAtaqueRival.length)) + 0);
				if(cartasAtaqueRival.length!=0){
					if(cartasAtaqueRival[indice]!=undefined){
						indice=Math.floor((Math.random() * (cartasAtaqueRival.length)) + 0);
						if(!cartasAtaqueRival[indice].tieneHabilidad("escudoDivino")){
							cartasAtaqueRival[indice].vidas=cartasAtaqueRival[indice].vidas-this.habilidad[2];
							cartasAtaqueRival[indice].comprobarVidas();
						}else{
							cartasAtaqueRival[indice].quitarHabilidad("escudoDivino");
						}	
					}else{
						this.activarHabilidad(usuario);
					}
				}				
			}

			//[3,8,X] -> Hace X daños al rival
			else if(this.habilidad[1]==8){
				var rival=usuario.partida.obtenerRival(usuario);
				rival.vidas=rival.vidas-habilidad[2];
				rival.comprobarVidas();
			}

			//[3,9,X] -> Hace X daños a todas las invocaciones enemigas
			else if(this.habilidad[1]==9){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueRival.length;i++){
					console.log(cartasAtaqueRival.length);
					if(!cartasAtaqueRival[i].tieneHabilidad("escudoDivino")){
						cartasAtaqueRival[i].vidas=cartasAtaqueRival[i].vidas-this.habilidad[2];
						cartasAtaqueRival[i].comprobarVidas();
					}else{
						cartasAtaqueRival[i].quitarHabilidad("escudoDivino");
					}
				}
			}
			//[3,10,X] -> Restaura X de salud al jugador
			else if(this.habilidad[1]==10){
				this.restaurarVidasObjetivo(usuario,this.habilidad[2]);
			}
			//[3,11,X] -> Restaura X de salud a todas las invocaciones aliadas
			else if(this.habilidad[1]==11){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					this.restaurarVidasObjetivo(cartasAtaqueUsuario[i],this.habilidad[2]);
				}
			}
			//[3,12,X] -> Invoca 1 token X/X
			else if(this.habilidad[1]==12){
				this.invocarToken(usuario,1,this.habilidad[2]);
			}
			//[3,13,X] -> Hace X daños a todas las demás invocaciones
			else if(this.habilidad[1]==13){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueRival.length;i++){
					if(!cartasAtaqueRival[i].tieneHabilidad("escudoDivino")){
						cartasAtaqueRival[i].vidas=cartasAtaqueRival[i].vidas-this.habilidad[2];
						cartasAtaqueRival[i].comprobarVidas();
					}else{
						cartasAtaqueRival[i].quitarHabilidad("escudoDivino");
					}
				}
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					if(cartasAtaqueUsuario[i]!=this){
						if(!cartasAtaqueUsuario[i].tieneHabilidad("escudoDivino")){
							cartasAtaqueUsuario[i].vidas=cartasAtaqueUsuario[i].vidas-this.habilidad[2];
							cartasAtaqueUsuario[i].comprobarVidas();
						}else{
							cartasAtaqueUsuario[i].quitarHabilidad("escudoDivino");
						}
					}					
				}	
			}
			//[3,14,X] -> Hace X daños a todos
			else if(this.habilidad[1]==14){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueRival.length;i++){
					if(!cartasAtaqueRival[i].tieneHabilidad("escudoDivino")){
						cartasAtaqueRival[i].vidas=cartasAtaqueRival[i].vidas-this.habilidad[2];
						cartasAtaqueRival[i].comprobarVidas();
					}else{
						cartasAtaqueRival[i].quitarHabilidad("escudoDivino");
					}
				}
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					if(cartasAtaqueUsuario[i]!=this){
						if(!cartasAtaqueUsuario[i].tieneHabilidad("escudoDivino")){
							cartasAtaqueUsuario[i].vidas=cartasAtaqueUsuario[i].vidas-this.habilidad[2];
							cartasAtaqueUsuario[i].comprobarVidas();
						}else{
							cartasAtaqueUsuario[i].quitarHabilidad("escudoDivino");
						}
					}					
				}
				usuario.vidas=usuario.vidas-this.habilidad[2];
				usuario.comprobarVidas();
				rival.vidas=rival.vidas-this.habilidad[2];
				rival.comprobarVidas();
			}
		}		
	}

	this.activarGritoBatalla=function(usuario){
		//[4,_,_] -> habilidades de grito de batalla con objetivo carta jugador
		if(this.habilidad[0]==4){
			//[4,0,X] -> Da +X/+X a la invocacion aliada objetivo
			if(this.habilidad[1]==0 && this.tipoObjetivo=="cartaJugador"){
				this.objetivo.cambiarAtaqueVidas(this.habilidad[2]);
				this.posicion="ataque";
			}
			//[4,1,X] -> Da +X/+0 a la invocacion aliada objetivo
			else if(this.habilidad[1]==1 && this.tipoObjetivo=="cartaJugador"){				
				this.objetivo.setAtaque(this.objetivo.ataque+this.habilidad[2]);
				this.posicion="ataque";
			}
			//[4,2,X] -> Da +X/+0 a la invocacion aliada objetivo hasta el final del turno
			else if(this.habilidad[1]==2 && this.tipoObjetivo=="cartaJugador"){				
				this.objetivo.setAtaque(this.objetivo.ataque+this.habilidad[2]);
				this.objetivo.ataqueAux=this.objetivo.ataqueAux+this.habilidad[2];
				this.posicion="ataque";
			}
			//[4,3,X] -> Da +0/+X a la invocacion aliada objetivo
			else if(this.habilidad[1]==3 && this.tipoObjetivo=="cartaJugador"){				
				this.objetivo.setVidas(this.objetivo.vidas+this.habilidad[2]);
				this.posicion="ataque";
			}
			//[4,4,X] -> Da escudo divino a una invocacion aliada objetivo
			else if(this.habilidad[1]==4 && this.tipoObjetivo=="cartaJugador"){				
				this.objetivo.insertarHabilidad("escudoDivino");
				this.posicion="ataque";
			}
			//[4,5,X] -> Da antimagia a una invocacion aliada objetivo
			if(this.habilidad[1]==5 && this.tipoObjetivo=="cartaJugador"){				
				this.objetivo.insertarHabilidad("antimagia");
				this.posicion="ataque";
			}
			//[4,6,X] -> Restaura X de salud a la invocacion aliada objetivo
			else if(this.habilidad[1]==6 && this.tipoObjetivo=="cartaJugador"){				
				this.restaurarVidasObjetivo(this.objetivo,habilidad[2]);
				this.posicion="ataque";
			}		
			//[4,7,X] -> devuelve la invocacion aliada a la mano del jugador
			else if(this.habilidad[1]==7 && this.tipoObjetivo=="cartaJugador"){
				var cartasMano=usuario.obtenerCartasMano();
				if(cartasMano.length<10){
					this.objetivo.posicion="mano";
					this.objetivo.establecerDatosBase();
				}else{
					if(this.objetivo.tipo=="token"){
						this.objetivo.posicion="nada";
						this.objetivo.establecerDatosBase();
					}else{
						this.objetivo.posicion="cementerio";
						this.objetivo.establecerDatosBase();
					}					
				}
				this.posicion="ataque";
			}
		}

		//[5,_,_] -> habilidades de grito de batalla con objetivo carta rival
		else if(this.habilidad[0]==5){
			//[5,0,X] -> hace X de daño a la invocacion rival
			if(this.habilidad[1]==0 && this.tipoObjetivo=="cartaRival"){
				if(!this.objetivo.tieneHabilidad("escudoDivino")){
					this.objetivo.vidas=this.objetivo.vidas-this.habilidad[2];
					this.objetivo.comprobarVidas();
				}else{
					this.objetivo.quitarHabilidad("escudoDivino");
				}
				this.posicion="ataque";
			}

			//[5,1,X] -> hace X de daño a la invocacion rival, donde X es el ataque de la invocacion con grito
			else if(this.habilidad[1]==1 && this.tipoObjetivo=="cartaRival"){
				if(!this.objetivo.tieneHabilidad("escudoDivino")){
					this.objetivo.vidas=this.objetivo.vidas-this.ataque;
					this.objetivo.comprobarVidas();
				}else{
					this.objetivo.quitarHabilidad("escudoDivino");
				}
				this.posicion="ataque";
			}

			//[5,2,X] -> hace X de daño a la invocacion rival, donde X es el número de cartas en mano
			else if(this.habilidad[1]==2 && this.tipoObjetivo=="cartaRival"){
				var cartasMano=usuario.obtenerCartasMano();
				if(!this.objetivo.tieneHabilidad("escudoDivino")){
					this.objetivo.vidas=this.objetivo.vidas-cartasMano.length;
					this.objetivo.comprobarVidas();
				}else{
					if(cartasMano.length>0){
						this.objetivo.quitarHabilidad("escudoDivino");
					}
				}
				this.posicion="ataque";
			}

			//[5,3,X] -> devuelve la invocacion rival a la mano del rival
			else if(this.habilidad[1]==3 && this.tipoObjetivo=="cartaRival"){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasMano=rival.obtenerCartasMano();
				if(cartasMano.length<10){
					this.objetivo.posicion="mano";
					this.objetivo.establecerDatosBase();
				}else{
					if(this.objetivo.tipo=="token"){
						this.objetivo.posicion="nada";
						this.objetivo.establecerDatosBase();
					}else{
						this.objetivo.posicion="cementerio";
						this.objetivo.establecerDatosBase();
					}					
				}
				this.posicion="ataque";
			}

			//[5,4,X]

			//[5,5,X] -> reduce el ataque de la carta rival a X
			else if(this.habilidad[1]==5 && this.tipoObjetivo=="cartaRival"){
				this.objetivo.setAtaque(habilidad[2]);
				this.posicion="ataque";
			}

			//[5,6,X] -> reduce las vidas de la carta rival a X
			else if(this.habilidad[1]==6 && this.tipoObjetivo=="cartaRival"){
				this.objetivo.setVidas(habilidad[2]);
				this.posicion="ataque";
			}

			//[5,7,X] -> destruye la carta rival
			else if(this.habilidad[1]==7 && this.tipoObjetivo=="cartaRival"){
				this.objetivo.vidas=0;
				this.objetivo.comprobarVidas();
				this.posicion="ataque";
			}

			//[5,8,X] -> intercambia las estadisticas con la carta rival (ataque y vidas)
			else if(this.habilidad[1]==8 && this.tipoObjetivo=="cartaRival"){
				var ataqueCartaR=this.objetivo.ataque;
				var vidasCartaR=this.objetivo.vidas;
				var ataqueCarta=this.ataque;
				var vidasCarta=this.vidas;
				this.setVidas(ataqueCartaR);
				this.setAtaque(vidasCartaR);
				this.objetivo.setVidas(vidasCarta);
				this.objetivo.setAtaque(ataqueCarta);
				this.posicion="ataque";
			}
		}

		//[6,_,_] -> habilidades de grito de batalla con cualquier objetivo
		else if(this.habilidad[0]==6){
			//[6,0,X] -> hace X de daño al objetivo
			if(this.habilidad[1]==0){
				if(this.tipoObjetivo=="jugador"){
					usuario.vidas=usuario.vidas-this.habilidad[2];
					usuario.comprobarVidas();
				}else if(this.tipoObjetivo=="rival"){
					var rival=usuario.partida.obtenerRival(usuario);
					rival.vidas=rival.vidas-this.habilidad[2];
					rival.comprobarVidas();
				}else if(this.tipoObjetivo=="cartaJugador" || this.tipoObjetivo=="cartaRival"){
					if(!this.objetivo.tieneHabilidad("escudoDivino")){
						this.objetivo.vidas=this.objetivo.vidas-this.habilidad[2];
						this.objetivo.comprobarVidas();
					}
					else{
						this.objetivo.quitarHabilidad("escudoDivino");
					}
				}				
				this.posicion="ataque";
			}
			//[6,1,X] -> restaura X vidas al objetivo
			else if(this.habilidad[1]==1){
				if(this.tipoObjetivo=="jugador"){
					this.restaurarVidasObjetivo(usuario,this.habilidad[2]);
				}else if(this.tipoObjetivo=="rival"){
					var rival=usuario.partida.obtenerRival(usuario);
					this.restaurarVidasObjetivo(rival,habilidad[2]);
				}else if(this.tipoObjetivo=="cartaJugador" || this.tipoObjetivo=="cartaRival"){
					this.restaurarVidasObjetivo(this.objetivo,this.habilidad[2]);
				}
				this.posicion="ataque";
			}
		}

		//[7,_,_] -> habilidades de grito de batalla sin objetivos
		else if(this.habilidad[0]==7){
			//[7,0,X] -> invoca un token X/X
			if(this.habilidad[1]==0){
				this.invocarToken(usuario,1,this.habilidad[2]);
				this.posicion="ataque";
			}
			//[7,1,X] -> invoca dos token X/X
			else if(this.habilidad[1]==1){
				this.invocarToken(usuario,2,this.habilidad[2]);
				this.posicion="ataque";
			}
			//[7,2,X] -> roba X cartas
			else if(this.habilidad[1]==2){
				this.posicion="ataque";
				for(var i=0;i<this.habilidad[2];i++){
					usuario.cogerCarta();
				}
			}
			//[7,3,X] -> obtiene +1/+1 por cada carta de invocacion aliada
			else if(this.habilidad[1]==3){
				var cartasAtaque=usuario.obtenerCartasAtaque();
				this.cambiarAtaqueVidas(cartasAtaque.length);		
				this.posicion="ataque";
			}
			//[7,4,X] -> obtiene +0/+X por cada carta de invocacion enemiga
			else if(this.habilidad[1]==4){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				this.setVidas(this.vidas+cartasAtaqueRival.length);
				this.posicion="ataque";
			}
			//[7,5,X] -> restaura X vidas a todos los aliados
			else if(this.habilidad[1]==5){
				var cartasAtaque=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaque.length;i++){
					this.restaurarVidasObjetivo(cartasAtaque[i],this.habilidad[2]);
				}
				this.restaurarVidasObjetivo(usuario,this.habilidad[2]);
				this.posicion="ataque";
			}
			//[7,6,X] -> hace X de daño a todas las invocaciones del rival
			else if(this.habilidad[1]==6){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueRival.length;i++){
					console.log(cartasAtaqueRival.length);
					if(!cartasAtaqueRival[i].tieneHabilidad("escudoDivino")){
						cartasAtaqueRival[i].vidas=cartasAtaqueRival[i].vidas-this.habilidad[2];
						cartasAtaqueRival[i].comprobarVidas();
					}else{
						cartasAtaqueRival[i].quitarHabilidad("escudoDivino");
					}
				}
				this.posicion="ataque";
			}
			//[7,7,X] -> otorga +X/+0 a las invocaciones hasta el final del turno
			else if(this.habilidad[1]==7){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					cartasAtaqueUsuario[i].setAtaque(cartasAtaqueUsuario[i].ataque+this.habilidad[2]);
					cartasAtaqueUsuario[i].ataqueAux=cartasAtaqueUsuario[i].ataqueAux+this.habilidad[2];
				}
				this.posicion="ataque";
			}
			//[7,8,X] -> hace X daños al jugador que la invoca
			else if(this.habilidad[1]==8){
				usuario.vidas=usuario.vidas-this.habilidad[2];
				usuario.comprobarVidas();
				this.posicion="ataque";
			}
			//[7,9,X] -> hace X de daño al rival 
			else if(this.habilidad[1]==9){
				var rival=usuario.partida.obtenerRival(usuario);
				rival.vidas=rival.vidas-this.habilidad[2];
				rival.comprobarVidas();
				this.posicion="ataque";
			}
			//[7,10,X] -> el rival roba X cartas
			else if(this.habilidad[1]==10){
				var rival=usuario.partida.obtenerRival(usuario);
				for(var i=0;i<this.habilidad[2];i++){
					rival.cogerCarta();
				}
				this.posicion="ataque";
			}
			//[7,11,X] -> restaura X vidas al rival
			else if(this.habilidad[1]==11){
				var rival=usuario.partida.obtenerRival(usuario);
				this.restaurarVidasObjetivo(rival,this.habilidad[2]);
				this.posicion="ataque";
			}
			//[7,12,X] -> hace X de daño a una invocacion aleatoria
			else if(this.habilidad[1]==12){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				var indice=Math.floor((Math.random() * (cartasAtaqueRival.length)) + 0);;
				if(cartasAtaqueRival[indice]!=undefined){
					//indice=Math.floor((Math.random() * (cartasAtaqueRival.length)) + 0);

					if(cartasAtaqueRival[indice].tieneHabilidad("escudoDivino")==false){
						cartasAtaqueRival[indice].vidas=cartasAtaqueRival[indice].vidas-this.habilidad[2];
						cartasAtaqueRival[indice].comprobarVidas();
					}else{
						cartasAtaqueRival[indice].quitarHabilidad("escudoDivino");
					}	
				}else{
					this.activarHabilidad(usuario);
				}
				this.posicion="ataque";				
			}
			//[7,13,X] -> obtiene +0/+1 por cada carta en la mano
			else if(this.habilidad[1]==13){
				var cartasMano=usuario.obtenerCartasMano();
				this.setVidas(this.vidas+cartasMano.length-1);	
				this.posicion="ataque";
			}
			//[7,14,X] -> destruye todas las invocaciones y pierdes vidas igual al numero de invocaciones destruidas de esta manera
			else if(this.habilidad[1]==14){				
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();	
				var numInvocaciones=cartasAtaqueRival.length+cartasAtaqueUsuario.length;	
				for(var i=0;i<cartasAtaqueRival.length;i++){
					cartasAtaqueRival[i].vidas=0;
					cartasAtaqueRival[i].comprobarVidas();
					cartasAtaqueRival[i].establecerDatosBase();
				}
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					cartasAtaqueUsuario[i].vidas=0;
					cartasAtaqueUsuario[i].comprobarVidas();
					cartasAtaqueUsuario[i].establecerDatosBase();
				}
				usuario.vidas=usuario.vidas-numInvocaciones;
				usuario.comprobarVidas();
				this.posicion="ataque";
			}
			//[7,15,X] -> devuelve X cartas de invocacion aleatorias del cementerio a la mano
			else if(this.habilidad[1]==15){		
				var cartasCementerio=usuario.obtenerCartasCementerio();
				var cartasInvocacionCementerio=[];
				var indice=0;
				for(var i=0;i<cartasCementerio.length;i++){
					if(cartasCementerio[i].tipo=="invocacion"){
						cartasInvocacionCementerio.push(cartasCementerio[i]);
					}
				}
				for(var i=0;i<this.habilidad[2];i++){		
					indice=Math.floor((Math.random() * (cartasInvocacionCementerio.length)) + 0);
					var cartasMano=usuario.obtenerCartasMano();
					if(cartasCementerio.length!=0 && cartasMano.length!=10){
						cartasInvocacionCementerio[indice].posicion="mano";
					}					
			        cartasInvocacionCementerio.splice(indice,1);
				}	
				this.posicion="ataque";
			}	
			//[7,16,X] -> devuelve X cartas de hechizo aleatorias del cementerio a la mano
			else if(this.habilidad[1]==16){		
				var cartasCementerio=usuario.obtenerCartasCementerio();
				var cartasInvocacionCementerio=[];
				var indice=0;
				for(var i=0;i<cartasCementerio.length;i++){
					if(cartasCementerio[i].tipo=="hechizo"){
						cartasInvocacionCementerio.push(cartasCementerio[i]);
					}
				}
				if(cartasInvocacionCementerio){
					for(var i=0;i<this.habilidad[2];i++){					
						var cartasMano=usuario.obtenerCartasMano();
						if(cartasCementerio.length!=0 && cartasMano.length!=10){
							indice=Math.floor((Math.random() * (cartasInvocacionCementerio.length)) + 0);
							cartasInvocacionCementerio[indice].posicion="mano";
						}
					}			
				}	
				this.posicion="ataque";
			}
			//[7,17,X] -> obtiene +X/+X por cada carta de invocacion de coste 4 o mas del cementerio
			else if(this.habilidad[1]==17){		
				var cartasCementerio=usuario.obtenerCartasCementerio();
				var cartasInvocacionCementerio=0;
				for(var i=0;i<cartasCementerio.length;i++){
					if(cartasCementerio[i].tipo=="invocacion" && cartasCementerio[i].coste>4){
						cartasInvocacionCementerio++;
					}
				}
				this.cambiarAtaqueVidas(cartasInvocacionCementerio);
				this.posicion="ataque";
			}
			//[7,18,X] -> obtiene +X/+X por cada carta de hechizo del cementerio
			else if(this.habilidad[1]==18){		
				var cartasCementerio=usuario.obtenerCartasCementerio();
				var cartasInvocacionCementerio=0;
				for(var i=0;i<cartasCementerio.length;i++){
					if(cartasCementerio[i].tipo=="hechizo"){
						cartasInvocacionCementerio++;
					}
				}
				this.cambiarAtaqueVidas(cartasInvocacionCementerio);
				this.posicion="ataque";
			}//[7,19,X] -> congela todas las invocaciones enemigas
			else if(this.habilidad[1]==19){		
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();		
				for(var i=0;i<cartasAtaqueRival.length;i++){
					cartasAtaqueRival[i].turnosCongelado=1;
				}
				this.posicion="ataque";
			}
			//[7,20,X] -> Si controlas una invocacion de la clase X, robas una carta
			else if(this.habilidad[1]==20){
				this.posicion="ataque";
				var cartasAtaque=usuario.obtenerCartasAtaque();
				var existe=false;
				for(var i=0; i<cartasAtaque.length;i++){
					if(cartasAtaque[i].clase=this.habilidad[2]){
						existe=true;
					}
				}
				if(existe){
					usuario.cogerCarta();
				}
			}
			//[7,21,X] -> Si controlas una invocacion de la clase X, la invocacion obtiene veloz
			else if(this.habilidad[1]==21){
				var cartasAtaque=usuario.obtenerCartasAtaque();
				var existe=false;
				for(var i=0; i<cartasAtaque.length;i++){
					if(cartasAtaque[i].clase=this.habilidad[2]){
						existe=true;
					}
				}
				if(existe){
					this.insertarHabilidad("veloz");
				}
				this.posicion="ataque";
			}
			//[7,22,X] -> Si controlas una invocacion de la clase X, la invocacion obtiene defensor
			else if(this.habilidad[1]==22){
				var cartasAtaque=usuario.obtenerCartasAtaque();
				var existe=false;
				for(var i=0; i<cartasAtaque.length;i++){
					if(cartasAtaque[i].clase=this.habilidad[2]){
						existe=true;
					}
				}
				if(existe){
					this.insertarHabilidad("defensor");
				}
				this.posicion="ataque";
			}
			//[7,23,X] -> Si controlas una invocacion de la clase X, la invocacion obtiene +1/+1
			else if(this.habilidad[1]==23){
				var cartasAtaque=usuario.obtenerCartasAtaque();
				var existe=false;
				for(var i=0; i<cartasAtaque.length;i++){
					if(cartasAtaque[i].clase=this.habilidad[2]){
						existe=true;
					}
				}
				if(existe){
					this.cambiarAtaqueVidas(1);
				}
				this.posicion="ataque";
			}
			//[7,24,X] -> Por cada invocacion aliada con defensor, la invocacion obtiene +2/+2
			else if(this.habilidad[1]==24){
				var cartasAtaque=usuario.obtenerCartasAtaque();
				var valor=0;
				for(var i=0; i<cartasAtaque.length;i++){
					if(cartasAtaque[i].tieneHabilidad("defensor")){
						valor=valor+2;
					}
				}
				this.cambiarAtaqueVidas(valor);
				this.posicion="ataque";
			}
			//[7,25,X] -> Si controlas una invocacion de la clase X, la invocacion obtiene escudo divino
			else if(this.habilidad[1]==25){
				var cartasAtaque=usuario.obtenerCartasAtaque();
				var existe=false;
				for(var i=0; i<cartasAtaque.length;i++){
					if(cartasAtaque[i].clase=this.habilidad[2]){
						existe=true;
					}
				}
				if(existe){
					this.insertarHabilidad("escudoDivino");
				}
				this.posicion="ataque";
			}
			//[7,26,X] -> invoca un token X/X con congelar
			else if(this.habilidad[1]==26){
				this.invocarToken(usuario,1,this.habilidad[2]);
				var cartasAtaque=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaque.length;i++){
					if(cartasAtaque[i].vidas==this.habilidad[2] && cartasAtaque[i].ataque==this.habilidad[2] && cartasAtaque[i].tipo=="token" && cartasAtaque[i].haAtacado==true){
						cartasAtaque[i].insertarHabilidad("congelar");
					}					
				}
				this.posicion="ataque";
			}
			//[7,27,X] -> aumenta el mana del jugador en X
			else if(this.habilidad[1]==27){
				usuario.consumido=usuario.consumido+this.habilidad[2];
				this.posicion="ataque";
			}
			//[7,28,X] -> otorga +X/+X a las demás invocaciones
			else if(this.habilidad[1]==28){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					if(cartasAtaqueUsuario[i]!=this){
						cartasAtaqueUsuario[i].cambiarAtaqueVidas(this.habilidad[2]);
					}
				}
				this.posicion="ataque";
			}
			//[7,29,X] -> destruye una invocacion enemiga aleatoria
			else if(this.habilidad[1]==29){
				var rival=usuario.partida.obtenerRival(usuario);
				for(var i=0;i<this.habilidad[2];i++){
					var cartasAtaqueRival=_.shuffle(rival.obtenerCartasAtaque());
					if(cartasAtaqueRival){
						cartasAtaqueRival[0].vidas=0;
						cartasAtaqueRival[0].comprobarVidas();
					}
				}
				this.posicion="ataque";
			}
		}
		if(this.tieneHabilidad("ultimaVoluntad")){
			this.posicion="cementerio";
		}
	}

	this.invocarToken=function(usuario,numToken,X){
		var cartasAtaque;
		for(var i=0;i<numToken;i++){
			cartasAtaque=usuario.obtenerCartasAtaque();
			if(cartasAtaque.length<7){
				//i=cartasToken.length;
				id=usuario.darIdToken();
				usuario.mazo.push(new Carta("Token"+this.clase+id,X,X,X,this.clase,"token",undefined,[],undefined,false));
				token=usuario.puedeObtenerCartaMazo("Token"+this.clase+id);
				token.posicion="ataque";
				token.haAtacado=true;
				token.texto=token.mostrarTexto();
			}			
		}		
	}

	this.indiceHabilidad=function(){
		var texto="";
		if(this.habilidad[0]==3){
			if(this.habilidad[1]==0){
				texto="Al final del turno, otorga escudo divino a otra inv. aliada";
			}else if(this.habilidad[1]==1){
				texto="Al final del turno, otorga +"+this.habilidad[2]+" p. de ataque a otra inv. aliada ";
			}else if(this.habilidad[1]==2){
				texto="Al final del turno, otorga +"+this.habilidad[2]+" p. de salud a otra inv. aliada";
			}else if(this.habilidad[1]==3){
				texto="Al final del turno, otorga +"+this.habilidad[2]+" p. de ataque a las demás inv. aliadas";
			}else if(this.habilidad[1]==4){
				texto="Al final del turno, otorga +"+this.habilidad[2]+" p. de salud a las demás inv. aliadas";
			}else if(this.habilidad[1]==5){
				texto="Al final del turno, otorga +"+this.habilidad[2]+"/+"+this.habilidad[2]+" a las demás inv. aliadas";
			}else if(this.habilidad[1]==6){
				texto="Al final del turno, roba "+this.habilidad[2]+" carta";
				if(this.habilidad[2]>1){texto=texto+"s";}
			}else if(this.habilidad[1]==7){
				texto="Al final del turno, inflige "+this.habilidad[2]+" p. de daño a una inv. enemiga";
			}else if(this.habilidad[1]==8){
				texto="Al final del turno, inflige "+this.habilidad[2]+" p. de daño al rival";
			}else if(this.habilidad[1]==9){
				texto="Al final del turno, inflige "+this.habilidad[2]+" p. de daño a todas las inv. enemigas";
			}else if(this.habilidad[1]==10){
				texto="Al final del turno, restaura "+this.habilidad[2]+" p. de salud al jugador";
			}else if(this.habilidad[1]==11){
				texto="Al final del turno, restaura "+this.habilidad[2]+" p. de salud a todas las inv. aliadas";
			}else if(this.habilidad[1]==12){
				texto="Al final del turno, invoca un token "+this.habilidad[2]+"/"+this.habilidad[2]+"";
			}else if(this.habilidad[1]==13){
				texto="Al final del turno, inflige "+this.habilidad[2]+" p. de daño a todas las demás inv.";
			}else if(this.habilidad[1]==14){
				texto="Al final del turno, inflige "+this.habilidad[2]+" p. de daño a todas las demás entidades";
			}
			return texto;
		}else if(this.habilidad[0]==4){
			if(this.habilidad[1]==0){
				texto="otorga +"+this.habilidad[2]+"/+"+this.habilidad[2]+" a la inv. aliada objetivo";
			}else if(this.habilidad[1]==1){
				texto="otorga +"+this.habilidad[2]+" p. de ataque a la inv. aliada objetivo";
			}else if(this.habilidad[1]==2){
				texto="otorga +"+this.habilidad[2]+" p. de ataque a la inv. aliada objetivo hasta el final del turno";
			}else if(this.habilidad[1]==3){
				texto="otorga +"+this.habilidad[2]+" p. de salud  a la inv. aliada objetivo";
			}else if(this.habilidad[1]==4){
				texto="otorga escudo divino a la inv. aliada objetivo";
			}else if(this.habilidad[1]==5){
				texto="otorga antimagia a la inv. aliada objetivo";
			}else if(this.habilidad[1]==6){
				texto="restaura "+this.habilidad[2]+" p. de salud a a la inv. aliada objetivo";
			}else if(this.habilidad[1]==7){
				texto="devuelve la inv. aliada objetivo a la mano";
			}
			return texto;
		}else if(this.habilidad[0]==5){
			if(this.habilidad[1]==0){
				texto="inflige "+this.habilidad[2]+" p. de daño a la inv. enemiga objetivo";
			}else if(this.habilidad[1]==1){
				texto="inflige "+this.habilidad[2]+" p. de daño igual al ataque de esta carta, a la inv. enemiga objetivo";
			}else if(this.habilidad[1]==2){
				texto="inflige "+this.habilidad[2]+" p. de daño igual al numero de cartas en mano, a la inv. enemiga objetivo";
			}else if(this.habilidad[1]==3){
				texto="devuelve la inv. enemiga objetivo a la mano";
			}else if(this.habilidad[1]==4){
				texto="";
			}else if(this.habilidad[1]==5){
				texto="establece el ataque de la inv. enemiga objetivo a "+this.habilidad[2]+"";
			}else if(this.habilidad[1]==6){
				texto="establece la salud de la inv. enemiga objetivo a "+this.habilidad[2]+"";
			}else if(this.habilidad[1]==7){
				texto="destruye la inv. enemiga objetivo";
			}else if(this.habilidad[1]==8){
				texto="intercambia el ataque y la salud de esta inv. con la inv. enemiga objetivo";
			}
			return texto;
		}
		else if(this.habilidad[0]==6){
			if(this.habilidad[1]==0){
				texto="inflige "+this.habilidad[2]+" p. de daño al objetivo";
			}else if(this.habilidad[1]==1){
				texto="restaura "+this.habilidad[2]+" p. de salud al objetivo";
			}
			return texto;
		}else if(this.habilidad[0]==7){
			if(this.habilidad[1]==0){
				texto="invoca un token "+this.habilidad[2]+"/"+this.habilidad[2]+"";
			}else if(this.habilidad[1]==1){
				texto="invoca dos token "+this.habilidad[2]+"/"+this.habilidad[2]+"";
			}else if(this.habilidad[1]==2){
				texto="roba "+this.habilidad[2]+" carta";
				if(this.habilidad[2]>1){texto=texto+"s";}
			}else if(this.habilidad[1]==3){
				texto="obtiene +"+this.habilidad[2]+"/+"+this.habilidad[2]+" por cada invocacion aliada";
			}else if(this.habilidad[1]==4){
				texto="obtiene "+this.habilidad[2]+" p. de salud por cada inv. enemiga";
			}else if(this.habilidad[1]==5){
				texto="restaura "+this.habilidad[2]+" p. de salud a todos los aliados";
			}else if(this.habilidad[1]==6){
				texto="inflige "+this.habilidad[2]+" p. de daño a todas las inv. enemigas";
			}else if(this.habilidad[1]==7){
				texto="otorga "+this.habilidad[2]+" p. de ataque a todas las inv. aliadas hasta el final del turno";
			}else if(this.habilidad[1]==8){
				texto="inflige "+this.habilidad[2]+" p. de daño al jugador";
			}else if(this.habilidad[1]==9){
				texto="inflige "+this.habilidad[2]+" p. de daño al rival";
			}else if(this.habilidad[1]==10){
				texto="el rival roba "+this.habilidad[2]+" carta";
				if(this.habilidad[2]>1){texto=texto+"s";}
			}else if(this.habilidad[1]==11){
				texto="restaura "+this.habilidad[2]+" p. de salud al rival";
			}else if(this.habilidad[1]==12){
				texto="inflige "+this.habilidad[2]+" p. de daño a una inv. enemiga";
			}else if(this.habilidad[1]==13){
				texto="obtiene "+this.habilidad[2]+" p. de salud por cada carta en mano";
			}else if(this.habilidad[1]==14){
				texto="destruye todas las inv., pierdes una vida por cada inv. destruida";
			}else if(this.habilidad[1]==15){
				texto="devuelve "+this.habilidad[2]+" cartas de inv. del cementerio a la mano";
			}else if(this.habilidad[1]==16){
				texto="devuelve "+this.habilidad[2]+" cartas de hechizo aleatorias del cementerio a la mano";
			}else if(this.habilidad[1]==17){
				texto="obtiene +"+this.habilidad[2]+"/+"+this.habilidad[2]+" por cada carta de inv. de coste 4 o mas del cementerio";
			}else if(this.habilidad[1]==18){
				texto="obtiene +"+this.habilidad[2]+"/+"+this.habilidad[2]+" por cada carta de hechizo del cementerio";
			}else if(this.habilidad[1]==19){
				texto="congela todas las inv. enemigas";
			}else if(this.habilidad[1]==20){
				texto="Si controlas una inv. del elemento "+this.habilidad[2]+", robas una carta";
			}else if(this.habilidad[1]==21){
				texto="Si controlas una inv. del elemento "+this.habilidad[2]+", esta inv. obtiene veloz";
			}else if(this.habilidad[1]==22){
				texto="Si controlas una inv. del elemento "+this.habilidad[2]+", esta inv. obtiene defensor";
			}else if(this.habilidad[1]==23){
				texto="Si controlas una inv. del elemento "+this.habilidad[2]+", esta inv. obtiene +1/+1";
			}else if(this.habilidad[1]==24){
				texto="Por cada inv. aliada con defensor, esta inv. obtiene +2/+2";
			}else if(this.habilidad[1]==25){
				texto="Si controlas una inv. del elemento "+this.habilidad[2]+", esta inv. obtiene escudo divino";
			}else if(this.habilidad[1]==26){
				texto="invoca un token "+this.habilidad[2]+"/"+this.habilidad[2]+" con congelar";;
			}else if(this.habilidad[1]==27){
				texto="aumenta tu mana en "+this.habilidad[2]+" para el siguiente turno";
			}else if(this.habilidad[1]==28){
				texto="otorga "+this.habilidad[2]+"/"+this.habilidad[2]+" a las demás inv. aliadas";
			}else if(this.habilidad[1]==29){
				texto="destruye  "+this.habilidad[2]+" inv. enemigas";
			}

			return texto;
		}
	}
		


//Zona de cartas de tipo hechizo:

	this.esUsado=function(){
		this.posicion="cementerio";
		this.objetivo=undefined;
		this.tieneObjetivo=false;
		this.tipoObjetivo=undefined;

		return true;
	}

	this.setTipoObjetivo=function(objetivo){
		this.tipoObjetivo=objetivo;
		console.log("El objetivo de "+this.nombre+" es: "+this.tipoObjetivo);
	}

	//Puede usarse pasa dar +X/+X o -X/-X
	this.cambiarAtaqueVidas=function(X){
		this.ataque=this.ataque+X;
		if(this.ataque<0){
			this.ataque=0;
		}
		this.vidas=this.vidas+X;
		this.vidasMax=this.vidasMax+X;
		this.comprobarVidas();
	}

	this.agregarEfecto=function(efecto){
		this.efecto=efecto;
	}

	//Activacion de efecto de hechizos
	this.activarEfecto=function(usuario){
		//[0,_,_] -> efecto de robar cartas
		if(this.efecto[0]==0){
			//[0,0,X] El jugador roba X cartas
			if(this.efecto[1]==0){
				this.posicion="cementerio";
				for(var i=0;i<efecto[2];i++){
					var cartasMano=usuario.obtenerCartasMano();
					usuario.cogerCarta();
				}	
				this.esUsado();			
			}
			//[0,1,X] El rival roba X cartas
			else if(this.efecto[1]==1){
				this.posicion="cementerio";
				var rival=usuario.partida.obtenerRival(usuario);
				for(var i=0;i<efecto[2];i++){
					var cartasMano=rival.obtenerCartasMano();
					rival.cogerCarta();
				}
				this.esUsado();
			}
			//[0,2,X] Ambos jugadores roban X cartas
			else if(this.efecto[1]==2){
				this.posicion="cementerio";
				for(var i=0;i<efecto[2];i++){
					var cartasMano=usuario.obtenerCartasMano();
					usuario.cogerCarta();
				}
				var rival=usuario.partida.obtenerRival(usuario);
				for(var i=0;i<efecto[2];i++){
					var cartasMano=rival.obtenerCartasMano();
					rival.cogerCarta();
				}
				this.esUsado();
			}	
			//[0,3,X] El jugador roba X cartas y descarta 1 carta aleatoria
			else if(this.efecto[1]==3){
				this.posicion="cementerio";
				for(var i=0;i<efecto[2];i++){
					var cartasMano=usuario.obtenerCartasMano();
					usuario.cogerCarta();					
				}
				cartasMano=usuario.obtenerCartasMano();
				numCartas=cartasMano.length;
				//var posicionObjetivo = Math.random() * ((cartasAtaqueRival.length) - 1) + 0;
				var posicion = Math.floor((Math.random() * (numCartas)) + 0);
				usuario.descartarCarta(cartasMano[posicion]);
				this.esUsado();
			}			
		}

		//[1,_,_] -> efecto de daño directo a objetivo
		else if(this.efecto[0]==1){
			//[1,0,X] Daño X a un unico objetivo (rival)
			if(this.efecto[1]==0){
				var rival=usuario.partida.obtenerRival(usuario);
				//console.log("se ha obtenido al rival "+rival.nombre);
				rival.vidas=rival.vidas-this.efecto[2];
				rival.comprobarVidas();
				this.esUsado();
			}
			//[1,1,X] Daño X al objetivo que sea (invocacion/jugador)
			else if(this.efecto[1]==1){
				if(this.tipoObjetivo=="jugador"){
					usuario.vidas=usuario.vidas-this.efecto[2];
					usuario.comprobarVidas();
				}else if(this.tipoObjetivo=="rival"){
					var rival=usuario.partida.obtenerRival(usuario);
					rival.vidas=rival.vidas-this.efecto[2];
					rival.comprobarVidas();
				}else{
					if(!this.objetivo.tieneHabilidad("escudoDivino")){
					this.objetivo.vidas=this.objetivo.vidas-this.efecto[2];
					this.objetivo.comprobarVidas();
					}else{
						this.objetivo.quitarHabilidad("escudoDivino");
					}
				}
				this.esUsado();
			}
			//[1,2,X] Daño X a muchos objetivos del rival (todas las cartas del rival)
			else if(this.efecto[1]==2){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueRival.length;i++){
					console.log(cartasAtaqueRival.length);
					if(!cartasAtaqueRival[i].tieneHabilidad("escudoDivino")){
						cartasAtaqueRival[i].vidas=cartasAtaqueRival[i].vidas-this.efecto[2];
						cartasAtaqueRival[i].comprobarVidas();
					}else{
						cartasAtaqueRival[i].quitarHabilidad("escudoDivino");
					}
				}
				this.esUsado();				
			}
			//[1,3,X] Daño X a todas las invocaciones
			else if(this.efecto[1]==3){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueRival.length;i++){
					if(!cartasAtaqueRival[i].tieneHabilidad("escudoDivino")){
						cartasAtaqueRival[i].vidas=cartasAtaqueRival[i].vidas-this.efecto[2];
						cartasAtaqueRival[i].comprobarVidas();
					}else{
						cartasAtaqueRival[i].quitarHabilidad("escudoDivino");
					}
				}
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					if(!cartasAtaqueUsuario[i].tieneHabilidad("escudoDivino")){
						cartasAtaqueUsuario[i].vidas=cartasAtaqueUsuario[i].vidas-this.efecto[2];
						cartasAtaqueUsuario[i].comprobarVidas();
					}else{
						cartasAtaqueUsuario[i].quitarHabilidad("escudoDivino");
					}
				}	
				this.esUsado();				
			}

			//[1,4,X] Daño X a los dos jugadores y cartas
			else if(this.efecto[1]==4){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueRival.length;i++){
					if(!cartasAtaqueRival[i].tieneHabilidad("escudoDivino")){
						cartasAtaqueRival[i].vidas=cartasAtaqueRival[i].vidas-this.efecto[2];
						cartasAtaqueRival[i].comprobarVidas();
					}else{
						cartasAtaqueRival[i].quitarHabilidad("escudoDivino");
					}
				}
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					if(!cartasAtaqueUsuario[i].tieneHabilidad("escudoDivino")){
						cartasAtaqueUsuario[i].vidas=cartasAtaqueUsuario[i].vidas-this.efecto[2];
						cartasAtaqueUsuario[i].comprobarVidas();
					}else{
						cartasAtaqueUsuario[i].quitarHabilidad("escudoDivino");
					}
				}
				rival.vidas=rival.vidas-this.efecto[2];
				rival.comprobarVidas();
				usuario.vidas=usuario.vidas-this.efecto[2];
				usuario.comprobarVidas();	
				this.esUsado();				
			}
			//[1,5,X] Daño X a la invocacion objetivo 
			else if(this.efecto[1]==5){
				if(this.tipoObjetivo=="cartaJugador" || this.tipoObjetivo=="cartaRival"){
					if(!this.objetivo.tieneHabilidad("escudoDivino")){
						this.objetivo.vidas=this.objetivo.vidas-this.efecto[2];
						this.objetivo.comprobarVidas();
					}else{
						this.objetivo.quitarHabilidad("escudoDivino");
					}
					this.esUsado();
				}								
			}
			//[1,6,X] Daño X a la invocacion objetivo y la congela
			else if(this.efecto[1]==6){
				if(this.tipoObjetivo=="cartaJugador" || this.tipoObjetivo=="cartaRival"){
					if(!this.objetivo.tieneHabilidad("escudoDivino")){
						this.objetivo.vidas=this.objetivo.vidas-this.efecto[2];
						this.objetivo.comprobarVidas();
					}else{
						this.objetivo.quitarHabilidad("escudoDivino");
					}
					this.turnosCongelado=1;
					this.esUsado();
				}								
			}
			//[1,7,X] Daño X a la invocacion objetivo y te curas esa cantidad
			else if(this.efecto[1]==7){
				if(this.tipoObjetivo=="cartaJugador" || this.tipoObjetivo=="cartaRival"){
					if(!this.objetivo.tieneHabilidad("escudoDivino")){
						this.objetivo.vidas=this.objetivo.vidas-this.efecto[2];
						this.objetivo.comprobarVidas();
						this.restaurarVidasObjetivo(usuario,this.efecto[2]);
					}else{
						this.objetivo.quitarHabilidad("escudoDivino");
					}
					this.esUsado();
				}								
			}

		}

		//[2,_,_] -> efecto de cambio de estadisticas
		else if(this.efecto[0]==2){
			//[2,0,X] -> el objetivo obtiene +X/+X o -X/-X
			if(this.efecto[1]==0 && (this.tipoObjetivo=="cartaJugador" || this.tipoObjetivo=="cartaRival")){
				this.objetivo.cambiarAtaqueVidas(this.efecto[2]);
				this.objetivo.comprobarVidas();
				this.esUsado();
				//this.objetivo.vidas=this.objetivo.vidas+this.efecto[2];
				//this.objetivo.ataque=this.objetivo.ataque+this.efecto[2];
			}
			//[2,1,X] -> todas las invocaciones del jugador obtienen +X/+X o -X/-X
			else if(this.efecto[1]==1){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					cartasAtaqueUsuario[i].cambiarAtaqueVidas(this.efecto[2]);
					cartasAtaqueUsuario[i].comprobarVidas();
					//cartasAtaqueUsuario[i].vidas=cartasAtaqueUsuario[i].vidas+this.efecto[2];
					//cartasAtaqueUsuario[i].ataque=cartasAtaqueUsuario[i].ataque+this.efecto[2];
				}
				this.esUsado();
			}
			//[2,2,X] -> La invocacion aliada objetivo obtiene +X/+X, donde X es la mayor fuerza de las invocaciones que controlas
			else if(this.efecto[1]==2 && this.tipoObjetivo=="cartaJugador"){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				var mayorFuerza=0;
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					if(cartasAtaqueUsuario[i].ataque>mayorFuerza){
						mayorFuerza=cartasAtaqueUsuario[i].ataque;
					}
				}
				this.objetivo.cambiarAtaqueVidas(mayorFuerza);
				this.esUsado();
			}

			//[2,3,X] -> La invocacion aliada objetivo obtiene +X/+0 hasta el final del turno
			else if(this.efecto[1]==3 && this.tipoObjetivo=="cartaJugador"){

				this.objetivo.setAtaque(this.objetivo.ataque+this.efecto[2]);
				this.objetivo.ataqueAux=this.objetivo.ataqueAux+this.efecto[2];
				this.esUsado();

				//PENDIENTE

				//USAR VIDASAUX para indicar los cambios totales que ha sufrido la invocacion, retirarlos al final del turno
				//Usar una funcion "retirarEfectosTurno()", que retire de las invocaciones los efectos dados
				// Crear una variable vidasMod, ataqueMod, tipoHabilidadMod, iguales a 0, que se ponen a 0 cada turno
				// Cada efecto de "hasta el final del turno" que modifique estas variables, 
				// si algo da +3/+3 entonces vidasMod=vidasMod+3 y ataqueMod=ataqueMod+3
				// al final del turno llamar a retirarEfectosTurno(), que reste los efectos  PERO SIN MODIFICAR LAS ESTADISTICAS BASE
				// this.vidas=this.vidas-this.vidasMod; this.ataque=this.ataque-this.ataqueMod; this.ataqeMod=0; this.vidasMod=0;
				//this.objetivo.ataqueAux=this.objetivo.ataqueAux+this.efecto[2];
				//this.objetivo.vidasAux=this.objetivo.vidasAux+this.efecto[2];
			}

			//[2,4,X] -> La invocacion aliada dublica su ataque
			else if(this.efecto[1]==4 && this.tipoObjetivo=="cartaJugador"){
				this.objetivo.setAtaque(this.objetivo.ataque*2);
				this.esUsado();
			}
			//[2,5,X] -> La invocacion aliada dublica su salud
			else if(this.efecto[1]==5 && this.tipoObjetivo=="cartaJugador"){
				this.objetivo.setVidas(this.objetivo.vidas*2);
				this.esUsado();
			}
			//[2,6,X] -> La invocacion aliada obtiene +X/+0 
			else if(this.efecto[1]==6 && this.tipoObjetivo=="cartaJugador"){
				this.objetivo.setAtaque(this.objetivo.ataque+this.efecto[2]);
				this.esUsado();
			}
			//[2,7,X] -> La invocacion aliada obtiene +0/+X
			else if(this.efecto[1]==7 && this.tipoObjetivo=="cartaJugador"){
				this.objetivo.setVidas(this.objetivo.vidas+this.efecto[2]);
				this.esUsado();
			}
			//[2,8,X] -> Las invocaciones del rival obtienen -X/-X
			else if(this.efecto[1]==8){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueRival.length;i++){
					cartasAtaqueRival[i].cambiarAtaqueVidas(-this.efecto[2]);
					cartasAtaqueRival[i].comprobarVidas();
				}
				this.esUsado();
			}
			//[2,9,X] -> Las invocaciones del rival obtienen -X/-X, donde X es el ataque de la invocacion aliada
			else if(this.efecto[1]==9 && this.tipoObjetivo=="cartaJugador"){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueRival.length;i++){
					cartasAtaqueRival[i].setAtaque(cartasAtaqueRival[i].ataque-this.objetivo.ataque);
					cartasAtaqueRival[i].setVidas(cartasAtaqueRival[i].vidas-this.objetivo.ataque);
					cartasAtaqueRival[i].comprobarVidas();
				}
				this.esUsado();
			}
			//[2,10,X] -> todas las invocaciones del jugador obtienen +1/+1 por cada invocacion aliada (X=numInvocaciones)
			else if(this.efecto[1]==10){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					cartasAtaqueUsuario[i].cambiarAtaqueVidas(cartasAtaqueUsuario.length);
					//cartasAtaqueUsuario[i].vidas=cartasAtaqueUsuario[i].vidas+this.efecto[2];
					//cartasAtaqueUsuario[i].ataque=cartasAtaqueUsuario[i].ataque+this.efecto[2];
				}
				this.esUsado();
			}
			//[2,11,X] -> todas las invocaciones del jugador obtienen +X/+0 hasta el final del turno
			else if(this.efecto[1]==11){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					cartasAtaqueUsuario[i].setAtaque(cartasAtaqueUsuario[i].ataque+this.efecto[2]);
					cartasAtaqueUsuario[i].ataqueAux=cartasAtaqueUsuario[i].ataqueAux+this.efecto[2];
					//cartasAtaqueUsuario[i].vidas=cartasAtaqueUsuario[i].vidas+this.efecto[2];
					//cartasAtaqueUsuario[i].ataque=cartasAtaqueUsuario[i].ataque+this.efecto[2];
				}
				this.esUsado();
			}
			//[2,12,X] -> todas las invocaciones del jugador obtienen +X/+0 hasta el final del turno y escudo divino
			else if(this.efecto[1]==12){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					cartasAtaqueUsuario[i].setAtaque(cartasAtaqueUsuario[i].ataque+this.efecto[2]);
					cartasAtaqueUsuario[i].ataqueAux=cartasAtaqueUsuario[i].ataqueAux+this.efecto[2];
					cartasAtaqueUsuario[i].insertarHabilidad("escudoDivino");
					cartasAtaqueUsuario[i].tipoHabilidadAux.push("escudoDivino");
					//cartasAtaqueUsuario[i].vidas=cartasAtaqueUsuario[i].vidas+this.efecto[2];
					//cartasAtaqueUsuario[i].ataque=cartasAtaqueUsuario[i].ataque+this.efecto[2];
				}
				this.esUsado();
			}

		}

		//[3,_,_] -> efecto de muerte de invocacion
		else if(this.efecto[0]==3){
			//[3,0,X] El objetivo es enviado al cementerio directamente
			if(this.efecto[1]==0 && (this.tipoObjetivo=="cartaJugador" || this.tipoObjetivo=="cartaRival")){
				this.objetivo.vidas=0;
				this.objetivo.comprobarVidas();				
				this.esUsado();
			}
			//[3,1,X] Destruye X cartas aleatorias del rival
			else if(this.efecto[1]==1){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				if(cartasAtaqueRival.length>=efecto[2]){
					for(var i=0;i<efecto[2];i++){
						//PENDIENTE
						cartasAtaqueRival=rival.obtenerCartasAtaque();
						var numCartas=cartasAtaqueRival.length;
						//var posicionObjetivo = Math.random() * ((cartasAtaqueRival.length) - 1) + 0;
						var posicionObjetivo = Math.floor((Math.random() * (numCartas)) + 0);
						cartasAtaqueRival[posicionObjetivo].vidas=0;
						cartasAtaqueRival[posicionObjetivo].comprobarVidas();
					}
					this.esUsado();
				}
			}
			//[3,2,X] Destruye todas las invocaciones
			else if(this.efecto[1]==2){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();		
				for(var i=0;i<cartasAtaqueRival.length;i++){
					cartasAtaqueRival[i].vidas=0;
					cartasAtaqueRival[i].comprobarVidas();
				}
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					cartasAtaqueUsuario[i].vidas=0;
					cartasAtaqueUsuario[i].comprobarVidas();
				}
				this.esUsado();
			}
			//[3,3,X] Destruye HASTA X invocaciones aleatorias de cada jugador
			else if(this.efecto[1]==3){/*
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();	
				//if(cartasAtaqueRival.length>=efecto[2] && cartasAtaqueUsuario.length>=efecto[2]){
					for(var i=0;i<efecto[2];i++){
						var posicionObjetivo = Math.floor((Math.random() * (numCartas)) + 0);
						cartasAtaqueRival[posicionObjetivo].posicion="cementerio";
					}
				//}

				for(var i=0;i<cartasAtaqueRival.length;i++){
					cartasAtaqueRival[i].posicion="cementerio";
				}
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					cartasAtaqueUsuario[i].posicion="cementerio";
				}*/
			}
			//[3,4,X] Destruye todas las invocaciones que cuesten 3 o menos
			else if(this.efecto[1]==4){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();		
				for(var i=0;i<cartasAtaqueRival.length;i++){
					if(cartasAtaqueRival[i].coste<=3){
						cartasAtaqueRival[i].vidas=0;
						cartasAtaqueRival[i].comprobarVidas();
					}					
				}
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					if(cartasAtaqueUsuario[i].coste<=3){
						cartasAtaqueUsuario[i].vidas=0;
						cartasAtaqueUsuario[i].comprobarVidas();
					}
				}
				this.esUsado();
			}
			//[3,5,X] Destruye todas las invocaciones que cuesten 4 o mas
			else if(this.efecto[1]==5){
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();		
				for(var i=0;i<cartasAtaqueRival.length;i++){
					if(cartasAtaqueRival[i].coste>=4){
						cartasAtaqueRival[i].vidas=0;
						cartasAtaqueRival[i].comprobarVidas();
					}					
				}
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					if(cartasAtaqueUsuario[i].coste>=4){
						cartasAtaqueUsuario[i].vidas=0;
						cartasAtaqueUsuario[i].comprobarVidas();
					}
				}
				this.esUsado();
			}
			//[3,6,X] Destruye la invocacion de coste 3 o menos
			else if(this.efecto[1]==6 && (this.tipoObjetivo=="cartaJugador" || this.tipoObjetivo=="cartaRival")){
				if(this.objetivo.coste<=3){
					this.objetivo.vidas=0;
					this.objetivo.comprobarVidas();	
					this.esUsado();
				}
				
			}
			//[3,7,X] Destruye la invocacion de coste 4 o mas
			else if(this.efecto[1]==6 && (this.tipoObjetivo=="cartaJugador" || this.tipoObjetivo=="cartaRival")){
				if(this.objetivo.coste>4){
					this.objetivo.vidas=0;
					this.objetivo.comprobarVidas();	
					this.esUsado();
				}				
			}
		}

		//[4,_,_] -> efecto de aumento de mana
		else if(this.efecto[0]==4){
			//[4,0,X] El jugador aumenta en X su maná máximo (afecta para el siguiente turno)
			if(this.efecto[1]==0){
				usuario.consumido=usuario.consumido+efecto[2];
				this.esUsado();
			}
			//[4,1,X] Ambos jugadores aumentan en X su maná máximo (afecta para el siguiente turno)
			else if(this.efecto[1]==1){
				var rival=usuario.partida.obtenerRival(usuario);
				usuario.consumido=usuario.consumido+efecto[2];
				rival.elixir=rival.elixir+efecto[2];
				this.esUsado();
			}
		}


		//[5,_,_] -> efecto de crear tokens (invocaciones)
		else if(this.efecto[0]==5){
			//[5,0,X] El jugador invoca X tokens 1/1
			if(this.efecto[1]==0){
				//mazo.push(new Carta("Token"+i,1,1,1,this.clase,"token",undefined,[],undefined,false));
				/*usuario.mazo.push(new Carta("Token"+i,1,1,1,this.clase,"token",undefined,[],undefined,false));
				token=usuario.puedeObtenerCartaMazo("Token"+i);
				token.posicion="ataque";
				token.haAtacado=true;*/				
				var cartasAtaque=usuario.obtenerCartasAtaque();
				if(cartasAtaque.length<7){
					this.invocarToken(usuario,efecto[2],1);
					this.esUsado();
				}
				
			}
			//[5,1,X] El jugador invoca X tokens 2/2
			else if(this.efecto[1]==1){
				this.invocarToken(usuario,efecto[2],2);
				this.esUsado();
			}
			//[5,2,X] El jugador invoca X tokens 3/3
			else if(this.efecto[1]==2){
				this.invocarToken(usuario,efecto[2],3);
				this.esUsado();
			}
			//[5,3,X] El jugador invoca X tokens 4/4
			else if(this.efecto[1]==3){
				this.invocarToken(usuario,efecto[2],4);
				this.esUsado();
			}
			//[5,4,X] El jugador invoca 1 token 2/2, 1 token 3/3 y un token 4/4, con defensor
			else if(this.efecto[1]==4){
				this.invocarToken(usuario,1,2);
				this.invocarToken(usuario,1,3);
				this.invocarToken(usuario,1,4);
				var cartasAtaque=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaque.length;i++){
					if(cartasAtaque[i].vidas==2 && cartasAtaque[i].ataque==2 && cartasAtaque[i].tipo=="token" && cartasAtaque[i].haAtacado==true){
						cartasAtaque[i].insertarHabilidad("defensor");
					}else if(cartasAtaque[i].vidas==3 && cartasAtaque[i].ataque==3 && cartasAtaque[i].tipo=="token" && cartasAtaque[i].haAtacado==true){
						cartasAtaque[i].insertarHabilidad("defensor");
					}else if(cartasAtaque[i].vidas==4 && cartasAtaque[i].ataque==4 && cartasAtaque[i].tipo=="token" && cartasAtaque[i].haAtacado==true){
						cartasAtaque[i].insertarHabilidad("defensor");
					}					
				}
				this.esUsado();
			}
		}


		//[6,_,_] -> efecto de devolver cartas a la mano (invocaciones desde la zona de ataque)
		else if(this.efecto[0]==6){
			//[6,0,X] Devuelve la invocacion rival a la mano de su propietario
			if(this.efecto[1]==0 && this.tipoObjetivo=="cartaRival"){
				var cartasMano;
				var rival=usuario.partida.obtenerRival(usuario);
				cartasMano=rival.obtenerCartasMano();
				if(cartasMano.length<10){
					this.objetivo.posicion="mano";
					this.objetivo.establecerDatosBase();
				}else{
					if(this.objetivo.tipo=="token"){
						this.objetivo.posicion="nada";
						this.objetivo.establecerDatosBase();
					}else{
						this.objetivo.posicion="cementerio";
						this.objetivo.establecerDatosBase();
					}					
				}
				this.esUsado();
			}
			//[6,1,X] Devuelve la invocacion aliada a la mano de su propietario
			else if(this.efecto[1]==1 && this.tipoObjetivo=="cartaJugador"){
				this.posicion="cementerio";
				var cartasMano;
				cartasMano=usuario.obtenerCartasMano();
				if(cartasMano.length>=10){
					if(this.objetivo.tipo=="token"){
						this.objetivo.posicion="nada";
						this.objetivo.establecerDatosBase();
					}else{
						this.objetivo.posicion="cementerio";
						this.objetivo.establecerDatosBase();
					}
				}else{
					this.objetivo.posicion="mano";
					this.objetivo.establecerDatosBase();
				}
				this.esUsado();
			}
			//[6,2,X] Devuelve todas las invocaciones del jugador a la mano de su propietario
			else if(this.efecto[1]==2){
				this.posicion="cementerio";
				var cartasMano;
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();		
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					cartasMano=usuario.obtenerCartasMano();
					if(cartasMano.length<10){
						cartasAtaqueUsuario[i].posicion="mano";
						cartasAtaqueUsuario[i].establecerDatosBase();
					}else{
						if(cartasAtaqueUsuario[i].tipo=="invocacion"){
							cartasAtaqueUsuario[i].posicion="cementerio";
							cartasAtaqueUsuario[i].establecerDatosBase();
						}else{
							cartasAtaqueUsuario[i].posicion="nada";
							cartasAtaqueUsuario[i].establecerDatosBase();
						}						
					}					
				}
				this.esUsado();
			}
			//[6,3,X] Devuelve todas las invocaciones del rival a la mano de su propietario
			else if(this.efecto[1]==3){
				this.posicion="cementerio";
				var cartasMano;
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();		
				for(var i=0;i<cartasAtaqueRival.length;i++){
					var cartasMano=rival.obtenerCartasMano();
					if(cartasMano.length<10){
						cartasAtaqueRival[i].posicion="mano";
						cartasAtaqueRival[i].establecerDatosBase();
					}else{
						if(cartasAtaqueRival[i].tipo=="invocacion"){
							cartasAtaqueRival[i].posicion="cementerio";
							cartasAtaqueRival[i].establecerDatosBase();
						}else{
							cartasAtaqueRival[i].posicion="nada";
							cartasAtaqueRival[i].establecerDatosBase();
						}						
					}					
				}
				this.esUsado();
			}
			//[6,4,X] Devuelve todas las invocaciones a la mano de sus propietarios
			else if(this.efecto[1]==4){
				this.posicion="cementerio";
				var cartasMano=usuario.obtenerCartasMano();
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();		
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					var cartasMano=usuario.obtenerCartasMano();
					if(cartasMano.length<10){
						cartasAtaqueUsuario[i].posicion="mano";
						cartasAtaqueUsuario[i].establecerDatosBase();
					}else{
						if(cartasAtaqueUsuario[i].tipo=="invocacion"){
							cartasAtaqueUsuario[i].posicion="cementerio";
							cartasAtaqueUsuario[i].establecerDatosBase();
						}else{
							cartasAtaqueUsuario[i].posicion="nada";
							cartasAtaqueUsuario[i].establecerDatosBase();
						}
					}					
				}
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();		
				for(var i=0;i<cartasAtaqueRival.length;i++){
					var cartasMano=rival.obtenerCartasMano();
					if(cartasMano.length<10){
						cartasAtaqueRival[i].posicion="mano";
						cartasAtaqueRival[i].establecerDatosBase();
					}else{
						if(cartasAtaqueRival[i].tipo=="invocacion"){
							cartasAtaqueRival[i].posicion="cementerio";
							cartasAtaqueRival[i].establecerDatosBase();
						}else{
							cartasAtaqueRival[i].posicion="nada";
							cartasAtaqueRival[i].establecerDatosBase();
						}						
					}					
				}
				this.esUsado();			
			}
		}

		
		//[7,_,_] -> efectos relacionados con el cementerio 
		else if(this.efecto[0]==7){
			//[7,0,X] Devuelve todas las cartas del cementerio al mazo del jugador, despues se baraja el mazo
			//PENDIENTE: traer de vuelta solo invocaciones, solo hechizos, un numero determinado de cada uno, etc
			if(this.efecto[1]==0){
				var cartasCementerio=usuario.obtenerCartasCementerio();
				for(var i=0;i<cartasCementerio.length;i++){
					cartasCementerio[i].posicion="mano";
				}
				var cartasMazo=usuario.obtenerCartasMazo();
				cartasMazo=_.shuffle(cartasMazo);
				this.esUsado();
			}
			//[7,1,X] Devuelve hasta X cartas del cementerio a la mano del jugador
			else if(this.efecto[1]==1){
				this.posicion="cementerio";
				for(var i=0;i<this.efecto[2];i++){
					var cartasCementerio=_.shuffle(usuario.obtenerCartasCementerio());
					var cartasMano=usuario.obtenerCartasMano();
					if(cartasCementerio && cartasMano){
						if(cartasCementerio.length!=0 && cartasMano.length!=10){
							cartasCementerio[i].posicion="mano";
						}
					}					
				}
				this.esUsado();				
			}
			//[7,2,X] Devuelve X cartas de invocacion aleatorias desde el cementerio a la mano del jugador
			else if(this.efecto[1]==2){
				this.posicion="cementerio";
				for(var i=0;i<this.efecto[2];i++){
					var cartasCementerio=_.shuffle(usuario.obtenerInvocacionesCementerio());
					var cartasMano=usuario.obtenerCartasMano();
					if(cartasCementerio && cartasMano){
						if(cartasCementerio.length!=0 && cartasMano.length!=10){
							cartasCementerio[i].posicion="mano";
						}
					}
				}
				this.esUsado();	
			}
			//[7,3,X] Devuelve X cartas de hechizo aleatorias desde el cementerio a la mano del jugador
			else if(this.efecto[1]==3){
				this.posicion="cementerio";
				for(var i=0;i<this.efecto[2];i++){
					var cartasCementerio=_.shuffle(usuario.obtenerHechizosCementerio());
					var cartasMano=usuario.obtenerCartasMano();
					if(cartasCementerio && cartasMano){
						if(cartasCementerio.length!=0 && cartasMano.length!=10){
							cartasCementerio[i].posicion="mano";
						}
					}
				}	
				this.esUsado();
			}
			//[7,4,X] Devuelve X cartas de invocacion aleatorias desde el cementerio al campo de batalla
			else if(this.efecto[1]==4){
				this.posicion="cementerio";
				for(var i=0;i<this.efecto[2];i++){
					var cartasCementerio=_.shuffle(usuario.obtenerInvocacionesCementerio());					
					var cartasAtaque=usuario.obtenerCartasAtaque();
					if(cartasCementerio && cartasAtaque){
						if(cartasCementerio.length!=0 && cartasAtaque.length!=7){
							cartasCementerio[i].posicion="ataque";
						}	
					}				
				}		
				this.esUsado();		
			}
			//[7,5,X] Vacia el cementerio del rival (nombre de carta: "enterrar", clase:tierra)
			else if(this.efecto[1]==5){
				this.posicion="cementerio";
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasCementerio=rival.obtenerCartasCementerio();
				for(var i=0;i<cartasCementerio.length;i++){
					cartasCementerio[i].posicion="nada";
				}
				this.esUsado();
			}
			//[7,6,X] Devuelve X cartas de invocacion de coste 3 o menos a la zona de ataque
			else if(this.efecto[1]==6){
				this.posicion="cementerio";
				for(var i=0;i<this.efecto[2];i++){
					var cartasCementerio=_.shuffle(usuario.obtenerInvocacionesCementerio());					
					var cartasAtaque=usuario.obtenerCartasAtaque();
					if(cartasCementerio && cartasAtaque){
						if(cartasCementerio.length!=0 && cartasAtaque.length!=7 && cartasCementerio[i].coste<=3){
							cartasCementerio[i].posicion="ataque";
						}		
					}			
				}	
				this.esUsado();			
			}
			//[7,7,X] Devuelve X cartas de invocacion de coste 4 o mas a la zona de ataque
			else if(this.efecto[1]==7){
				this.posicion="cementerio";
				for(var i=0;i<this.efecto[2];i++){
					var cartasCementerio=_.shuffle(usuario.obtenerInvocacionesCementerio());					
					var cartasAtaque=usuario.obtenerCartasAtaque();
					if(cartasCementerio && cartasAtaque){
						if(cartasCementerio.length!=0 && cartasAtaque.length!=7 && cartasCementerio[i].coste>3){
							cartasCementerio[i].posicion="ataque";
						}		
					}			
				}
				this.esUsado();				
			}
		}

		//[8,_,_] -> efectos de curacion
		else if(this.efecto[0]==8){
			//[8,0,X] Cura X vidas al jugador
			if(this.efecto[1]==0){
				this.restaurarVidasObjetivo(usuario,efecto[2]);
				this.esUsado();
			}
			//[8,1,X] Cura X vidas al objetivo
			else if(this.efecto[1]==1){
				if(this.tipoObjetivo=="jugador"){
					this.restaurarVidasObjetivo(usuario,efecto[2]);
				}else if(this.tipoObjetivo=="rival"){
					var rival=usuario.partida.obtenerRival(usuario);
					this.restaurarVidasObjetivo(rival,efecto[2]);
				}else{
					this.restaurarVidasObjetivo(this.objetivo,efecto[2]);
				}				
				this.esUsado();
			}
			//[8,2,X] Cura X vidas a todas las invocaciones aliadas
			else if(this.efecto[1]==2){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();		
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					this.restaurarVidasObjetivo(cartasAtaqueUsuario[i],efecto[2]);
				}
				this.esUsado();
			}
		}


		//[9,_,_] -> efectos de otorgar habilidades, etc
		else if(this.efecto[0]==9 && this.tipoObjetivo=="cartaJugador"){
			//[9,0,X] Otorga la habilidad X a la invocacion objetivo
			if(this.efecto[1]==0){
				this.objetivo.insertarHabilidad(this.efecto[2]);
				this.esUsado();
			}
			//[9,1,X] Otorga la habilidad X a la invocacion objetivo y le otorga +1/+1
			else if(this.efecto[1]==1){
				this.objetivo.insertarHabilidad(this.efecto[2]);
				this.objetivo.cambiarAtaqueVidas(1);
				this.esUsado();
			}
			//[9,2,X] Otorga la habilidad X a la invocacion objetivo y le otorga +2/+2
			else if(this.efecto[1]==2){
				this.objetivo.insertarHabilidad(this.efecto[2]);
				this.objetivo.cambiarAtaqueVidas(2);
				this.esUsado();
			}
			//[9,3,X] Otorga la habilidad X a la invocacion objetivo y le otorga +3/+3
			else if(this.efecto[1]==3){
				this.objetivo.insertarHabilidad(this.efecto[2]);
				this.objetivo.cambiarAtaqueVidas(3);
				this.esUsado();
			}
			//[9,4,X] Otorga la habilidad X a la invocacion objetivo y le otorga +3/+0
			else if(this.efecto[1]==4){
				this.objetivo.insertarHabilidad(this.efecto[2]);
				this.objetivo.setAtaque(this.objetivo.ataque+3);
				this.esUsado();
			}
		}
		//[10,_,_] -> efectos unicos
		else if(this.efecto[0]==10){
			//[10,0,X] Defender el nucleo: invoca un token 2/2 con veloz por cada invocacion enemiga
			if(this.efecto[1]==0){
				var rival=usuario.partida.obtenerRival(usuario);
				cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				while(cartasAtaqueUsuario.length<cartasAtaqueRival.length){
					this.invocarToken(usuario,1,2);
					cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
					for(var i=0;i<cartasAtaqueUsuario.length;i++){
						if(cartasAtaqueUsuario[i].vidas==2 && cartasAtaqueUsuario[i].ataque==2 && cartasAtaqueUsuario[i].tipo=="token" && cartasAtaqueUsuario[i].haAtacado==true){
							cartasAtaqueUsuario[i].haAtacado=false;
							cartasAtaqueUsuario[i].insertarHabilidad("veloz");
						}			
					}
				}
				usuario.actualizarTextoCartas();
				this.esUsado();			
			}
			//[10,1,X] -> congela todas las invocaciones enemigas
			else if(this.efecto[1]==1){		
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();		
				for(var i=0;i<cartasAtaqueRival.length;i++){
					cartasAtaqueRival[i].turnosCongelado=1;
				}
				this.esUsado();
			}
			//[10,2,X] -> congela todas las invocaciones enemigas y les hace X daños
			else if(this.efecto[1]==2){		
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueRival.length;i++){
					if(!cartasAtaqueRival[i].tieneHabilidad("escudoDivino")){
						cartasAtaqueRival[i].vidas=cartasAtaqueRival[i].vidas-this.efecto[2];
						cartasAtaqueRival[i].comprobarVidas();
					}else{
						cartasAtaqueRival[i].quitarHabilidad("escudoDivino");
					}
					cartasAtaqueRival[i].turnosCongelado=1;
				}	
				this.esUsado();
			}
			//[10,3,X] -> todas las invocaciones del jugador con defensor obtienen +X/+X
			else if(this.efecto[1]==3){
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					if(cartasAtaqueUsuario[i].tieneHabilidad("defensor")){
						cartasAtaqueUsuario[i].cambiarAtaqueVidas(this.efecto[2]);
					}					
					//cartasAtaqueUsuario[i].vidas=cartasAtaqueUsuario[i].vidas+this.efecto[2];
					//cartasAtaqueUsuario[i].ataque=cartasAtaqueUsuario[i].ataque+this.efecto[2];
				}
				this.esUsado();
			}
			//[10,4,X] -> Hace X daño a todas las invocaciones, te curas X vidas y robas 2 cartas
			else if(this.efecto[1]==4){
				this.posicion="cementerio";
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				var cartasAtaqueUsuario=usuario.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueRival.length;i++){
					if(!cartasAtaqueRival[i].tieneHabilidad("escudoDivino")){
						cartasAtaqueRival[i].vidas=cartasAtaqueRival[i].vidas-this.efecto[2];
						cartasAtaqueRival[i].comprobarVidas();
					}else{
						cartasAtaqueRival[i].quitarHabilidad("escudoDivino");
					}
				}
				for(var i=0;i<cartasAtaqueUsuario.length;i++){
					if(!cartasAtaqueUsuario[i].tieneHabilidad("escudoDivino")){
						cartasAtaqueUsuario[i].vidas=cartasAtaqueUsuario[i].vidas-this.efecto[2];
						cartasAtaqueUsuario[i].comprobarVidas();
					}else{
						cartasAtaqueUsuario[i].quitarHabilidad("escudoDivino");
					}
				}	
				this.restaurarVidasObjetivo(usuario,this.efecto[2]);
				usuario.cogerCarta();
				usuario.cogerCarta();
				this.esUsado();
			}
			//[10,5,X] -> destruye todas las invocaciones del rival congeladas, congela el resto
			else if(this.efecto[1]==5){		
				var rival=usuario.partida.obtenerRival(usuario);
				var cartasAtaqueRival=rival.obtenerCartasAtaque();
				for(var i=0;i<cartasAtaqueRival.length;i++){
					if(cartasAtaqueRival[i].turnosCongelado!=0){
						cartasAtaqueRival[i].vidas=0;
						cartasAtaqueRival[i].comprobarVidas();
					}else{
						cartasAtaqueRival[i].turnosCongelado=1;
					}
				}	
				this.esUsado();
			}
		}		
	}

	this.indiceEfecto=function(){
		var texto="";
		if(this.efecto[0]==0){
			if(this.efecto[1]==0){
				texto="Roba "+this.efecto[2]+" carta";
				if(this.efecto[2]>1){texto=texto+"s"}
			}else if(this.efecto[1]==1){
				texto="El rival roba "+this.efecto[2]+" carta";
				if(this.efecto[2]>1){texto=texto+"s"}
			}else if(this.efecto[1]==2){
				texto="Los dos jugadores roban "+this.efecto[2]+" carta";
				if(this.efecto[2]>1){texto=texto+"s"}
			}else if(this.efecto[1]==3){
				texto="Roba "+this.efecto[2]+" cartas y descarta una carta aleatoria";
			}
			return texto;
		}else if(this.efecto[0]==1){
			if(this.efecto[1]==0){
				texto="Inflige "+this.efecto[2]+" p. de daño al rival";
			}else if(this.efecto[1]==1){
				texto="Inflige "+this.efecto[2]+" p. de daño al objetivo";
			}else if(this.efecto[1]==2){
				texto="Inflige "+this.efecto[2]+" p. de daño a todas las inv. del rival";
			}else if(this.efecto[1]==3){
				texto="Inflige "+this.efecto[2]+" p. de daño a todas las inv.";
			}else if(this.efecto[1]==4){
				texto="Inflige "+this.efecto[2]+" p. de daño a todas las entidades";
			}else if(this.efecto[1]==5){
				texto="Inflige "+this.efecto[2]+" p. de daño a la inv. objetivo";
			}else if(this.efecto[1]==6){
				texto="Inflige "+this.efecto[2]+" p. de daño a la inv. objetivo y la congela";
			}else if(this.efecto[1]==7){
				texto="Inflige "+this.efecto[2]+" p. de daño a la inv. objetivo, te curas esa cantidad de vidas";
			}
			return texto;
		}else if(this.efecto[0]==2){
			if(this.efecto[1]==0 && this.efecto[2]>=0){
				texto="Otorga +"+this.efecto[2]+"/+"+this.efecto[2]+" a la inv. objetivo";
			}else if(this.efecto[1]==0 && this.efecto[2]<0){
				texto="Otorga "+this.efecto[2]+"/"+this.efecto[2]+" a la inv. objetivo";
			}else if(this.efecto[1]==1){
				texto="Otorga +"+this.efecto[2]+"+/"+this.efecto[2]+" a todas tus inv.";
			}else if(this.efecto[1]==2){
				texto="Otorga +X/+X a la inv. aliada objetivo, donde X es el mayor ataque de las inv. que controlas";
			}else if(this.efecto[1]==3){
				texto="Otorga +"+this.efecto[2]+" p. de ataque a la inv. aliada objetivo hasta el final del turno";
			}else if(this.efecto[1]==4){
				texto="Dublica el ataque de la inv. aliada objetivo";
			}else if(this.efecto[1]==5){
				texto="Dublica la salud de la inv. aliada objetivo";
			}else if(this.efecto[1]==6){
				texto="Otorga +"+this.efecto[2]+" p. de ataque a la inv. aliada objetivo";
			}else if(this.efecto[1]==7){
				texto="Otorga +"+this.efecto[2]+" p. de salud a la inv. aliada objetivo";
			}else if(this.efecto[1]==8){
				texto="Otorga -"+this.efecto[2]+"/-"+this.efecto[2]+" a todas las inv. enemigas";
			}else if(this.efecto[1]==9){
				texto="Otorga -X/-X a todas las inv. enemigas, donde X es el ataque de la inv. aliada objetivo";
			}else if(this.efecto[1]==10){
				texto="Otorga +X/+X a todas tus inv., donde X es el numero de inv. aliadas";
			}else if(this.efecto[1]==11){
				texto="Otorga +"+this.efecto[2]+" p. de ataque a todas las inv. aliadas hasta el final del turno";
			}else if(this.efecto[1]==12){
				texto="Otorga +"+this.efecto[2]+" p. de ataque y escudo divino a todas las inv. aliadas hasta el final del turno";
			}
			return texto;
		}else if(this.efecto[0]==3){
			if(this.efecto[1]==0){
				texto="Destruye la inv. objetivo";
			}else if(this.efecto[1]==1){
				texto="Destruye "+this.efecto[2]+" inv. enemiga aleatoria";
			}else if(this.efecto[1]==2){
				texto="Destruye todas las inv.";
			}else if(this.efecto[1]==3){
				texto="";
			}else if(this.efecto[1]==4){
				texto="Destruye todas las inv. de coste igual o menor que 3";
			}else if(this.efecto[1]==5){
				texto="Destruye todas las inv. de coste igual o mayor que 4";
			}else if(this.efecto[1]==6){
				texto="Destruye la inv. objetivo de coste igual o menor que 3";
			}else if(this.efecto[1]==7){
				texto="Destruye la inv. objetivo de coste igual o mayor que 4";
			}
			return texto;
		}else if(this.efecto[0]==4){
			if(this.efecto[1]==0){
				texto="Aumenta tu mana en "+this.efecto[2]+" (afecta al siguiente turno)";
			}else if(this.efecto[1]==1){
				texto="Aumenta el mana de los dos jugadores en "+this.efecto[2]+" (afecta al siguiente turno)";
			}
			return texto;
		}else if(this.efecto[0]==5){
			if(this.efecto[1]==0){
				texto="Invoca "+this.efecto[2]+" token 1/1";
			}else if(this.efecto[1]==1){
				texto="Invoca "+this.efecto[2]+" token 2/2";
			}else if(this.efecto[1]==2){
				texto="Invoca "+this.efecto[2]+" token 3/3";
			}else if(this.efecto[1]==3){
				texto="Invoca "+this.efecto[2]+" token 4/4";
			}else if(this.efecto[1]==4){
				texto="invoca un token 2/2, un token 3/3 y un token 4/4, todos con defensor";
			}
			return texto;
		}
		else if(this.efecto[0]==6){
			if(this.efecto[1]==0){
				texto="Devuelve la inv. enemiga a la mano del rival";
			}else if(this.efecto[1]==1){
				texto="Devuelve la inv. aliada a la mano";
			}else if(this.efecto[1]==2){
				texto="Devuelve la inv. aliada a la mano";
			}else if(this.efecto[1]==3){
				texto="Devuelve todas las inv. aliadas a la mano";
			}else if(this.efecto[1]==4){
				texto="Devuelve todas las inv. enemigas a la mano del rival";
			}else if(this.efecto[1]==4){
				texto="Devuelve todas las inv. a la mano de sus propietarios";
			}
			return texto;
		}else if(this.efecto[0]==7){
			if(this.efecto[1]==1){
				texto="Devuelve hasta "+this.efecto[2]+" cartas del cementerio a la mano";
			}else if(this.efecto[1]==2){
				texto="Devuelve hasta "+this.efecto[2]+" invocaciones del cementerio a la mano";
			}else if(this.efecto[1]==3){
				texto="Devuelve hasta "+this.efecto[2]+" hechizos del cementerio a la mano";
			}else if(this.efecto[1]==4){
				texto="Devuelve hasta "+this.efecto[2]+" invocaciones del cementerio a la zona de ataque";
			}else if(this.efecto[1]==5){
				texto="";
			}else if(this.efecto[1]==6){
				texto="Devuelve hasta "+this.efecto[2]+" invocaciones de coste igual o menor que 3 del cementerio a la zona de ataque";
			}else if(this.efecto[1]==7){
				texto="Devuelve hasta "+this.efecto[2]+" invocaciones de coste igual o mayor que 4 del cementerio a la zona de ataque";
			}
			return texto;
		}else if(this.efecto[0]==8){
			if(this.efecto[1]==0){
				texto="Cura "+this.efecto[2]+" p. de salud al jugador";
			}else if(this.efecto[1]==1){
				texto="Cura "+this.efecto[2]+" p. de salud al objetivo";
			}else if(this.efecto[1]==2){
				texto="Cura "+this.efecto[2]+" p. de salud a todas las inv. aliadas";
			}
			return texto;
		}else if(this.efecto[0]==9){
			if(this.efecto[1]==0){
				texto="Otorga "+this.efecto[2]+" a la inv. aliada objetivo";
			}else if(this.efecto[1]==1){
				texto="Otorga +1/+1 y "+this.efecto[2]+" a la inv. aliada objetivo";
			}else if(this.efecto[1]==2){
				texto="Otorga +2/+2 y "+this.efecto[2]+" a la inv. aliada objetivo";
			}else if(this.efecto[1]==3){
				texto="Otorga +3/+3 y "+this.efecto[2]+" a la inv. aliada objetivo";
			}else if(this.efecto[1]==4){
				texto="Otorga +3 p. de ataque y "+this.efecto[2]+" a la inv. aliada objetivo";
			}
			return texto;
		}else if(this.efecto[0]==10){
			if(this.efecto[1]==0){
				texto="invoca un token 2/2 con veloz por cada inv. enemiga";
			}else if(this.efecto[1]==1){
				texto="Congela todas las inv. enemigas";
			}else if(this.efecto[1]==2){
				texto="Inflige "+this.efecto[2]+"p. de daño a todas las inv. enemigas y las congela";
			}else if(this.efecto[1]==3){
				texto="Otorga +"+this.efecto[2]+"/+"+this.efecto[2]+" a todas las inv. aliadas con defensor";
			}else if(this.efecto[1]==4){
				texto="Inflige "+this.efecto[2]+" p. de daño a todas las inv., te curas "+this.efecto[2]+" p. de salud y robas 2 cartas";
			}else if(this.efecto[1]==1){
				texto="Destruye todas las inv. congeladas enemigas, congela el resto de inv. enemigas";
			}
			return texto;
		}
	}


//Valores posibles:"veloz","gritoBatalla","ultimaVoluntad","ataqueDoble"
				//"escudoDivino","antimagia", "congelar","inspirar","absorcionVital"
				//"letalidad","defensor","oculto", "finTurno"
	this.mostrarTexto=function(){
		var texto="";
		if(this.tipo=="invocacion" || this.tipo=="token"){
			if(this.tipoHabilidad==undefined){
				return texto;
			}else{
				for(var i=0;i<this.tipoHabilidad.length;i++){
					var encontrada=false;
					if(this.tipoHabilidad[i]=="veloz"){
						texto=texto+"Veloz";
						encontrada=true;
					}else if(this.tipoHabilidad[i]=="escudoDivino"){
						texto=texto+"Escudo divino";
						encontrada=true;
					}else if(this.tipoHabilidad[i]=="antimagia"){
						texto=texto+"Antimagia";
						encontrada=true;
					}else if(this.tipoHabilidad[i]=="congelar"){
						texto=texto+"Congelar";
						encontrada=true;
					}else if(this.tipoHabilidad[i]=="absorcionVital"){
						texto=texto+"Absorcion vital";
						encontrada=true;
					}else if(this.tipoHabilidad[i]=="letalidad"){
						texto=texto+"Letalidad";
						encontrada=true;
					}else if(this.tipoHabilidad[i]=="defensor"){
						texto=texto+"Defensor";
						encontrada=true;
					}else if(this.tipoHabilidad[i]=="oculto"){
						texto=texto+"Oculto";
						encontrada=true;
					}else if(this.tipoHabilidad[i]=="ataqueDoble"){
						texto=texto+"Ataque doble";
						encontrada=true;
					}
					if(i!=this.tipoHabilidad.length-1 && encontrada){
						texto=texto+", ";
					}
				}
				if(this.tieneHabilidad("gritoBatalla")){
						texto=texto+"Grito de batalla: "+this.indiceHabilidad();
				}else if(this.tieneHabilidad("ultimaVoluntad")){
						texto=texto+"Ultima volundad: "+this.indiceHabilidad();
				}else if(this.tieneHabilidad("finTurno")){
						texto=texto+this.indiceHabilidad();
				}
				//texto=texto+", ";
				return texto;
			}
		}else{
			texto=texto+this.indiceEfecto();
			return texto;
		}	
	}
	//Datos para mostrar la informacion de las cartas
	this.texto=this.mostrarTexto();
}








module.exports.Juego=Juego;
module.exports.Usuario=Usuario;
module.exports.MiTurno=MiTurno;
module.exports.NoMiTurno=NoMiTurno;
module.exports.Carta=Carta;