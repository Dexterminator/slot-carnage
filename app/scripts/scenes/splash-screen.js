export default class SplashScreen extends Phaser.Scene {
  constructor() {
    super({
      key: 'SplashScreen',

      pack: {
        files: [{
          key: 'splash-screen',
          type: 'image'
        }, {
          key: 'progress-bar',
          type: 'image'
        }]
      }
    });
  }

  preload() {
    this.showCover();
    this.showProgressBar();
    this.load.image('logo');
    this.load.image('player', 'player.gif');
  }
  create() {
    this.scene.start('Game');
  }
  showCover() {
    this.add.image(0, 0, 'splash-screen').setOrigin(0);
  }

  showProgressBar() {
    const {width: w, height: h} = this.textures.get('progress-bar').get();
    const img = this.add.sprite(82, 282, 'progress-bar').setOrigin(0);
    this.load.on('progress', v => img.setCrop(0, 0, Math.ceil(v * w), h));
  }
}
