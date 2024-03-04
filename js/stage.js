let gameManager = new GameManager();
let canvas = new Canvas("canvas");


//Create class Stage - create function start or something -> call function

// instantiate main character ---------------------------
let duck = new Player('duck', 0, 400, 104, 104, '../images/motherduck.png');
duck.setBoundaryOffsets(0, 0, 15, 0);
duck.addAnimationFrames('walk_right', 0, 7);
duck.addAnimationFrames('walk_left', 8, 15);
duck.addAnimationFrames('jump_right', 16, 23);
duck.addAnimationFrames('jump_left', 24, 31);
duck.addAnimationFrames('idle_right', 32, 39);
duck.addAnimationFrames('idle_left', 40, 47);

// instantiate first enemy - fox ----------------------------
let fox = new Enemy('fox', 600, 620, 128, 128, '../images/fox.png');
fox.setBoundaryOffsets(10, -10, 15, -15);
fox.addAnimationFrames('walk_right', 0, 7);
fox.addAnimationFrames('walk_left', 8, 15);

// instantiate first enemy - fox ----------------------------
let eagle = new FlyingEnemy('eagle', 800, 100, 128, 128, '../images/eagle.png');
eagle.setBoundaryOffsets(0, 0, 0, -8);
eagle.addAnimationFrames('walk_right', 0, 7);
eagle.addAnimationFrames('walk_left', 8, 15);

// instantiate ducklings ---------------------------------
let duckling1 = new Duckling('duckling1', 1100, 520, 56, 56, '../images/ducky.png');

//duckling1.addAnimationFrames('walk_right',0 ,3);
//duckling1.addAnimationFrames('walk_left', 4, 7);

// draw the floor -------------------------------------------------------
let floor = new Floor('floor', 0, (gameManager.canvas.canvasBoundaries.bottom - 25), gameManager.canvas.canvasBoundaries.right, 25);


// draw platforms ----------------
let platform1 = new Platform('platform1', 400, 300, 100, 20, 0, '../images/platform.png');
let platform2 = new Platform('platform2', 900, 500, 100, 20, 2000, '../images/platform.png');
let platform3 = new Platform('platform3', 400, 500, 100, 20, 4000, '../images/platform.png');
let platform4 = new Platform('platform4', 1100, 580, 100, 20, 6000, '../images/platform.png');
let platform5 = new Platform('platform5', 100, 200, 100, 20, 8000, '../images/platform.png');
let platform6 = new Platform('platform6', 600, 150, 100, 20, 10000, '../images/platform.png');

requestAnimationFrame(gameManager.gameLoop)
