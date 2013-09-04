// use crtrdg-gameloop for animating to the canvas with requestAnimationFrame.
var Game = require('crtrdg-gameloop');

// require crtrdg-entity
var Player = require('./');

// require crtrdg-keyboard
var Keyboard = require('crtrdg-keyboard');

// initialize the game with the canvas id
// set the width, height, and default background color of the canvas
var game = new Game({
  canvasId: 'game',
  width: '800',
  height: '400',
  backgroundColor: '#E187B8'
});

// create keyboard
var keyboard = new Keyboard(game);

// create instance of Player
var player = new Player({
  position: { x: 10, y: 10 },
  size: { x: 10, y: 10 },
  color: '#fff'
});

// add the player to the game
player.addTo(game);

// listen for update event.
// here you can do things like change position or watch for keyboard/mouse events
player.on('update', function(interval){
  this.keyboardInput(keyboard);

  this.move();

  this.checkBoundaries();
});

// listen for draw event.
// context is the canvas context, so you can draw on the canvas like usual.
player.on('draw', function(context){
  context.fillStyle = this.color;
  context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
});