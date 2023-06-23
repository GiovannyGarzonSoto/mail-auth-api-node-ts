"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authorController_1 = require("../controllers/authorController");
var router = (0, express_1.Router)();
router.get('/', authorController_1.authorController.getAll);
router.get('/:id', authorController_1.authorController.getOne);
router.post('/', authorController_1.authorController.add);
router.put('/:id', authorController_1.authorController.edit);
router.put('/delete/:id', authorController_1.authorController.delete);
exports.default = router;
