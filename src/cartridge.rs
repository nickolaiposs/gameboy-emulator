pub struct Cartridge { 
    rombank: [u8; 0x8000]
}

impl Cartridge {
    pub fn new(buffer: Vec<u8>) -> Self {
        let mut rombank = [0u8; 0x8000];

        Self {
            rombank
        }
    }
}
