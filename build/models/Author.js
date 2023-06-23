"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var authorSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del Autor es obligatorio'],
        unique: true,
    },
}, {
    timestamps: true,
    versionKey: false
});
authorSchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH} ya se encuentra utilizado' });
exports.default = (0, mongoose_1.model)('Author', authorSchema);
