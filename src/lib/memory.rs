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