describe("El juego de las cartas...", function() {
  var juego;
  var usr1;
  var usr2;

  beforeEach(function() {
    juego=new Juego();
    usr1=new Usuario("pepe");
    usr2=new Usuario("juan");
  });

  it("debería tener una colección de cartas", function() {    
    expect(juego.cartas).toBeDefined();
    expect(juego.cartas.length).toEqual(30);
    expect(juego.usuarios).toBeDefined();
    expect(juego.usuarios.length).toEqual(0);
  });

  it("los usuarios tienen un mazo", function(){
    expect(usr1.mazo).toBeDefined();
    expect(usr1.mazo.length).toEqual(0);
    expect(usr2.mazo).toBeDefined();
    expect(usr2.mazo.length).toEqual(0);     
  });

  it("los usuarios tienen una mano (inicialmente vacia)", function(){
    expect(usr1.mano).toBeDefined();
    expect(usr1.mano.length).toEqual(0); 
    expect(usr2.mano).toBeDefined();
    expect(usr2.mano.length).toEqual(0);   
  });


  it("agrego a los usuarios pepe y juan al juego", function(){
      juego.agregarUsuario(usr1);
      juego.agregarUsuario(usr2);
      expect(juego.usuarios.length).toEqual(2);
      expect(juego.usuarios[0].nombre).toEqual("pepe");
      expect(juego.usuarios[1].nombre).toEqual("juan");
      expect(usr1.mazo.length).toEqual(30);
      expect(usr2.mazo.length).toEqual(30);
    })

});
