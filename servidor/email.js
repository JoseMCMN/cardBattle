var sendgrid = require("sendgrid")("XXXXXXX","XXXXXXX");

//var url="https://cardbattlegame.herokuapp.com/";
var url="http://127.0.0.1:5000/";



module.exports.enviarEmail=function(direccion,key,msg){
    var email = new sendgrid.Email();
    email.addTo(direccion);
    email.setFrom('josemcmn@gmail.com');
    email.setSubject('cardBattle: Confirmar cuenta');
    email.setHtml('<h3>Bienvenido a cardBattle</h3><p><a href="'+url+'confirmarUsuario/'+direccion+'/'+key+'">'+msg+'</a></p>');

    sendgrid.send(email);    
}