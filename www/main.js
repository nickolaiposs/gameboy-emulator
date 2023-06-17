import init from "./wasm/gameboy_emulator.js";
import GameBoy from "./javascript/gameboy.js";

await init();

/*---JOYPAD INPUT MATCHING---*/
/*  
    A: 0
    B: 1
    SELECT: 2
    START: 3
    DPAD-RIGHT: 4
    DPAD-LEFT: 5
    DPAD-UP: 6
    DPAD-DOWN: 7 
*/
    
const buttonmap = {
    "#a-button": 0,
    "#b-button": 1,
    "#dpad-right": 4,
    "#dpad-left": 5,
    "#dpad-up": 6,
    "#dpad-down": 7
};
        
const keymap = {
    "KeyA": 0,
    "KeyB": 1,
    "Enter": 2,
    "Space": 3,
    "ArrowRight": 4,
    "ArrowLeft": 5,
    "ArrowUp": 6,
    "ArrowDown": 7
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
const romButton = document.querySelector("#loadrom");
romButton.onclick = () => fileBrowse(gameBoy.loadRom.bind(gameBoy), ".gb");
document.querySelector("#controlexit").onclick = toggleConfig;
document.querySelector("#configbutton").onclick = toggleConfig;

document.addEventListener('keydown', (event) => { 
    if (event.code in keymap) gameBoy.updateKeyInput(keymap[event.code], true) 
});

document.addEventListener('keyup', (event) => { 
    if (event.code in keymap) gameBoy.updateKeyInput(keymap[event.code], false) 
});

for (const [button, keyCode] of Object.entries(buttonmap)) {
    document.querySelector(button).onmousedown = () => { gameBoy.updateKeyInput(keyCode, true); };
    document.querySelector(button).onmouseup = () => { gameBoy.updateKeyInput(keyCode, false); };
}

/*---START GAMEBOY---*/
gameBoy.start();

