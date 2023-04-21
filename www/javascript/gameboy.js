import { Game } from "../wasm/gameboy_emulator.js";

class GameBoy {
    constructor(ctx, canvas_width, canvas_height) {
        this.ctx = ctx;
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.deltaTime = 0;
        this.lastTimeStamp = 0;
        this.stopGame = null;
        
        this.game = new Game();
    }

    loadRom(files) {
        if (files.length != 1) {
            alert("Invalid amount of files inserted");
            return
        }
    
        var rom = files[0];
        var fileExtension = rom.name.split(".").pop().toLowerCase();
    
        if (fileExtension != "gb") {
            alert("Invalid file type");
            return
        }
    
        var fileReader = new FileReader();

        fileReader.onload = (event) => {
            this.game.load_rom(new Uint8Array(event.target.result));
        }

        fileReader.readAsArrayBuffer(rom);
    }

    updateKeyInput(key, pressed) {
        this.game.update_key_input(key, pressed);
    }

    gameLoop(timeElapsed) {
        this.stopGame = window.requestAnimationFrame(this.gameLoop.bind(this));
    
        this.deltaTime = timeElapsed - this.lastTimeStamp;
        this.lastTimeStamp = timeElapsed;

        this.game.tick(this.deltaTime);
        this.game.render(this.ctx, this.canvas_width, this.canvas_height);
    }

    start() {
        this.gameLoop();
    }

    stop() {
        window.cancelAnimationFrame(this.stopGame);
    }
}

export default GameBoy;