"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isCEP = (value) => {
    value = ('' + value).replace(/[\.\-\/]+/g, "");
    return /^[0-9]{8}$/g.test(value);
};
exports.default = isCEP;
