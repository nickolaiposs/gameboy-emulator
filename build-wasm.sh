cargo build --target wasm32-unknown-unknown
wasm-bindgen target/wasm32-unknown-unknown/debug/gameboy_emulator.wasm --out-dir www/wasm --target web