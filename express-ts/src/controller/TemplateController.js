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
var auth_js_1 = require("../resource/auth.js");
var TemplateService_js_1 = require("../service/TemplateService.js");
var TemplateController = /** @class */ (function () {
    function TemplateController() {
    }
    TemplateController.criarTemplate = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, templateCompleto, tabelasDoTemplate, i, tabela, _loop_1, j, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (0, auth_js_1.idUsuario)(req.headers.token);
                        console.log(req.headers.token);
                        console.log(req.body);
                        templateCompleto = req.body;
                        tabelasDoTemplate = templateCompleto.tabelas;
                        if (!templateCompleto.nome ||
                            !templateCompleto.extencao_do_arquivo ||
                            !tabelasDoTemplate) {
                            res.status(400).json({
                                erro: 'Requisição mal formatada'
                            });
                            return [2 /*return*/];
                        }
                        if (templateCompleto.extencao_do_arquivo === 'CSV' &&
                            tabelasDoTemplate.length > 1) {
                            res.status(400).json({ erro: 'Arquivos CSV só podem ter uma tabela' });
                            return [2 /*return*/];
                        }
                        try {
                            for (i = 0; i < tabelasDoTemplate.length; i++) {
                                tabela = tabelasDoTemplate[i];
                                console.log(tabela.campos);
                                _loop_1 = function (j) {
                                    var campo = tabela.campos[j];
                                    var verificacao = tabela.campos.filter(function (e) {
                                        return e.nome === campo.nome;
                                    });
                                    console.log(verificacao.length);
                                    if (verificacao.length > 1) {
                                        console.log('tem mais de uma coluna com o mesmo nome');
                                        throw Error('Não pode haver campos com o mesmo nome');
                                    }
                                };
                                for (j = 0; j < tabela.campos.length; j++) {
                                    _loop_1(j);
                                }
                            }
                        }
                        catch (error) {
                            res.status(400).json(error.message);
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, TemplateService_js_1.default.criarTemplate(templateCompleto, id)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        res.status(400).json(error_1.message);
                        return [2 /*return*/];
                    case 4:
                        res.status(201).json(templateCompleto);
                        return [2 /*return*/];
                }
            });
        });
    };
    TemplateController.listarTodosTemplates = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var templates, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, TemplateService_js_1.default.listarTemplates()];
                    case 1:
                        templates = _a.sent();
                        res.status(200).json(templates);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(400).json(error_2.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TemplateController.visualizarTemplateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, template, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (0, auth_js_1.idUsuario)(req.headers.token);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, TemplateService_js_1.default.listarTemplates(id)];
                    case 2:
                        template = _a.sent();
                        res.status(200).json(template);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        res.status(500).json(error_3.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TemplateController.visualizarTemplatesAtivos = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var templates, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, TemplateService_js_1.default.listarTemplatesAtivos()];
                    case 1:
                        templates = _a.sent();
                        res.status(200).json(templates);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        res.status(500).json(error_4.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TemplateController.listarTemplatesPendentes = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var templates, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, TemplateService_js_1.default.listarTemplatesPendentes()];
                    case 1:
                        templates = _a.sent();
                        res.status(200).json(templates);
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        res.status(500).json(error_5.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TemplateController.alterarStatus = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, status_1, template, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, id = _a.id, status_1 = _a.status;
                        return [4 /*yield*/, TemplateService_js_1.default.alterarStatusTemplate(id, status_1)];
                    case 1:
                        template = _b.sent();
                        res.status(200).json(template);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _b.sent();
                        res.status(400).json(error_6.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TemplateController;
}());
exports.default = TemplateController;
