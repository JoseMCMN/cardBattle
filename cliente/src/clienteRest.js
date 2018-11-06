function ClienteRest(){
	this.obtenerPartidas=function(){
		$.getJSON("/obtenerPartidas",function(data){    
    		console.log(data);
		});
	}
	this.agregarUsuario=function(nombre){
	  //var usr=JSON.parse($.cookie("usr"));	  
	 $.ajax({
	    type:'GET',
	    url:'/agregarUsuario/'+nombre,
	    success:function(data){
	      console.log("Usuario agregado con id: "+data.usr);
	      usr.id=data.usr;
	      },
	    contentType:'application/json',
	    dataType:'json'
	  });
	}
}