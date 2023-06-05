"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var task_controller_1 = require("../controllers/task.controller");
var middleware_1 = require("../middleware");
var taskRoutes = express_1.default.Router();
taskRoutes.use(middleware_1.authenticationMiddleware);
taskRoutes.route('/').get(task_controller_1.getAllTasks);
taskRoutes.route('/tasks-by-categories/:id').get(task_controller_1.getAllTasksByCategory);
taskRoutes.route('/completed').get(task_controller_1.getAllCompletedTasks);
taskRoutes.route('/today').get(task_controller_1.getTasksForToday);
taskRoutes.route('/create').post(task_controller_1.createTask);
taskRoutes.route('/update/:id').put(task_controller_1.toggleTaskStatus);
taskRoutes.route('/:id').delete(task_controller_1.deleteTask);
taskRoutes.route('/edit/:id').put(task_controller_1.editTask);
exports.default = taskRoutes;
