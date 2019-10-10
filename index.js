const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 2000 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// Things to do before game loads
function preload () {
  this.load.image('sky', 'assets/gradient.png');
  this.load.image('player', 'assets/player.png');

  cursors = this.input.keyboard.createCursorKeys();
}

// Things that happen when the game starts
function create() {
  this.add.image(400, 300, 'sky');

  // Add player sprite and give it physics properties
  player = this.physics.add.image(100, 500, 'player');
  player.setCollideWorldBounds(true);
}

function update() {

  // Left and right motion when cursor buttons are pushed
  if (cursors.left.isDown) {
    player.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    player.setVelocityX(200);
  } else {
    player.setVelocityX(0)
  }

  console.log
  // Vertical jump when up arrow is pushed
  // TODO: Replace player.body.onFloor() with player.body.touching.down when we
  // have assets for the floor.
  if (cursors.up.isDown && player.body.onFloor()) {
    player.setVelocityY(-500);
  }
}

// Start the game
const game = new Phaser.Game(config);
