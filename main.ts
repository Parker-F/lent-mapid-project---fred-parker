function StartNextLevel () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    currentlevel += 1
    if (currentlevel == 1) {
        tiles.setTilemap(tilemap`level0`)
    } else if (currentlevel == 2) {
        tiles.setTilemap(tilemap`level7`)
    } else if (currentlevel == 3) {
        tiles.setTilemap(tilemap`level8`)
    } else if (currentlevel == 4) {
        tiles.setTilemap(tilemap`level11`)
    } else {
        game.over(true, effects.confetti)
    }
    tiles.placeOnRandomTile(mySprite, sprites.dungeon.collectibleInsignia)
    for (let value of tiles.getTilesByType(sprites.dungeon.collectibleRedCrystal)) {
        myEnemy = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f11111111f.......
            ......fd11111111df......
            ......fd11111111df......
            ......fddd1111dddf......
            ......fbdbfddfbdbf......
            ......fcdcf11fcdcf......
            .......fb111111bf.......
            ......fffcdb1bdffff.....
            ....fc111cbfbfc111cf....
            ....f1b1b1ffff1b1b1f....
            ....fbfbffffffbfbfbf....
            .........ffffff.........
            ...........fff..........
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        tiles.placeOnTile(myEnemy, value)
        myEnemy.follow(mySprite, 30)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile`, function (sprite, location) {
    game.over(false, effects.melt)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = -120
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    StartNextLevel()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (sprite.bottom < otherSprite.y) {
        sprite.vy = -100
    } else {
        info.changeLifeBy(-1)
    }
})
let myEnemy: Sprite = null
let mySprite: Sprite = null
let currentlevel = 0
currentlevel = 0
scene.setBackgroundColor(11)
mySprite = sprites.create(img`
    . . f f f . . . . . . . . f f f 
    . f f c c . . . . . . f c b b c 
    f f c c . . . . . . f c b b c . 
    f c f c . . . . . . f b c c c . 
    f f f c c . c c . f c b b c c . 
    f f c 3 c c 3 c c f b c b b c . 
    f f b 3 b c 3 b c f b c c b c . 
    . c b b b b b b c b b c c c . . 
    . c 1 b b b 1 b b c c c c . . . 
    c b b b b b b b b b c c . . . . 
    c b c b b b c b b b b f . . . . 
    f b 1 f f f 1 b b b b f c . . . 
    f b b b b b b b b b b f c c . . 
    . f b b b b b b b b c f . . . . 
    . . f b b b b b b c f . . . . . 
    . . . f f f f f f f . . . . . . 
    `, SpriteKind.Player)
mySprite.ay = 500
controller.moveSprite(mySprite, 100, 0)
scene.cameraFollowSprite(mySprite)
info.setLife(3)
StartNextLevel()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.isHittingTile(CollisionDirection.Bottom)) {
            if (value.vx < 0 && value.tileKindAt(TileDirection.Left, sprites.dungeon.floorMixed)) {
                value.vy = -150
            } else if (value.vx > 0 && value.tileKindAt(TileDirection.Right, sprites.dungeon.floorMixed)) {
                value.vy = -150
            }
        } else if (value.isHittingTile(CollisionDirection.Left)) {
            value.vx = 30
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.vx = -30
        }
    }
})
