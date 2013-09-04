var inherits = require('inherits');
var Entity = require('crtrdg-entity');

module.exports = Player;
inherits(Player, Entity);

function Player(options){
  this.position = { 
    x: options.position ? options.position.x : 20, 
    y: options.position ? options.position.y : 20 
  };

  this.size = {
    x: options.size ? options.size.x : 10,
    y: options.size ? options.size.y : 10
  };

  this.velocity = {
    x: options.velocity ? options.size.x : 0,
    y: options.velocity ? options.size.y : 0
  };
  
  this.speed = options.speed || 8;
  this.friction = options.friction || 0.9;
  this.color = options.color || '#666';
}

Player.prototype.move = function(){
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;

  this.velocity.x *= this.friction;
  this.velocity.y *= this.friction;
};

Player.prototype.checkBoundaries = function(){
  if (this.position.x <= 0){
    this.position.x = 0;
  }

  if (this.position.x >= this.game.width - this.size.x){
    this.position.x = this.game.width - this.size.x;
  }

  if (this.position.y <= 0){
    this.position.y = 0;
  }

  if (this.position.y >= this.game.height - this.size.y){
    this.position.y = this.game.height - this.size.y;
  }
};

Player.prototype.keyboardInput = function(keyboard){
  if ('A' in keyboard.keysDown || '<left>' in keyboard.keysDown){
    this.velocity.x = -this.speed;
  }

  if ('D' in keyboard.keysDown || '<right>' in keyboard.keysDown){
    this.velocity.x = this.speed;
  }

  if ('W' in keyboard.keysDown || '<up>' in keyboard.keysDown){
    this.velocity.y = -this.speed;
  }

  if ('S' in keyboard.keysDown || '<down>' in keyboard.keysDown){
    this.velocity.y = this.speed;
  }
};
