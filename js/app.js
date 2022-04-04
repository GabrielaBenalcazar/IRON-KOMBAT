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
    //key: , //PARA PONER LAS TECLAS
    init(canvasID) {
        this.canvasNode = document.querySelector(`#${canvasID}`);
        this.ctx = this.canvasNode.getContext("2d");
        console.log("l contexto", this.ctx);
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

                console.log("popino");
            }
        };

        
    },
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
    //EL CORAZÓN
    start() {
        setInterval(() => {
            this.clearAll();
            this.drawAll();
        }, 30);
    },
    // CREATE
    createAll() {
        this.createCharacter();
        this.createImpostor();
    },
    createCharacter() {
        this.character = new German(this.ctx, this.gameSize);
        //console.log(this.character)
    },
    createImpostor() {
        this.impostor = new Impostor(this.ctx, this.gameSize);
        //console.log(this.impostor)
    },
    // createBall(){
    // },
    // createPowerUp(){
    // },
    // DRAW
    drawAll() {
        this.character.draw();
        this.impostor.draw();
    },
    // CLEAR
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h);
    },
};
