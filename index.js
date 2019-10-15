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

  // Create a cursor object to track key presses
  cursors = this.input.keyboard.createCursorKeys();
}

// Things that happen when the game starts
function create() {
  // Add an image for the game background
  this.add.image(800, 300, 'skyline');
  // Create a static physics group and add the floor to it
  floor = this.physics.add.staticGroup();
  floor.create(800, 575, 'floor');

  // Add player sprite and give it physics properties
  player = this.physics.add.image(100, 400, 'player');
  //player.setCollideWorldBounds(true);

  // Make the player and floor collide
  this.physics.add.collider(player, floor);

  // Lock the camera inside the bounds of the game world and make it track the
  // player
  this.cameras.main.setBounds(0, 0, 1600, 600);
  this.cameras.main.startFollow(player);
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

  console.log
  // Vertical jump when up arrow is pushed
  if (cursors.up.isDown && player.body.onFloor()) {
    player.setVelocityY(-500);
  }

  // TODO: Remove this. For debugging only.
  if (cursors.down.isDown) {
    console.log("Player X: " + player.x);
  }
}

// Start the game
const game = new Phaser.Game(config);
