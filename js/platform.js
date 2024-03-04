class Platform extends Floor {
    image;
    redrawTime = false;
    beginCutX = 0;
    beginCutY = 0;

    constructor(name, x, y, width, height, creationTime, src) {
        super(name, x, y, width, height);
        this.type = "platform";
        this.delta += creationTime // platforms should be created to different times
        this.image = new Image();
        this.image.src = src;
    };

    update() {
        // every 7 seconds the platforms gets at a random position redrawn
        if (Date.now() >= this.delta + 7000) {
            this.redrawTime = false;
            this.delta = Date.now()

            this.position.x = this.getRndInteger(gameManager.canvas.canvasBoundaries.left, gameManager.canvas.canvasBoundaries.right - this.dimensions.width);
            this.position.y = this.getRndInteger(gameManager.canvas.canvasBoundaries.top + 100, gameManager.canvas.canvasBoundaries.bottom - this.dimensions.height - 100);
        }
    }

    draw() {
        gameManager.canvas.ctx.beginPath();
        gameManager.canvas.ctx.drawImage(this.image, this.beginCutX, this.beginCutY, this.dimensions.width, this.dimensions.height, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
        gameManager.canvas.ctx.closePath();

    }


    onCollision(otherObject) {
        if (otherObject.name == "duck") {
        }
    }
}
