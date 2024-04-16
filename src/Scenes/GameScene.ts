import { config, events, scene } from '@/config'
import dispatchEvent from '@/modules/dispatchEvent'
import Enemy from '@/Models/Enemy/Enemy'
import ZombieEnemy from '@/Models/Enemy/ZombieEnemy'
import ArrowTower from '@/Models/Tower/ArrowTower'
import Tower from '@/Models/Tower/Tower'
import Button from '@/Models/Buttons/Button'
import ArrowTowerButton from '@/Models/Buttons/ArrowTowerButton'
import Placeholder from '@/Models/Placeholder'
import listenEvent from '@/modules/listenEvent'
import MagicTowerButton from '@/Models/Buttons/MagicTowerButton'
import MagicTower from '@/Models/Tower/MagicTower'

const START_GOLD = 30

export default class GameScene extends Phaser.Scene {
    private enemies: Enemy[] = []
    private towers: Tower[] = []
    private buttons: Button[] = []
    private selectedTower: 'arrow' | 'magic' | undefined
    private placeholders: Placeholder[] = []
    private goldText: Phaser.GameObjects.Text | undefined
    private gold: number = START_GOLD

    public constructor() {
        super(scene.GameScene)
    }

    public preload(): void {
        this.enemies = []
        this.towers = []
        this.buttons = []
        this.selectedTower = undefined
        this.placeholders = []
        this.goldText = undefined
        this.gold = START_GOLD

        this.load
            .image('map', 'assets/map.png')
            .image('castle', 'assets/castle.png')
            .image('refresh', 'assets/refresh.png')
            .image('arrowTowerButton', 'assets/towers/arrow-icon.png')
            .image('magicTowerButton', 'assets/towers/magic-icon.png')
            .image('arrowProjectile', 'assets/towers/projectiles/arrow.png')
            .image('magicBallProjectile', 'assets/towers/projectiles/magic-ball.png')
            .image('spawner', 'assets/towers/tower-placeholder.png')

        this.load
            .audio('actionMusic', 'assets/sounds/music/action.mp3')
            .audio('arrowFlySound', 'assets/sounds/arrow-fly.mp3')
            .audio('arrowHitSound', 'assets/sounds/arrow-hit.mp3')
            .audio('magicFlySound', 'assets/sounds/magic-fly.mp3')
            .audio('magicHitSound', 'assets/sounds/magic-hit.mp3')
            .audio('buildingCompletedSound', 'assets/sounds/building-completed.mp3')
            .audio('buildingHitSound', 'assets/sounds/building-hit.mp3')

        this.load
            .spritesheet('arrowTowerIdle', 'assets/towers/arrow-tower.png', {
                frameWidth: 125,
                frameHeight: 150,
            })
            .spritesheet('magicTowerIdle', 'assets/towers/magic-tower.png', {
                frameWidth: 125,
                frameHeight: 150,
            })
            .spritesheet(ZombieEnemy.spriteKeys.walk, 'assets/enemies/1.zombie/walk.png', {
                frameWidth: 107.5,
                frameHeight: 130,
            })

            .spritesheet(ZombieEnemy.spriteKeys.die, 'assets/enemies/1.zombie/die.png', {
                frameWidth: 165.5,
                frameHeight: 130,
            })

            .spritesheet(ZombieEnemy.spriteKeys.attack, 'assets/enemies/1.zombie/attack.png', {
                frameWidth: 104,
                frameHeight: 130,
            })
    }

    public create(): void {
        this.sound.stopAll()

        this.add.image(0, 0, 'map')
            .setOrigin(0, 0)
            .setDisplaySize(config.width, config.height)

        this.sound.play('actionMusic', { loop: true, volume: 0.5 })

        this.add.image(220, 450, 'castle')
            .setOrigin(0, 0)

        this.buttons = [
            ArrowTowerButton.spawn(this),
            MagicTowerButton.spawn(this),
        ]

        this.placeholders = Placeholder.spawnAll(this)
        this.enemies = ZombieEnemy.spawn(10, this)

        this.placeRefreshButton()
        this.handleButtonClicks()
        this.handlePlaceholderClicks()
        this.listenForGoldEvents()
        this.displayGold()
    }

    public update(): void {
        this.goldText!.setText(`Gold: ${this.gold}`)

        this.enemies.forEach(enemy => enemy.update())
        this.towers.forEach(tower => tower.update())
        this.buttons.forEach(button => button.update())
    }

    private handleButtonClicks(): void {
        this.buttons.forEach(btn => {
            btn.onClick(() => {
                this.selectedTower = btn instanceof ArrowTowerButton ? 'arrow' : 'magic'
                dispatchEvent(events.togglePlaceholderVisibility)
            })
        })
    }

    private placeRefreshButton(): void {
        const btn = this.add.image(config.width - 250, 50, 'refresh')
        btn.setInteractive()

        btn.on('pointerdown', () => {
            this.scene.restart()
            this.sound.stopAll()
        })

        btn.on('pointerover', () => {
            this.sound.play('buttonHover', { volume: 0.3 })
            btn.setScale(1.1)
        })

        btn.on('pointerout', () => {
            this.sound.play('buttonHover', { volume: 0.3 })
            btn.setScale(1)
        })
    }

    private handlePlaceholderClicks(): void {
        this.placeholders.forEach(placeholder => {
            placeholder.onClick(() => this.buildTower(placeholder))
        })
    }

    private buildTower(placeholder: Placeholder): void {
        if (this.gold < ArrowTower.price) {
            return
        }

        this.sound.play('buildingCompletedSound', { volume: 0.5 })

        let tower: Tower | undefined

        if (this.selectedTower === 'arrow') {
            tower = ArrowTower.spawn(this, placeholder.x, placeholder.y, this.enemies)
        } else if (this.selectedTower === 'magic') {
            tower = MagicTower.spawn(this, placeholder.x, placeholder.y, this.enemies)
        }

        if (!tower) {
            return
        }

        this.towers.push(tower)

        dispatchEvent(events.togglePlaceholderVisibility)
        dispatchEvent(events.towerIsPlaced, tower.price)

        placeholder.destroy()
    }

    private displayGold(): void {
        this.add.rectangle(115, 35, 220, 60, 0x000000, 0.5)

        this.goldText = this.add.text(20, 18, `Gold: ${this.gold}`, {
            color: '#fff',
            fontSize: '33px',
        })
            .setDepth(1)
    }

    private listenForGoldEvents(): void {
        listenEvent(events.enemyKilled, (amount: number) => this.gold += amount)
        listenEvent(events.towerIsPlaced, (price: number) => this.gold -= price)
    }
}