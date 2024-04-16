import Phaser from 'phaser'
import { config, scene } from '@/config'

export default class StartScene extends Phaser.Scene {
    public constructor() {
        super(scene.StartScene)
    }

    public preload(): void {
        this.load
            .image('bg', 'assets/start-screen.png')
            .image('btn', 'assets/play-button.png')
            .image('btnPressed', 'assets/play-button-pressed.png')
            .image('copy', 'assets/copyright.png')
            .image('logo', 'assets/logo.png')

        this.load
            .audio('buttonClick', 'assets/sounds/button-click.mp3')
            .audio('menu', 'assets/sounds/music/menu.mp3')
            .audio('buttonHover', 'assets/sounds/button-hover.mp3')
    }

    public create(): void {
        this.add.image(0, 0, 'bg')
            .setOrigin(0, 0)
            .setDisplaySize(config.width, config.height)

        this.sound.play('menu', { volume: .2, loop: true })

        const logoHeight = config.height / 2 - 250
        const logo = this.add.image(config.width / 2, logoHeight, 'logo')

        const buttonHeight = config.height / 2 + 100
        const button = this.add.image(config.width / 2, buttonHeight, 'btn')
        button.setInteractive()

        const copyright = this.add.image(config.width - 110, config.height - 70, 'copy')

        this.animateJump(copyright, config.height - 80)
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