# cardBattle

  Este repositorio contiene el proyecto de Pporcesos de Ingeniería del software de la escuela superior de ingeniería informática de     Albacete. Se trata de un juego de cartas online por turnos con partidas jugador contra jugador. El desarrollo del proyecto se llevará a cabo mediante Sprints.
  
  ## Sprint 1. Definición del proyecto y herramientas
  
  El principal objetivo es definir la arquitectura SaaS del proyecto y definir el modelo del juego. Se decide basar el juego en el famoso juego de cartas Hearthstone. Las herramientas empleadas son: Sublime Text 3, NodeJS, Kunagi, Jasmine (cliente y servidor), GitHub.
  
  ## Sprint 2. Diseño del juego (modelo) y arquitectura base SaaS
  
  Definición de la estructura de carpetas del proyecto.
  Realización del primer diseño de la arquitectura SaaS.
  Desarrollo del diseño del juego cardBattle:
    -Definición de las entidades del juego (Juego, Usuario, Partida, Carta, Tablero, Zona).
    -Definición de la colección de usuarios y de la colección de cartas.
    -Definición de la partida, con sus turnos (miTurno y noMiTurno), sus dos jugadores y sus fases (incial, jugando, final).
    -Definición de las zonas de cada jugador: mano (limite de 10 cartas), mazo (30 cartas en total), zona de ataque y cementerio.
    
 ## Sprint 3. Implementar el API RESt y el API WebSocket de CardBattle
 
Se incluyen dentro del API REST:
  - Agregar Usuario
  - Crear Partida 
  - Elegir Partida
  - Jugar Carta
  - Atacar
  - Ver Resultados
  
