var modelo = require('./modelo.js');
describe("El juego de las cartas...", function() {
  var juego;
  var usr1,usr2;
  var miturno,nomiturno;
  var carta1, carta2, carta3, carta4, carta5, carta6, carta7, carta8, carta9;
  var carta10, carta11, carta12;

  beforeEach(function() {
    juego=new modelo.Juego();
    usr1=new modelo.Usuario("pepe",0);
    usr2=new modelo.Usuario("juan",1);
    miturno=new modelo.MiTurno();
    nomiturno=new modelo.NoMiTurno();     
    carta1=new modelo.Carta("CaballeroDePlata",2,1,1,"vacio","invocacion",undefined,[],undefined,false);
    carta2=new modelo.Carta("CaballeroDePlata2",3,2,2,"vacio","invocacion",undefined,[],undefined,false);
    carta3=new modelo.Carta("OrbeIgnero",undefined,undefined,1,"fuego","hechizo",undefined,[],[1,1,2],true);
    carta4=new modelo.Carta("Cazadora",2,1,2,"vacio","invocacion",[7,0,1],["gritoBatalla"],undefined,false);
    carta5=new modelo.Carta("Cultivar",undefined,undefined,2,"tierra","hechizo",undefined,undefined,[4,0,1],false);
    carta6=new modelo.Carta("EspirituDeBatalla",undefined,undefined,1,"aire","hechizo",undefined,undefined,[2,11,3],false);
    carta7=new modelo.Carta("SanarLasHeridas",undefined,undefined,1,"aire","hechizo",undefined,undefined,[8,1,5],true);  
    carta8=new modelo.Carta("ReordenarLaMente",undefined,undefined,3,"agua","hechizo",undefined,undefined,[0,0,2],false);
    carta9=new modelo.Carta("CorrienteViolenta",undefined,undefined,6,"agua","hechizo",undefined,undefined,[6,4,2],false);
    carta10=new modelo.Carta("DespertarDeLosAntiguos",undefined,undefined,8,"tierra","hechizo",undefined,undefined,[5,4,1],false);
    carta11=new modelo.Carta("DefenderElNucleo",undefined,undefined,6,"fuego","hechizo",undefined,undefined,[10,0,1],false);
    carta12=new modelo.Carta("GranTorbellino",undefined,undefined,8,"agua","hechizo",undefined,undefined,[10,4,5],false);

    usr1.mazo.push(carta1);
    usr1.mazo.push(carta2);
    usr1.mazo.push(carta3);
    usr1.mazo.push(carta4);
    usr1.mazo.push(carta5);
    usr1.mazo.push(carta6);
    usr1.mazo.push(carta7);
    usr1.mazo.push(carta8);
    usr1.mazo.push(carta9);
    usr1.mazo.push(carta10);
    usr1.mazo.push(carta11);
    usr1.mazo.push(carta12);
    usr2.mazo.push(carta1);
    usr2.mazo.push(carta2);
    usr2.mazo.push(carta3);
    usr2.mazo.push(carta4);
    usr2.mazo.push(carta5);
    usr2.mazo.push(carta6);
    usr2.mazo.push(carta7);


    juego.agregarUsuario(usr1);
    juego.agregarUsuario(usr2);
   // usr1.crearPartida("prueba");
    //usr2.eligePartida("prueba");
  });

  /*describe("PRUEBA",function(){
    it("Prueba",function(){
      juego=new modelo.Juego();
      usr1=new modelo.Usuario("pepe",0);
      usr2=new modelo.Usuario("juan",1);
      miturno=new modelo.MiTurno();
      nomiturno=new modelo.NoMiTurno();
      juego.agregarUsuario(usr1);
      juego.agregarUsuario(usr2);
      expect(juego).toBeDefined();
    });
  });

  describe("Comprobar funcionamiento de partidas",function(){

    it ("Si un jugador abandona la partida, ambos jugadores salen de la partida y esta se elimina", function(){
      var idPartida=undefined;
      expect(juego.usuarios[0].partida.nombre).toEqual("prueba");
      expect(usr1.partida.nombre).toEqual("prueba");
      expect(usr1.partida.usuariosPartida.length).toEqual(2);
      if (usr1.turno.meToca()){
        expect(usr2.turno.meToca()).toBe(false);
      }
      else{
        expect(usr2.turno.meToca()).toBe(true);
      }

    });
  });*/

  describe("Comprobar la fase inicial del juego",function(){
    it("Compruebo condiciones iniciales (cartas, partidas, usuario)", function() {
      expect(juego.usuarios).toBeDefined();
      expect(Object.keys(juego.usuarios).length).toEqual(2);
      expect(juego.partidas).toBeDefined();
      expect(juego.partidas.length).toEqual(0);
      //expect(juego.partidas[0].fase.nombre).toEqual("jugando");
      usr1.crearPartida("prueba");
        expect(juego.partidas[0].fase.nombre).toEqual("inicial");
    });
  });
  
  describe("Comprobar la búsqueda de partida",function(){
    it("Prueba de comportamiento de las fases de la partida y de la busqueda de partidas",function(){
      //Las condiciones iniciales parten de que no haya partidas creadas ni jugadores en partida
      expect(juego.usuarios).toBeDefined();
      expect(Object.keys(juego.usuarios).length).toEqual(2);
      expect(juego.partidas).toBeDefined();
      expect(juego.partidas.length).toEqual(0);
      //El usr1 busca partida, lo cual creara la partida en estado inicial
      usr1.buscarPartida();
      expect(juego.partidas[0].fase.nombre).toEqual("inicial");
      expect(juego.partidas[0].nombre).toBeDefined();
      expect(usr1.partida).toBeDefined();
      //El usr2 busca partida, por lo que se le asigna la partida de usr1 y cambia la fase a jugando
      usr2.buscarPartida();
      expect(juego.partidas[0].fase.nombre).toEqual("jugando");
      expect(juego.partidas[0].nombre).toBeDefined();
      expect(usr2.partida).toBeDefined();
      //Si un jugador pierde la partida, la partida entra en fase final y es eliminada
      usr1.vidas=0;
      usr1.comprobarVidas();
      expect(usr1.turno.meToca()).toEqual(false);
      expect(usr2.turno.meToca()).toEqual(false);
      expect(juego.partidas[0]).toBeUndefined();
      expect(juego.partidas.length).toEqual(0);
    });
  });

  describe("Comprobar la fase jugando",function(){

    beforeEach(function() {
      // juego=new Juego();
      // usr1=new Usuario("pepe");
      // usr2=new Usuario("juan");
      // juego.agregarUsuario(usr1);
      // juego.agregarUsuario(usr2);
      usr1.crearPartida("prueba");
      usr2.eligePartida("prueba");
    });

    it("Compruebo condiciones iniciales (cartas, partidas, usuario)", function() {
      expect(juego.usuarios).toBeDefined();
      expect(Object.keys(juego.usuarios).length).toEqual(2);
      expect(juego.partidas).toBeDefined();
      expect(juego.partidas.length).toEqual(1);
      expect(juego.partidas[0].fase.nombre).toEqual("jugando");
    });

    it("Los usuarios tienen un mazo", function(){
      expect(usr1.mazo).toBeDefined();
      expect(usr1.mazo.length).toEqual(80);
      expect(usr2.mazo).toBeDefined();
      expect(usr2.mazo.length).toEqual(80);
      });

      it("Los usuarios tiene mano (5 o 6 cartas)", function(){
        var cont1=0;cont2=0;
        for(var i=0;i<usr1.mazo.length;i++){
          if (usr1.mazo[i].posicion=="mano"){
            cont1++;
          }
          if(usr2.mazo[i].posicion=="mano"){
            cont2++;
          }
        }
        //expect(cont).toBeGreaterThanOrEqual(5);
        if (usr1.turno.meToca()){
          expect(cont1).toEqual(6);
          expect(cont2).toEqual(6);
        }
        else{
          expect(cont2).toEqual(6);
          expect(cont1).toEqual(6);
        }
      });

     it("agregar pepe y juan el usuario al juego", function(){
      //juego.agregarUsuario(usr1);
      //juego.agregarUsuario(usr2);
      expect(juego.usuarios.length).toEqual(2);
      expect(juego.usuarios[0].nombre).toEqual("pepe");
      expect(usr1.mazo.length).toEqual(80);
      expect(juego.usuarios[1].nombre).toEqual("juan");
      expect(usr2.mazo.length).toEqual(80);
      });

     it("Pepe crea una partida, juan la elige y se les asigna las zonas correspondientes", function(){
        expect(juego.usuarios[0].partida.nombre).toEqual("prueba");
        expect(usr1.partida.nombre).toEqual("prueba");
        expect(juego.usuarios[1].partida.nombre).toEqual("prueba");
        //expect(juego.usuarios[0].zona.nombre).toEqual("arriba");
        //expect(juego.usuarios[1].zona.nombre).toEqual("abajo");
        expect(usr1.partida.usuariosPartida.length).toEqual(2);
        if (usr1.turno.meToca()){
          expect(usr2.turno.meToca()).toBe(false);
        }
        else{
          expect(usr2.turno.meToca()).toBe(true);
        }
      });

     it("Comprobar que funciona pasar turno",function(){
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        usr1.pasarTurno();
        expect(usr1.turno.meToca()).toEqual(false);
        expect(usr2.turno.meToca()).toEqual(true);
     });

     it("Al jugar una carta, la carta pasa a la zona de ataque y se decrementa el elixir en 1",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        //Localizamos una carta de coste 1
        //var carta=usr1.obtenerUnaCarta();
        //var carta=new Carta("CaballeroDePlata"+i,2,2,1,"vacio","invocacion",undefined,["escudoDivino"],undefined,false);
        expect(carta1).toBeDefined();
        carta1.coste=1;
        usr1.jugarCarta(carta1);
        expect(usr1.elixir).toEqual(0);
        expect(usr1.consumido).toEqual(1);
        expect(carta1.posicion).toEqual("ataque");
     });

     it("Se comprueba que una carta con coste 2 no se pueda jugar en el primer turno pero en el segundo sí",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        //Localizamos una carta de coste 1 y otra de 2      
        //var carta1=usr1.obtenerUnaCarta();      
        expect(carta1).toBeDefined();
        expect(carta2).toBeDefined();
        carta1.coste=1;          
        carta1.posicion="mano";
        carta2.posicion="mano";
        // Se comprueba que la carta de coste 1 se puede jugar y la de coste 2 no
        usr1.jugarCarta(carta1);
        expect(carta1.posicion).toEqual("ataque");
        expect(usr1.elixir).toEqual(0);    
        //var carta2=usr1.obtenerUnaCarta();      

        carta2.coste=2;
        usr1.jugarCarta(carta2);
        expect(carta2.posicion).toEqual("mano");
       
        // Se pasa el turno de usr1 y usr2 para que se actualice el elixir
        usr1.pasarTurno();
        expect(usr1.elixir).toEqual(2);

        usr2.pasarTurno();

        // Se comprueba que ahora la carta 2 se puede jugar
        usr1.jugarCarta(carta2);
        expect(carta2.posicion).toEqual("ataque");
        expect(usr1.elixir).toEqual(0);      
     });

   it("Cada turno que el jugador robe una carta sin tener cartas en el mazo, recibe un daño incremental", function(){
      usr1.turno=miturno;
      usr2.turno=nomiturno;
      var cartasMano=usr1.obtenerCartasMano();

      for (var i=0; i<usr1.mazo.length-cartasMano.length;i++){
        usr1.cogerCarta();
      }
      var vidas;
      for(var i=1;i<5;i++){
        vidas=usr1.vidas;
        usr1.cogerCarta();
        expect(usr1.vidas).toEqual(vidas-i);
      }
    });

  it("El juego termina si las vidas de un usuario son 0", function(){
    usr1.turno=miturno;
    usr2.turno=nomiturno;
    usr2.vidas=1;

    //var carta1=usr1.obtenerUnaCarta();
    expect(carta1).toBeDefined();
    expect(carta1.vidas).toBeGreaterThan(0);
    usr1.jugarCarta(carta1);
    carta1.haAtacado=false;
    usr1.ataque(carta1,usr2);
    expect(usr1.turno.meToca()).toEqual(false);
    expect(usr1.turno.meToca()).toEqual(false);
    expect(juego.partidas[0]).toBeUndefined();
  });

  it("El juego termina si un jugador abandona partida, siendo esta borrada y los jugadores expulsados", function(){
    usr1.turno=miturno;
    usr2.turno=nomiturno;
    usr1.abandonarPartida();

    expect(usr1.turno.meToca()).toEqual(false);
    expect(usr2.turno.meToca()).toEqual(false);
    expect(juego.partidas[0]).toBeUndefined();
  });
/*
      it ("No hay paso de turno automático, cuando las cartas han sido jugadas", function(){
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        var carta1=usr1.obtenerUnaCarta();
        expect(carta1).toBeDefined();
        usr1.elixir=carta1.coste;
        usr1.jugarCarta(carta1); 
        usr1.pasarTurno();
        usr2.pasarTurno();
        var carta2=usr1.obtenerUnaCarta();
        expect(carta2).toBeDefined();
        usr1.elixir=carta2.coste;
        usr1.jugarCarta(carta2);
        usr1.ataque(carta1,usr2);
        expect(usr1.turno.meToca()).toEqual(true);
        expect(usr2.turno.meToca()).toEqual(false);
        usr1.ataque(carta2,usr2);
        expect(usr1.turno.meToca()).toEqual(true);
        expect(usr2.turno.meToca()).toEqual(false);     
      });*/
      it ("No se pueden tener mas de 10 cartas en mano", function(){
        //Establecemos el turno para usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;

        expect(usr1.obtenerCartasMano().length).toBeLessThan(10);
        //Usr1 coge cartas para tener mas de 10
        for(var i=0;i<8;i++){
          usr1.cogerCarta();
        }
        var cartas=usr1.obtenerCartasMano();
        expect(cartas).toBeDefined();
        expect(usr1.obtenerCartasMano().length).toEqual(10);
      });


      //Tets dedicados al sprint 2

      it("Al jugar una carta de hechizo (de daño directo), esta hace su efecto y va al cementerio",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        expect(carta3).toBeDefined();
        
        //Fijamos el objetivo de la carta
        carta3.tipoObjetivo="rival";
        var vidasUsr2=usr2.vidas;
        
        //Jugamos el hechizo
        usr1.jugarCarta(carta3);

        expect(usr1.elixir).toEqual(0);
        expect(usr1.consumido).toEqual(1);
        expect(usr2.vidas).toEqual(vidasUsr2-carta3.efecto[2]);
        
        //Hace su efecto y acaba en el cementerio
        expect(carta3.posicion).toEqual("cementerio");
     });

      it("Al jugar una carta con grito de batalla, invoca un token al entrar a la zona de ataque",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        usr1.mazo=[];
        usr1.mazo.push(carta4);
        usr1.cogerCarta();

        //Fijamos el mana en 2 para jugar la carta
        usr1.elixir=2;
        expect(carta4).toBeDefined();
        var cartasAtaque=usr1.obtenerCartasAtaque();
        expect(cartasAtaque.length).toEqual(0);
        
        //Jugamos la carta con grito
        usr1.jugarCarta(carta4);
        expect(usr1.consumido).toEqual(2);
        
        //Hace el grito de batalla y se queda en la mesa
        expect(carta4.posicion).toEqual("ataque");

        //Al entrar a la zona de ataque invoca un token
        var cartasAtaque=usr1.obtenerCartasAtaque();
        expect(cartasAtaque.length).toEqual(2);
        var cartasToken=usr1.obtenerCartasToken();
        expect(cartasToken.length).toEqual(1);
     });

      it("Al jugar un hechizo de aumento de mana, el jugador incrementa su mana en 1 para el siguiente turno",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;

        //Fijamos el mana en 4
        usr1.elixir=4;
        usr1.consumido=0;
        expect(carta5).toBeDefined();
        expect(usr1.elixir).toEqual(4);
        
        //Jugamos la carta de hechizo
        usr1.jugarCarta(carta5);
        expect(usr1.elixir).toEqual(2);
        expect(usr1.consumido).toEqual(3);
        
        //Hace el efecto y se queda en el cementerio
        expect(carta5.posicion).toEqual("cementerio");

        //En el siguiente turno, el mana del jugador estara a 6 en vez de a 5 debido al hechizo
        usr1.pasarTurno();
        usr2.pasarTurno();
        expect(usr1.elixir).toEqual(6);
     });

      it("Al jugar una invocacion con 'veloz', el jugador puede atacar con ella en el turno que la juega",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;

        //Fijamos el mana en 2
        usr1.elixir=2;
        expect(carta1).toBeDefined();

        //Agregamos la habilidad de veloz
        carta1.insertarHabilidad("veloz");
        expect(carta1.tipoHabilidad.length).toEqual(1);

        //Jugamos la carta con veloz
        usr1.jugarCarta(carta1);
        expect(usr1.consumido).toEqual(1);
        expect(carta1.haAtacado).toEqual(false);
        
        //Atacamos con la carta
        var vidasUsr2=usr2.vidas;
        usr1.atacaConCarta(carta1,usr2);
        expect(usr2.vidas).toEqual(vidasUsr2-carta1.ataque);
        expect(carta1.haAtacado).toEqual(true);
     });
      
      it("Al jugar un hechizo con 'hasta el final del turno', el efecto del hechizo desaparecera al final del turno",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        usr1.mazo=[];
        usr1.mazo.push(carta1);
        usr1.mazo.push(carta6);
        usr1.cogerCarta();
        usr1.cogerCarta();

        //Fijamos el mana en 4
        usr1.elixir=4;
        expect(carta1).toBeDefined();
        expect(carta6).toBeDefined();

        //Jugamos la carta de invocacion
        usr1.jugarCarta(carta1);
        expect(usr1.consumido).toEqual(1);
        expect(carta1.ataque).toEqual(1);
        expect(carta1.posicion).toEqual("ataque");
        expect(usr1.obtenerCartasAtaque().length).toEqual(1);

        //Jugamos la carta de hechizo que otorga +3 p. de ataque a todas las invocaciones hasta el final del turno
        usr1.jugarCarta(carta6);
        expect(usr1.consumido).toEqual(2);
        expect(carta1.ataque).toEqual(4);
        expect(carta1.ataqueAux).toEqual(3);
        expect(carta6.posicion).toEqual("cementerio");

        //Al pasar el turno desaparece el efecto
        usr1.pasarTurno();
        expect(carta1.ataque).toEqual(1);
     });

      it("Si una invocacion tiene escudo divino, al recibir daño no ve alterada su salud y pierde su escudo divino",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        usr1.mazo.push(carta1);
        usr2.mazo.push(carta2);
        usr1.cogerCarta();
        usr2.cogerCarta();
        //Fijamos el mana en 2
        usr1.elixir=2;
        usr2.elixir=2;
        expect(carta1).toBeDefined();
        expect(carta2).toBeDefined();
        //Agregamos la habilidad de escudo divino
        carta1.insertarHabilidad("escudoDivino");
        expect(carta1.tipoHabilidad.length).toEqual(1);
        //Jugamos la carta con escudo divino
        usr1.jugarCarta(carta1);
        expect(usr1.consumido).toEqual(1);
        expect(carta1.haAtacado).toEqual(true);
        expect(carta1.tieneHabilidad("escudoDivino")).toEqual(true);
        //Pasamos el turno para que el rival juegue su invocacion sin escudo
        usr1.pasarTurno();
        usr2.jugarCarta(carta2);
        expect(carta2.haAtacado).toEqual(true);
        expect(carta2.tieneHabilidad("escudoDivino")).toEqual(false);        
        //Atacamos con la carta con escudo divino a la carta sin escudo divino
        usr2.pasarTurno();
        var vidasCarta2=carta2.vidas;
        var vidasCarta1=carta1.vidas;
        usr1.atacaConCarta(carta1,carta2);
        //La carta con escudo divino no recibe daño y pierde su habilidad
        expect(carta2.vidas).toEqual(vidasCarta2-carta1.ataque);
        expect(carta1.vidas).toEqual(vidasCarta1);
        expect(carta1.haAtacado).toEqual(true);
        expect(carta1.tieneHabilidad("escudoDivino")).toEqual(false);
     });

      it("Al jugar un hechizo de curacion con objetivo el jugador, se restauran 5 vidas",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        usr1.mazo=[];
        usr1.mazo.push(carta7);
        usr1.cogerCarta();

        //Fijamos el mana en 2 y las vidas del jugador en 30 (30/40)
        usr1.elixir=2;
        usr1.vidas=30;
        expect(carta7).toBeDefined();
        expect(usr1.vidas).toEqual(30);

        //Fijamos el objetivo del hechizo como el jugador
        carta7.tipoObjetivo="jugador";
        usr1.jugarCarta(carta7);
        expect(usr1.vidas).toEqual(35);
        expect(carta7.posicion).toEqual("cementerio");
     });

      it("Si el jugador tiene la vida al maximo, el hechizo de curacion no alterara sus vidas",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        usr1.mazo=[];
        usr1.mazo.push(carta7);
        usr1.cogerCarta();

        //Fijamos el mana en 2 y las vidas del jugador al máximo
        usr1.elixir=2;
        usr1.vidas=40;
        expect(carta7).toBeDefined();
        expect(usr1.vidas).toEqual(40);

        //Fijamos el objetivo del hechizo como el jugador
        carta7.tipoObjetivo="jugador";
        usr1.jugarCarta(carta7);
        expect(usr1.vidas).toEqual(40);
        expect(carta7.posicion).toEqual("cementerio");
     });

      it("Al jugar un hechizo de robo de cartas, se roban tantas cartas del mazo",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        expect(carta8).toBeDefined();
        usr1.mazo.push(carta8);
        carta8.posicion="mano";
        expect(usr1.obtenerCartasMano().length).toEqual(7);
        usr1.cogerCarta();

        //Fijamos el mana en 3 y jugamos la carta de hechizo de coste 3 cuyo efecto es "roba dos cartas"
        usr1.elixir=3;
        usr1.jugarCarta(carta8);
        expect(usr1.consumido).toEqual(3);
        expect(usr1.obtenerCartasMano().length).toEqual(9);
        expect(carta8.posicion).toEqual("cementerio");
     });

      it("Prueba de hechizo que devuelve todas las invocaciones del rival a su mano",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        expect(carta9).toBeDefined();
        usr1.mazo.push(carta9);

        //Situamos dos invocaciones del rival en su zona de ataque
        usr2.mazo.push(carta1);
        usr2.mazo.push(carta2);
        carta1.posicion="ataque";
        carta2.posicion="ataque";
        carta8.posicion="mano";
        expect(usr2.obtenerCartasAtaque().length).toEqual(2);
        usr2.pasarTurno();
        var cartasManoUsr2=usr2.obtenerCartasMano().length;
        
        //Fijamos el mana a 6 para poder jugar el hechizo que devuelve todas las invocaciones del rival a su mano
        usr1.cogerCarta();
        usr1.elixir=6;
        usr1.jugarCarta(carta9);
        expect(usr2.obtenerCartasAtaque.length).toEqual(0);
        expect(carta1.posicion).toEqual("mano");
        expect(carta2.posicion).toEqual("mano");
        expect(usr2.obtenerCartasMano().length).toEqual(cartasManoUsr2+2);
        expect(carta9.posicion).toEqual("cementerio");

     });

      it("Al jugar una invocacion con 'defensor', oponente no podra atacar a un objetivo que no tenga defensor",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        usr1.mazo=[];
        usr1.mazo.push(carta1);
        usr1.cogerCarta();
        usr2.mazo=[];
        usr2.mazo.push(carta2);
        usr2.cogerCarta();
        //Fijamos el mana en 5
        usr1.elixir=5;
        usr2.elixir=5;
        expect(carta1).toBeDefined();
        //Agregamos la habilidad de defensor
        carta1.insertarHabilidad("defensor");
        expect(carta1.tieneHabilidad("defensor")).toEqual(true);
        //Jugamos la carta y pasamos el turno
        usr1.jugarCarta(carta1);
        expect(carta1.posicion).toEqual("ataque");
        usr1.pasarTurno();
        //El jugador 2 juega una invocacion que puede atacar este turno
        usr2.jugarCarta(carta2);
        carta2.haAtacado=false;
        expect(carta2.posicion).toEqual("ataque");
        //El jugador 2 ataca al usr1 y no se realiza el ataque
        var vidasUsr1=usr1.vidas;
        expect(usr2.existenCartasConDefensor()).toEqual(true);
        usr2.atacaConCarta(carta2,usr1);
        expect(usr1.vidas).toEqual(vidasUsr1);
        expect(carta2.haAtacado).toEqual(false);
        //Atacando a la invocacion con defensor si se realiza el ataque
        usr2.atacaConCarta(carta2,carta1);
        expect(carta1.posicion).toEqual("cementerio");
        expect(carta2.haAtacado).toEqual(true);
     });

      it("Al jugar una invocacion con 'oculto', oponente no podra atacarla",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        usr1.mazo=[];
        usr1.mazo.push(carta1);
        usr1.cogerCarta();
        usr2.mazo=[];
        usr2.mazo.push(carta2);
        usr2.cogerCarta();
        //Fijamos el mana en 5
        usr1.elixir=5;
        usr2.elixir=5;
        expect(carta1).toBeDefined();
        //Agregamos la habilidad de defensor
        carta1.insertarHabilidad("oculto");
        expect(carta1.tieneHabilidad("oculto")).toEqual(true);
        //Jugamos la carta y pasamos el turno
        usr1.jugarCarta(carta1);
        expect(carta1.posicion).toEqual("ataque");
        usr1.pasarTurno();
        //El jugador 2 juega una invocacion que puede atacar este turno
        usr2.jugarCarta(carta2);
        carta2.haAtacado=false;
        expect(carta2.posicion).toEqual("ataque");
        //El jugador 2 ataca a la invocacion con oculto y no se realiza el ataque
        usr2.atacaConCarta(carta2,carta1);
        expect(carta2.haAtacado).toEqual(false);
        //Si el jugador 1 ataca con la invocacion con oculto, pierde la habilidad
        usr2.pasarTurno();
        usr1.atacaConCarta(carta1,usr2);
        expect(carta1.haAtacado).toEqual(true);
        expect(carta1.tieneHabilidad("oculto")).toEqual(false);
     });

      it("Se puede atacar dos veces con una invocacion con 'ataque doble'",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        //Fijamos el mana en 2
        usr1.elixir=2;
        expect(carta1).toBeDefined();
        //Agregamos la habilidad de ataque doble
        carta1.insertarHabilidad("ataqueDoble");
        expect(carta1.tipoHabilidad.length).toEqual(1);
        //Jugamos la carta con ataque doble
        usr1.jugarCarta(carta1);
        expect(usr1.consumido).toEqual(1);
        expect(carta1.haAtacado).toEqual(true);
        //Forzamos que pueda atacar este turno
        carta1.haAtacado=false;
        carta1.numAtaques=1;
        //Atacamos con la carta dos veces al oponente
        var vidasUsr2=usr2.vidas;
        usr1.atacaConCarta(carta1,usr2);
        expect(usr2.vidas).toEqual(vidasUsr2-carta1.ataque);
        expect(carta1.haAtacado).toEqual(false);
        var vidasUsr2=usr2.vidas;
        usr1.atacaConCarta(carta1,usr2);
        expect(usr2.vidas).toEqual(vidasUsr2-carta1.ataque);
        expect(carta1.haAtacado).toEqual(true);
     });

      it("Al jugar el hechizo Despertar de los antiguos, la zona de ataque crece con las invocaciones de token",function(){
        //Forzamos el turno para el usr1
        usr1.turno=miturno;
        usr2.turno=nomiturno;
        usr1.mazo=[];
        usr1.mazo.push(carta10);
        usr1.cogerCarta();

        //Fijamos el mana en 8
        usr1.elixir=8;
        usr1.consumido=0;
        expect(carta10).toBeDefined();
        
        //Jugamos la carta de hechizom invocando un token 2/2, un token 3/3 y un token 4/4, todos con defensor
        usr1.jugarCarta(carta10);
        expect(usr1.elixir).toEqual(0);
        expect(usr1.consumido).toEqual(8);

        //Comprobamos que los token invocados se encuetran en la mesa.
        var cartasAtaque=usr1.obtenerCartasAtaque();
        expect(cartasAtaque.length).toEqual(3);
        expect(cartasAtaque[0].vidas).toEqual(2);
        expect(cartasAtaque[1].vidas).toEqual(3);
        expect(cartasAtaque[2].vidas).toEqual(4);
        expect(cartasAtaque[0].tieneHabilidad("defensor")).toEqual(true);
        expect(cartasAtaque[1].tieneHabilidad("defensor")).toEqual(true);
        expect(cartasAtaque[2].tieneHabilidad("defensor")).toEqual(true);
        //Hace el efecto y se queda en el cementerio
        expect(carta10.posicion).toEqual("cementerio");
     });

      it("Al jugar el hechizo Defender el nucleo, se invocan tantos token como número de invocaciones enemigas",function(){
        //Forzamos el turno para el usr2
        usr2.turno=miturno;
        usr1.turno=nomiturno;
        usr1.mazo=[];
        usr1.mazo.push(carta11);
        usr1.cogerCarta();
        usr2.mazo=[];
        usr2.mazo.push(carta1);
        usr2.mazo.push(carta2);
        usr2.cogerCarta();
        usr2.cogerCarta();
        //Fijamos el mana en 10
        usr1.elixir=10;
        usr2.elixir=10;
        usr1.consumido=0;
        expect(carta11).toBeDefined();
        //El jugador 2 juega dos cartas de invocacion, las cuales se situan en la zona de ataque
        usr2.jugarCarta(carta1);
        usr2.jugarCarta(carta2);
        expect(carta1.posicion).toEqual("ataque");
        expect(carta2.posicion).toEqual("ataque");
        expect(usr2.obtenerCartasAtaque().length).toEqual(2);
        usr2.pasarTurno();        
        //El jugador 1 juega el hechizo, invocando tantas invocaciones como numero de invocaciones enemigas
        usr1.jugarCarta(carta11);
        //Comprobamos que los token invocados se encuetran en la mesa.
        var cartasAtaque=usr1.obtenerCartasAtaque();
        expect(usr1.obtenerCartasAtaque().length).toEqual(2);
        expect(cartasAtaque[0].vidas).toEqual(2);
        expect(cartasAtaque[1].vidas).toEqual(2);
        expect(cartasAtaque[0].tieneHabilidad("veloz")).toEqual(true);
        expect(cartasAtaque[1].tieneHabilidad("veloz")).toEqual(true);
        //Hace el efecto y se queda en el cementerio
        expect(carta11.posicion).toEqual("cementerio"); 
     });

      it("Al jugar el hechizo Gran torbellino, todas las invocaciones reciben 5 p. de daño, el jugador se cura 5 vidas y roba dos cartas",function(){
        //Forzamos el turno para el usr1
        usr2.turno=miturno;
        usr1.turno=nomiturno;
        //usr1.mazo=[];
        usr1.mazo.push(carta12);
        usr1.mazo.push(carta1);
        carta1.posicion="mano";
        carta12.posicion="mano";
        usr2.mazo=[];
        usr2.mazo.push(carta2);
        //Fijamos el mana en 10 y las vidas del jugador en 30, comprobamos el tamaño de la mano
        usr1.elixir=10;
        usr1.vidas=30;
        var vidasUsr1=usr1.vidas;
        usr2.elixir=10;
        usr1.consumido=0;
        expect(carta12).toBeDefined();
        var cartasMano=usr1.obtenerCartasMano();
        //El jugador 2 juega una invocacion
        usr2.jugarCarta(carta2);
        expect(carta2.posicion).toEqual("ataque");
        usr2.pasarTurno();        
        //El jugador 1 juega una invocacion y el hechizo, realizando su efecto
        usr1.jugarCarta(carta1);
        usr1.jugarCarta(carta12);
        //Comprobamos que las invocaciones reciben 5 p. de daño y por tanto van al cementerio
        expect(carta1.posicion).toEqual("cementerio"); 
        expect(carta2.posicion).toEqual("cementerio"); 
        //Comprobamos que el jugador se ha sanado 5 p. de salud
        expect(usr1.vidas).toEqual(vidasUsr1+5);
        //Comprobamos que el jugador roba dos cartas
        expect(usr1.obtenerCartasMano().length).toEqual(cartasMano.length+1);
        //Hace el efecto y se queda en el cementerio
        expect(carta12.posicion).toEqual("cementerio"); 
     });

  });
});