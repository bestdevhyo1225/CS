function funcDecimalToBinary(decimal) {
    let answer = [];
    while (decimal > 0) {
        answer.push(parseInt(decimal % 2));
        decimal = parseInt(decimal / 2);
        console.log(`decimal : ${decimal}`);
    }
    return answer;
}
console.log(funcDecimalToBinary(10));
console.log(funcDecimalToBinary(173));

function funcBinaryToDecimal(binary) {
    let answer = 0;
    for (let i = 0; i < binary.length; i++) {
        let sqrt = 1;
        for (let j = 0; j < i; j++) sqrt *= 2;
        answer += binary[i] * sqrt;
    }
    return answer;
}
console.log(funcBinaryToDecimal([0, 1, 1, 1]));
console.log(funcBinaryToDecimal([1,1,1,1,0,1,0,1]));
