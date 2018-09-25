describe("El juego de las cartas...", function() {
  var juego;
  var usr;

  beforeEach(function() {
    juego=new Juego();
    usr=new Usuario("pepe");
  });

  it("debería tener una colección de cartas", function() {    
    expect(juego.cartas).toBeDefined();
    expect(juego.cartas.length).toEqual(30);
  });

  it("compruebo condiciones iniciales", function(){
    expect(usr.mazo).toBeDefined();
    expect(usr.mazo.length).toEqual(0);
    expect(juego.usuarios).toBeDefined();
    expect(juego.usuarios.length).toEqual(0);
  });

  it("el usuario tiene un mazo", function(){
    expect(usr.mazo).toBeDefined();
    expect(usr.mazo.length).toEqual(0);    
  });

  it("agrego al usuario Pepe al juego", function(){
      juego.agregarUsuario(usr);
      expect(juego.usuarios.length).toEqual(1);
      expect(juego.usuarios[0].nombre).toEqual("pepe");
      expect(usr.mazo.length).toEqual(30);
    });

});
