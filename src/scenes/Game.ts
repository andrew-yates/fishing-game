import { Scene } from 'phaser';
import { Player } from '../components/Player';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player: Player;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x0020ff);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        // this.msg_text = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // });
        // this.msg_text.setOrigin(0.5);

        this.player = new Player(this, 200, 200);

        // this.input.once('pointerdown', () => {

        //     this.scene.start('GameOver');

        // });
    }

    update(_time: number, _delta: number): void {
      this.player.update(_time, _delta);
  }
}
