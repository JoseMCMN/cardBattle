function Juego(){
	this.cartas=[];
	this.usuarios=[];
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

	this.crearColeccion();
}

function Usuario(nombre,juego){
	this.nombre=nombre;
	this.juego=juego;
	this.mazo=[];
	this.mano=[];
}


function Carta(vidas,ataque,nombre,coste){
	this.vidas=vidas;
	this.ataque=ataque;
	this.nombre=nombre;
	this.coste=coste;
}

/*function Mazo(numCartas){
	for(i=0,i<numCartas,i++){
		this.agregarCarta
	}
}*/

module.exports.Juego=Juego;
module.exports.Usuario=Usuario;
