import Phaser from 'phaser'
import { scene, WIDTH, HEIGHT } from '@/config'

export default class StartScene extends Phaser.Scene {
    public constructor() {
        super(scene.StartScene)
    }

    public create(): void {
        this.add.image(0, 0, 'bg')
            .setOrigin(0, 0)
            .setDisplaySize(WIDTH, HEIGHT)

        this.sound.play('menu', { volume: .2, loop: true })

        const logoHeight = HEIGHT / 2 - 250
        const logo = this.add.image(WIDTH / 2, logoHeight, 'logo')

        const buttonHeight = HEIGHT / 2 + 100
        const button = this.add.image(WIDTH / 2, buttonHeight, 'btn')
        button.setInteractive()

        const copyright = this.add.image(WIDTH - 110, HEIGHT - 70, 'copy')

        this.animateJump(copyright, HEIGHT - 80)
        this.animateJump(logo, logoHeight + 5)
        this.animateJump(button, buttonHeight - 5)

        this.addEventsForButton(button)
    }

    // Make image slowly jump
    private animateJump(img: Phaser.GameObjects.Image, y: number): void {
        this.tweens.add({
            targets: img,
            y,
            duration: 900,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
        })
    }

    private addEventsForButton(btn: Phaser.GameObjects.Image): void {
        btn.on('pointerover', () => {
            this.sound.play('buttonHover', { volume: 0.3 })
            btn.setTexture('btnPressed')
        })

        btn.on('pointerout', () => {
            this.sound.play('buttonHover', { volume: 0.3 })
            btn.setTexture('btn')
        })

        btn.on('pointerdown', () => {
            this.sound.play('buttonClick', { volume: 0.5 })
            this.scene.start(scene.GameScene)
        })
    }
}