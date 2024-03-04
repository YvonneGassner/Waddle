// Key Down events
function inputHandlerDown(eventInformation) {

    switch (eventInformation.key) {
        case "a":
            duck.velocity.x = -duck.speed; // walks left
            duck.direction = 'left';
            duck.isWalking = true;
            duck.isIdle = false;
            duck.setAnimationByName('walk_left');
            break;
        case "d":
            duck.velocity.x = duck.speed; // walks right
            duck.direction = 'right';
            duck.isWalking = true;
            duck.isIdle = false;
            duck.setAnimationByName('walk_right');
            break;
        case "w":
            if (duck.isOnGround) {
                duck.isJumping = false;
            }
            if (!duck.isJumping) {
                duck.setAnimationByName(`jump_${duck.direction}`)
                duck.velocity.y = duck.jumpVelocity; // jumps
                duck.isOnGround = false;
                duck.isJumping = true;
                duck.isWalking = false;
                duck.isIdle = false;
            }
            break;
        case "x":
            gameManager.debugMode = !gameManager.debugMode; // Debug Mode
    };

};

window.addEventListener("keydown", inputHandlerDown);

// Key Up events
function inputHandlerUp(eventInformation) {

    switch (eventInformation.key) {
        case "a":
            duck.velocity.x = 0;
            duck.isWalking = false;
            duck.isIdle = true;
            duck.setAnimationByName('idle_left');
            break;
        case "d":
            duck.velocity.x = 0;
            duck.isWalking = false;
            duck.isIdle = true;
            duck.setAnimationByName('idle_right');
            break;
    };

};

window.addEventListener("keyup", inputHandlerUp);