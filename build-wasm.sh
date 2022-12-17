cargo build
wasm-pack build --target web
cp pkg/gameboy_emulator_bg.wasm www/wasm/gameboy_emulator_bg.wasm
cp pkg/gameboy_emulator.js www/wasm/gameboy_emulator.js
echo "copied gameboy_emulator.js and gameboy_emulator_bg.wasm to www directory"