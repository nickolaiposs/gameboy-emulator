import init, { render, add } from "./wasm/gameboy_emulator.js";

await init();

const canvas = document.querySelector("#gamescreen");
const ctx = canvas.getContext("2d");
const canvas_width = parseInt(canvas.getAttribute("width"));
const canvas_height = parseInt(canvas.getAttribute("height"));


function toggle_config() {
    document.querySelector("#controlconfig").classList.toggle("visible");
}

//onclick listeners
document.querySelector("#controlexit").onclick = toggle_config;
document.querySelector("#controlconfig").onclick = toggle_config;
document.querySelector("#configbutton").onclick = toggle_config;

//add rom filebrowser
const rom_button = document.querySelector("#loadrom");
rom_button.onclick = file_browse;

function file_browse() {
    var inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = ".rom";
    inputElement.click();
}

render(ctx, canvas_width, canvas_height);
