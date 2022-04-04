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
        this.drawAll();
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
        (document.onkeydown = (event) => {
            const { key } = event;
            if (key === "ArrowLeft") {
                this.character.moveLeft();
            }
            if (key === "ArrowRight") {
                this.character.moveRight();
            }
        }
        )
    },

    //     document.addEventListener("keydown", (e) => {
    //         switch (e.code) {
    //             case 32:
    //                 if (his.chaPos.y) {
    //                     this.jump();
    //                 }
    //         }
    //     });
    // })

    // PREGUNTAR TAs
    // if (key === ‘a’) {
    //     this.character.attackA()
    // }
    // if (key === ‘s’) {
    //     this.character.attackS()
    // }
    // if (key === ‘d’) {
    //     this.character.attackD()
    // }

    // DRAW
    drawAll() {
        this.character.draw();
        this.impostor.draw();
        this.drawPowUp();
    },


    //EL CORAZÓN
    start() {
        setInterval(() => {
            this.clearAll();
            this.movePowUp();
            this.drawAll();
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
        this.powUp.push(new PowerUps(this.ctx, this.gameSize, 20));
    },

    movePowUp() {
        this.powUp.forEach((element) => {
            element.move();
        });
    },

    checkFrames() {
        if (this.framesIndex % 60 === 0) {
            this.createPowUp();
        }
    },

    drawPowUp() {
        this.powUp.forEach((element) => {
            element.drawRandomPowUp();
        });
    },

    generateRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    },



    // CLEAR
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h);
    },
};
