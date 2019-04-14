const Memory = require('./memory');
const CPU = require('./cpu');

(() => {
    const memory = new Memory(new Uint16Array(1 << 17));
    const cpu = new CPU(memory);

    const program = [47114, 47618, 4869, 33892, 38466, 18212];

    memory.locate(program);
    
    program.forEach( IR => {
        cpu.execute(cpu.fetch());
        console.log(cpu.dump());
    });

    cpu.reset();
})();