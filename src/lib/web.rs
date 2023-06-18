use wasm_bindgen::{prelude::*, Clamped};
use web_sys::{CanvasRenderingContext2d, ImageData, console};
use js_sys::Uint8Array;
use rand::Rng;

use crate::cpu::CPU;

//webassembly test
#[wasm_bindgen]
pub fn add(x: isize, y: isize) {
    let sum = (x + y).to_string();
}

#[wasm_bindgen]
pub struct Game { 
    fps: u16,
    time_elapsed: u16,
    cpu: CPU
}

#[wasm_bindgen]
impl Game {
    #[wasm_bindgen(constructor)]
    pub fn new(screen_width: u32, screen_height: u32, byte_array: &Uint8Array) -> Self {
        let mut rom_buffer = vec![0; byte_array.length() as usize];
        byte_array.copy_to(&mut rom_buffer);

        Self { 
            fps: 0,
            time_elapsed: 0,
            cpu: CPU::new(screen_width, screen_height, rom_buffer)
        }
    }

    // pub fn load_rom(&mut self, byte_array: &Uint8Array) {
    //     let mut buffer = vec![0; byte_array.length() as usize];
    //     byte_array.copy_to(&mut buffer);

    //     //log testing
    //     let result = format!("{:b}", buffer[64]);
    //     console::log_1(&result.into());
    // }

    pub fn render(&mut self, ctx: &CanvasRenderingContext2d, width: u32, height: u32) -> Result<(), JsValue> { 
        let data = self.cpu.get_screen_data();
        let data = ImageData::new_with_u8_clamped_array_and_sh(Clamped(data), width, height)?;
    
        ctx.put_image_data(&data, 0.0, 0.0)
    }

    pub fn tick (&mut self, deltatime: u16) {
        self.time_elapsed += deltatime;

        if self.time_elapsed >= 1000 {
            let fps_string = format!("fps: {}", self.fps);
            console::log_1(&fps_string.into());
            self.fps = 0;
            self.time_elapsed = 0;
        }

        self.fps += 1;
    }

    pub fn update_key_input(&mut self, key: u8, pressed: bool) {
        //log testing
        let input_string = format!("{} {}", key, pressed);
        console::log_1(&input_string.into());

        self.cpu.update_key_input(key, pressed);
        let joypad_string = format!("{:b}", self.cpu.get_joypad());
        console::log_1(&joypad_string.into());
    }
}