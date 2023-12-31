"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var router = (0, express_1.Router)();
router.post('/signup', authController_1.authController.signup);
router.post('/signin', authController_1.authController.signin);
router.put('/email-activate', authController_1.authController.activateAccount);
router.put('/forgot-password', authController_1.authController.forgotPassword);
router.put('/reset-password', authController_1.authController.resetPassword);
exports.default = router;
