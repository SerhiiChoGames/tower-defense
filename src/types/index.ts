export type SoundKey
    = 'actionMusic'
    | 'arrowFlySound'
    | 'arrowHitSound'
    | 'buildingCompletedSound'
    | 'buildingHitSound'
    | 'magicFlySound'
    | 'magicHitSound'
    | 'buttonClick'
    | 'menu'
    | 'buttonHover'

export type ImageKey
    = 'arrowTowerButton'
    | 'spawner'
    | 'map'
    | 'castle'
    | 'arrowProjectile'
    | 'magicBallProjectile'
    | 'magicTowerButton'
    | 'bg'
    | 'btn'
    | 'btnPressed'
    | 'copy'
    | 'logo'

export type SpriteKey
    = 'zombieWalk'
    | 'zombieDie'
    | 'zombieAttack'
    | 'arrowTowerIdle'
    | 'magicTowerIdle'

export type EnemySpriteKeys = {
    walk: SpriteKey
    die: SpriteKey
    attack: SpriteKey
}

export type EnemyAnimationKeys = {
    walk: 'enemyWalk',
    die: 'enemyDie',
    attack: 'enemyAttack',
}