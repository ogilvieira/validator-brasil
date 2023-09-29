"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isCNH = (value) => {
    value = ('' + value).replace(/[\.\-\/]+/g, "");
    if (!value || value.length !== 11 || value.match(/(\d)\1{10}/))
        return false;
    let sum = 0;
    for (let i = 0, j = 9, v = 0; i < 9; ++i, --j) {
        sum += (+value.charAt(i) * j);
    }
    let dsc = 0, vl1 = sum % 11;
    if (vl1 >= 10) {
        vl1 = 0;
        dsc = 2;
    }
    for (let i = 0, j = 1, v = 0; i < 9; ++i, ++j) {
        sum += (+value.charAt(i) * j);
    }
    let x = sum % 11;
    let vl2 = (x >= 10) ? 0 : x - dsc;
    return ('' + vl1 + vl2) === value.substring(-2);
};
exports.default = isCNH;
