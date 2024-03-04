class GameCharacter extends GameObject {
    gravity = 0.5;
    src;
    image;
    animations = {};
    columns = 0;
    rows = 0;
    beginCutX = 0;
    beginCutY = 0;
    startFrame = 0;
    endFrame = 0;
    animationFrame = 0;
    isLoaded = false;
    // staggerFrames is for the animation speed
    staggerFrames = 3;
    gameFrame = 0;

    velocity = {
        x: 0,
        y: 0
    }

    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height)
        this.useGravity = true
        this.image = new Image(),
            this.image.src = src,

            this.image.addEventListener("load", () => {
                this.isLoaded = true;
                this.columns = this.image.naturalWidth/ this.dimensions.width;
                this.rows = this.image.naturalHeight / this.dimensions.height;
            });
    }

    draw() {}

    // only GameCharacters need animation
    setCurrentAnimation(startFrame, endFrame) {
        this.startFrame = startFrame;
        this.endFrame = endFrame;
        this.animationFrame = startFrame;
    }

    changeFrame() {
        this.gameFrame++;
        if (this.gameFrame < this.staggerFrames) {
            return;
        }
        this.gameFrame = 0;
        if (this.animationFrame > this.endFrame) {
            this.animationFrame = this.startFrame;
        }
        let row = Math.floor(this.animationFrame / this.columns);
        let column = this.animationFrame % this.columns;
        this.beginCutY = row * this.dimensions.height;
        this.beginCutX = column * this.dimensions.width;
        this.animationFrame++;
    }


    addAnimationFrames(name, startFrame, endFrame) {
        let animationFrames = {
            "startFrame": startFrame,
            "endFrame": endFrame
        }
        this.animations[name] = animationFrames;
    }


    setAnimationByName(name) {
        this.startFrame = this.animations[name].startFrame;
        this.endFrame = this.animations[name].endFrame;
        this.animationFrame = this.animations[name].startFrame;
    }

    update() {
    };

    bumpingCanvasBoundaries() {

    };
};
