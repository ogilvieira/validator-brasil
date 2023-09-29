"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isRenavam = (value) => {
    value = ('' + value).replace(/[\.\-\/]+/g, "");
    if (!value || value.length !== 11 || value.match(/(\d)\1{10}/))
        return false;
    let valueArr = value.split('').map(a => +a), factor = 2, sum = 0, dig = valueArr[10];
    for (let i = 0; i <= 9; i++) {
        sum += valueArr[9 - i] * factor;
        factor = factor === 9 ? 2 : factor + 1;
    }
    ;
    const digValid = 11 - sum % 11;
    return dig === (digValid >= 10 ? 0 : digValid);
};
exports.default = isRenavam;
