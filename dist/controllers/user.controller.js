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
exports.loginUser = exports.createUser = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_model_1 = __importDefault(require("../models/user-model"));
var getUserToken = function (_id) {
    var authenticatedUserToken = jsonwebtoken_1.default.sign({ _id: _id }, 'express', {
        expiresIn: '7d',
    });
    return authenticatedUserToken;
};
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, existingUser, hashedPassword, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(400).json({ message: 'User already exists' })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 12)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, user_model_1.default.create({
                        name: name_1,
                        email: email,
                        password: hashedPassword,
                    })];
            case 3:
                user = _b.sent();
                return [2 /*return*/, res.status(201).json(user)];
            case 4:
                error_1 = _b.sent();
                res.status(500).json(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existingUser, isPasswordIdentical, _b, _c, _d, token, _e, error_2;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 7, , 8]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
            case 1:
                existingUser = _f.sent();
                if (!existingUser) {
                    return [2 /*return*/, res.status(400).json({ message: 'User does not exist' })];
                }
                _c = (_b = bcrypt_1.default).compare;
                _d = [password];
                return [4 /*yield*/, existingUser];
            case 2: return [4 /*yield*/, _c.apply(_b, _d.concat([(_f.sent()).password]))];
            case 3:
                isPasswordIdentical = _f.sent();
                if (!isPasswordIdentical) return [3 /*break*/, 5];
                _e = getUserToken;
                return [4 /*yield*/, existingUser];
            case 4:
                token = _e.apply(void 0, [(_f.sent())._id]);
                return [2 /*return*/, res.status(200).json({
                        token: token,
                        user: {
                            email: existingUser.email,
                            name: existingUser.name,
                        },
                    })];
            case 5: return [2 /*return*/, res.status(400).json({ message: 'Invalid password' })];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_2 = _f.sent();
                res.status(500).json(error_2);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
