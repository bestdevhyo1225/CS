const MEMORY_TEXT_START = 0x0000;            // 0
const MEMORY_TEXT_END   = 0xFFFF;            // 65535
const MEMORY_HEAP_START = 0x10000;           // 65536
const MEMORY_HEAP_END   = 0x1FFFF;           // 131071
const TEXT_AREA         = 0;
const HEAP_AREA         = 1;
const TOTAL_AREA        = 3;

class Memory {
    constructor(memorySpace) {
        this.memorySpace = memorySpace;
        this.textAreaCounter = 0x0000;
    }

    checkRange(area, property) {
        return property.every((address) => { 
            switch(area) {
                case TOTAL_AREA : return MEMORY_TEXT_START <= address && address <= MEMORY_HEAP_END; 
                case TEXT_AREA  : return MEMORY_TEXT_START <= address && address <= MEMORY_TEXT_END;
                case HEAP_AREA  : return MEMORY_HEAP_START <= address && address <= MEMORY_HEAP_END;
            }
        });
    }

    /*isEmpty(address) { 
        return this.memorySpace[address] !== undefined; 
    }*/

    peek(int32_address) {
        if (!this.checkRange(TOTAL_AREA, [ int32_address ]))
            throw new Error(`Out of Range Exception!`);

        return this.memorySpace[int32_address];
    }

    locate(int16_program) {
        const start_address = 0;
        const end_address = int16_program.length - 1;
        
        if (!this.checkRange(TEXT_AREA, [ start_address, end_address ])) 
            throw new Error(`Out of Range Exception Program Address!`);

        int16_program.forEach( IR => {
            /*if (!this.isEmpty(this.textAreaCount)) 
                throw new Error(`A value exists at the current memory address!`);*/
        
            this.memorySpace[this.textAreaCounter++] = IR;
        } );
    }

    fetch(int16_programCounter) {
        if (!this.checkRange(TEXT_AREA, [ int16_programCounter ]))
            throw new Error(`Out of Range Exception!`);

        return this.memorySpace[int16_programCounter];
    }
    
    load(int16_address) {
        if (!this.checkRange(HEAP_AREA, [ MEMORY_HEAP_START + int16_address ])) 
            throw new Error(`Out of Range Exception!`);

        return this.memorySpace[MEMORY_HEAP_START + int16_address];
    }
    
    store(int16_address, int16_data) {
        if (!this.checkRange(HEAP_AREA, [ MEMORY_HEAP_START + int16_address ])) 
            throw new Error(`Out of Range Exception!`);

        /*if (!this.isEmpty(int16_address)) 
            throw new Error(`A value exists at the current memory address!`);*/

        this.memorySpace[MEMORY_HEAP_START + int16_address] = int16_data;
    }
}

module.exports = Memory;