import init from "./wasm/gameboy_emulator.js";

const wasm = await init();

wasm.add(1, 2);