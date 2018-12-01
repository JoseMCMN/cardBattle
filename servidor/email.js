var sendgrid = require("sendgrid")("JoseMCMN","mypassword236");

//var url="https://cardbattlegame.herokuapp.com/";
var url="http://127.0.0.1:5000/";



module.exports.enviarEmail=function(direccion,key,msg){
    var email = new sendgrid.Email();
    email.addTo(direccion);
    email.setFrom('josemcmn@gmail.com');
    email.setSubject('confirmar cuenta');
    email.setHtml('<h3>Bienvenido a BattleCards</h3><p><a href="'+url+'confirmarUsuario/'+direccion+'/'+key+'">'+msg+'</a></p>');

    sendgrid.send(email);    
}