module.exports = {
    decimalToBinary(decimal) {
        let answer = [];
        while (decimal > 0) {
            answer.unshift(parseInt(decimal % 2));
            decimal = parseInt(decimal / 2);
        }
        return answer;
    },
    
    binaryToDecimal(binary) {
        let answer = 0;
        for (let i = binary.length-1; i >= 0; i--) {
            let sqrt = 1;
            for (let j = binary.length-1; j > i; j--) sqrt *= 2;
            answer += binary[i] * sqrt;
        }
        return answer;
    },
}
