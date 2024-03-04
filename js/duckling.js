class Duckling extends GameCharacter {
    src;
    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height, src)
        this.src = src;
        this.type = "duckling";
    }
    draw() {
        if (this.isLoaded) {
            gameManager.canvas.ctx.beginPath();
            gameManager.canvas.ctx.drawImage(this.image, this.beginCutX, this.beginCutY, this.dimensions.width, this.dimensions.height, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
            gameManager.canvas.ctx.closePath();
        }
    }

    update() {
    }

    // random position when the duck collides with a duckling
    onCollision(otherObject) {
        if (otherObject.name == "duck") {
            this.position.x = this.getRndInteger(gameManager.canvas.canvasBoundaries.left, gameManager.canvas.canvasBoundaries.right - this.dimensions.width);
            this.position.y = this.getRndInteger(gameManager.canvas.canvasBoundaries.top + 100, gameManager.canvas.canvasBoundaries.bottom -this.dimensions.height - 25);
        }
    }
}