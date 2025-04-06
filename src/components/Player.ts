import { Rod } from '../components/Rod';

interface Input {
  left: boolean;
  right: boolean;
  forward: boolean;
  back: boolean;
}

export class Player {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  scene: Phaser.Scene;
  rod: Rod;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;  

    this.sprite = scene.physics.add.sprite(x, y, 'player');
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body.setAllowDrag(true);
    this.sprite.body.setAngularDrag(10);
    this.sprite.body.setDamping(true);
    this.sprite.body.setDrag(.6);
    this.sprite.body.setMaxSpeed(80);

    this.rod = new Rod(scene, x, y);

    const config = {
      key: 'paddleAnimation',
      frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    };
    this.sprite.anims.create(config)
    this.sprite.anims.play({key: 'paddleAnimation', frameRate: 2})
  }

  update(_time: number, delta: number) {

    this.rod.update(this.sprite.x, this.sprite.y, _time, delta);

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

    let velocityChangePossible = 30 * (200 - this.sprite.body.speed)/200;
    if (this.sprite.body.speed < 10) {
      velocityChangePossible = 15 + 15 * (this.sprite.body.speed)/10;
    }
    if (input.left) {
        this.sprite.body.setAngularVelocity(-1 * velocityChangePossible);
        if (!this.sprite.anims.isPlaying) {
          this.sprite.setFrame(1);
        }
    }
    else if (input.right) {
        this.sprite.body.setAngularVelocity(velocityChangePossible);
        if (!this.sprite.anims.isPlaying) {
          this.sprite.setFrame(0);
        }
    }
    else {
      
      this.sprite.body.setAngularAcceleration(0);
    }

    if (input.forward) {
      this.sprite.anims.play({key: 'paddleAnimation', frameRate: 2}, true)
      this.sprite.body.setAcceleration(25 * Math.sin(this.sprite.rotation), -20 * Math.cos(this.sprite.rotation));
    }
    else if (input.back) {
      this.sprite.anims.play({key: 'paddleAnimation', frameRate: 2}, true)
      this.sprite.body.setAcceleration(-25 * Math.sin(this.sprite.rotation), 20 * Math.cos(this.sprite.rotation));
    }
    else {
      this.sprite.anims.stop();
      this.sprite.body.setAcceleration(0);
    }

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