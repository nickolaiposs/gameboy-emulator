use crate::cartridge::Cartridge;

pub struct Memory {
    cart: Cartridge, //0000-7FFF ROM Bank, A000-BFFF External Ram
    vram: [u8; 0x200], //8000-9FFF
    ram: [u8; 0x200], //C000-DFFF
    oam: [u8; 0xa0], //FE00-FE9F
    io: [u8; 0x80], //FF00-FF7F
    hram: [u8; 0x80], //FF80-FFFE
    ier: u8 //FFFF
}

impl Memory {
    pub fn new() -> Self {
        Self {
            cart: Cartridge::new(),
            vram: [0; 0x200],
            ram: [0; 0x200],
            oam: [0; 0xa0],
            io: [0; 0x80],
            hram: [0; 0x80],
            ier: 0
        }
    }

    pub fn load_rom(&mut self, buffer: Vec<u8>) {
        self.cart.load_rom(buffer);
    }
}