use wasm_bindgen::prelude::wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(x: isize, y: isize) -> isize {
    x + y
}

