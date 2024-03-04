class Floor extends GameObject {
    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);
        this.type = "groundFloor";
    }

    draw() {

        gameManager.canvas.ctx.beginPath();;
        // gameManager.canvas.ctx.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        gameManager.canvas.ctx.rect(this.boundaries.getLeftBoundary(), this.boundaries.getTopBoundary(), Math.abs(this.boundaries.getLeftBoundary() - this.boundaries.getRightBoundary()), Math.abs(this.boundaries.getTopBoundary() - this.boundaries.getBottomBoundary()))
        gameManager.canvas.ctx.closePath();

    }

    onCollision(otherObject) {

    }
}

