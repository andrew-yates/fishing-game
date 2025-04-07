import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    music: boolean;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');

        this.logo = this.add.image(512, 300, 'logo');
        this.sound.setVolume(.2)

        this.music = this.sound.play('music', {loop: true, volume: 2})

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
