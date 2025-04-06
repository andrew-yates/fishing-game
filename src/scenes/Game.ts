import { Scene } from 'phaser';
import { Player } from '../components/Player';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player: Player;
    soundLevel: number;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x0727ff);
        


        this.player = new Player(this, 200, 200);

    }

    update(_time: number, _delta: number): void {
      this.player.update(_time, _delta);
  }
}
