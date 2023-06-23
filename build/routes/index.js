"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var usersRoutes_1 = __importDefault(require("./usersRoutes"));
var express_1 = require("express");
var router = (0, express_1.Router)();
router.use('/auth', usersRoutes_1.default);
exports.default = router;
