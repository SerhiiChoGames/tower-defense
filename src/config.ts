import type { SceneKey } from '@/types'
import Phaser from 'phaser'
import GameScene from '@/Scenes/GameScene'
import StartScene from '@/Scenes/StartScene'
import LoadingScene from '@/Scenes/LoadingScene'

export const WIDTH = 1920
export const HEIGHT = 1080

export const config: Phaser.Types.Core.GameConfig = {
    width: WIDTH,
    height: HEIGHT,
    type: Phaser.AUTO,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    physics: {
        default: 'arcade',
    },

    scene: [
        LoadingScene,
        StartScene,
        GameScene,
    ]
}

export const events = {
    togglePlaceholderVisibility: 'toggleplaceholdervisibility',
    towerIsPlaced: 'towerisplaced',
    enemyKilled: 'enemykilled',
}

export const scene: Record<SceneKey, SceneKey> = {
    StartScene: 'StartScene',
    GameScene: 'GameScene',
    LoadingScene: 'LoadingScene',
}