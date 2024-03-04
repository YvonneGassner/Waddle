class FlyingEnemy extends Enemy {
    speed = 15; // velocity of the enemy
    changeDirectionInterval = null;

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);

        console.log('Flying Enemy has been created')
        this.changeDirectionInterval = setInterval(this.changeDirection.bind(this), 1000);
    }

    // change direction on x any y axis
    changeDirection() {
        this.velocity = {
           x: Math.random() * this.speed - this.speed / 2,
           y: Math.random() * this.speed - this.speed / 2,
        }
    }

    draw() {
        if (this.isLoaded) {
            gameManager.canvas.ctx.beginPath();
            gameManager.canvas.ctx.drawImage(this.image, this.beginCutX, this.beginCutY, this.dimensions.width, this.dimensions.height, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
            gameManager.canvas.ctx.closePath();
        }
    }

    // moves on x and y axis
    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    update() {
        this.bumpingCanvasBoundaries();

        if (this.position.x++) {
            eagle.setAnimationByName('walk_right')
            if (this.animationFrame <= this.endFrame) {
                this.changeFrame()
            }

            else {
                this.animationFrame = this.startFrame;
            }
        } else {
            eagle.setAnimationByName('walk_left')
        }

        this.move()

    }

    onCollision(otherObject) {
        if (otherObject instanceof Floor) {
            this.isOnGround = true;
            this.velocity.y = 0;
            this.position.y = otherObject.boundaries.getTopBoundary() - this.dimensions.height;
        }
    }

    bumpingCanvasBoundaries() {
       
        if (this.position.x <= gameManager.canvas.canvasBoundaries.left) {
            this.velocity.x = -this.velocity.x;
            this.position.x = gameManager.canvas.canvasBoundaries.left + 0.1;
        }
        else if (this.position.x >= (gameManager.canvas.canvasBoundaries.right - this.dimensions.width)) {
            this.velocity.x = -this.velocity.x;
            this.position.x = (gameManager.canvas.canvasBoundaries.right - this.dimensions.width) - 0.1;
        }
        else if (this.boundaries.getTopBoundary() <= gameManager.canvas.canvasBoundaries.top) {
            this.position.y = +this.velocity.y
        }
        else if (this.boundaries.getBottomBoundary() >= gameManager.canvas.canvasBoundaries.bottom - 150) {
            this.position.y = -this.velocity.y;
        }
    }
}