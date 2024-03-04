class GameObject {
    delta = Date.now(); // important for invicibility frames and platform creation
    //for storing and restoring position
    prevPosition = {
        x: 0,
        y: 0
    }

    position = {
        x: 0,
        y: 0,
    }

    dimensions = {
        width: 0,
        height: 0
    }

    // to minimise or enlarge hitbox size
    boundaryOffsets = {
        "left": 0,
        "right": 0,
        "top": 0,
        "bottom": 0
    }

    // always gets current boundary posisitions
    boundaries = {
        "getLeftBoundary": () => {
            return this.position.x + this.boundaryOffsets.left;
        },
        "getRightBoundary": () => {
            return this.position.x + this.dimensions.width + this.boundaryOffsets.right;
        },
        "getTopBoundary": () => {
            return this.position.y + this.boundaryOffsets.top;
        },
        "getBottomBoundary": () => {
            return this.position.y + this.dimensions.height + this.boundaryOffsets.bottom;
        }
    };

    constructor(name, x, y, width, height) {
        this.name = name,

            this.position.x = x,
            this.position.y = y,

            this.dimensions.width = width;
        this.dimensions.height = height;
        gameManager.addGameObject(this);
    };


    draw() { }
    update() {
    }

    onCollision(otherObject) { }


    setBoundaryOffsets(left, right, top, bottom) {
        this.boundaryOffsets.left = left;
        this.boundaryOffsets.right = right;
        this.boundaryOffsets.top = top;
        this.boundaryOffsets.bottom = bottom;
    }

    storePosition() {
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;
    }

    restorePosition() {
        this.position.x = this.prevPosition.x;
        this.position.y = this.prevPosition.y;
    }

    bumpingCanvasBoundaries() {

    };

    // for random spawning of the ducklings and platforms
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }

}