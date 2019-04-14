const R_Register = [ 
    { 'R1': undefined }, 
    { 'R2': undefined }, 
    { 'R3': undefined }, 
    { 'R4': undefined }, 
    { 'R5': undefined }, 
    { 'R6': undefined }, 
    { 'R7': undefined }
];
let instructionRegister = ''; 
let programCounter = 0;
let returnRegister = 0;

const decode = (instructionRegister) => {
    const instruction = instructionRegister.split(' ');
    switch(instruction[0]) {
        case 'MOV'  : 
        {  
            R_Register[instruction[1]] = parseInt(instruction[2]);
            break;
        }
        case 'STORE': 
        case 'LOAD' : 
        case 'ADD'  : 
        {
            R_Register[instruction[1]] = R_Register[instruction[2]];
            if (instruction[3][0] === '#') {    // offsetValue
                R_Register[instruction[1]] += parseInt(instruction[3].substr(1, instruction[3].length-1));
            } else {    // offsetReg
                R_Register[instruction[1]] += R_Register[instruction[3]];
            }
            break;
        }
        case 'SUB'  : 
        {
            R_Register[instruction[1]] = R_Register[instruction[2]];
            if (instruction[3][0] === '#') {    
                R_Register[instruction[1]] -= parseInt(instruction[3].substr(1, instruction[3].length-1));
            } else {    
                R_Register[instruction[1]] -= R_Register[instruction[3]];
            }
            break;
        }
        case 'AND'  : break;
        case 'OR'   : break;
    }
    return R_Register[instruction[1]];
}

module.exports = {
    reset : () => {
        programCount = 0;
        for (let i = 0; i < R_Register.length; i++) {
            const prop = 'R' + (i+1);
            R_Register[prop] = undefined;
        }
    },

    fetch : (instructionReg) => {
        instructionRegister = instructionReg;
        programCounter += 2;
    },

    execute : () => { 
        const decodeResult = decode(instructionRegister);
        returnRegister = decodeResult;
    },

    dump : () => { return returnRegister; },

    getProgramCounter : () => { return programCounter; },
}