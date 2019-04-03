function funcNAND(pA, pB) {
    return !(pA & pB);
}
console.log(funcNAND(false, false));
console.log(funcNAND(false, true));
console.log(funcNAND(true, false));
console.log(funcNAND(true, true));
