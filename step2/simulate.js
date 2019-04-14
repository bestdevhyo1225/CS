const Memory = require('./memory');
const CPU = require('./cpu');

(function(){
    const program = ['MOV R4 0xA0', '', 'MOV R5 0x02', '', 'LOAD R1 R4 #30', ''
                    ,'ADD R2 R1 #4', '', 'SUB R3 R1 R2', '', 'STORE R3 R4 #4', ''];
    
    Memory.locate(program);

    CPU.reset();
    for (let address = 0; address < program.length; address+=2) {
        CPU.fetch(Memory.fetch(CPU.getProgramCounter()));
        CPU.execute();
        Memory.store(address + 0x10000, CPU.dump());
        console.log(`${address + 0x10000} 주소의 값 => ${Memory.peek(address + 0x10000)}`);
    }
})();