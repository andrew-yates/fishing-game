interface Input {
  left: boolean;
  right: boolean;
  forward: boolean;
  back: boolean;
}

export class Player {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
      this.scene = scene;  

      this.sprite = scene.physics.add.sprite(x, y, 'player');
      this.sprite.setCollideWorldBounds(true);
      this.sprite.body.setAllowDrag(true);
      this.sprite.body.setAngularDrag(1);
      this.sprite.body.setDrag(5);
  }
  update(_time: number, delta: number) {

    const wKey = this.scene.input.keyboard!.addKey("W");
    const aKey = this.scene.input.keyboard!.addKey("A");
    const sKey = this.scene.input.keyboard!.addKey("S");
    const dkey = this.scene.input.keyboard!.addKey("D");
    let input: Input = {
      left: aKey.isDown,
      right: dkey.isDown,
      forward: wKey.isDown,
      back: sKey.isDown,
    };

    if (input.left) {
        this.sprite.body.setAngularAcceleration(-10);            // move left
        // this.sprite.anims.play('walk', true);           // play walk animation
    }
    else if (input.right) {
        this.sprite.body.setAngularAcceleration(10);             // move right
        // this.sprite.anims.play('walk', true);           // play walk animatio
    }
    else {
      this.sprite.body.setAngularAcceleration(0);
    }

    if (input.forward) {
      this.sprite.body.setAcceleration(20);
    }
    else if (input.back) {
      this.sprite.body.setAcceleration(-10);
    }
    else {
      this.sprite.body.setAcceleration(0);
    }

  }
}