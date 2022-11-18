pub struct Cartridge { 
    rombank: [u8; 0x8000]
}

impl Cartridge {
    pub fn new() -> Self {
        Self {
            rombank: [0; 0x8000]
        }
    }
}