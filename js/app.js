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
    framesIndex: 0,

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
                this.character.moveRight();
            }

            if (key == "w") {
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

            this.framesIndex++;
        }, 30);
    },

    // CREATE
    createAll() {
        this.createCharacter();
        this.createImpostor();
        this.createPowUp();
    },
    createCharacter() {
        this.character = new German(this.ctx, this.gameSize);
    },
    createImpostor() {
        this.impostor = new Impostor(this.ctx, this.gameSize);
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
    },
    // DRAW

    drawAll() {
        this.character.draw();
        this.impostor.draw();
        this.drawPowUp();
    },
    drawPowUp() {
        this.powUp.forEach((element) => {
            element.drawRandomPowUp();
        });
    },

    generateRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },
    //COLLISIONS

//     var rect1 = {this.character.chaPos.x: 5, y: 5, width: 50, height: 50}
// var rect2 = { x: 20, y: 10, width: 10, height: 10 }


//     this.chaPos = { x: this.gameSize.w / 4, y: this.gameSize.h / 2 };
//         this.chaSize = { w: this.gameSize.w / 5, h: this.gameSize.h / 2 }

//     if (rect1.x < rect2.x + rect2.width &&
//    rect1.x + rect1.width > rect2.x &&
//    rect1.y < rect2.y + rect2.height &&
//    rect1.height + rect1.y > rect2.y) {
    // ¡colision detectada!
// }

    // CLEAR
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h);
    },
};
