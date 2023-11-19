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
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("../resource/auth");
var UserService_1 = require("../service/UserService");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.registar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nome, senha, email, matricula, user, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        console.log(res);
                        _a = req.body, nome = _a.nome, senha = _a.senha, email = _a.email, matricula = _a.matricula;
                        return [4 /*yield*/, UserService_1.default.registar(nome, senha, email, matricula)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, res.status(201).json(user)];
                    case 2:
                        error_1 = _b.sent();
                        return [2 /*return*/, res.status(500).json(error_1.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.permitirUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, tipo, user, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        console.log('Body da requisição permitir usuario: ' + req.body);
                        _a = req.body, id = _a.id, tipo = _a.tipo;
                        return [4 /*yield*/, UserService_1.default.permitirUsuario(id, tipo)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, res.status(200).json(user)];
                    case 2:
                        error_2 = _b.sent();
                        return [2 /*return*/, res.status(500).json(error_2.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, matricula, senha, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('logando');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = req.body, matricula = _a.matricula, senha = _a.senha;
                        return [4 /*yield*/, UserService_1.default.login(matricula, senha).then(function (user) {
                                console.log(user);
                                console.log('retornando o user');
                                return res.status(200).json({ user: user, mensagem: 'Login realizado com sucesso' });
                            })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _b.sent();
                        return [2 /*return*/, res.status(500).json(error_3.message)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.deletar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, UserService_1.default.deletar(id).then(function () {
                                return res.status(200).json({
                                    mensagem: 'Usuário deletado com sucesso'
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, res.status(500).json(error_4.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.listarUsuariosPendentes = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserService_1.default.listarUsuariosPendentes()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, res.status(200).json(users)];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json(error_5.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.listarUsuarios = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserService_1.default.listarUsuarios()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, res.status(200).json(users)];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, res.status(500).json(error_6.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.alterarStatus = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, tipo, user, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, id = _a.id, tipo = _a.tipo;
                        if (tipo !== 'admin' && tipo !== 'basic' && tipo !== 'desativado') {
                            return [2 /*return*/, res.status(400).json({
                                    mensagem: 'Tipo inválido'
                                })];
                        }
                        if (id === (0, auth_1.idUsuario)(req.headers.token)) {
                            return [2 /*return*/, res.status(400).json({
                                    mensagem: 'Não é possível alterar o status do próprio usuário'
                                })];
                        }
                        return [4 /*yield*/, UserService_1.default.alterarStatus(id, tipo)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, res.status(200).json(user)];
                    case 2:
                        error_7 = _b.sent();
                        return [2 /*return*/, res.status(500).json(error_7.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.alterarMeuUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, nome, email, matricula, senhaAntiga, senha, user_1, user, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        console.log('alterando meu usuario');
                        id = (0, auth_1.idUsuario)(req.headers.token);
                        _a = req.body, nome = _a.nome, email = _a.email, matricula = _a.matricula, senhaAntiga = _a.senhaAntiga, senha = _a.senha;
                        console.log(senhaAntiga);
                        if (!(senhaAntiga === '' ||
                            senhaAntiga === null ||
                            senhaAntiga === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, UserService_1.default.alterarUsuario(id, nome, email, matricula, null)];
                    case 1:
                        user_1 = _b.sent();
                        return [2 /*return*/, res.status(200).json(user_1)];
                    case 2: return [4 /*yield*/, UserService_1.default.alterarMeuUsuario(id, nome, email, matricula, senhaAntiga, senha)];
                    case 3:
                        user = _b.sent();
                        return [2 /*return*/, res.status(200).json(user)];
                    case 4:
                        error_8 = _b.sent();
                        return [2 /*return*/, res.status(500).json(error_8.message)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.alterarUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, nome, email, matricula, tipo, user, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        console.log('alterando usuario');
                        _a = req.body, id = _a.id, nome = _a.nome, email = _a.email, matricula = _a.matricula, tipo = _a.tipo;
                        return [4 /*yield*/, UserService_1.default.alterarUsuario(id, nome, email, matricula, tipo)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, res.status(200).json(user)];
                    case 2:
                        error_9 = _b.sent();
                        return [2 /*return*/, res.status(500).json(error_9.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.tokenValido = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, res.status(200).json({
                            mensagem: 'Token válido'
                        })];
                }
                catch (error) {
                    return [2 /*return*/, res.status(401).json(error.message)];
                }
                return [2 /*return*/];
            });
        });
    };
    UserController.usuarioADM = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, res.status(200).json({
                            mensagem: 'Usuário autorizado'
                        })];
                }
                catch (error) {
                    return [2 /*return*/, res.status(401).json(error.message)];
                }
                return [2 /*return*/];
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
