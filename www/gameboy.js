import init from './wasm/gameboy_emulator.js';

//wasm imports
const wasm = await init();
const add = wasm.add

const canvas = document.querySelector("#gamescreen");
const ctx = canvas.getContext("2d");
const canvas_width = parseInt(canvas.getAttribute("width"));
const canvas_height = parseInt(canvas.getAttribute("height"));

function wasm_test() {
    var x = Math.round(Math.random() * 100);
    var y = Math.round(Math.random() * 100);
    alert(`WebAssembly test: ${x} + ${y} = ${add(x, y)}`);
}

//draw test
/* function draw() {
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "rgb(200, 0, 0)";
      ctx.fillRect(10, 10, 50, 50);

      ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      ctx.fillRect(30, 30, 50, 50);
    }
}
 */

/* function render() {
    const ctx = canvas.getContext("2d");
    var frame = ctx.createImageData(canvas_width, canvas_height);
    var data = frame.data;

    for (let i = 0; i < 
        frame.data.length; i += 4) {
        // Modify pixel data
        frame.data[i + 0] = 196;  // R value
        frame.data[i + 1] = 240;    // G value
        frame.data[i + 2] = 194;  // B value
        frame.data[i + 3] = 255;  // A value
    }

    ctx.putImageData(frame, 0, 0);
} */

/* function draw(data) {
    let ctx = canvas.getContext("2d");
    let frame = new ImageData(data, 160, 144);
    ctx.putImageData(frame, 0, 0); 
} */

function toggle_config() {
    document.querySelector("#controlconfig").classList.toggle("visible");
}

//onclick listeners
document.querySelector("#controlexit").onclick = toggle_config;
//document.querySelector("#controlconfig").onclick = toggle_config;
document.querySelector("#configbutton").onclick = toggle_config;
document.querySelector("#loadrom").onclick = wasm_test;

//render wasm
try {
    wasm.render(ctx, canvas_width, canvas_height);
} catch (ex) {
    console.log("error render");
}

console.log(add(1, 2));