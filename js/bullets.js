class Bullets {
    constructor(ctx, gameSize, imPosX, imPosY, imSizeW, imSizeH) {
        this.ctx = ctx;
        this.gameSize = gameSize;

        this.imSize = { w: imSizeW, h: imSizeH };
        this.bullPos = {
            x: imPosX,
            y: imPosY + this.gameSize.h / 4,
        };

        this.radius = 10;

        this.floor = this.gameSize.h;

        this.vel = { x: -30, y: 0 };
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.arc(
            this.bullPos.x,
            this.bullPos.y,
            this.radius,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
        this.ctx.closePath();
        this.move();
        // console.log("SALEN LAS BALAS?");
    }
    move() {
        this.bullPos.x += this.vel.x;
    }
}
