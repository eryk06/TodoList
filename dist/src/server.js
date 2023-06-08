"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var category_routes_1 = __importDefault(require("../routes/category.routes"));
var task_routes_1 = __importDefault(require("../routes/task.routes"));
var user_routes_1 = __importDefault(require("../routes/user.routes"));
var db_1 = __importDefault(require("./db"));
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
var PORT = 8888;
(0, db_1.default)();
app.get('/ping', function (req, res) {
    res.send('Pong');
});
app.use((0, morgan_1.default)('common'));
app.use('/users', user_routes_1.default);
app.use('/categories', category_routes_1.default);
app.use('/tasks', task_routes_1.default);
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
