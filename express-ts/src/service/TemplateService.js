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
var typeorm_1 = require("typeorm");
var db_1 = require("../configs/db");
var Campo_1 = require("../entities/Campo");
var Tabela_1 = require("../entities/Tabela");
var Template_1 = require("../entities/Template");
var TemplateService = /** @class */ (function () {
    function TemplateService() {
    }
    TemplateService.criarTemplate = function (templateCompleto, id) {
        var _this = this;
        var templateRespository = db_1.default.getRepository(Template_1.Template);
        var tabelaRepository = db_1.default.getRepository(Tabela_1.Tabela);
        var campoRepository = db_1.default.getRepository(Campo_1.Campo);
        var template = new Template_1.Template();
        template.nome = templateCompleto.nome;
        template.extencao_do_arquivo = templateCompleto.extencao_do_arquivo;
        template.status = 'pendente';
        template.user = id;
        templateRespository.save(template).then(function (e) {
            template.tabelas = templateCompleto.tabelas.map(function (tabela) {
                var tabelaDoTemplate = new Tabela_1.Tabela();
                tabelaDoTemplate.template = e;
                tabelaDoTemplate.nome = tabela.nome;
                console.log("salvando template");
                tabelaRepository.save(tabelaDoTemplate).then(function (e) {
                    tabelaDoTemplate.campos = tabela.campos.map(function (campo) { return __awaiter(_this, void 0, void 0, function () {
                        var campoDaTabela;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    campoDaTabela = new Campo_1.Campo();
                                    campoDaTabela.tabela = e;
                                    campoDaTabela.nome = campo.nome;
                                    campoDaTabela.tipo = campo.tipo;
                                    campoDaTabela.permite_nulo = campo.permite_nulo;
                                    console.log(campoDaTabela);
                                    return [4 /*yield*/, campoRepository.save(campoDaTabela).then(function (e) {
                                            return e;
                                        })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); });
                }).catch(function (e) {
                    throw e;
                });
                return tabelaDoTemplate;
            });
        }).catch(function (e) {
            throw e;
        });
        return template;
    };
    TemplateService.listarTemplates = function (id) {
        if (id === void 0) { id = null; }
        return __awaiter(this, void 0, void 0, function () {
            var templateRespository, templateFinal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        templateRespository = db_1.default.getRepository(Template_1.Template);
                        templateFinal = [];
                        if (!(id != null)) return [3 /*break*/, 2];
                        console.log('id_usuario: ' + id);
                        return [4 /*yield*/, templateRespository.find({
                                select: {
                                    user: {
                                        nome: true
                                    }
                                },
                                relations: {
                                    user: true,
                                    tabelas: {
                                        campos: {}
                                    }
                                },
                                where: {
                                    user: {
                                        id: id
                                    },
                                    status: (0, typeorm_1.Not)((0, typeorm_1.Equal)('excluido'))
                                }
                            }).then(function (e) {
                                console.log(e);
                                return e;
                            })];
                    case 1:
                        templateFinal = _a.sent();
                        return [2 /*return*/, templateFinal];
                    case 2: return [4 /*yield*/, templateRespository.find({
                            select: {
                                user: {
                                    nome: true
                                }
                            },
                            relations: {
                                user: true,
                                tabelas: {
                                    campos: {}
                                }
                            },
                            where: {
                                status: (0, typeorm_1.And)((0, typeorm_1.Not)((0, typeorm_1.Equal)('excluido')), (0, typeorm_1.Not)((0, typeorm_1.Equal)('pendente')))
                            }
                        }).then(function (e) {
                            console.log(e);
                            return e;
                        })];
                    case 3:
                        templateFinal = _a.sent();
                        return [2 /*return*/, templateFinal];
                }
            });
        });
    };
    TemplateService.listarTemplatesPendentes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var templateRespository, templateFinal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        templateRespository = db_1.default.getRepository(Template_1.Template);
                        templateFinal = [];
                        return [4 /*yield*/, templateRespository.find({
                                select: {
                                    user: {
                                        nome: true
                                    }
                                },
                                relations: {
                                    user: true,
                                    tabelas: true
                                },
                                where: {
                                    status: (0, typeorm_1.Equal)('pendente')
                                }
                            }).then(function (e) {
                                console.log(e);
                                return e;
                            })];
                    case 1:
                        templateFinal = _a.sent();
                        return [2 /*return*/, templateFinal];
                }
            });
        });
    };
    TemplateService.listarTemplatesAtivos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var templateRespository, userTemplate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        templateRespository = db_1.default.getRepository(Template_1.Template);
                        return [4 /*yield*/, templateRespository.find({
                                select: {
                                    nome: true,
                                    id: true
                                },
                                where: {
                                    status: 'ativo'
                                }
                            }).then(function (e) {
                                console.log(e);
                                return e;
                            })];
                    case 1:
                        userTemplate = _a.sent();
                        return [2 /*return*/, userTemplate];
                }
            });
        });
    };
    TemplateService.alterarStatusTemplate = function (id, status) {
        return __awaiter(this, void 0, void 0, function () {
            var templateRespository, template;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        templateRespository = db_1.default.getRepository(Template_1.Template);
                        if (status !== 'ativo' && status !== 'inativo' && status !== 'excluido' && status !== 'pendente') {
                            throw new Error('Status inválido');
                        }
                        return [4 /*yield*/, templateRespository.update(id, { status: status })];
                    case 1:
                        template = _a.sent();
                        return [2 /*return*/, template];
                }
            });
        });
    };
    return TemplateService;
}());
exports.default = TemplateService;
