"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UF_LIST = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MS', 'MT', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
const isUF = (value) => {
    value = ('' + value).replace(/[\.\-\/]+/g, "").toUpperCase();
    if (value == "" || value.length !== 2) {
        return false;
    }
    ;
    return UF_LIST.includes(value);
};
exports.default = isUF;
