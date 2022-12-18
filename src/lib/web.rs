use wasm_bindgen::prelude::*;

//webassembly test
#[wasm_bindgen]
pub fn add(x: isize, y: isize) -> isize {
    x + y
}