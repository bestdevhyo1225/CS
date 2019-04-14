const notationConverter = require('./notation_converter');

module.exports = {
    excuteList : {
        '0001': () => 'LOAD',
        '0010': () => 'LOAD',
        '0011': () => 'STORE',
        '0100': () => 'STORE',
        '0101': () => 'AND',
        '0110': () => 'OR',
        '0111': () => 'ADD',
        '1000': () => 'ADD',
        '1001': () => 'SUB',
        '1010': () => 'SUB',
        '1011': () => 'MOV',
    },

    LOAD(base, offset, isValue) {
        console.log(this);
        let address = this.R_Register[notationConverter.binaryToDecimal(base)];
        if (notationConverter.binaryToDecimal(isValue) === 1) {
            address += notationConverter.binaryToDecimal(offset);
        } else {
            address += this.R_Register[notationConverter.binaryToDecimal(offset)];
        }
        return this.memory.load(address);
    },

    STORE(base, offset, isValue) {
        let address = this.R_Register[notationConverter.binaryToDecimal(base)];
        if (notationConverter.binaryToDecimal(isValue) === 1) {
            address += notationConverter.binaryToDecimal(offset);
        } else {
            address += this.R_Register[notationConverter.binaryToDecimal(offset)];
        }
        return address;
    },

    AND(op1, op2) {
        return this.R_Register[notationConverter.binaryToDecimal(op1)]
                && this.R_Register[notationConverter.binaryToDecimal(op2)];
    },

    OR(op1, op2) {
        return this.R_Register[notationConverter.binaryToDecimal(op1)]
                || this.R_Register[notationConverter.binaryToDecimal(op2)];
    },

    ADD(op1, op2, isValue) {
        let address = this.R_Register[notationConverter.binaryToDecimal(op1)];
        if (notationConverter.binaryToDecimal(isValue) === 1) {
            address += notationConverter.binaryToDecimal(op2);
        } else {
            address += this.R_Register[notationConverter.binaryToDecimal(op2)];
        }
        return address;
    },

    SUB(op1, op2, isValue) {
        let address = this.R_Register[notationConverter.binaryToDecimal(op1)];
        if (notationConverter.binaryToDecimal(isValue) === 1) {
            address -= notationConverter.binaryToDecimal(op2);
        } else {
            address -= this.R_Register[notationConverter.binaryToDecimal(op2)];
        }
        return address;
    },

    MOV(value) { return notationConverter.binaryToDecimal(value); },
}