var sendgrid = require("********")("******","******");

//var url="https://cardbattlegame.herokuapp.com/";
var url="http://127.0.0.1:5000/";


module.exports.enviarEmail=function(direccion,key,msg){
    var email = new sendgrid.Email();
    email.addTo(direccion);
    email.setFrom('usuariodecardbattle@gmail.com');
    email.setSubject('confirmar cuenta');
    email.setHtml('<h3>Bienvenido a Card Battle Game</h3>Para jugar es necesario que confirme su cuenta en el siguiente enlace: <p><a href="'+url+'confirmarUsuario/'+direccion+'/'+key+'">'+msg+'</a></p>');

    sendgrid.send(email);    
}