class PowerUps {
    constructor(ctx, gameSize, speed) {
        this.ctx = ctx;
        this.gameSize = gameSize;
        this.powUpSize = { w: this.generateRandomInt(100, 200), h: 20 };
        this.powUpPos = {
            x: this.generateRandomInt(25, this.gameSize.w - this.powUpSize.w - 25),
            y: 0,
        };
        this.speed = speed

        this.init();
    }

    init() {
        this.imageInstance = new Image();
        this.imageInstance.src = "../img/CAFE.png";
    }

    generateRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    drawRandomPowUp() {
        this.ctx.drawImage(
            this.imageInstance,
            this.powUpPos.x,
            this.powUpPos.y,
            this.powUpSize.w,
            this.powUpSize.h
        );
    }

    move() {
        this.powUpPos.y += this.speed;

    }
}
