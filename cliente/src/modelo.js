function Juego(){
	this.cartas=[];
	this.usuarios=[];
	this.tablero=undefined;
	this.agregarCarta=function(carta){
		this.cartas.push(carta);
	}
	this.agregarUsuario=function(usuario){
		usuario.mazo=this.cartas;
		usuario.juego=this;
		this.usuarios.push(usuario);
	}
	this.crearColeccion=function(usuario){
		//10 cartas de ataque 5 coste 3 vida 5
		for(var i=0;i<10;i++){
			this.cartas.push(new Carta("dragon"+i,5,5,3));
		}
		//10 cartas ataque 3 coste 5 vida 10
		for(var i=0;i<10;i++){
			this.cartas.push(new Carta("guerrero"+i,10,3,5));
		}
		//10 cartas ataque 2 coste 1 vida 2
		for(var i=0;i<10;i++){
			this.cartas.push(new Carta("esbirro"+i,2,2,1));
		}
	}
	this.agregarTablero=function(tablero){
		this.tablero=tablero;
	}

	//aqui se construye el juego
	this.crearColeccion();
	this.agregarTablero(new Tablero());
}

function Tablero(){
	this.zonas=[];
	this.agregarZona=function(zona){
		this.zonas.push(zona);
	}
	this.crearZona=function(){
		this.agregarZona(new Zona("arriba"));
		this.agregarZona(new Zona("abajo"));
	}
	this.crearZona();
}
function Usuario(nombre){
	this.nombre=nombre;
	this.juego=undefined;
	this.mazo=[];
	this.mano=[];
	this.zona=undefined;
	this.agregarZona=function(zona){
		this.zona=zona;
	}
}


function Carta(vidas,ataque,nombre,coste){
	this.vidas=vidas;
	this.ataque=ataque;
	this.nombre=nombre;
	this.coste=coste;
}

function Zona(){
	this.ataque=[];
	this.mano=[];
	this.mazo=[];
	this.agregarAtaque=function(carta){
		this.ataque.push(carta);
	}
	this.agregarMano=function(carta){
		this.mano.push(carta);
	}
	this.agregarMazo=function(carta){
		this.mazo=mazo;
	}
}


//module.exports.Juego=Juego;
//module.exports.Usuario=Usuario;