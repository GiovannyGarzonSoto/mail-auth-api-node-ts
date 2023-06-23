"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
exports.default = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: path_1.default.join(__dirname, '../../dist/uploads'),
        filename: function (req, file, callback) {
            callback(null, new Date().getTime() + path_1.default.extname(file.originalname));
        }
    }),
    fileFilter: function (req, file, callback) {
        var ext = path_1.default.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            callback(null, false);
            return;
        }
        callback(null, true);
    },
});
