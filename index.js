var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); 
var modelo=require("servidor/modelo.js");

var juego=new Juego();

console.log("Servidor escuchando en "+host+":"+port);

//app.use(app.router);
//app.use(exp.static(__dirname + "/public"));

app.get("/",function(request,response){
	response.send("hola");
});

/*


app.get("/hola/:text",function(request,response){
	response.send("Hola "+request.params.text);
});
var users ={
	"1":{
		"name":"Pepe Lopez",
		"cuenta":"@pepe"
	},
	"2":{
		"name":"Juan Perez",
		"cuenta":"@juan"
	}
}
app.get("/user/:id",function(request,response){
	var user=users[request.params.id];
	if(user){
		response.send("Usuario: "+user.name+" cuenta: "+user.cuenta);
	}
	else{
		response.send("usuario no existe");
	}
	response.send
})*/

console.log("Servidor escuchando en "+host+":"+port);
app.listen(port,host);