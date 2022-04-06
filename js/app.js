window.onload = () => {
    document.getElementById("start-button").onclick = () => {
        startGame();
    };
    function startGame() {
        controlledApp.init("canvas");
    }
};

const controlledApp = {
    name: "IRON KOMBAT",
    description: "Fighting game",
    version: "1.0.0",
    author: "Gaby y María",
    license: undefined,
    canvasNode: undefined,
    ctx: undefined,
    gameSize: { w: undefined, h: undefined },
    character: undefined,
    powUp: [],
    intervalId: undefined,

    framesIndex: 0,

    collision: undefined,

    init(canvasID) {
        this.canvasNode = document.querySelector(`#${canvasID}`);
        this.ctx = this.canvasNode.getContext("2d");
        //console.log("el contexto", this.ctx);
        this.setDimensions();
        this.createAll();
        this.setEventListeners();
        this.atack();
        this.start();
    },

    setDimensions() {
        this.gameSize = {
            w: 1800,
            h: 700,
        };
    },

    // CONTROLES TECLAS
    setEventListeners() {
        document.onkeydown = (event) => {
            const { key } = event;
            if (key === "ArrowLeft") {
                this.character.moveLeft();
            }
            if (key === "ArrowRight") {
                this.moveRigthChar();
            }

            if (key == "ArrowUp") {
                this.character.jump();
            }

            if (key == "a") {
                this.atack();
            }
        };
    },

    //EL CORAZÓN
    start() {
        this.intervalId = setInterval(() => {
            this.clearAll();
            this.movePowUp();
            this.checkFrames();
            this.shootingTime();
            this.lifeUp();
            this.chaDamage();

            this.drawAll();

            this.character.jumpDown();

            this.framesIndex > 5000
                ? (this.framesIndex = 0)
                : this.framesIndex++;
        }, 30);
    },

    // CREATE
    createAll() {
        this.createCharacter();
        this.createImpostor();

        // this.createBullets()
    },
    createCharacter() {
        this.character = new German(this.ctx, this.gameSize, 100);
    },
    createImpostor() {
        this.impostor = new Impostor(this.ctx, this.gameSize, 100);
    },

    createPowUp() {
        this.powUp.push(new PowerUps(this.ctx, this.gameSize, 10));
    },

    checkFrames() {
        if (this.framesIndex % 200 === 0) {
            this.createPowUp();
        }
        if (this.framesIndex % 10 === 0) {
            this.randomMoveImpostor();
        }
    },

    // DRAW

    drawAll() {
        this.character.draw(this.framesIndex);
        this.impostor.draw();
        this.character.drawCharLive();
        this.impostor.drawImLive();

        this.drawPowUp();
    },
    drawPowUp() {
        this.powUp.forEach((element) => {
            element.drawRandomPowUp();
        });
    },
    //  MOVE

    randomMoveImpostor() {
        let ranNum = Math.random();

        // console.log(ranNum);
        if (ranNum <= 4 / 7) {
            if (
                //  poner condiciones en una variable?

                this.impostor.imPos.x >
                    this.character.chaPos.x + this.character.chaSize.w &&
                this.impostor.imPos.x > this.gameSize.w / 2
            ) {
                this.impostor.moveLeft();
            }
        }
        if (ranNum > 5 / 7) {
            this.impostor.moveRight();
        }
    },

    moveRigthChar() {
        if (
            this.character.chaPos.x + this.character.chaSize.w <=
            this.impostor.imPos.x
        ) {
            this.character.moveRight();
        }

        // if (
        //     this.impostor.imPos.x >= this.character.chaPos.x + this.character.chaSize.w ) {
        //     console.log("note muevas IMPOS!!!!!!!!");
        //     this.Impostor.moveLeft();
        // }
    },

    movePowUp() {
        this.powUp.forEach((element) => {
            element.move();
        });
    },

    //shoting

    shootingTime() {
        let ranNum = Math.random();

        if (this.framesIndex % 50 === 0 && ranNum > 2 / 7) {
            this.impostor.shoot();
        }
    },

    //COLLISIONS

    collision2(rect1X, rect1Y, rect1W, rect1H, rect2X, rect2Y, rect2W, rect2H) {
        if (
            rect1X <= rect2X + rect2W &&
            rect1X + rect1W >= rect2X &&
            rect1Y <= rect2Y + rect2H &&
            rect1H + rect1Y >= rect2Y
        ) {
            return true;
        } else return false;
    },

    atack() {
        // CAMBIO DE FRAMES IMAGEN POR LA DEL ATAQUE
        if (
            this.collision2(
                this.character.chaPos.x,
                this.character.chaPos.y,
                this.character.chaSize.w,
                this.character.chaSize.h,
                this.impostor.imPos.x,
                this.impostor.imPos.y,
                this.impostor.imSize.w,
                this.impostor.imSize.h
            ) === true
        ) {
            this.loseImpLive();

            console.log("atack");
            // this.character.atack2()
        }
    },

    lifeUp() {
        this.powUp.forEach((eachPowUp) => {
            if (
                this.collision2(
                    eachPowUp.powUpPos.x,
                    eachPowUp.powUpPos.y,
                    eachPowUp.powUpSize.w,
                    eachPowUp.powUpSize.h,
                    this.character.chaPos.x,
                    this.character.chaPos.y,
                    this.character.chaSize.w,
                    this.character.chaSize.h
                ) === true
            ) {
                // this.character.atack2()
                this.moreLive();

                const i = this.powUp.indexOf(eachPowUp);
                this.powUp.splice(i, 1);
            }
        });
    },

    chaDamage() {
        this.impostor.bullets.forEach((eachBullet) => {
            if (
                this.collision2(
                    eachBullet.bullPos.x,
                    eachBullet.bullPos.y,
                    eachBullet.bullSize.w,
                    eachBullet.bullSize.h,
                    this.character.chaPos.x,
                    this.character.chaPos.y,
                    this.character.chaSize.w,
                    this.character.chaSize.h
                ) === true
            ) {
                // this.character.atack2()
                this.looseChaLive();

                const i = this.impostor.bullets.indexOf(eachBullet);
                this.impostor.bullets.splice(i, 1);
            }
        });
    },

    //live related

    moreLive() {
        if (this.character.life < 100) {
            this.character.life += 10;
        } else {
            this.character.life = 100;
        }
        console.log("mas vida", this.character.life);
    },

    looseChaLive() {
        if (this.character.life > 0) {
            this.character.life -= 10;
            return true;
        } else {
            this.character.life = 0;
            this.gameOver();
        }
        console.log("menos vida", this.character.life);
    },

    loseImpLive() {
        if (this.impostor.life > 0) {
            this.impostor.life -= 20;
        } else {
            this.impostor.life = 0;
        }

        console.log("menos vida", this.impostor.life);
    },

    // changeLifeBar() {
    //     if (this.looseChaLive === true) {
    //         drawCharLiveSize.w
    //     }

    // },

    // CLEAR
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h);
        this.clearBullets();
        this.clearPowUp();
    },

    //CLEAR POWEUPS

    clearPowUp() {
        let filteredPowUp = this.powUp.filter(
            (eachPowUp) =>
                eachPowUp.powUpPos.y + eachPowUp.powUpSize.h > this.gameSize.h
        );

        this.powUp.splice(0, filteredPowUp.length);

        // console.log(this.powUp);
    },

    //CLEAR BULLETS
    clearBullets() {
        let filteredBullets = this.impostor.bullets.filter(
            (eachBullet) => eachBullet.bullPos.x + eachBullet.bullSize.w < 0
        );

        this.impostor.bullets.splice(0, filteredBullets.length);
    },

    //gGAMEOVER
    gameOver() {
        if (this.character.life === 0) {
            this.drawGameOver();
            clearInterval(this.intervalId);
        }
    },
    drawGameOver() {
        this.imageInstance = new Image();
        this.imageInstance.src = "";
    },
};
