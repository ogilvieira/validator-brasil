"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isChavePix = (value) => {
    return /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(value);
};
exports.default = isChavePix;
