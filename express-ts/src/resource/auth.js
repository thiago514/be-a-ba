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
exports.usuarioAutorizado = exports.idUsuario = exports.usuarioADM = exports.gerarJWT = void 0;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User_1 = require("../entities/User");
var db_1 = require("../configs/db");
var typeorm_1 = require("typeorm");
var jwt_decode_1 = require("jwt-decode");
var userRepository = db_1.default.getRepository(User_1.User);
function gerarJWT(matricula, senha) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('gerarJWT');
                    console.log('matricula: ' + matricula + ' senha: ' + senha);
                    return [4 /*yield*/, userRepository.findOne({ where: { matricula: matricula, tipo: (0, typeorm_1.And)((0, typeorm_1.Not)((0, typeorm_1.IsNull)()), (0, typeorm_1.Not)('desativado')) } }).then(function (user) {
                            console.log(user);
                            if (user == null) {
                                throw Error('Usuário não encontrado');
                            }
                            if (bcrypt.compareSync(senha, user.senha)) {
                                console.log('senha correta');
                                user.token = jwt.sign({ id: user.id, tipo: user.tipo }, '1234', { expiresIn: '24h' });
                                console.log(user);
                                return user;
                            }
                            throw Error('Senha incorreta');
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.gerarJWT = gerarJWT;
function usuarioADM(req, res, next) {
    console.log('usuarioADM');
    try {
        console.log(req.headers.token);
        var token = (0, jwt_decode_1.default)(req.headers.token);
        var tipo = token.tipo;
        console.log('tipo dentro da funcão usuarioADM: ' + tipo);
        if (tipo !== 'admin') {
            return res.status(401).json({ mensagem: 'Usuário não autorizado' });
        }
        next();
    }
    catch (error) {
        console.log(error);
    }
}
exports.usuarioADM = usuarioADM;
function idUsuario(token) {
    var jsonToken = (0, jwt_decode_1.default)(token);
    console.log(jsonToken);
    return jsonToken.id;
}
exports.idUsuario = idUsuario;
function usuarioAutorizado(req, res, next) {
    try {
        var token = req.headers.token;
        if (jwt.verify(token, '1234')) {
            console.log('token válido');
            next();
            return;
        }
        res.status(401).json({ mensagem: 'Usuário não autorizado' });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ mensagem: 'jwt inválido' });
    }
}
exports.usuarioAutorizado = usuarioAutorizado;
