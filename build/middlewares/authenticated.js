"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var isAuthenticated = function (req, res, next) {
    var token = req.get('token');
    if (!token) {
        return res.json({
            success: false,
            message: 'Acceso no autorizado'
        });
    }
    var decoded = jsonwebtoken_1.default.verify(token, process.env.SEED);
    if (!decoded) {
        return res.status(401).json({
            success: false,
            message: 'Usuario no valido'
        });
    }
    req.user = decoded;
    next();
};
exports.isAuthenticated = isAuthenticated;
