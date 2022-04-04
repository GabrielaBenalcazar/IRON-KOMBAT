class Character {
    constructor(ctx, gameSize) {
        this.ctx = ctx;
        this.gameSize = gameSize;

        this.life = 100;

        this.imageInstance = undefined;

        this.floor = gameSie.h;

        this.chaPos = { x: 350, y: 350 };
        this.chaSize = { w: 350, h: 350 };

        this.vel = { x: 40, y: 160 };
        this.gravity = { x: 0, y: 4 };
        this.dFrames = 0.4;

        this.init();
    }

    moveLeft() {
        if (this.chaPos.x > 0) {
            this.chaPos.x -= this.vel.x;
        } else this.chaPos.x = 0;
    }
    moveRight() {
        if (this.chaPos.x <= this.gameSize.w - this.chaSize.w) {
            this.chaPos.x += this.vel.x;
        } else this.chaPos.x = this.gameSize.w - this.chaSize.w;
    }
    moveDown() {}
    jump() {
        this.chaPos.y -= this.vel.y;
        if (this.chaPos.y < this.floor) {
            this.chaPos.y += thi;
        }
    }
}
class German extends Character {
    constructor(ctx, gameSize) {
        super(ctx, gameSize);
    }
    init() {
        this.imageInstance = new Image();
        this.imageInstance.src = "/img/goku.png";
    }
    draw() {
        this.ctx.drawImage(
            this.imageInstance,
            this.chaPos.x,
            this.chaPos.y,
            this.chaSize.w,
            this.chaSize.h
        );
        // this.moveDown()
    }

    atackGer1() {
        console.log("tikitiki");
    }
    atackGer2() {
        console.log("Dejate llevar");
    } //PREGUNTAR TAs
}
// class Vito extends Character {
//     constructor(ctx, gameSize, atackVi1, atackVi2) {
//         super(ctx, gameSize);
//     }
//     init() {
//         this.imageInstance = new Image();
//         this.imageInstance.src = "/img/goku.png";
//     }
//     draw() {
//         this.ctx.drawImage(
//             this.imageInstance,
//             this.chaPos.x,
//             this.chaPos.y,
//             this.chaSize.w,
//             this.chaSize.h
//         );
//     }
//     moveLeft() {
//         if (this.carPos.x > 0) {
//             this.carPos.x -= 10;
//         } else this.carPos.x = 0;
//     }
//     moveRight() {
//         if (this.carPos.x <= this.gameSize.w - this.carSize.w) {
//             this.carPos.x += 10;
//         } else this.carPos.x = this.gameSize.w - this.carSize.w;
//     }
//     atackVi1() {
//         console.log("tikitiki");
//     }
//     atackVi2() {
//         console.log("“tikitiki”");
//     }
// }
// class Valentin extends Character {
//     constructor(ctx, gameSize, atackVal1, atackVal2) {
//         super(ctx, gameSize);
//     }
//     init() {
//         this.imageInstance = new Image();
//         this.imageInstance.src = "../img/goku.png";
//     }
//     draw() {
//         this.ctx.drawImage(
//             this.imageInstance,
//             this.chaPos.x,
//             this.chaPos.y,
//             this.chaSize.w,
//             this.chaSize.h
//         );
//     }
//     moveLeft() {
//         if (this.carPos.x > 0) {
//             this.carPos.x -= 10;
//         } else this.carPos.x = 0;
//     }
//     moveRight() {
//         if (this.carPos.x <= this.gameSize.w - this.carSize.w) {
//             this.carPos.x += 10;
//         } else this.carPos.x = this.gameSize.w - this.carSize.w;
//     }

//     atackVal1() {
//         console.log("“tikitiki”");
//     }
//     atackVal2() {
//         console.log("“tikitiki”");
//     }
// }
