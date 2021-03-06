# cardBattle

  Este repositorio contiene el proyecto de la asignatura Procesos de Ingeniería del Software de la Escuela Superior de Ingeniería Informática de Albacete. Se trata de un juego de cartas online por turnos con partidas jugador contra jugador. El desarrollo del proyecto se llevará a cabo mediante Sprints usando la metodología ágil de Scrum.
   
  ## Sprint 1. Definición del proyecto y herramientas
  
  El principal objetivo es definir la arquitectura SaaS del proyecto y definir el modelo del juego. Se decide basar el juego en el famoso juego de cartas Hearthstone. Las herramientas empleadas son: Sublime Text 3, NodeJS, Kunagi, Jasmine (cliente y servidor), GitHub.
  
  ## Sprint 2. Diseño del juego (modelo) y arquitectura base SaaS
  
  Definición de la estructura de carpetas del proyecto.
  Realización del primer diseño de la arquitectura SaaS.
  Desarrollo del diseño del juego cardBattle:
  * Definición de las entidades del juego (Juego, Usuario, Partida, Carta, Tablero, Zona).
  * Definición de la colección de usuarios y de la colección de cartas.
  * Definición de la partida, con sus turnos (miTurno y noMiTurno), sus dos jugadores y sus fases (incial, jugando, final).
  * Definición de las zonas de cada jugador: mano (limite de 10 cartas), mazo (30 cartas en total), zona de ataque y cementerio.

    
 ## Sprint 3. Implementar el API REST y el API WebSocket de CardBattle
 
Se incluyen dentro del API REST:
  - Agregar Usuario
  - Crear Partida 
  - Elegir Partida
  - Jugar Carta
  - Atacar
  
 ## Sprint 4. Gestión de usuarios
 
  - Registro de usuarios 
  - Confirmación de cuenta
  - Inicio de sesión
  - Modificar Perfil
  - Eliminar cuenta
  - Interfaz gráfica (cliente web)
  - Funcionalidad extra (cementerio)
