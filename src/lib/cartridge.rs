pub struct Cartridge { 
    rombank: [u8; 0x8000]
}

impl Cartridge {
    pub fn new() -> Self {
        Self {
            rombank: [0u8; 0x8000]
        }
    }

    pub fn load_rom(&mut self, buffer: Vec<u8>) {
        self.rombank[..buffer.len()].copy_from_slice(&buffer);
    }
}