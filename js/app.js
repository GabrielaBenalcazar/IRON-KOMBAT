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

    // bullets: [],
    framesIndex: 0,

    collision: undefined,

    init(canvasID) {
        this.canvasNode = document.querySelector(`#${canvasID}`);
        this.ctx = this.canvasNode.getContext("2d");
        //console.log("el contexto", this.ctx);
        this.setDimensions();
        this.createAll();
        this.setEventListeners();
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
                this.move();
            }

            if (key == "ArrowUp") {
                this.character.jump();
            }
        };
    },

    //EL CORAZÓN
    start() {
        setInterval(() => {
            this.clearAll();
            this.movePowUp();
            this.checkFrames();
            this.drawAll();
            this.collisions();

            this.framesIndex++;
        }, 30);
    },

    // CREATE
    createAll() {
        this.createCharacter();
        this.createImpostor();

        // this.createBullets()
    },
    createCharacter() {
        this.character = new German(this.ctx, this.gameSize);
    },
    createImpostor() {
        this.impostor = new Impostor(
            this.ctx,
            this.gameSize,
            this.character.chaPos.x,
            this.character.chaSize.w
        );
    },

    // POWER UPS
    createPowUp() {
        this.powUp.push(new PowerUps(this.ctx, this.gameSize, 10));
    },

    movePowUp() {
        this.powUp.forEach((element) => {
            element.move();
        });
    },
    checkFrames() {
        if (this.framesIndex % 200 === 0) {
            this.createPowUp();
        }
        if (this.framesIndex % 10 === 0) {
            this.randomMove();
        }
        if (this.framesIndex % 1 === 0) {
            this.character.jumpDown();
            // console.log("checking frames");
        }
    },
    // DRAW

    drawAll() {
        this.drawRoad();
        this.drawRoad2();
        this.character.draw();
        this.impostor.draw();
        this.drawPowUp();
        // this.drawBullets()
    },
    drawPowUp() {
        this.powUp.forEach((element) => {
            element.drawRandomPowUp();
        });
    },

    generateRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },

    drawRoad() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(0, 0, this.gameSize.w / 2, this.gameSize.h);
    },
    drawRoad2() {
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(
            this.gameSize.w / 2,
            0,
            this.gameSize.w / 2,
            this.gameSize.h
        );
    },

    //  MOVE

    randomMove() {
        let ranNum = Math.random();

        // console.log(ranNum);
        if (ranNum <= 4 / 7) {
            if (
                this.impostor.imPos.x >
                this.character.chaPos.x + this.character.chaSize.w
            ) {
                this.impostor.moveLeft();
            }
        }
        if (ranNum > 5 / 7) {
            this.impostor.moveRight();
        }
    },

    move() {
        if (
            this.character.chaPos.x + this.character.chaSize.w <=
            this.impostor.imPos.x
        ) {
            console.log("note muevas!!!!!!!!");
            this.character.moveRight();
        }

        // if (
        //     this.impostor.imPos.x >= this.character.chaPos.x + this.character.chaSize.w ) {
        //     console.log("note muevas IMPOS!!!!!!!!");
        //     this.Impostor.moveLeft();
        // }
    },

    //COLLISIONS

    collisions() {
        console.log(this.impostor.imPos.x);
        if (
            this.character.chaPos.x + this.character.chaSize.w >
            this.impostor.imPos.x
        ) {
            console.log("atack");
            // this.collision = true;
        }
    },

    // CLEAR
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h);
    },

    //CLEAR POWEUPS
    //CLEAR BULLETS
};
