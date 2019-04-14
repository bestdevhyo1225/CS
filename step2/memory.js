const memorySpace       = [ new Array(1 << 16), new Uint16Array(1 << 16)];
const MEMORY_TEXT_START = 0x0000;            // 0
const MEMORY_TEXT_END   = 0xFFFF;            // 65535
const MEMORY_HEAP_START = 0x10000;           // 65536
const MEMORY_HEAP_END   = 0x1FFFF;           // 131071
const TEXT_AREA         = 0;
const HEAP_AREA         = 1;
const TOTAL_AREA        = 3;

const checkRange = (area, property) => {
    return property.every((address) => { 
        switch(area) {
            case TOTAL_AREA : return MEMORY_TEXT_START <= address && address <= MEMORY_HEAP_END; 
            case TEXT_AREA  : return MEMORY_TEXT_START <= address && address <= MEMORY_TEXT_END;
            case HEAP_AREA  : return MEMORY_HEAP_START <= address && address <= MEMORY_HEAP_END;
        }
    });
}

const isEmptyBuffer = (area, address) => { return memorySpace[area][address] === undefined; }

module.exports = {    
    peek : (int32_address) => {
        if (!checkRange(TOTAL_AREA, [ int32_address ]))
            throw new Error(`Out of Range Exception!`);

        if (int32_address < 0x10000) 
            return memorySpace[TEXT_AREA][int32_address];
        else 
            return memorySpace[HEAP_AREA][MEMORY_HEAP_END - int32_address];
    },
    
    locate : (int16_program) => {
        const start_address = 0;
        const end_address = int16_program.length - 1;
        
        if (!checkRange(TEXT_AREA, [ start_address, end_address ])) 
            throw new Error(`Out of Range Exception Program Address!`);

        for (let address = 0; address < int16_program.length; address+=2) {
            if (!isEmptyBuffer(TEXT_AREA, address)) 
                throw new Error(`A value exists at the current memory address!`);
        }

        memorySpace[TEXT_AREA] = int16_program;
    },
    
    fetch : (int16_programCounter) => {
        if (!checkRange(TEXT_AREA, [ int16_programCounter ]))
            throw new Error(`Out of Range Exception!`);

        return memorySpace[TEXT_AREA][int16_programCounter];
    },
    
    load : (int16_address) => {
        if (!checkRange(HEAP_AREA, [ int16_address ])) 
            throw new Error(`Out of Range Exception!`);

        return memorySpace[HEAP_AREA][MEMORY_HEAP_END - int16_address];
    },
    
    store : (int16_address, int16_data) => {
        if (!checkRange(HEAP_AREA, [ int16_address ])) 
            throw new Error(`Out of Range Exception!`);
        
        if (!isEmptyBuffer(HEAP_AREA, int16_address)) 
            throw new Error(`A value exists at the current memory address!`);
        
        memorySpace[HEAP_AREA][MEMORY_HEAP_END - int16_address] = int16_data;
    },
}