"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
var User_1 = __importDefault(require("../models/User"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var lodash_1 = __importDefault(require("lodash"));
//ethereal.email
var nmuser = 'deangelo.murray98@ethereal.email';
var nmpass = '1ehcrQ79ZhTRtaHspA';
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.signup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, email, password, verifyUser, newUser, _b, data, payload, token, transporter, info, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                        return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 1:
                        verifyUser = _c.sent();
                        if (verifyUser) {
                            return [2 /*return*/, res.status(200).json({
                                    success: false,
                                    message: 'El correo ya existe para otro usuario'
                                })];
                        }
                        newUser = new User_1.default({
                            name: name_1,
                            email: email,
                            password: password
                        });
                        _b = newUser;
                        return [4 /*yield*/, newUser.encryptPassword(newUser.password)];
                    case 2:
                        _b.password = _c.sent();
                        return [4 /*yield*/, newUser.save()];
                    case 3:
                        data = _c.sent();
                        payload = {
                            _id: data._id,
                            name: data.name,
                            email: data.email,
                            role: data.role
                        };
                        token = jsonwebtoken_1.default.sign(payload, process.env.SEED, { expiresIn: 1200 });
                        transporter = nodemailer_1.default.createTransport({
                            host: 'smtp.ethereal.email',
                            port: 587,
                            secure: false,
                            auth: {
                                user: nmuser,
                                pass: nmpass
                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                        });
                        return [4 /*yield*/, transporter.sendMail({
                                from: 'noreply@mipet.com',
                                to: email,
                                subject: 'Pkapp Account Activation Link',
                                html: "\n                <h2>Please click on given link to activate your mipet account</h2>\n                <p>localhost:8080/auth/activate/".concat(token, "</p>")
                            })];
                    case 4:
                        info = _c.sent();
                        if (!info) {
                            return [2 /*return*/, res.json({
                                    success: false,
                                    message: 'Problemas al enviar correo de verificacion'
                                })];
                        }
                        return [2 /*return*/, res.json({
                                success: true,
                                message: 'Le hemos enviado un correo para verificar su cuenta'
                            })];
                    case 5:
                        err_1 = _c.sent();
                        return [2 /*return*/, res.status(200).json({
                                success: false,
                                message: 'Problemas al registrar el Usuario',
                                err: err_1
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.signin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, correctPassword, payload, token, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, User_1.default.findOne({ email: req.body.email })];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            return [2 /*return*/, res.status(200).json({
                                    success: false,
                                    message: 'Correo o contraseña erronea'
                                })];
                        }
                        return [4 /*yield*/, data.validatePassword(req.body.password)];
                    case 2:
                        correctPassword = _a.sent();
                        if (!correctPassword) {
                            return [2 /*return*/, res.status(200).json({
                                    success: false,
                                    message: 'Correo o contraseña erronea'
                                })];
                        }
                        if (!data.active) {
                            return [2 /*return*/, res.status(200).json({
                                    success: false,
                                    message: 'Es necesario confirmar su correo'
                                })];
                        }
                        payload = {
                            _id: data._id,
                            email: data.email,
                            role: data.role
                        };
                        token = jsonwebtoken_1.default.sign(payload, process.env.SEED, {
                            expiresIn: 60 * 60 * 2
                        });
                        return [2 /*return*/, res.json({
                                success: true,
                                token: token
                            })];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                sucess: false,
                                message: 'No se pudo autenticar el Usuario',
                                err: err_2
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.activateAccount = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, decoded, email, user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        token = req.body.token;
                        if (!token) {
                            return [2 /*return*/, res.status(200).json({
                                    success: false,
                                    message: 'Es necesario un token'
                                })];
                        }
                        decoded = jsonwebtoken_1.default.verify(token, process.env.SEED);
                        if (!decoded) {
                            return [2 /*return*/, res.status(200).json({
                                    success: false,
                                    message: 'Token erroneo o expirado'
                                })];
                        }
                        email = decoded.email;
                        return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, user.updateOne({ active: true })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.json({
                                success: true,
                                message: 'La cuenta ha sido activada'
                            })];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                success: false,
                                message: 'Error al activar la cuenta',
                                err: err_3
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.forgotPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, token, transporter, info, data, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        email = req.body.email;
                        return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(200).json({
                                    success: false,
                                    message: 'Problemas al realizar la operacion'
                                })];
                        }
                        token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.SEED, { expiresIn: 1200 });
                        transporter = nodemailer_1.default.createTransport({
                            host: 'smtp.ethereal.email',
                            port: 587,
                            secure: false,
                            auth: {
                                user: nmuser,
                                pass: nmpass
                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                        });
                        return [4 /*yield*/, transporter.sendMail({
                                from: 'noreply@mipet.com',
                                to: email,
                                subject: 'Pkapp Reset Password Link',
                                html: "\n                    <h2>Please click on given link to reset your password</h2>\n                    <p>localhost:8080/auth/resetpass/".concat(token, "</p>")
                            })];
                    case 2:
                        info = _a.sent();
                        console.log(info);
                        if (!info) {
                            return [2 /*return*/, res.json({
                                    success: false,
                                    message: 'Problemas al cambiar su contraseña'
                                })];
                        }
                        return [4 /*yield*/, user.updateOne({ resetLink: token })];
                    case 3:
                        data = _a.sent();
                        console.log(data);
                        if (!data) {
                            return [2 /*return*/, res.status(200).json({
                                    success: false,
                                    message: 'Enlace de resetear contraseña incorrecto'
                                })];
                        }
                        return [2 /*return*/, res.json({
                                success: true,
                                message: 'Le hemos enviado un enlace para resetear la contraseña'
                            })];
                    case 4:
                        err_4 = _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                success: false,
                                message: 'Error al enviar enlace para resetear contraseña',
                                err: err_4
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.resetPassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, resetLink, newPass, decoded, user, obj, _b, modifiedUser, err_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        _a = req.body, resetLink = _a.resetLink, newPass = _a.newPass;
                        if (!resetLink) {
                            return [2 /*return*/, res.status(200).json({
                                    success: false,
                                    message: 'Token incorrecto o expirado'
                                })];
                        }
                        decoded = jsonwebtoken_1.default.verify(resetLink, process.env.SEED);
                        if (!decoded) {
                            return [2 /*return*/, res.status(200).json({
                                    success: false,
                                    message: 'Error al verificar el token'
                                })];
                        }
                        return [4 /*yield*/, User_1.default.findOne({ resetLink: resetLink })];
                    case 1:
                        user = _c.sent();
                        obj = {
                            password: newPass,
                            resetLink: ''
                        };
                        user = lodash_1.default.extend(user, obj);
                        _b = user;
                        return [4 /*yield*/, user.encryptPassword(user.password)];
                    case 2:
                        _b.password = _c.sent();
                        return [4 /*yield*/, user.save()];
                    case 3:
                        modifiedUser = _c.sent();
                        if (!modifiedUser) {
                            return [2 /*return*/, res.status(200).json({
                                    success: false,
                                    message: 'Error al modificar contraseña',
                                })];
                        }
                        return [2 /*return*/, res.json({
                                success: true,
                                message: 'Tu contraseña ha sido modificada'
                            })];
                    case 4:
                        err_5 = _c.sent();
                        return [2 /*return*/, res.status(200).json({
                                success: false,
                                message: 'Error al resetear contraseña',
                                err: err_5
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.authController = new AuthController();
