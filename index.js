var fs=require("fs");
//var config=JSON.parse(fs.readFileSync("config.json"));
//var host=config.host;
//var port=config.port;
var bodyParser=require("body-parser");
var exp=require("express");
var app=exp(); 
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var modelo=require("./servidor/modelo.js");
var comSrv=require('./servidor/comSrv.js');
var com=new comSrv.ComSrv();

var juego=new modelo.Juego();

app.set('port', (process.env.PORT || 5000));
app.use(exp.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
 	var contenido=fs.readFileSync("./cliente/index-bs.html");    
	response.setHeader("Content-type","text/html");
	response.send(contenido);  
});

app.get("/agregarUsuario/:nombre",function(request,response){
	var usr1=new modelo.Usuario(request.params.nombre);
	//var usrid;
	juego.agregarUsuario(usr1);
	response.send({"usr":usr1.id});
});

app.get("/comprobarUsuario/:usrid",function(request,response){
	var usrid=request.params.usrid;
	var usr=juego.usuarios[usrid];
	var json={"partida":undefined}
	if (usr && usr.partida){
		json={"partida":usr.partida.nombre};
	}
	response.send(json);
});

app.get("/crearPartida/:usrid/:nombre",function(request,response){
	var usrid=request.params.usrid;
	var partida=request.params.nombre;
	var usr=juego.usuarios[usrid];
	var partidaId=-1;
	if (usr){
		partidaId=usr.crearPartida(partida);
	}
	response.send({"partidaId":partidaId});
});

app.get('/obtenerPartidas', function(request, response) {
	var json=[];
	var partidas=juego.obtenerPartidas();

	if (partidas.length!=0){
		for(var i=0;i<partidas.length;i++){
			var partida=partidas[i];
			json.push({"idPartida":partida.id,"nombre":partida.nombre});
		}
	}
	response.send(json);
});


app.get("/elegirPartida/:usrid/:nombre",function(request,response){
	var usrid=request.params.usrid;
	var partida=request.params.nombre;
	var usr=juego.usuarios[usrid]; 
	var partidaId=-1;
	if (usr){
		partidaId=usr.eligePartida(partida);
	}
	response.send({"partidaId":partidaId});
});

app.get("/obtenerCartasMano/:usrid",function(request,response){
	var usrid=request.params.usrid;
	var usr=juego.usuarios[usrid];
	var json=[];
	if (usr){
		var coleccion=usr.obtenerCartasMano();
		json=usr.obtenerCartasMano();
		// for(var i=0;i<coleccion.length;i++){
		// 	var carta=coleccion[i];
		// 	json.push({"idCarta":i,"vidas":carta.vidas,"ataque":carta.ataque,"coste":carta.coste});
		// }
	}
	response.send(json);
});

app.get("/jugarCarta/:usrid/:cartaid", function(request,response) {
    var usrid   = request.params.usrid;
    var cartaid = request.params.cartaid;
    var usr     = juego.usuarios[usrid]; //juego.obtenerUsuario(usrid)
    if (usr){
   	    var carta   = usr.obtenerCartaMano(cartaid);
	    usr.jugarCarta(carta);
	  //  const respuesta = usr.nombre + ", has jugado la carta " + carta.nombre;
    	response.send({"posicion":carta.posicion});
    }
    else{
    	response.send({"posicion":-1});
    }
});



//console.log("Servidor escuchando en "+app.get('port'));
//app.listen(port,host);

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


com.lanzarSocketSrv(io,juego);