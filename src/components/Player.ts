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
      this.sprite.body.setAngularDrag(10);
      this.sprite.body.setDamping(true);
      this.sprite.body.setDrag(.6);
      this.sprite.body.setMaxSpeed(80);
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

    const velocityChangePossible = 30 * (200 - this.sprite.body.speed)/200
    if (input.left) {
        this.sprite.body.setAngularVelocity(-1 * velocityChangePossible);
        // this.sprite.anims.play('walk', true);           // play walk animation
    }
    else if (input.right) {
        this.sprite.body.setAngularVelocity(velocityChangePossible);
        // this.sprite.anims.play('walk', true);           // play walk animatio
    }
    else {
      this.sprite.body.setAngularAcceleration(0);
    }

    if (input.forward) {
      this.sprite.body.setAcceleration(20 * Math.sin(this.sprite.rotation), -20 * Math.cos(this.sprite.rotation));
    }
    else if (input.back) {
      this.sprite.body.setAcceleration(-20 * Math.sin(this.sprite.rotation), 20 * Math.cos(this.sprite.rotation));
    }
    else {
      this.sprite.body.setAcceleration(0);
    }

    // const roundToTenth = (num) => Math.round(100 * num) / 100;


    
    const speed = this.sprite.body.speed;
    if (speed > 1) {
      const visualDirection = this.sprite.rotation;
      let travelDirection = this.sprite.body.angle + Math.PI/2;
      if (travelDirection > Math.PI) {
        travelDirection -= 2 * Math.PI;
      }

      const directionXSpeed = speed * Math.sin(visualDirection);
      const directionYSpeed = -1 * speed * Math.cos(visualDirection);
      const newXVelocity = .9 * this.sprite.body.velocity.x + .1 * directionXSpeed;
      const newYVelocity = .9 * this.sprite.body.velocity.y + .1 * directionYSpeed;
      this.sprite.body.setVelocityX(newXVelocity);
      this.sprite.body.setVelocityY(newYVelocity);
    }


  }
}