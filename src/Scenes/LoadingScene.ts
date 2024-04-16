import Phaser from 'phaser'
import { scene } from '@/config'

export class LoadingScene extends Phaser.Scene {
    public constructor() {
        super(scene.LoadingScene)
    }
}