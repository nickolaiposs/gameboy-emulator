import init, { render, add } from "./wasm/gameboy_emulator.js";

const wasm = await init();

const canvas = document.querySelector("#gamescreen");
const ctx = canvas.getContext("2d");

render(ctx, 160, 144);
