import { Game } from "../wasm/gameboy_emulator.js";

class GameBoy {
    constructor(ctx, canvas_width, canvas_height, rom_files) {
        this.ctx = ctx;
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.deltaTime = 0;
        this.lastTimeStamp = 0;
        this.stopGame = null;
        this.rom = null;
        this.game = null;

        // this.loadRom(rom_files)
        // .then((result) => {
        //     this.rom = rom;
        // })
        // .catch((error) => {
        //     console.error(ex)
        // });
        
        // this.game = new Game(canvas_width, canvas_height, this.rom);
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
            return;
        }
    
        var fileReader = new FileReader();

        fileReader.onload = (event) => {
            this.rom = new Uint8Array(event.target.result);
            this.game = new Game(this.canvas_width, this.canvas_height, this.rom);
            this.start();
        };

        fileReader.readAsArrayBuffer(rom);
    }

    updateKeyInput(key, pressed) {
        if (!this.game) return;
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