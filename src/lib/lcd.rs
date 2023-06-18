pub struct LCD {
    screen: Vec<u8>
}

impl LCD {
    pub fn new(screen_width: u32, screen_height: u32) -> Self {
        Self {
            screen: vec![255; (screen_width as usize) * (screen_height as usize) * 4]
        }
    }

    pub fn get_screen_data(&mut self) -> &Vec<u8>{
        &self.screen
    }
}