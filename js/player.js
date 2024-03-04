class Player extends GameCharacter {
    isOnGround = false;
    isJumping = false;
    isWalking = false;
    isIdle = true;
    speed = 5;
    jumpVelocity = -15;
    direction = 'right' //Added variable to keep track of player direction
    canWalk = true; // for bumping Canvas boundaries
    ducklingCounter = 0;
    span_ducklingCounter = document.getElementById('duckling_counter');
    invincibilityFrames = false;


    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src)
        console.log('Player has been created')
    };

    draw() {
        if (this.isLoaded) {
            // DEBUG ONLY
            if (gameManager.debugMode) {
                gameManager.canvas.ctx.save();
                gameManager.canvas.ctx.fillStyle = "red";
                gameManager.canvas.ctx.fillRect(this.boundaries.getLeftBoundary(), this.boundaries.getTopBoundary(), Math.abs(this.boundaries.getLeftBoundary() - this.boundaries.getRightBoundary()), Math.abs(this.boundaries.getTopBoundary() - this.boundaries.getBottomBoundary()))
                gameManager.canvas.ctx.restore();
            }

            gameManager.canvas.ctx.drawImage(this.image, this.beginCutX, this.beginCutY, this.dimensions.width, this.dimensions.height, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
        }
    }

    update() {
        this.bumpingCanvasBoundaries();
        if (this.canWalk) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }

        // animation
        if (this.isWalking) {
            if (this.animationFrame <= this.endFrame) {
                this.changeFrame()
            }
            else {
                this.animationFrame = this.startFrame;
                this.changeFrame()
            }
        }
        if (this.isJumping) {
            if (this.animationFrame <= this.endFrame) {
                this.changeFrame()
            }
            else {
                this.animationFrame = this.startFrame;
            }
        }

        // gravity kicks in when player is not on the ground
        if (!this.isOnGround) {
            this.velocity.y += this.gravity
        } else {
            return;
        }

        // game over screen is loaded when counter drops below 0
        if (this.ducklingCounter < 0) {
            window.location.replace("../pages/gameover.html");
            this.ducklingCounter = 0;
        }

        // winning screen is shown when counter reaches 25
        if (this.ducklingCounter == 25) {
            window.location.replace("../pages/win.html");
        }

    }

    onCollision(otherObject) {

        if (otherObject?.type === "groundFloor") {

            this.isOnGround = true
            this.isJumping = false
            this.position.y = otherObject.boundaries.getTopBoundary() - this.dimensions.height;
        } else if (otherObject?.type === "platform") {
            this.isJumping = false;
            
            if (
                this.checkCollision(otherObject)
            ) {
                this.position.y = this.prevPosition.y
            } // resets y position
            // does not work for x position

        } else if (otherObject?.type === "enemy") {

            if (!this.invincibilityFrames) {
                this.invincibilityFrames = true;
                this.ducklingCounter--
                this.span_ducklingCounter.innerHTML = this.ducklingCounter; // updates duckling counter with correct number
            }

            if (Date.now() >= this.delta + 3000) { // hitbox of the fox is too big, a timer of 3seconds is needed, otherwise the ducklingcounter would drop by hundreds
                this.invincibilityFrames = false;
                this.delta = Date.now()
            }
            console.log(this.ducklingCounter)

        } else if (otherObject?.type === "duckling") {
            this.ducklingCounter++;
            this.span_ducklingCounter.innerHTML = this.ducklingCounter;
            console.log(this.ducklingCounter)

        }
    }

    // can not walk outside the canvas boundaries
    bumpingCanvasBoundaries() {

        if (this.position.x >= gameManager.canvas.canvasBoundaries.left && this.position.x <= (gameManager.canvas.canvasBoundaries.right - this.dimensions.width)) {
            this.canWalk = true
        }
        else if (this.position.x <= gameManager.canvas.canvasBoundaries.left) {
            this.canWalk = false;
            this.position.x = gameManager.canvas.canvasBoundaries.left + 0.1;
        }
        else if (this.position.x >= (gameManager.canvas.canvasBoundaries.right - this.dimensions.width)) {
            this.canWalk = false;
            this.position.x = (gameManager.canvas.canvasBoundaries.right - this.dimensions.width) - 0.1;
        }
    }

    // for platform collission as other collission detection did not work
    checkCollision(otherObject) {
        if (this.position.x < otherObject.position.x + otherObject.dimensions.width &&
            this.position.x + this.dimensions.width > otherObject.position.x &&
            this.position.y < otherObject.position.y + otherObject.dimensions.height &&
            this.dimensions.height + this.position.y > otherObject.position.y) {
            return true;
        }
        return false;
    }
}

