pub struct LCD {
    screen: Vec<Vec<u8>>
}

impl LCD {
    pub fn new(screen_width: u32, screen_height: u32) -> Self {
        Self {
            screen: vec![vec![0; screen_width as usize]; screen_height as usize]
        }
    }
}