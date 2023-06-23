"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
var mangaSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'El nombre del Manga es obligatorio'],
        unique: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'El Autor es obligatorio'],
        ref: 'Author'
    },
    images: {
        cover: {
            type: String,
            required: true,
        },
        coverId: {
            type: String,
        },
        background: {
            type: String,
            required: true,
        },
        backgroundId: {
            type: String,
            required: true,
        }
    },
    description: {
        type: String,
        required: [true, 'La descripcion del Manga es obligatoria'],
    },
    available: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});
mangaSchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH} ya se encuentra utilizado' });
exports.default = (0, mongoose_1.model)('Manga', mangaSchema);
