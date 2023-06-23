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
exports.authorController = void 0;
var Author_1 = __importDefault(require("../models/Author"));
var AuthorController = /** @class */ (function () {
    function AuthorController() {
    }
    AuthorController.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Author_1.default.find()
                                .sort('name')
                                .exec()];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            return [2 /*return*/, res.status(500).json({
                                    success: false,
                                    message: 'Ha ocurrido un problema al listar los Autores '
                                })];
                        }
                        res.json({
                            success: true,
                            data: data
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(500).json({
                                success: false,
                                message: 'No se han podido listar los Autores',
                                err: err_1
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthorController.prototype.getOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, Author_1.default.findById(id)
                                .exec()];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            return [2 /*return*/, res.status(500).json({
                                    success: false,
                                    message: 'El Autor no existe'
                                })];
                        }
                        res.json({
                            success: true,
                            data: data
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({
                                success: false,
                                message: 'No se ha podido listar el Autor',
                                err: err_2
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthorController.prototype.add = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var name_1, newAuthor, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        name_1 = req.body.name;
                        newAuthor = new Author_1.default({
                            name: name_1
                        });
                        return [4 /*yield*/, newAuthor.save()];
                    case 1:
                        _a.sent();
                        res.json({
                            success: true,
                            data: newAuthor
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: 'No se ha podido agregar el Autor',
                                err: err_3
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthorController.prototype.edit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, body, updatedAuthor, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        body = req.body;
                        return [4 /*yield*/, Author_1.default.findByIdAndUpdate(id, body, { new: true })];
                    case 1:
                        updatedAuthor = _a.sent();
                        if (!updatedAuthor) {
                            return [2 /*return*/, res.status(400).json({
                                    success: false,
                                    message: 'El Autor no existe'
                                })];
                        }
                        res.json({
                            success: true,
                            data: updatedAuthor
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: 'No se ha podido actualizar el Autor',
                                err: err_4
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthorController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, removedAuthor, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, Author_1.default.findByIdAndRemove(id)];
                    case 1:
                        removedAuthor = _a.sent();
                        if (!removedAuthor) {
                            return [2 /*return*/, res.status(400).json({
                                    success: false,
                                    message: 'El Autor no existe'
                                })];
                        }
                        res.json({
                            success: true,
                            data: removedAuthor
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: 'No se ha podido eliminar el Autor',
                                err: err_5
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AuthorController;
}());
exports.authorController = new AuthorController();
