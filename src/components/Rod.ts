import { LineIndicator } from '../components/LineIndicator';

export class Rod {
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  scene: Phaser.Scene;
  pointerX: number;
  pointerY: number;
  isOut: boolean;
  lineX: number;
  lineY: number;
  lineSprite: Phaser.GameObjects.Line;
  lineIndicator: LineIndicator;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;  
    this.isOut = false;

    this.sprite = scene.physics.add.sprite(x, y, 'rod');
    this.sprite.setOrigin(0,1);
    this.scene.input.on('pointermove', (pointer: { x: any; y: any; }) =>
    {
      this.pointerX = pointer.x;
      this.pointerY = pointer.y;
    });
    
    this.scene.input.on('pointerdown', (pointer: { x: any; y: any; }) =>
    {
      if (!this.isOut) {
        this.isOut = true;
        const dist = Math.sqrt((this.sprite.x - pointer.x) ** 2 + (this.sprite.y - pointer.y) ** 2)
        if (dist < 150) {
          // perfect accuracy
          this.lineX = pointer.x;
          this.lineY = pointer.y;
        }
        else {
          let xOffset = pointer.x - this.sprite.x;
          let yOffset = pointer.y - this.sprite.y;
          if (dist > 450) {
            //cap distance
            const c = 450/dist;
            yOffset *= c;
            xOffset *= c;
          }
          let targetX = xOffset + this.sprite.x;
          let targetY = yOffset + this.sprite.y;
          // inaccurate
          const errorMagnitude = ((Math.min(dist, 450)) - 200) * .4;
          this.lineX = targetX + errorMagnitude * 2 * (Math.random()-.5);
          this.lineY = targetY + errorMagnitude * 2 * (Math.random()-.5);
        }

        this.lineSprite = this.rational_line(this.scene, [this.sprite.x, this.sprite.y],[this.lineX, this.lineY] )
        this.scene.sound.play('cast')

        this.lineIndicator = new LineIndicator(scene, 950, 80);
      }
      else {
        this.isOut = false;
        this.lineSprite.destroy();
        const caught = this.lineIndicator.destroy();
        if (caught) {
          this.scene.sound.play('success');
        }
        else {
          this.scene.sound.play('fail');
        }
      }

    });

  }
  
  update(basex: number, basey: number, _time: number, delta: number) {
    let rotation = -1 * Math.atan((this.pointerX - basex)/(this.pointerY-basey));
    if (this.pointerY > basey) {
      rotation = Math.PI + rotation;
    }
    if (!isNaN(rotation)) {
      this.sprite.setRotation(rotation);
      this.sprite.x = basex ;
      this.sprite.y = basey ;
    }

    if (this.isOut) {
      this.lineSprite.destroy();
      const rodTipX = 80 * Math.cos(this.sprite.rotation - Math.PI/2) + this.sprite.x;
      const rodTipY = 80 * Math.sin(this.sprite.rotation - Math.PI/2) + this.sprite.y;

      this.lineSprite = this.rational_line(this.scene, [rodTipX, rodTipY],[this.lineX, this.lineY])
      this.lineIndicator.update(_time, delta);
    }
  }

  // https://www.reddit.com/r/phaser/comments/102c7at/a_more_rational_line_function_for_phaser/
  rational_line = function(scene: Phaser.Scene,start: number[],stop: number[],linewidth=1,color=0x000000,alpha=1.0) {
    let ox, oy, x1 = start[0],y1 = start[1], x2 = stop[0], y2 = stop[1];
    let x1_, x2_, y1_, y2_;
    if(x1<x2) {
        ox = x1;
        x1_ = 0;
        x2_ = x2-x1;
    } else {
        ox = x2;
        x1_ = x1-x2;
        x2_ = 0;
    }
    if(y1<y2) {
        oy = y1;
        y1_ = 0;
        y2_ = y2-y1;
    } else {
        oy = y2;
        y1_ = y1-y2;
        y2_ = 0;
    }    
    return scene.add.line(ox,oy,x1_,y1_,x2_,y2_).setOrigin(0).setStrokeStyle(linewidth,color,alpha).setLineWidth(linewidth);
}
  
}
