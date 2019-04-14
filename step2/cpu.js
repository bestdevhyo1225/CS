const notationConverter = require('./notation_converter');
const arithmeticLogicUnit = require('./arithmetic_logic_unit');
const PROGRAM_COUNTER_INDEX = 0;

class CPU {
    constructor(memory) {
        this.memory = memory;
        this.R_Register = Array(8).fill(0);
    }

    fetch() { return this.memory.fetch(this.R_Register[PROGRAM_COUNTER_INDEX]++); }

    execute(int16_IR) {
        const [instruction, first, second, isValue, third] = this.decode(int16_IR);
        const instructionWord = arithmeticLogicUnit.excuteList[instruction]();
        const executeResult = arithmeticLogicUnit[instructionWord].call(this, second, third, isValue);

        if (instructionWord === 'STORE') {
            this.memory.store(executeResult, this.R_Register[notationConverter.binaryToDecimal(first)]);
        } else {
            this.R_Register[notationConverter.binaryToDecimal(first)] = executeResult;
        }
    }

    decode(int16_IR) {
        const binary = notationConverter.decimalToBinary(int16_IR);
        while (binary.length < 16) binary.unshift(0);

        const inst = binary.splice(0, 4).join('');
        const first = binary.splice(0, 3);
        let second, isValue, third;
        if (inst === '1011') {
            second = binary.splice(0, 9);
            return [ inst, first, second ];
        } else {
            second = binary.splice(0, 3);
            if (inst[3] === 0 && inst !== '0110') {
                isValue = binary.splice(0, 1);
                third   = binary;
            } else {
                isValue = binary.splice(0, 3);
                third   = binary;
            }
            return [ inst, first, second, isValue, third ];
        }
    }

    dump() { return this.R_Register; }

    reset() { this.R_Register.forEach( (index) => { this.R_Register[index] = 0; } ); }
}

module.exports = CPU;