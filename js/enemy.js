class Enemy extends GameCharacter {
    speed = 10; // velocity of the enemy
    isOnGround = false;
    changeDirectionInterval = null;
    animationDirection = 'walk_right';

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src);

        console.log('Enemy has been created')
        this.changeDirectionInterval = setInterval(this.changeDirection.bind(this), 3000);
        this.type = "enemy";

    }

    // changes direction on x axis
    changeDirection() {
        this.velocity.x = Math.random() * this.speed - this.speed / 2;
    }

    draw() {
        if (this.isLoaded) {
            // DEBUG ONLY
            if (gameManager.debugMode) {
                gameManager.canvas.ctx.save();
                gameManager.canvas.ctx.fillStyle = "blue";
                gameManager.canvas.ctx.fillRect(this.boundaries.getLeftBoundary(), this.boundaries.getTopBoundary(), Math.abs(this.boundaries.getLeftBoundary() - this.boundaries.getRightBoundary()), Math.abs(this.boundaries.getTopBoundary() - this.boundaries.getBottomBoundary()))
                gameManager.canvas.ctx.restore();
            }

            gameManager.canvas.ctx.beginPath();
            gameManager.canvas.ctx.drawImage(this.image, this.beginCutX, this.beginCutY, this.dimensions.width, this.dimensions.height, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
            gameManager.canvas.ctx.closePath();
        }
    }

    // does only move on x axis
    move() {
        this.position.x += this.velocity.x;
    }

    update() {
        this.bumpingCanvasBoundaries();

        if (this.velocity.x < 0) {
            this.setAnimationByName('walk_left');
            this.changeFrame();
            this.animationFrame++;
            if (this.animationFrame > this.endFrame) this.animationFrame = this.startFrame;
        } else if (this.velocity.x > 0) {
            this.setAnimationByName('walk_right');
            this.changeFrame();
            this.animationFrame++;
            if (this.animationFrame > this.endFrame) this.animationFrame = this.startFrame;
        }

        // no gravity if enemy on ground
        if (!this.isOnGround) {
            this.velocity.y += this.gravity
        }

        this.move()
    }

    onCollision(otherObject) {

        // stays on ground
        if (otherObject?.type === "groundFloor") {
            console.log("GroundFloor")
            this.isOnGround = true;
            this.position.y = otherObject.boundaries.getTopBoundary() - this.dimensions.height - this.boundaryOffsets.bottom;

        // can't go into platforms
        } else if (otherObject?.type === "platform") {
            this.isOnGround = true,
                this.restorePosition();
        }
    }

    // enemy can't go further than the canvas boundaries
    bumpingCanvasBoundaries() {

        if (this.position.x >= gameManager.canvas.canvasBoundaries.left && this.position.x <= (gameManager.canvas.canvasBoundaries.right - this.dimensions.width)) {
        }
        else if (this.position.x <= gameManager.canvas.canvasBoundaries.left) {
            this.velocity.x = -this.velocity.x;
            this.position.x = gameManager.canvas.canvasBoundaries.left + 0.1;
        }
        else if (this.position.x >= (gameManager.canvas.canvasBoundaries.right - this.dimensions.width)) {
            this.velocity.x = -this.velocity.x;
            this.position.x = (gameManager.canvas.canvasBoundaries.right - this.dimensions.width) - 0.1;
        }
    }
}
