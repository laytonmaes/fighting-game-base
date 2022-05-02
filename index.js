const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height)

//----------------------- global var -----------------------\\
const gravity = .5

//----------------------- querySelectors -----------------------\\
const playerHealth = document.querySelector("#playerHealth")
const enemyHealth = document.querySelector("#enemyHealth")
const timerDom = document.querySelector(".timer") 
const winScreen = document.querySelector(".win-screen") 
//----------------------- player -----------------------\\
const player = new Sprite({
    position: {
        x:0, 
        y:0
    },
    velocity: {
        x: 0,
        y: 10
    },
    offset: {
        x:0,
        y:0
    },
})

player.draw()

const enemy = new Sprite({
    position: {
        x:500, 
        y:0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x:-15,
        y:0
    },
    color: "red"
})

enemy.draw()

//----------------------- animation -----------------------\\
const keys = {
    a: {
        pressed:false
    },
    d: {
        pressed:false
    },
    arrowRight: {
        pressed:false
    },
    arrowLeft: {
        pressed:false
    }
}

let lastKey;

const checkMoveX = () => {
    player.velocity.x = 0
    enemy.velocity.x = 0
    
    // player movement //
    if (keys.a.pressed === true && player.lastKey === "a") {
        player.velocity.x = -5
    }else if (keys.d.pressed === true && player.lastKey === "d"){
        player.velocity.x = 5
    }

    // enemy movement // 
    if (keys.arrowLeft.pressed === true && enemy.lastKey === "ArrowLeft") {
        enemy.velocity.x = -5
    }else if (keys.arrowRight.pressed === true && enemy.lastKey === "ArrowRight"){
        enemy.velocity.x = 5
    }
} 

const hitCollision = (charHit, charHurt) => {
    return (
        charHit.attackBox.position.x + charHit.attackBox.width >= charHurt.position.x &&
        charHit.attackBox.position.x <= charHurt.position.x + charHurt.width &&
        charHit.attackBox.position.y + charHit.attackBox.height >= charHurt.position.y &&
        charHit.attackBox.position.y <= charHurt.position.y + charHurt.height
    )
}

const checkHit = () => {
    if(hitCollision(player, enemy) && player.isAttacking) {
        player.isAttacking = false
        enemy.health -= 10
        enemyHealth.style.width = `${enemy.health}%`
    }
    if(hitCollision(enemy, player) && enemy.isAttacking) {
        enemy.isAttacking = false
        player.health -= 10
        playerHealth.style.width = `${player.health}%`
    }
}

let timer = 10
let timerId
let gameEnd = false

const checkWin = () => {
    if(player.health === 0) {
        gameEnd = true;
        clearTimeout(timerId)
    } else if(enemy.health === 0) {
        gameEnd = true;
        clearTimeout(timerId)
    } 
    if (gameEnd) {
        if(player.health === enemy.health) {
            winScreen.innerHTML = "tie"
        } else if (player.health > enemy.health) {
            winScreen.innerHTML = "player1"
        } else {
            winScreen.innerHTML = "player2"
        }
        return true
    }
}

const decreaseTimer = () => {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer-- 
        timerDom.innerHTML = timer
    }
    if(timer <= 0) {
        gameEnd = true
        clearTimeout(timerId)
        checkWin()
    }
}
decreaseTimer()

const animate = () => {
    c.fillStyle ="black"
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    
    checkMoveX()
    checkHit()
    checkWin()
    if (checkWin()) {
        return
    }
    window.requestAnimationFrame(animate)
}

animate()

//----------------------- event listeners -----------------------\\
window.addEventListener("keydown", (event) => {
    lastKey = ""
    // console.log(event.key)
    switch(event.key) {
        case "d":
            keys.d.pressed = true;
            player.lastKey = "d"
            break;
        case "a" :
            keys.a.pressed = true;
            player.lastKey = "a"
            break
        case "w" :
            player.velocity.y = -13
            break
        case " ":
            player.attack()
            break
        }

        // enemy keys // 
        switch(event.key) {
        case "ArrowRight":
            keys.arrowRight.pressed = true;
            enemy.lastKey = "ArrowRight"
            break;
        case "ArrowLeft" :
            keys.arrowLeft.pressed = true;
            enemy.lastKey = "ArrowLeft"
            break
        case "ArrowUp" :
            enemy.velocity.y = -13
            break;
        case "/":
            enemy.attack()
            break
        }
})

window.addEventListener("keyup", (event) => {
    switch(event.key) {
        case "d":
            keys.d.pressed = false
            break;
        case "a" :
            keys.a.pressed = false
            break

        }

        // enemy keys //
        switch(event.key) {
        case "ArrowRight":
            keys.arrowRight.pressed = false;
            break;
        case "ArrowLeft" :
            keys.arrowLeft.pressed = false;
            break
        }
})
//----------------------- bottom -----------------------\\