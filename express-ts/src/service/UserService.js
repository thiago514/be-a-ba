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
var User_1 = require("../entities/User");
var auth_1 = require("../resource/auth");
var db_1 = require("../configs/db");
var typeorm_1 = require("typeorm");
var bcrypt_1 = require("bcrypt");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.registar = function (nome, senha, email, matricula) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Registrando");
                        userRepository = db_1.default.getRepository(User_1.User);
                        return [4 /*yield*/, (0, bcrypt_1.hash)(senha, 8)];
                    case 1:
                        senha = _a.sent();
                        return [4 /*yield*/, userRepository.save({ nome: nome, senha: senha, email: email, matricula: matricula })];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.permitirUsuario = function (id, tipo) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = db_1.default.getRepository(User_1.User).createQueryBuilder();
                        return [4 /*yield*/, userRepository
                                .update()
                                .set({ tipo: tipo })
                                .where({ id: id })
                                .execute()];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.alterarStatus = function (id, tipo) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = db_1.default.getRepository(User_1.User).createQueryBuilder();
                        return [4 /*yield*/, userRepository
                                .update()
                                .set({ tipo: tipo })
                                .where({ id: id })
                                .execute()];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.alterarUsuario = function (id, nome, email, matricula, tipo) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("alterando usuariooo");
                        userRepository = db_1.default.getRepository(User_1.User).createQueryBuilder();
                        if (!(tipo === null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, userRepository
                                .update()
                                .set({ nome: nome, email: email, matricula: matricula })
                                .where({ id: id })
                                .execute()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, userRepository
                            .update()
                            .set({ nome: nome, email: email, matricula: matricula, tipo: tipo })
                            .where({ id: id })
                            .execute()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, userRepository
                            .select(["id", "nome", "email", "matricula", "tipo"])
                            .where({ id: id })
                            .execute()];
                    case 5:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.alterarMeuUsuario = function (id, nome, email, matricula, senhaAntiga, senha) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, Dadosuser, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("alterando meu usuario");
                        userRepository = db_1.default.getRepository(User_1.User).createQueryBuilder();
                        return [4 /*yield*/, userRepository
                                .select(["senha"])
                                .where({ id: id })
                                .execute()];
                    case 1:
                        Dadosuser = _a.sent();
                        console.log(Dadosuser);
                        if (!(0, bcrypt_1.compareSync)(senhaAntiga, Dadosuser[0].senha)) return [3 /*break*/, 3];
                        senha = (0, bcrypt_1.hashSync)(senha, 8);
                        return [4 /*yield*/, userRepository
                                .update()
                                .set({ nome: nome, email: email, matricula: matricula, senha: senha })
                                .where({ id: id })
                                .execute()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: throw Error("Senha antiga incorreta");
                    case 4: return [4 /*yield*/, userRepository
                            .select(["id", "nome", "email", "matricula"])
                            .where({ id: id })
                            .execute()];
                    case 5:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.login = function (matricula, senha) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, auth_1.gerarJWT)(matricula, senha)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserService.deletar = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = db_1.default.getRepository(User_1.User).createQueryBuilder();
                        return [4 /*yield*/, userRepository.delete().from(User_1.User).where({ id: id }).execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.listarUsuariosPendentes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = db_1.default.getRepository(User_1.User).createQueryBuilder();
                        return [4 /*yield*/, userRepository
                                .select(["id", "nome", "email", "matricula", 'createdat'])
                                .where({ tipo: (0, typeorm_1.IsNull)() })
                                .execute()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    UserService.listarUsuarios = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = db_1.default.getRepository(User_1.User).createQueryBuilder();
                        return [4 /*yield*/, userRepository
                                .select(["id", "nome", "email", "matricula", "tipo"])
                                .where({ tipo: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) })
                                .execute()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    return UserService;
}());
exports.default = UserService;
