"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var category_controller_1 = require("../controllers/category.controller");
var middleware_1 = require("../middleware");
var categoryRoutes = express_1.default.Router();
categoryRoutes.use(middleware_1.authenticationMiddleware);
categoryRoutes.route('/').get(category_controller_1.getAllCategories);
categoryRoutes.route('/create').post(category_controller_1.createCategory);
categoryRoutes.route('/:id').delete(category_controller_1.deleteCategory);
categoryRoutes.route('/update').put(category_controller_1.updateCategory);
exports.default = categoryRoutes;
