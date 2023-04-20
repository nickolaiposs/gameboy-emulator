import init, { add, Game } from "./wasm/gameboy_emulator.js";
import GameBoy from "./javascript/gameboy.js";

await init();

/*---SDFJSL---*/
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
// document.querySelector("#controlconfig").onclick = toggleConfig;
// document.querySelector("#configbutton").onclick = toggleConfig;

document.addEventListener('keydown', (event) => { gameBoy.updateKeyInput(event.code, true)});
document.addEventListener('keyup', (event) => { gameBoy.updateKeyInput(event.code, false)});

document.querySelector("#a-button").onmousedown = () => { gameBoy.updateKeyInput("KeyA", true); };
document.querySelector("#a-button").onmouseup = () => { gameBoy.updateKeyInput("KeyA", false); };
document.querySelector("#b-button").onmousedown = () => { gameBoy.updateKeyInput("KeyB", true); };
document.querySelector("#b-button").onmouseup = () => { gameBoy.updateKeyInput("KeyB", false); };
document.querySelector("#dpad-up").onmousedown = () => { gameBoy.updateKeyInput("ArrowUp", true); };
document.querySelector("#dpad-up").onmouseup = () => { gameBoy.updateKeyInput("ArrowUp", false); };
document.querySelector("#dpad-down").onmousedown = () => { gameBoy.updateKeyInput("ArrowDown", true); };
document.querySelector("#dpad-down").onmouseup = () => { gameBoy.updateKeyInput("ArrowDown", false); };
document.querySelector("#dpad-right").onmousedown = () => { gameBoy.updateKeyInput("ArrowRight", true); };
document.querySelector("#dpad-right").onmouseup = () => { gameBoy.updateKeyInput("ArrowRight", false); };
document.querySelector("#dpad-left").onmousedown = () => { gameBoy.updateKeyInput("ArrowLeft", true); };
document.querySelector("#dpad-left").onmouseup = () => { gameBoy.updateKeyInput("ArrowLeft", false); };

/*---START GAMEBOY---*/
gameBoy.start();

