"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const path_1 = __importDefault(require("path"));
const primitives_1 = __importDefault(require("./routes/primitives"));
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, '../client')));
app.use((0, body_parser_1.json)());
app.use('/primitives', primitives_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(3000);
