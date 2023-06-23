"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var pageSchema = new mongoose_1.Schema({
    number: {
        type: Number,
        required: [true, 'El numero del Capitulo es obligatorio'],
    },
    chapter: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'El Capitulo del Manga es obligatorio'],
        ref: 'Chapter'
    },
    image: {
        type: String,
        required: [true, 'La Pagina del Capitulo es obligatoria'],
    },
    publicId: {
        type: String,
        required: [true, 'El ID publico de la Pagina es obligatorio']
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Page', pageSchema);
