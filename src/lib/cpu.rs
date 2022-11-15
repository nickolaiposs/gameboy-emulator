use crate::register::{Registers, GenReg, CombReg, FlagReg};

const RAM_SIZE: usize = 8192;

pub struct CPU {
    regs: Registers
}

impl CPU {
    pub fn new() -> Self {
        Self {
            regs: Registers::new()
        }
    }
}


