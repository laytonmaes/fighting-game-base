const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height)

//----------------------- global var -----------------------\\
const gravity = .5
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
    color: "yellow"
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

const detectCollisionHit = () => {
    if(
        player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
        player.attackBox.position.x <= enemy.position.x + enemy.width &&
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
        player.attackBox.position.y <= enemy.position.y + enemy.height
        ) {
        console.log("stuff")
    }
}

const animate = () => {
    window.requestAnimationFrame(animate)
    c.fillStyle ="black"
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    
    checkMoveX()
    detectCollisionHit()
}

animate()

//----------------------- event listeners -----------------------\\
window.addEventListener("keydown", (event) => {
    lastKey = ""
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