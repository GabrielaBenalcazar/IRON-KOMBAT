window.onload = () => {
    document.getElementById("start-button").onclick = () => {
        startGame();

        this.music = new Audio("./music/music_music1.wav");
        this.music.play();
        this.music.loop = true;
        this.music.volume = 0.2;
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
    impostor: undefined,
    powUp: [],
    intervalId: undefined,
    imageInstance: undefined,

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

        this.loadBackground();
        this.loadTikitiki();
        this.loadOhRight();
        this.loadLifeImImages();
        this.loadLifeImages();
        this.instanceGameOver();
        this.instanceWinning();
        this.loadVersus();
    },

    loadBackground() {
        this.bg = new Image();
        this.bg.src = "./img/FONDODESENFOCADO.jpg";
    },

    loadTikitiki() {
        this.tikitikiInstance = new Audio("./music/tiki.mp3");
    },

    loadOhRight() {
        this.ohRightInstance = new Audio("./music/ohrigth.mp3");
    },

    loadLifeImages() {
        this.lifeImage100 = new Image();
        this.lifeImage100.src = "./img/10V.png";

        this.lifeImage90 = new Image();
        this.lifeImage90.src = "./img/9V.png";

        this.lifeImage80 = new Image();
        this.lifeImage80.src = "./img/8V.png";

        this.lifeImage70 = new Image();
        this.lifeImage70.src = "./img/7V.png";

        this.lifeImage60 = new Image();
        this.lifeImage60.src = "./img/6V.png";

        this.lifeImage50 = new Image();
        this.lifeImage50.src = "./img/5V.png";

        this.lifeImage40 = new Image();
        this.lifeImage40.src = "./img/4V.png";

        this.lifeImage30 = new Image();
        this.lifeImage30.src = "./img/3V.png";

        this.lifeImage20 = new Image();
        this.lifeImage20.src = "./img/2V.png";

        this.lifeImage10 = new Image();
        this.lifeImage10.src = "./img/1V.png";

        this.lifeImage0 = new Image();
        this.lifeImage0.src = "./img/0V.png";
    },

    loadLifeImImages() {
        this.lifeImImage100 = new Image();
        this.lifeImImage100.src = "./img/10VI.png";

        this.lifeImImage90 = new Image();
        this.lifeImImage90.src = "./img/9VI.png";

        this.lifeImImage80 = new Image();
        this.lifeImImage80.src = "./img/8VI.png";

        this.lifeImImage70 = new Image();
        this.lifeImImage70.src = "./img/7VI.png";

        this.lifeImImage60 = new Image();
        this.lifeImImage60.src = "./img/6VI.png";

        this.lifeImImage50 = new Image();
        this.lifeImImage50.src = "./img/5VI.png";

        this.lifeImImage40 = new Image();
        this.lifeImImage40.src = "./img/4VI.png";

        this.lifeImImage30 = new Image();
        this.lifeImImage30.src = "./img/3VI.png";

        this.lifeImImage20 = new Image();
        this.lifeImImage20.src = "./img/2VI.png";

        this.lifeImImage10 = new Image();
        this.lifeImImage10.src = "./img/1VI.png";

        this.lifeImImage0 = new Image();
        this.lifeImImage0.src = "./img/0VI.png";
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
                this.character.animate();
            }
            if (key === "ArrowRight") {
                this.moveRigthChar();
                this.character.animate();
            }

            if (key == "ArrowUp") {
                this.character.jump();
            }

            if (key == "a" || key == "A") {
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
        this.createLife();
        this.createLifeIm();

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
        this.drawBg();

        this.drawFloor();

        this.character.draw();
        this.impostor.draw();

        this.drawPowUp();
        this.drawLife();
        this.drawLifeIm();
        this.drawVersus();
    },

    drawBg() {
        this.ctx.drawImage(this.bg, 0, 0, this.gameSize.w, this.gameSize.h);
    },

    drawFloor() {
        this.ctx.beginPath();

        this.ctx.moveTo(50, this.gameSize.h - 50);
        this.ctx.lineTo(100, this.gameSize.h - 150);
        this.ctx.lineTo(this.gameSize.w - 100, this.gameSize.h - 150);
        this.ctx.lineTo(this.gameSize.w - 50, this.gameSize.h - 50);

        this.ctx.closePath();

        this.ctx.fillStyle = "#774466";
        this.ctx.fill();
    },

    createLife() {
        this.life = new Life(this.ctx, this.gameSize, 100, 50, 500, 100);
    },

    createLifeIm() {
        this.lifeIm = new LifeIm(this.ctx, this.gameSize, 1200, 50, 500, 100);
    },

    drawLife() {
        if (this.character.life > 90) {
            this.life.draw(this.lifeImage100);
        }

        if (this.character.life > 80) {
            this.life.draw(this.lifeImage90);
        }

        if (this.character.life > 70) {
            this.life.draw(this.lifeImage80);
        }

        if (this.character.life > 60) {
            this.life.draw(this.lifeImage70);
        }
        if (this.character.life > 50) {
            this.life.draw(this.lifeImage60);
        }

        if (this.character.life > 40) {
            this.life.draw(this.lifeImage50);
        }

        if (this.character.life > 30) {
            this.life.draw(this.lifeImage40);
        }
        if (this.character.life > 20) {
            this.life.draw(this.lifeImage30);
        }

        if (this.character.life > 10) {
            this.life.draw(this.lifeImage20);
        }
        if (this.character.life >= 0) {
            this.life.draw(this.lifeImage10);
        }
    },

    drawLifeIm() {
        if (this.impostor.life > 90) {
            this.lifeIm.draw(this.lifeImImage100);
        }
        if (this.impostor.life > 80) {
            this.lifeIm.draw(this.lifeImImage90);
        }

        if (this.impostor.life > 70) {
            this.lifeIm.draw(this.lifeImImage80);
        }

        if (this.impostor.life > 60) {
            this.lifeIm.draw(this.lifeImImage70);
        }
        if (this.impostor.life > 50) {
            this.lifeIm.draw(this.lifeImImage60);
        }

        if (this.impostor.life > 40) {
            this.lifeIm.draw(this.lifeImImage50);
        }

        if (this.impostor.life > 30) {
            this.lifeIm.draw(this.lifeImImage40);
        }
        if (this.impostor.life > 20) {
            this.lifeIm.draw(this.lifeImImage30);
        }

        if (this.impostor.life > 10) {
            this.lifeIm.draw(this.lifeImImage20);
        }

        if (this.impostor.life <= 10) {
            this.lifeIm.draw(this.lifeImImage10);
        }
    },
    loadVersus() {
        this.versusInstance = new Image();
        this.versusInstance.src = "../img/VS.png";
    },

    drawVersus() {
        this.ctx.drawImage(
            this.versusInstance,
            this.gameSize.w / 2 - 330,
            0,
            650,
            250
        );
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
            this.ohRigth();
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
            this.character.drawPunch();
            this.tikitiki();
        }
    },

    tikitiki() {
        this.tikitikiInstance.play();
        this.tikitikiInstance.loop = false;
        this.tikitikiInstance.volume = 1;
    },

    ohRigth() {
        this.ohRightInstance.play();
        this.ohRightInstance.loop = false;
        this.ohRightInstance.volume = 1;
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
        this.character.life -= 20;

        if (this.character.life <= 0) {
            this.character.life = 0;
            this.gameOver();
        }
        console.log("menos vida", this.character.life);
    },

    loseImpLive() {
        this.impostor.life -= 10;

        if (this.impostor.life <= 0) {
            this.impostor.life = 0;
            this.win();
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

    //GAMEOVER

    gameOver() {
        if (this.character.life === 0) {
            console.log("HAS PERDIDO");
            this.reset();
            clearInterval(this.intervalId);
            this.drawGameOver();
        }
    },
    win() {
        if (this.impostor.life === 0) {
            console.log("HAS GANADO");
            this.reset();
            clearInterval(this.intervalId);
            this.drawWinning();
            // this.drawLiveCero();
        }
    },

    instanceGameOver() {
        this.gameOverInstance = new Image();
        this.gameOverInstance.src = "./img/GAMEOVERBIEN.jpg";
    },
    instanceWinning() {
        this.winInstance = new Image();
        this.winInstance.src = "./img/YOUWINBIEN.jpg";
    },

    drawGameOver() {
        this.ctx.drawImage(
            this.gameOverInstance,
            0,
            0,
            this.gameSize.w,
            this.gameSize.h
        );
    },
    // drawLiveCero() {
    //     this.ctx.drawImage(
    //         this.lifeImImage0,
    //         this.gameSize.w / 2 - 400,
    //         0,
    //         800,
    //         200
    //     );
    // },

    drawWinning() {
        this.ctx.drawImage(
            this.winInstance,
            0,
            0,
            this.gameSize.w,
            this.gameSize.h
        );
    },

    reset() {
        this.character = undefined;
        this.impostor = undefined;
        this.powUp = [];
    },
};
