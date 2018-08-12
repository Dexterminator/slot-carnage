const MAX_SPEED = 0.001;
const MAX_DISTANCE = 1;

let players = [];
const keys = [
  Phaser.Input.Keyboard.KeyCodes.Q,
  Phaser.Input.Keyboard.KeyCodes.W,
  Phaser.Input.Keyboard.KeyCodes.E,
  Phaser.Input.Keyboard.KeyCodes.R];

const interpolationFun = Phaser.Math.Interpolation.CatmullRom;

const points = {
  x: [259.1300048828125, 79.1300048828125, 20.1300048828125, 20.1300048828125, 62.1300048828125, 216.1300048828125, 264.1300048828125, 258.1300048828125, 271.1300048828125, 315.1300048828125, 385.1300048828125, 477.1300048828125, 573.1300048828125, 568.1300048828125, 520.1300048828125, 394.1300048828125, 259.1300048828125, 84.1300048828125, 35.1300048828125, 33.1300048828125, 68.1300048828125, 204.1300048828125, 244.1300048828125, 240.1300048828125, 251.1300048828125, 312.1300048828125, 383.1300048828125, 481.1300048828125, 591.1300048828125, 586.1300048828125, 523.1300048828125, 391.1300048828125, 259.1300048828125, 86.1300048828125, 49.1300048828125, 45.1300048828125, 75.1300048828125, 196.1300048828125, 228.1300048828125, 222.1300048828125, 236.1300048828125, 305.1300048828125, 382.1300048828125, 485.1300048828125, 608.1300048828125, 607.1300048828125, 529.1300048828125, 391.1300048828125, 259.1300048828125, 89.1300048828125, 63.1300048828125, 57.1300048828125, 84.1300048828125, 178.1300048828125, 212.1300048828125, 203.1300048828125, 221.1300048828125, 300.1300048828125, 381.1300048828125, 491.1300048828125, 627.1300048828125, 625.1300048828125, 537.1300048828125, 391.1300048828125, 259.1300048828125],
  y: [272.25, 271.25, 317.25, 380.25, 426.25, 424.25, 359.25, 180.25, 90.25, 72.25, 71.25, 78.25, 124.25, 224.25, 283.25, 291.25, 293.25, 287.25, 322.25, 373.25, 407.25, 409.25, 356.25, 176.25, 81.25, 56.25, 51.25, 57.25, 112.25, 228.25, 296.25, 306.25, 315.25, 301.25, 326.25, 364.25, 391.25, 394.25, 354.25, 177.25, 63.25, 35.25, 32.25, 42.25, 100.25, 234.25, 307.25, 321.25, 329.25, 319.25, 332.25, 356.25, 376.25, 377.25, 349.25, 178.25, 50.25, 16.25, 15.25, 23.25, 87.25, 240.25, 323.25, 274.25, 272.25]
};

points.x = points.x.map(point => point * 1.5);
points.y = points.y.map(point => point * 1.5);

function drawCurve(graphics) {
  graphics.beginPath();
  graphics.fillStyle(0x00ff00, 1);
  graphics.moveTo(points.x[0], points.y[0]);
  graphics.lineStyle(1, 0xFF00FF, 1.0);
  for (let i = 0; i < 1000; i++) {
    let resultX = interpolationFun(points.x, i / 1000);
    let resultY = interpolationFun(points.y, i / 1000);
    graphics.lineTo(resultX, resultY);
  }
  let resultX = interpolationFun(points.x, 0);
  let resultY = interpolationFun(points.y, 0);
  graphics.lineTo(resultX, resultY);
  graphics.closePath();
  graphics.strokePath();
}

export default class Game extends Phaser.Scene {
  constructor() {
    super({key: 'Game'});
  }

  create(/* data */) {
    for (let i = 0; i < 4; i++) {
      let player = this.add.sprite(50, 50, 'player');
      player.distance = 0.25 * i;
      player.speed = 0;
      player.accelerateKey = this.input.keyboard.addKey(keys[i]);
      players.push(player);
    }
    drawCurve(this.add.graphics());
  }

  update(/* t, dt */) {
    for (let player of players) {
      updatePlayer(player);
      movePlayer(player, points);
    }
  }
}

function updatePlayer(player) {
  let isAccelerating = player.accelerateKey.isDown;
  if (isAccelerating) {
    player.speed = Math.min(player.speed + 0.0001, MAX_SPEED);
  } else {
    player.speed = Math.max(player.speed - 0.001, 0);
  }
  player.distance += player.speed;
  player.distance = player.distance % MAX_DISTANCE;
}

function movePlayer(player, points) {
  let resultX2 = interpolationFun(points.x, player.distance);
  let resultY2 = interpolationFun(points.y, player.distance);
  player.setPosition(resultX2, resultY2);
}
