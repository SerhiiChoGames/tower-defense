import Button from '@/Models/Buttons/Button'
import { config } from '@/config'
import MagicTower from '@/Models/Tower/MagicTower'
import GameScene from '@/Scenes/GameScene'

const imageKey = 'magicTowerButton' as const

export default class MagicTowerButton extends Button {
    public constructor(scene: GameScene) {
        const x = 200
        const y = config.height - 100

        super(scene, MagicTower.price, x, y, imageKey)
    }

    public static spawn(scene: GameScene): MagicTowerButton {
        const button = new MagicTowerButton(scene)
        button.create()

        return button
    }
}