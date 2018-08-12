const MAX_SPEED = 0.03;
const MAX_DISTANCE = 1;

let player;
let space;
const points = {
  x: [50, 350, 1000, 350, 50],
  y: [250, -300, 250, 800, 250]
};

export default class Game extends Phaser.Scene {
  constructor() {
    super({key: 'Game'});
  }

  create(/* data */) {
    player = this.add.sprite(50, 50, 'player');
    player.distance = 0;
    player.speed = 0;
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update(/* t, dt */) {
    updatePlayer(player, space.isDown);
    movePlayer(player, points);
  }
}

function updatePlayer(player, isAccelerating) {
  if (isAccelerating) {
    player.speed = Math.min(player.speed + 0.0005, MAX_SPEED);
  } else {
    player.speed = Math.max(player.speed - 0.001, 0);
  }
  player.distance += player.speed;
  player.distance = player.distance % MAX_DISTANCE;
}

function movePlayer(player, points) {
  let resultX = Phaser.Math.Interpolation.Bezier(points.x, player.distance);
  let resultY = Phaser.Math.Interpolation.Bezier(points.y, player.distance);

  player.setPosition(resultX, resultY);
}
