import type { EnemySpriteKeys } from '@/types'
import Enemy from '@/Models/Enemy/Enemy'
import GameScene from '@/Scenes/GameScene'

const distance = 135
const price = 3

export default class ZombieEnemy extends Enemy {
    public static spriteKeys: EnemySpriteKeys = {
        walk: 'zombieWalk',
        die: 'zombieDie',
        attack: 'zombieAttack',
    }

    private constructor(
        public readonly scene: GameScene,
        public readonly zIndex: number,
        public readonly x: number,
        public readonly y: number,
    ) {
        super(scene, x, y, zIndex, ZombieEnemy.spriteKeys, price)
    }

    public static spawn(amount: number, scene: GameScene): ZombieEnemy[] {
        const result = []

        amount += 1

        for (let i = 1; i < amount; i++) {
            const x = -(i * distance)
            const y = 150

            const zombie = new ZombieEnemy(scene, i, x, y)
            zombie.create()

            result.push(zombie)
        }

        return result
    }
}
