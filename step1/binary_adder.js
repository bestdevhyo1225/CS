function funcHalfAdder(bitA, bitB) {
    return [(!bitA & bitB) | (bitA & !bitB), bitA & bitB];
}
console.log(funcHalfAdder(false, false));
console.log(funcHalfAdder(false, true));
console.log(funcHalfAdder(true, false));
console.log(funcHalfAdder(true, true));

function funcFullAdder(bitA, bitB, carry) {
    let answer = funcHalfAdder(bitA, bitB);
    let firstCarry = answer[1];
    answer = funcHalfAdder(carry, answer[0]);
    answer[1] |= firstCarry;
    return answer;
}
console.log(funcFullAdder(false, false, false));
console.log(funcFullAdder(false, false, true));
console.log(funcFullAdder(false, true, false));
console.log(funcFullAdder(false, true, true));
console.log(funcFullAdder(true, false, false));
console.log(funcFullAdder(true, false, true));
console.log(funcFullAdder(true, true, false));
console.log(funcFullAdder(true, true, true));

function funcByteAdder(byteA, byteB) {
    let answer = [];
    let carry = 0;
    for (let i = 0; i < byteA.length; i++) {
        let temp = funcFullAdder(byteA[i], byteB[i], carry);
        answer.push(temp[0]);
        carry = temp[1];
    }
    answer.push(carry);
    return answer;
}
console.log(funcByteAdder([ 1, 1, 0, 1, 1, 0, 1, 0 ], [ 1, 0, 1, 1, 0, 0, 1, 1 ]));
console.log(funcByteAdder([ 1, 1, 0, 0, 1, 0, 1, 0 ], [ 1, 1, 0, 1, 1, 0, 0, 1 ]));
