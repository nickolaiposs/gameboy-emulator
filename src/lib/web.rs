use wasm_bindgen::{prelude::*, Clamped};
use web_sys::{CanvasRenderingContext2d, ImageData, console};
use js_sys::Uint8Array;

//webassembly test
#[wasm_bindgen]
pub fn add(x: isize, y: isize) {
    let sum = (x + y).to_string();
}

#[wasm_bindgen]
pub struct Game { }

#[wasm_bindgen]
impl Game {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Game {
        Self { }
    }

    pub fn load_rom(&mut self, byte_array: &Uint8Array) {
        let mut buffer = vec![0; byte_array.length() as usize];
        byte_array.copy_to(&mut buffer);

        //log testing
        let result = format!("{:b}", buffer[64]);
        console::log_1(&result.into());
    }

    pub fn render(&mut self, ctx: &CanvasRenderingContext2d, width: u32, height: u32) -> Result<(), JsValue> { 
        let data = frame_data(width, height);
        let data = ImageData::new_with_u8_clamped_array_and_sh(Clamped(&data), width, height)?;
    
        ctx.put_image_data(&data, 0.0, 0.0)
    }

    pub fn tick (&mut self, deltatime: u16) {
        //console::log_1(&deltatime.into());
    }

    /* JOYPAD INPUT MATCHING
        A: 0
        B: 1
        SELECT: 2
        START: 3
        DPAD-RIGHT: 4
        DPAD-LEFT: 5
        DPAD-UP: 6
        DPAD-DOWN: 7 */

    pub fn update_key_input(&mut self, key: u8, pressed: bool) {
        //log testing
        let result = format!("{} {}", key, pressed);
        console::log_1(&result.into());
    }
}

fn frame_data(width: u32, height: u32) -> Vec<u8> {
    let mut frame_data: Vec<u8> = Vec::new();

    for _x in 0..width {
        for _y in 0..height {
            frame_data.push(255);
            frame_data.push(0);
            frame_data.push(0);
            frame_data.push(255);
        }
    }

    frame_data
}