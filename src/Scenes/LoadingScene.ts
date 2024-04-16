import Phaser from 'phaser'
import ZombieEnemy from '@/Models/Enemy/ZombieEnemy'
import { scene, WIDTH, HEIGHT } from '@/config'
import colors from '@/modules/colors'

export default class LoadingScene extends Phaser.Scene {
    public constructor() {
        super(scene.LoadingScene)
    }

    public preload() {
        this.createLoadingScreen()

        this.load
            .setPath('assets')
            .image('bg', 'start-screen.png')
            .image('btn', 'play-button.png')
            .image('btnPressed', 'play-button-pressed.png')
            .image('copy', 'copyright.png')
            .image('logo', 'logo.png')
            .image('map', 'map.png')
            .image('castle', 'castle.png')
            .image('refresh', 'refresh.png')
            .image('arrowTowerButton', 'towers/arrow-icon.png')
            .image('magicTowerButton', 'towers/magic-icon.png')
            .image('arrowProjectile', 'towers/projectiles/arrow.png')
            .image('magicBallProjectile', 'towers/projectiles/magic-ball.png')
            .image('spawner', 'towers/tower-placeholder.png')

        this.load
            .audio('buttonClick', 'sounds/button-click.mp3')
            .audio('menu', 'sounds/music/menu.mp3')
            .audio('buttonHover', 'sounds/button-hover.mp3')
            .audio('actionMusic', 'sounds/music/action.mp3')
            .audio('arrowFlySound', 'sounds/arrow-fly.mp3')
            .audio('arrowHitSound', 'sounds/arrow-hit.mp3')
            .audio('magicFlySound', 'sounds/magic-fly.mp3')
            .audio('magicHitSound', 'sounds/magic-hit.mp3')
            .audio('buildingCompletedSound', 'sounds/building-completed.mp3')
            .audio('buildingHitSound', 'sounds/building-hit.mp3')

        this.load
            .spritesheet('arrowTowerIdle', 'towers/arrow-tower.png', {
                frameWidth: 125,
                frameHeight: 150,
            })
            .spritesheet('magicTowerIdle', 'towers/magic-tower.png', {
                frameWidth: 125,
                frameHeight: 150,
            })
            .spritesheet(ZombieEnemy.spriteKeys.walk, 'enemies/1.zombie/walk.png', {
                frameWidth: 107.5,
                frameHeight: 130,
            })
            .spritesheet(ZombieEnemy.spriteKeys.die, 'enemies/1.zombie/die.png', {
                frameWidth: 165.5,
                frameHeight: 130,
            })
            .spritesheet(ZombieEnemy.spriteKeys.attack, 'enemies/1.zombie/attack.png', {
                frameWidth: 104,
                frameHeight: 130,
            })
    }

    public create(): void {
        this.scene.start(scene.StartScene)
    }

    private createLoadingScreen(): void {
        this.add.rectangle(0, 0, WIDTH, HEIGHT, colors.darkGreen)
            .setOrigin(0, 0)

        this.add.text(WIDTH / 2, HEIGHT / 2, 'Loading...', {
            fontSize: '50px',
            color: '#fff',
        })
            .setOrigin(0.5)
            .setDepth(1)
    }
}