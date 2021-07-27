var enemySpeed = [200, 230, 250, 300, 400];
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = enemySpeed[Math.floor(Math.random() * 5)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, plyr) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 505) {
    this.x = -100;
    this.y = this.y + 83;
    this.speed = enemySpeed[Math.floor(Math.random() * 5)];
    if (this.y > 226) {
      this.y = 60;
    }
  }

    if (this.x > -50 && this.x < 50) {
    this.tileX = 0;
  } else if (this.x > 50 && this.x < 150) {
    this.tileX = 101;
  } else if (this.x > 150 && this.x < 250) {
    this.tileX = 202;
  } else if (this.x > 250 && this.x < 350) {
    this.tileX = 303;
  } else if (this.x > 350 && this.x < 450) {
    this.tileX = 404;
  }

   // If the enemy and the player collide.
    if(this.x < plyr.x + 30 &&
       this.x + 60 > plyr.x &&
       this.y < plyr.y + 60 && 
       this.y + 40 > plyr.y)
        {
      plyr.score --;
        document.getElementById('playerScore').innerHTML = plyr.score;
        plyr.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Class player, sprites and score
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.players = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
    ]
    this.x = 200;
    this.y = 320;
    this.score = 0;
    document.getElementById('playerScore').innerHTML = this.score;
};

//function to change characters
var n = 0;
var changePlayer = function() {
    n = (n + 1) % player.players.length;
    player.sprite = player.players[n];
}

// Is called every time the player position is updated
Player.prototype.update = function(dt) {
    
// If the player reaches the water
if (this.y < 20) {
    this.score++;
    document.getElementById('playerScore').innerHTML = this.score;
    this.reset();
}
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if(keyPress == 'left' && this.x > 0) {
        this.x -= 101;
    }
    if(keyPress == 'right' && this.x < 400) {
        this.x += 101;
    }
    if(keyPress == 'up' && this.y > 3) {
        this.y -= 83;
    }
    if(keyPress == 'down' && this.y < 400) {
        this.y += 83;
    }
    if (keyPress == 'enter') {
        changePlayer();
    }
};

// Is called when the player is reset to the starting point
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 320;
};

// Now instantiate your objects.
var enemy1 = new Enemy(-90, 60);
var enemy2 = new Enemy(-190, 140);
var enemy3 = new Enemy(-290, 230);
var enemy4 = new Enemy(-390, 140);
var enemy5 = new Enemy(-490, 60);
var enemy6 = new Enemy(-890, 230);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
// Place the player object in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('keydown', function(e) {
  if ([37, 38, 39, 40, 13].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }  
}, false);