use wasm_bindgen::{prelude::*, Clamped};
use web_sys::{CanvasRenderingContext2d, ImageData, console};

//webassembly test
#[wasm_bindgen]
pub fn add(x: isize, y: isize) -> isize {
    x + y
}

#[wasm_bindgen]
pub fn render(ctx: &CanvasRenderingContext2d, width: u32, height: u32) -> Result<(), JsValue> { 
    console::log_1(&"render initialized".into());
    let mut data = frame_data(width, height);
    let data = ImageData::new_with_u8_clamped_array_and_sh(Clamped(&mut data), width, height).unwrap();
    console::log_1(&"render put into image data".into());
    ctx.put_image_data(&data, 0.0, 0.0)
}

fn frame_data(width: u32, height: u32) -> Vec<u8> {
    let mut frame_data: Vec<u8> = Vec::new();

    for _x in 0..width {
        for _y in 0..height {
            frame_data.push(0);
            frame_data.push(0);
            frame_data.push(0);
            frame_data.push(255);
        }
    }

    frame_data
}