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
    pub fn new(rom_buffer: Vec<u8>) -> Self {
        let mut io = [0u8; 0x80];
        io[0] = 0b11111111;

        Self {
            cart: Cartridge::new(rom_buffer),
            vram: [0; 0x200],
            ram: [0; 0x200],
            oam: [0; 0xa0],
            io,
            hram: [0; 0x80],
            ier: 0
        }
    }

    pub fn update_joypad(&mut self, key: u8, pressed: bool) {
        // 0 = keydown, 1 = keyup
        if pressed {
            self.io[0] &= !(1 << key);
        } else {
            self.io[0] |= 1 << key;
        }
    }

    pub fn get_joypad(&mut self) -> u8 {
        self.io[0]
    }
}