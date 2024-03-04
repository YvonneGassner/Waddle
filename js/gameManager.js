class GameManager {
    gameObjects = []
    canvas = null
    debugMode = false;

    constructor() {
        window.gameManager = this;
    }

    // loops through each gameObject
    gameLoop() {
        gameManager.canvas.ctx.clearRect(0, 0, canvas.canvasHTMLElement.width, canvas.canvasHTMLElement.height);
        gameManager.gameObjects.forEach((gameObject) => {
            gameObject.storePosition()
            gameObject.update()
            gameManager.collisionDetection(gameObject);
            gameObject.draw()

        })

        requestAnimationFrame(gameManager.gameLoop)
    }


    collisionDetection(object1) {
        for (let i = object1.gameObjectIndex + 1; i < gameManager.gameObjects.length; i++) {
            let object2 = gameManager.gameObjects[i];

            //normal collision after update
            let collisionDetected = this.detectCollision(object1, object2);
            if (collisionDetected) {
                object1.onCollision(object2);
                object2.onCollision(object1);
            }

        }
    }


    detectCollision(object1, object2) {

        //overlap on x axis
        if (object1.boundaries.getLeftBoundary() <= object2.boundaries.getRightBoundary() &&
            object1.boundaries.getRightBoundary() >= object2.boundaries.getLeftBoundary()) {
            //overlap on y axis
            if (object1.boundaries.getTopBoundary() <= object2.boundaries.getBottomBoundary() &&
                object1.boundaries.getBottomBoundary() >= object2.boundaries.getTopBoundary()) {
                return true;
            }
        }

        return false
    }

// game objects are added into the gameManager
    addGameObject(object) {
        this.gameObjects.push(object);
        object.gameObjectIndex = this.gameObjects.length - 1;
    }


// set canvas, which is later defined in stage
    setCanvas(canvas) {
        this.canvas = canvas;
    }
}

