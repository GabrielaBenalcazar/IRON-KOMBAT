// class Bullets {
//     constructor(ctx, gameSize) {
//         this.ctx = ctx;
//         this.gameSize = gameSize;
//         this.buPos = { x: ((this.gameSize.w * 2.5) / 4) / 2, y: (this.gameSize.h / 4) / 2 };
//         this.buSize = { w: this.gameSize.w / 5, h: this.gameSize.h / 2 };
//         this.radius = 50;
//         this.vel = { x: 40, y: 160 };
//         this.gravity = 1;
//         this.floor = this.gameSize.h;
//     }
//     draw() {
//         this.ctx.beginPath();
//         this.ctx.fillStyle = “black”;
//         this.ctx.arc(this.buPos.x, this.buPos.y,
//             this.radius, 0, Math.PI * 2);
//         this.ctx.fill();
//         this.ctx.closePath();
//         this.move()
//     }
    // move() {
    //     this.buPos.x += this.vel.x; this.buPos.y += this.vel.y;
    //     this.vel.y += this.gravity;
    //     if (this.buPos.y >= this.floor + this.playerHeight) {
    //         this.vel.y *= -1;
    //     }
    // }
// }

























