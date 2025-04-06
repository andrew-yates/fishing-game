export class LineIndicator {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  scene: Phaser.Scene;


  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;  


    this.sprite = scene.physics.add.sprite(x, y, 'indicator');
    this.sprite.setScale(1.5, 1.5);

    const bigConfig = {
      key: 'big',
      frames: this.scene.anims.generateFrameNumbers('indicator', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: 0
    };
    this.sprite.anims.create(bigConfig)

    const smallUp = {
      key: 'smallUp',
      frames: this.scene.anims.generateFrameNumbers('indicator', { start: 6, end: 9 }),
      frameRate: 10,
      repeat: 0
    };
    this.sprite.anims.create(smallUp)

    const smallDown = {
      key: 'smallDown',
      frames: this.scene.anims.generateFrameNumbers('indicator', { start: 10, end: 13 }),
      frameRate: 10,
      repeat: 0
    };
    this.sprite.anims.create(smallDown)

    const twitch = {
      key: 'twitch',
      frames: this.scene.anims.generateFrameNumbers('indicator', { start: 6, end: 7 }),
      frameRate: 2,
      repeat: 1
    };
    this.sprite.anims.create(twitch)
    this.sprite.anims.play({key: 'twitch'})

  }
  
  update(_time: number, delta: number) {
    if (this.sprite.anims.isPlaying ) {
      // console.log()
      return;
    }

    const rand = Math.random();
    if (rand < .15) {
      // console.log('big');
      this.sprite.anims.play({key: 'big', frameRate: 4});
    }
    else if (rand < .23) {
      // console.log('smallUp');
      this.sprite.play({key: 'smallUp', frameRate: 4})
    }
    else if (rand < .31) {
      // console.log('smallDown');
      this.sprite.play({key: 'smallDown', frameRate: 4});
    }
    else if(rand < .5) {
      // console.log('twitch');
      this.sprite.play({key: 'twitch'});
    }
  }

  destroy() {
    const isBig = this.sprite.anims.currentAnim?.key === 'big';
    this.sprite.destroy();
    return isBig;
  }

  
}
