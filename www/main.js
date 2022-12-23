import init, { add, Game } from "./wasm/gameboy_emulator.js";

await init();

const game = new Game();
const canvas = document.querySelector("#gamescreen");
const ctx = canvas.getContext("2d");
const canvas_width = parseInt(canvas.getAttribute("width"));
const canvas_height = parseInt(canvas.getAttribute("height"));

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
    var byteArray;

    fileReader.onload = (event) => game.load_rom(new Uint8Array(event.target.result));
    fileReader.readAsArrayBuffer(rom);
}

//onclick listeners
document.querySelector("#controlconfig").onclick = toggleConfig;
document.querySelector("#configbutton").onclick = toggleConfig;

//add rom filebrowser
const romButton = document.querySelector("#loadrom");
romButton.onclick = () => fileBrowse(loadRom, ".gb");

game.render(ctx, canvas_width, canvas_height);
