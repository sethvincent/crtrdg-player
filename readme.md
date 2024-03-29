# crtrdg player
> **example** player module for crtrdg. try it out to learn how to implement your own player module. this one is also used for simple examples.

## goal of crtrdg-player
This is just an example module that shows how to implement [crtrdg-entity] for a Player module. This module is used in simple demos of crtrdg.js, but you will probably want to create your own Player module. Optionally, you can fork this one as a starting point.

## Requirements
- node.js
- browserify / beefy
- crtrdg-gameloop (or possibly another method of animating the canvas with requestAnimationFrame that emits `update` and `draw` events)
- crtrdg-keyboard

## Getting started
Install node if you haven't already.

### Install browserify and beefy:
```
npm install -g browserify beefy
```

### Create an index.html file:
```
<!DOCTYPE html>
<html>
<head>
  <title>crtrdg gameloop test</title>
</head>
<body>

<canvas id="game"></canvas>

<script src="./bundle.js"></script>
</body>
</html>
```

### Create a game.js file:
```
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
```

## Purpose of `crtrdg`:
Almost every javascript game / animation library I've found bundles things like requestAnimationFrame polyfill, gameloop, entities, abstract drawing methods, keyboard/mouse input, vector math, and more into one entangled library. If I don't like how the library handles just one of those components, I'm stuck with dead library weight, and sometimes it's difficult to replace a library's methods.

So what if each element of 2d games were broken up into it's own modules / repositories?

With inspiration from voxel.js, crtrdg is a collection of javascript modules used for developing 2d games.

As I learned more about node.js, the core events module, and browserify, I realized the ideal api for making simple 2d games could be based on node's events module. So you'll see a lot of crtrdg modules exposing an api that includes `.on('some event', function(){})`, which seems to make a lot of sense for games.

## Other `crtrdg` modules:
- [crtrdg-gameloop](http://github.com/sethvincent/crtrdg-gameloop)
- [crtrdg-keyboard](http://github.com/sethvincent/crtrdg-keyboard)
- [crtrdg-mouse](http://github.com/sethvincent/crtrdg-mouse)


## Contributing
- Fork this repository.
- Create a branch for you changes.
- Include tests if applicable.
- Add/edit documentation for any changes.
- Submit a pull request.

## License
MIT