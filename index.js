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
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
 	var contenido=fs.readFileSync("./cliente/index-bs.html");    
	response.setHeader("Content-type","text/html");
	response.send(contenido);  
});

app.post('/registrarUsuario', function(request,response){
	var email=request.body.email;
	var clave=request.body.clave;
	console.log("La clave desde index.js es: "+clave);
	juego.registrarUsuario(email,clave,function(data){
		response.send(data);
	});
});

app.post('/loginUsuario', function(request,response){
	var email=request.body.email;
	var clave=request.body.clave;
	
	juego.loginUsuario(email,clave,function(data){
		response.send(data);
	});
});
/*
app.post('/logOutUsuario', function(request,response){
	var email=request.body.email;
    juego.logOutUsuario(email,function(result){
        response.send(data);
    });
});*/

app.get("/confirmarUsuario/:email/:key",function(request,response){
	var email=request.params.email;
	var key=request.params.key;
	juego.confirmarUsuario(email,key,function(data){
		if(data.res=="ok"){
			response.redirect("/");
		}
		else{
			response.send("<h1>La cuenta ya esta activada<h1>");
		}
	});
});

app.get('/obtenerKeyUsuario/:email',function(request,response){
	var email=request.params.email;
	juego.obtenerKey(email,function(data){
		response.send(data);
	})
});

app.get("/agregarUsuario/:nombre",function(request,response){
	//var usr1=new modelo.Usuario(request.params.nombre);
	//var usrid;
	//juego.agregarUsuario(usr1);
	response.send({"usr":-1});
});



app.get("/comprobarUsuario/:usrid",function(request,response){
	var usrid=request.params.usrid;
	//var usr=juego.usuarios[usrid];
	var usr=juego.obtenerUsuario(usrid);
	var json={"partida":undefined}
	if (usr && usr.partida){
		json={"partida":usr.partida.nombre,"nombreUsr":usr.nombre};
	}
	response.send(json);
});

app.delete("/eliminarUsuario/:uid",function(request,response){
    var uid=request.params.uid;
    juego.eliminarUsuario(uid,function(result){
        response.send(result);
    });
});

app.put("/actualizarUsuario",function(request,response){
    juego.actualizarUsuario(request.body,function(result){
            response.send(result);
        });
});

app.get("/buscarPartida/:usrid",function(request,response){
	var usrid=request.params.usrid;
	//var partida=request.params.nombre;
	var usr=juego.obtenerUsuario(usrid);
	var partidaId=-1;
	var json={"idPartida":-1,"creada":undefined};
	if (usr){
		json=usr.buscarPartida();
		//json=JSON.parse(json);
	}
	response.send(json);
});

app.get("/crearPartida/:usrid/:nombre",function(request,response){
	var usrid=request.params.usrid;
	var partida=request.params.nombre;
	var usr=juego.obtenerUsuario(usrid);
	var partidaId=-1;
	if (usr){
		partidaId=usr.crearPartida(partida);
	}
	response.send({"partidaId":partidaId});
});

/*app.get('/obtenerPartidas', function(request, response) {
	var json=[];
	var partidas=juego.obtenerPartidas();

	if (partidas.length!=0){
		for(var i=0;i<partidas.length;i++){
			var partida=partidas[i];
			json.push({"idPartida":partida.id,"nombre":partida.nombre});
		}
	}
	response.send(json);
});*/
app.get('/obtenerPartidas/:usrid', function(request, response) {
	var json=[];
	var usrid=request.params.usrid;
	var partidas=juego.obtenerPartidas();

	if (partidas.length!=0){
		for(var i=0;i<partidas.length;i++){
			var partida=partidas[i];
			if(partida.usuariosPartida[0].id!=usrid){
				json.push({"idPartida":partida.id,"nombre":partida.nombre});
			}
		}
	}
	response.send(json);
});

app.get("/elegirPartida/:usrid/:nombre",function(request,response){
	var usrid=request.params.usrid;
	var partida=request.params.nombre;
	var usr=juego.obtenerUsuario(usrid); 
	var partidaId=-1;
	if (usr){
		partidaId=usr.eligePartida(partida);
	}
	response.send({"partidaId":partidaId});
});

app.get("/obtenerCartasMano/:usrid",function(request,response){
	var usrid=request.params.usrid;
	var usr=juego.obtenerUsuario(usrid);
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

app.get("/obtenerCartasCementerio/:usrid",function(request,response){
	var usrid=request.params.usrid;
	var usr=juego.obtenerUsuario(usrid);
	var json=[];
	if (usr){
		var coleccion=usr.obtenerCartasCementerio();
		json=usr.obtenerCartasCementerio();
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
    var usr     = juego.obtenerUsuario(usrid); //juego.obtenerUsuario(usrid)
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