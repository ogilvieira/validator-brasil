"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCNH = exports.isRenavam = exports.isCEP = exports.isCNPJ = exports.isCPF = void 0;
const isCPF_1 = __importDefault(require("./isCPF"));
exports.isCPF = isCPF_1.default;
const isCNPJ_1 = __importDefault(require("./isCNPJ"));
exports.isCNPJ = isCNPJ_1.default;
const isCEP_1 = __importDefault(require("./isCEP"));
exports.isCEP = isCEP_1.default;
const isRenavam_1 = __importDefault(require("./isRenavam"));
exports.isRenavam = isRenavam_1.default;
const isCNH_1 = __importDefault(require("./isCNH"));
exports.isCNH = isCNH_1.default;
