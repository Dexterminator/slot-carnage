const MAX_SPEED = 0.03;
const MAX_DISTANCE = 1;

let player;
let space;

const points = {
  x: [80, 81, 60, 220, 580, 488, 517, 551, 556, 546, 499, 414, 323, 252, 192, 138, 127, 130, 0, 220, 460, 580, 620, 520, 480, 280, 160, 80, 80],
  y: [168, 249, 488, 448, 528, 369, 326, 259, 169, 62, 39, 30, 19, 25, 32, 45, 78, 181, 468, 508, 488, 308, 88, 88, 8, 8, 68, 108, 168]
};

points.x = points.x.map(point => point * 1.5);
points.y = points.y.map(point => point * 1.5);

function drawCurve(graphics) {
  graphics.beginPath();
  graphics.fillStyle(0x00ff00, 1);
  graphics.moveTo(points.x[0], points.y[0]);
  graphics.lineStyle(1, 0xFF00FF, 1.0);
  for (let i = 0; i < 1000; i++) {
    let resultX = Phaser.Math.Interpolation.Bezier(points.x, i / 1000);
    let resultY = Phaser.Math.Interpolation.Bezier(points.y, i / 1000);
    graphics.lineTo(resultX, resultY);
  }
  let resultX = Phaser.Math.Interpolation.Bezier(points.x, 0);
  let resultY = Phaser.Math.Interpolation.Bezier(points.y, 0);
  graphics.lineTo(resultX, resultY);
  graphics.closePath();
  graphics.strokePath();
}

export default class Game extends Phaser.Scene {
  constructor() {
    super({key: 'Game'});
  }

  create(/* data */) {
    player = this.add.sprite(50, 50, 'player');
    player.distance = 0;
    player.speed = 0;
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    drawCurve(this.add.graphics());
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
  let resultX2 = Phaser.Math.Interpolation.Bezier(points.x, player.distance);
  let resultY2 = Phaser.Math.Interpolation.Bezier(points.y, player.distance);
  player.setPosition(resultX2, resultY2);
}
