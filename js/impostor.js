class Impostor {
    constructor(ctx, gameSize) {
        this.ctx = ctx;
        this.gameSize = gameSize;
        this.life = 100;
        this.imageInstance = undefined;
        this.chaPos = { x: 1000, y: 350 };
        this.chaSize = { w: 350, h: 350 };
        // this.imPosY0 = this.imPos.y //PARA HACERLE DISPARAR

        // this.bullets = [];   //LAS BALAS
        // this.setListeners();  // PARA QUE DISPARE
        this.init();
    }
    init() {
        this.imageInstance = new Image();
        this.imageInstance.src = "../img/goku2.png";
    }
    draw() {
        this.ctx.drawImage(
            this.imageInstance,
            this.chaPos.x,
            this.chaPos.y,
            this.chaSize.w,
            this.chaSize.h
            // this.bullets.forEach(bullet => bullet.draw()),  //LAS BALAS
            // this.clearBullets()
        );
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



    // moveLeft() {
    //     if (this.carPos.x > 0) {
    //         this.carPos.x -= 10;
    //     } else
    //         this.carPos.x = 0
    // }
    // moveRight() {
    //     if (this.carPos.x <= this.gameSize.w - this.carSize.w) {
    //         this.carPos.x += 10;
    //     } else
    //         this.carPos.x = this.gameSize.w - this.carSize.w;
    // }
}
