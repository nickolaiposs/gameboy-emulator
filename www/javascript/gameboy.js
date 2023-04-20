import { Game } from "../wasm/gameboy_emulator.js";

class GameBoy {
    constructor(ctx, canvas_width, canvas_height) {
        this.ctx = ctx;
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.deltaTime = 0;
        this.lastTimeStamp = 0;
        this.stopGame = null;

        /* JOYPAD INPUT MATCHING
            A: 0
            B: 1
            SELECT: 2
            START: 3
            DPAD-RIGHT: 4
            DPAD-LEFT: 5
            DPAD-UP: 6
            DPAD-DOWN: 7 */
        this.joypad = [false, false, false, false, false, false, false, false];
        this.keymap = {
            "KeyA": 0,
            "KeyB": 1,
            "Enter": 2,
            "Space": 3,
            "ArrowRight": 4,
            "ArrowLeft": 5,
            "ArrowUp": 6,
            "ArrowDown": 7
        }
        
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

    updateKeyInput(keyCode, pressed) {
        if (keyCode in this.keymap) {
            var key = this.keymap[keyCode];

            if (this.joypad[key] != pressed) {
                this.joypad[key] = pressed;
                this.game.update_key_input(key, pressed);
            }
        }
    }

    gameLoop(timeElapsed) {
        this.stopGame = window.requestAnimationFrame(this.gameLoop.bind(this));
    
        this.deltaTime = timeElapsed - this.lastTimeStamp;
        this.lastTimeStamp = timeElapsed;
    
        // gameloop 
        // step 1: update keyboard input
        // step 2: tick game
        // step 3: render screen
    
        this.game.tick(this.deltaTime);
    }

    start() {
        this.game.render(this.ctx, this.canvas_width, this.canvas_height);
        this.gameLoop();
    }

    stop() {
        window.cancelAnimationFrame(this.stopGame);
    }
}

export default GameBoy;