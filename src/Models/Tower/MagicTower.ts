import Tower from '@/Models/Tower/Tower'
import Enemy from '@/Models/Enemy/Enemy'
import MagicBallProjectile from '@/Models/Projectiles/MagicBallProjectile'
import GameScene from '@/Scenes/GameScene'

const spriteKey = 'magicTowerIdle' as const

export default class MagicTower extends Tower {
    public static readonly price = 30
    public static readonly range = 450

    constructor(
        scene: GameScene,
        x: number,
        y: number,
        enemies: Enemy[],
        projectile: MagicBallProjectile,
    ) {
        super(
            scene,
            x,
            y,
            spriteKey,
            enemies,
            projectile,
            MagicTower.range,
            MagicTower.price,
        )
    }

    public static spawn(scene: GameScene, x: number, y: number, enemies: Enemy[]): MagicTower {
        const projectile = MagicBallProjectile.spawn(scene, x, y)
        const tower = new MagicTower(scene, x, y, enemies, projectile)

        tower.create()

        return tower
    }
}