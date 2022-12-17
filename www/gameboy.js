import init from './wasm/gameboy_emulator.js';

//wasm imports
const wasm = await init();
var add = wasm.add

function wasm_test() {
    var x = Math.round(Math.random() * 100);
    var y = Math.round(Math.random() * 100);
    alert(`WebAssembly test: ${x} + ${y} = ${add(x, y)}`);
}

//draw test
function draw() {
    const canvas = document.getElementById("gamescreen");
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "rgb(200, 0, 0)";
      ctx.fillRect(10, 10, 50, 50);

      ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      ctx.fillRect(30, 30, 50, 50);
    }
}

function toggle_config() {
    document.querySelector("#controlconfig").classList.toggle("visible");
}

//onclick listeners
document.querySelector("#controlconfig").onclick = toggle_config;
document.querySelector("#configbutton").onclick = toggle_config;
document.querySelector("#loadrom").onclick = wasm_test;