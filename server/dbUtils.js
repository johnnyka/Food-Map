"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const util_1 = tslib_1.__importDefault(require("util"));
const readFilePromise = util_1.default.promisify(fs_1.default.readFile);
const writeFilePromise = util_1.default.promisify(fs_1.default.writeFile);
const readFile = async (path) => readFilePromise(path, 'utf8');
exports.default = readFile;
