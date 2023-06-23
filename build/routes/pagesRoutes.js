"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var pagesController_1 = require("../controllers/pagesController");
// import upload from '../middlewares/multer'
var router = (0, express_1.Router)();
router.get('/', pagesController_1.pagesController.getAll);
router.get('/:id', pagesController_1.pagesController.getOne);
router.post('/', pagesController_1.pagesController.add);
router.put('/:id', pagesController_1.pagesController.edit);
router.put('/delete/:id', pagesController_1.pagesController.delete);
router.get('/chapter/:id/', pagesController_1.pagesController.getPagesByChapter);
exports.default = router;
