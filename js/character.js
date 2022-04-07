class Character {
    constructor(ctx, gameSize, chLive) {
        this.ctx = ctx;
        this.gameSize = gameSize;

        this.life = chLive;

        this.imageInstance = undefined;

        this.floor = this.gameSize.h;

        this.chaSize = { w: this.gameSize.w / 5, h: this.gameSize.h / 2 };
        this.drawCharLiveSize = { w: this.gameSize.w / 4, h: 30 };

        this.chaPos = { x: this.gameSize.w / 4, y: this.gameSize.h / 2 };

        this.vel = { x: 40, y: 300 };
        this.gravity = 1;

        this.init();
    }
    // AVISAR A MARIA QUE LOS MOVIMIENTOS VAN POR FUERA DE GERMAN

    moveLeft() {
        if (this.chaPos.x > 0) {
            this.chaPos.x -= this.vel.x;
        } else this.chaPos.x = 0;
    }
    moveRight() {
        // if (this.chaPos.x <= this.gameSize.w - this.chaSize.w) {
        this.chaPos.x += this.vel.x;
        // } else this.chaPos.x = this.gameSize.w - this.chaSize.w;
    }

    jump() {
        this.chaPos.y -= this.vel.y;
        this.vel.y = 0;
    }
    jumpDown() {
        if (this.chaPos.y + this.chaSize.h < this.floor) {
            this.vel.y += this.gravity;
            this.chaPos.y += this.vel.y;
        } else {
            this.vel.y = 300;
        }
    }

    drawCharLive() {
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(
            this.gameSize.w / 2 - this.drawCharLiveSize.w - 100,
            0,
            this.drawCharLiveSize.w,
            this.drawCharLiveSize.h
        );
    }
}

class German extends Character {
    constructor(ctx, gameSize, chLive) {
        super(ctx, gameSize, chLive);
    }
    init() {
        this.imageInstance = new Image();
        this.imageInstance.src = "../img/GERMAN.png";
        this.imageInstance.frames = 6;
        this.imageInstance.framesCha = 0;

        this.imageInstancePunch = new Image();
        this.imageInstancePunch.src = "./img/GERMAN1.png";
    }
    draw() {
        this.ctx.drawImage(
            this.imageInstance,
            this.imageInstance.framesCha *
                (this.imageInstance.width / this.imageInstance.frames),
            0,
            this.imageInstance.width / this.imageInstance.frames,
            this.imageInstance.height,
            this.chaPos.x,
            this.chaPos.y,
            this.chaSize.w,
            this.chaSize.h
        );
    }
    animate() {
        this.imageInstance.framesCha++;
        if (this.imageInstance.framesCha >= this.imageInstance.frames) {
            this.imageInstance.framesCha = 0;
        }
    }

    drawPunch() {
        this.ctx.drawImage(
            this.imageInstancePunch,
            this.chaPos.x,
            this.chaPos.y,
            this.chaSize.w,
            this.chaSize.h
        );
    }
    //PREGUNTAR TAs
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
