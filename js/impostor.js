class Impostor {
    constructor(ctx, gameSize) {
        this.ctx = ctx;
        this.gameSize = gameSize;

        this.life = 100;

        this.imageInstance = undefined;

        this.floor = this.gameSize.h;
        this.posUp = 0;

        this.imPos = {
            x: this.gameSize.w - this.gameSize.w / 4,
            y: this.gameSize.h / 2,
        };
        this.imSize = { w: this.gameSize.w / 5, h: this.gameSize.h / 2 };

        this.vel = { x: 100, y: 160 };
        this.gravity = 0.4;

        // this.bullets = [];   //LAS BALAS

        this.init();
    }
    init() {
        this.imageInstance = new Image();
        this.imageInstance.src = "../img/goku2.png";
    }
    draw() {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(
            this.imPos.x,
            this.imPos.y,
            this.imSize.w,
            this.imSize.h
        );
        this.ctx.drawImage(
            this.imageInstance,
            this.imPos.x,
            this.imPos.y,
            this.imSize.w,
            this.imSize.h
            // this.bullets.forEach(bullet => bullet.draw()),  //LAS BALAS
            // this.clearBullets()
        );
    }

    moveLeft() {
        if (this.imPos.x > this.gameSize.w / 2) {
            this.imPos.x -= this.vel.x;
        } else {
            this.imPos.x = this.gameSize.w / 2;
        }
    }
    moveRight() {
        if (this.imPos.x + this.vel.x <= this.gameSize.w - this.imSize.w) {
            this.imPos.x += this.vel.x;
        } else this.imPos.x = this.gameSize.w - this.imSize.w;
    }

    randomMove() {
        let ranNum = Math.random();

        // console.log(ranNum);
        if (ranNum <= 4 / 7) {
            this.moveLeft();
        }
        if (ranNum > 5 / 7) {
            this.moveRight();
        }
    }

    // shoot() {                                    // DISPARAR
    //     this.bullets.push(new Bullets(this.ctx, this.imPos.x, this.imPos.y, this.imPosY0, this.width, this.height));
    // }

    // clearBullets() {                            // LIMPIAR LAS BALAS
    //     this.bullets = this.bullets.filter(bull => bull.imPos.x <= this.gameSize.w)
    // }

    // setListeners() {            //PARA QUE DISPARE

    //     document.addEventListener("keydown", e => {

    //         if (this.keys.SPACE) {
    //             this.shoot();
    //         }
    //     });
    // }
}
