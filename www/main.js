import init, { add, Game } from "./wasm/gameboy_emulator.js";

await init();

const game = new Game();
const canvas = document.querySelector("#gamescreen");
const ctx = canvas.getContext("2d");
const canvas_width = parseInt(canvas.getAttribute("width"));
const canvas_height = parseInt(canvas.getAttribute("height"));

/* JOYPAD INPUT MATCHING
    A: 0
    B: 1
    SELECT: 2
    START: 3
    DPAD-RIGHT: 4
    DPAD-LEFT: 5
    DPAD-UP: 6
    DPAD-DOWN: 7 */

var keymap = {
    "KeyA": 0,
    "KeyB": 1,
    "Enter": 2,
    "Space": 3,
    "ArrowRight": 4,
    "ArrowLeft": 5,
    "ArrowUp": 6,
    "ArrowDown": 7
}

var joypad = [false, false, false, false, false, false, false, false];

function toggleConfig() {
    document.querySelector("#controlconfig").classList.toggle("visible");
}

function updateKeyInput(keyCode, pressed) {
    if (keyCode in keymap) {
        var key = keymap[keyCode];

        if (joypad[key] != pressed) {
            joypad[key] = pressed;
            game.update_key_input(key, pressed);
        }
    }
}

function fileBrowse(func, accept) {
    var inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = accept;
    inputElement.addEventListener("change", (event) => func(event.target.files));
    inputElement.click();
}

function loadRom(files) {
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

    fileReader.onload = (event) => game.load_rom(new Uint8Array(event.target.result));
    fileReader.readAsArrayBuffer(rom);
}

var a_button = false;

//onclick listeners
document.querySelector("#controlconfig").onclick = toggleConfig;
document.querySelector("#configbutton").onclick = toggleConfig;
document.querySelector("#a-button").onclick = () => { game.update_key_input(0, !a_button); a_button = !a_button; };

//add rom filebrowser
const romButton = document.querySelector("#loadrom");
romButton.onclick = () => fileBrowse(loadRom, ".gb");

game.render(ctx, canvas_width, canvas_height);

document.addEventListener('keydown', (event) => { updateKeyInput(event.code, true)});
document.addEventListener('keyup', (event) => { updateKeyInput(event.code, false)});
