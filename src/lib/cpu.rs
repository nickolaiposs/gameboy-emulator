use crate::register::{Registers, GenReg, CombReg, FlagReg};

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


