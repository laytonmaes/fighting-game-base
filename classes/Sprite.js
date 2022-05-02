class Sprite {
    constructor ({position, velocity, color = "yellow", offset}) {
        this.position = position;
        this.velocity = velocity 
        this.height = 150
        this.width = 85
        this.lastKey;
        this.attackBox = {
            position:{
                x:this.position.x,
                y:this.position.y,
            },
            offset,
            width:100,
            height:50
        }
        this.color = color
        this.isAttacking = false
        this.health = 100
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // this.attackBox //
        if(this.isAttacking){
            c.fillStyle = "green"
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y, 
                this.attackBox.width, 
                this.attackBox.height)
        }
    }

    update() {
        this.draw()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x 
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height - 70) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity;
        }
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false;
        }, 100)
    }
}
