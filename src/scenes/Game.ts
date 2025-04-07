import { Scene } from 'phaser';
import { Player } from '../components/Player';
import { DepthMap } from '../components/DepthMap';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    player: Player;
    soundLevel: number;
    depthMap: DepthMap;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x0727ff);
        const level: number[][] = [];
        const width = 1024;
        const height = 768;
        for (let y = 0; y < height/32; y += 1) {
          let row = [];
          for (let x = 0; x < width/32; x += 1) {
            if ((x * 3 + y)%13 === 0) {
              row.push(2);
            }
            else if ((x +y) % 4 === 0) {
              row.push(0);
            }
            else {
              row.push(3);
            }
          }
          level.push(row);
        }
        const map = this.make.tilemap({data: level, tileWidth: 32, tileHeight: 32});
        const tiles = map.addTilesetImage('waves');
        const layer = map.createLayer(0, tiles!, 0, 0);
        


        this.depthMap = new DepthMap(this);
        this.player = new Player(this, 200, 200, this.depthMap);

    }

    update(_time: number, _delta: number): void {
      this.player.update(_time, _delta);
  }
}
