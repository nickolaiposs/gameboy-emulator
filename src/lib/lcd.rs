pub struct LCD {
    screen: Vec<u8>
}

impl LCD {
    /*
    the screen is a one dimensional array that is read row by row, left to right, 
    up to down, and each pixel is four entries on the array representing RGBA values
    */
    pub fn new(screen_width: u32, screen_height: u32) -> Self {
        Self {
            screen: vec![255; (screen_width as usize) * (screen_height as usize) * 4]
        }
    }

    pub fn get_screen_data(&mut self) -> &Vec<u8>{
        &self.screen
    }
}