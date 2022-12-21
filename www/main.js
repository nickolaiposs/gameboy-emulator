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

render(ctx, canvas_width, canvas_height);
