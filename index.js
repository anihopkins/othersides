const WORLD = {
  WIDTH: 1600,
  HEIGHT: 600
};

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
  // Load image assets
  this.load.image('player', 'assets/player.png');
  this.load.image('floor', 'assets/floor.png');
  this.load.image('skyline', 'assets/skyline.png');
  this.load.image('particle', 'assets/particle.png');

  // Create a cursor object to track key presses
  cursors = this.input.keyboard.createCursorKeys();
}

// Things that happen when the game starts
function create() {
  // Add player sprite and give it physics properties
  player = this.physics.add.image(100, 400, 'player');

  // Make the player and floor collide
  this.physics.add.collider(groundLayer, player);

  // Set world's "edges"
  this.physics.world.bounds.width = WORLD.WIDTH;
  this.physics.world.bounds.height = WORLD.HEIGHT;
  player.setCollideWorldBounds(true);

  // Lock the camera inside the bounds of the game world and make it track the
  // player
  this.cameras.main.setBounds(0, 0, WORLD.WIDTH, WORLD.HEIGHT);
  this.cameras.main.startFollow(player);

  // Add ghost
  var particles = this.add.particles('ghost');

  var emitter = particles.createEmitter({
    speed: 30,
    scale: { start: 1, end: 0 },
    blendMode: 'ADD'
  });

  // Make ghost follow player
  emitter.startFollow(player);
}

// Main game loop
function update() {

  // Left and right motion when cursor buttons are pushed
  if (cursors.left.isDown) {
    player.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    player.setVelocityX(200);
  } else {
    player.setVelocityX(0)
  }

  // Vertical jump when up arrow is pushed
  if (cursors.up.isDown && player.body.onFloor()) {
    player.setVelocityY(-500);
  }
}

// Start the game
const game = new Phaser.Game(config);
