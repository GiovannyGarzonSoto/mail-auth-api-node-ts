"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var posterSchema = new mongoose_1.Schema({
    image: {
        type: String,
        unique: true
    },
    publicId: {
        type: String,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Poster', posterSchema);
