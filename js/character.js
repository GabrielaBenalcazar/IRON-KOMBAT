class Character {
    constructor(ctx, gameSize, canMove) {
        this.ctx = ctx;
        this.gameSize = gameSize;
        this.canMove = canMove

        this.life = 100;

        this.imageInstance = undefined;

        this.floor = this.gameSize.h;
        this.posUp = 0;
        this.chaSize = { w: this.gameSize.w / 5, h: this.gameSize.h / 2 };

        this.chaPos = {
            x: this.gameSize.w / 4 - this.chaSize.w / 2,
            y: this.gameSize.h / 2,
        };

        this.vel = { x: 40, y: 250 };
        this.gravity = 2;

        this.init();
    }
    // AVISAR A MARIA QUE LOS MOVIMIENTOS VAN POR FUERA DE GERMAN
    dontMove() {
        
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

    jump() {
        this.chaPos.y -= this.vel.y;
        this.vel.y = 0;
    }
    jumpDown() {
        if (this.chaPos.y + this.chaSize.h < this.floor) {
            this.vel.y += this.gravity;
            this.chaPos.y += this.vel.y;
        } else {
            this.vel.y = 250;
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
        this.ctx.fillStyle = "orange";
        this.ctx.fillRect(
            this.chaPos.x,
            this.chaPos.y,
            this.chaSize.w,
            this.chaSize.h
        );
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
