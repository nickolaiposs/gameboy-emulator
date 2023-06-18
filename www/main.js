import init from "./wasm/gameboy_emulator.js";
import GameBoy from "./javascript/gameboy.js";

await init();

/*---JOYPAD MAPPING---*/
const Joypad = {
    Right: 0,
    Left: 1,
    Up: 2,
    Down: 3,
    A: 4,
    B: 5,
    Select: 6,
    Start: 7
};
    
const buttonmap = {
    "#dpad-right": Joypad.Right,
    "#dpad-left": Joypad.Left,
    "#dpad-up": Joypad.Up,
    "#dpad-down": Joypad.Down,
    "#a-button": Joypad.A,
    "#b-button": Joypad.B
};
        
const keymap = {
    "ArrowRight": Joypad.Right,
    "ArrowLeft": Joypad.Left,
    "ArrowUp": Joypad.Up,
    "ArrowDown": Joypad.Down,
    "KeyA": Joypad.A,
    "KeyB": Joypad.B,
    "Enter": Joypad.Select,
    "Space": Joypad.Start
};

/*---INITIALIZE GAMEBOY OBJECT---*/
const canvas = document.querySelector("#gamescreen");
const ctx = canvas.getContext("2d");
const canvas_width = parseInt(canvas.getAttribute("width"));
const canvas_height = parseInt(canvas.getAttribute("height"));
const gameBoy = new GameBoy(ctx, canvas_width, canvas_height);

/*---FUNCTIONS---*/
function toggleConfig() {
    document.querySelector("#controlconfig").classList.toggle("visible");
}

function fileBrowse(func, accept) {
    var inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = accept;
    inputElement.addEventListener("change", (event) => func(event.target.files));
    inputElement.click();
}

/*---INPUT LISTENERS---*/
// rom button
const romButton = document.querySelector("#loadrom");
romButton.onclick = () => fileBrowse(gameBoy.loadRom.bind(gameBoy), ".gb");

// config modal
document.querySelector("#controlexit").onclick = toggleConfig;
document.querySelector("#configbutton").onclick = toggleConfig;

// joypad
document.addEventListener('keydown', (event) => { 
    if (event.code in keymap) {
        event.preventDefault();
        gameBoy.updateKeyInput(keymap[event.code], true) 
    }
});

document.addEventListener('keyup', (event) => { 
    if (event.code in keymap) gameBoy.updateKeyInput(keymap[event.code], false) 
});

for (const [button, keyCode] of Object.entries(buttonmap)) {
    document.querySelector(button).onmousedown = () => { gameBoy.updateKeyInput(keyCode, true); };
    document.querySelector(button).onmouseup = () => { gameBoy.updateKeyInput(keyCode, false); };
}

