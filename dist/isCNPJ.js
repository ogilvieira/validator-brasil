"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isCNPJ = (value) => {
    value = ('' + value).replace(/[\.\-\/]+/g, "");
    if (value == "" || value.length !== 14 || !!value.match(/(\d)\1{13}/))
        return false;
    var size = value.length - 2;
    var numbers = value.substring(0, size);
    var digits = value.substring(size);
    var sum = 0;
    var pos = size - 7;
    for (var i = size; i >= 1; i--) {
        sum += +numbers.charAt(size - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    var result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== +digits.charAt(0))
        return false;
    size = size + 1;
    numbers = value.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (var i = size; i >= 1; i--) {
        sum += +numbers.charAt(size - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== +digits.charAt(1))
        return false;
    return true;
};
exports.default = isCNPJ;
