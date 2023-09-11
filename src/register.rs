pub struct Registers {
    gen_regs: [u8; 8],
    sp: u16,
    pc: u16
}

impl Registers {
    pub fn new() -> Self {
        Self {
            gen_regs: [0; 8],
            sp: 0,
            pc: 0
        }
    }

    pub fn get_genreg(&mut self, reg: GenReg) -> u8 {
        self.gen_regs[reg.index()]
    }

    pub fn get_combreg(&mut self, reg: CombReg) -> u16 {
        let regs: (GenReg, GenReg) = reg.genregs();
        let byte1 = self.get_genreg(regs.0);
        let byte2 = self.get_genreg(regs.1);

        self.combine_bytes(byte1, byte2)
    }

    pub fn get_flagreg(&mut self, reg: FlagReg) -> u8 {
        (self.get_genreg(GenReg::F) >> reg.shift()) & 1
    }

    pub fn get_sp(&mut self) -> u16 {
        self.sp
    }

    pub fn get_pc(&mut self) -> u16 {
        self.pc
    }

    pub fn set_genreg(&mut self, reg: GenReg, val: u8) {
        self.gen_regs[reg.index()] = val;
    }

    pub fn set_combreg(&mut self, reg: CombReg, val: u16) {
        let (reg1, reg2) = reg.genregs();
        let higher_byte: u8 = (val >> 8) as u8;
        let lower_byte: u8 = val as u8;

        self.set_genreg(reg1, higher_byte);
        self.set_genreg(reg2, lower_byte);
    }

    pub fn set_flagreg(&mut self, reg: FlagReg, val: u8) {
        if val > 1 {
            panic!("Cannot set flag regster to any value other than 0 or 1");
        }

        let mask: u8 = 1 << reg.shift();

        let new_flagreg: u8 = (self.get_genreg(GenReg::F) & !mask) | (val << reg.shift());
        self.set_genreg(GenReg::F, new_flagreg);
    }

    pub fn set_sp(&mut self, addr: u16) {
        self.sp = addr;
    }

    pub fn set_pc(&mut self, addr: u16) {
        self.pc = addr;
    }
    
    fn combine_bytes(&mut self, byte1: u8, byte2: u8) -> u16 {
        (byte1 as u16) << 8 | (byte2 as u16)
    }

    pub fn restore(&mut self) {
        
    }
}

pub enum GenReg {A, B, C, D, E, F, H, L}

pub enum CombReg {AF, BC, DE, HL}

pub enum FlagReg {Z, N, H, C}

impl GenReg {
    fn index(&self) -> usize {
        match self {
            GenReg::A => 0,
            GenReg::B => 1,
            GenReg::C => 2,
            GenReg::D => 3,
            GenReg::E => 4,
            GenReg::F => 5,
            GenReg::H => 6,
            GenReg::L => 7
        }
    }
}

impl CombReg {
    fn genregs(&self) -> (GenReg, GenReg) {
        match self {
            CombReg::AF => (GenReg::A, GenReg::F),
            CombReg::BC => (GenReg::B, GenReg::C),
            CombReg::DE => (GenReg::D, GenReg::E),
            CombReg::HL => (GenReg::H, GenReg::L),
        }
    }
}

impl FlagReg {
    fn shift(&self) -> usize {
        match self {
            FlagReg::Z => 7,
            FlagReg::N => 6,
            FlagReg::H => 5,
            FlagReg::C => 4
        }
    }
}

#[cfg(test)]
mod test {
    use crate::register::{Registers, FlagReg, GenReg, CombReg};

    #[test]
    fn test_flagregs() {
        let mut test_reg = Registers::new();
        test_reg.set_genreg(GenReg::F, 0);

        test_reg.set_flagreg(FlagReg::Z, 1);
        assert_eq!(0b10000000, test_reg.get_genreg(GenReg::F));

        test_reg.set_flagreg(FlagReg::C, 1);
        assert_eq!(0b10010000, test_reg.get_genreg(GenReg::F));

        test_reg.set_flagreg(FlagReg::Z, 0);
        assert_eq!(0, test_reg.get_flagreg(FlagReg::Z));
    }

    #[test]
    #[should_panic]
    fn test_flagreg_error() {
        let mut test_reg = Registers::new();
        test_reg.set_flagreg(FlagReg::Z, 2);
    }

    #[test]
    fn test_combregs() {
        let mut test_reg = Registers::new();

        test_reg.set_combreg(CombReg::BC, 0b1100000011111101);
        assert_eq!(0b11000000, test_reg.get_genreg(GenReg::B));
        assert_eq!(0b11111101, test_reg.get_genreg(GenReg::C));

        test_reg.set_genreg(GenReg::B, 0b01000000);
        assert_eq!(0b0100000011111101, test_reg.get_combreg(CombReg::BC));
    }
}