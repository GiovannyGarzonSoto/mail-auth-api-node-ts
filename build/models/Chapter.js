"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var chapterSchema = new mongoose_1.Schema({
    number: {
        type: Number,
        required: [true, 'El numero del Capitulo es obligatorio'],
    },
    manga: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'El Manga es obligatorio'],
        ref: 'Manga'
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'El Autor es obligatorio'],
        ref: 'Author'
    },
    title: {
        type: String,
    },
    premiere: {
        type: Date,
        default: false
    },
    available: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Chapter', chapterSchema);
