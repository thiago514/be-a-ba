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
var db_1 = require("./src/configs/db");
var express = require("express");
var cors = require("cors");
var User_1 = require("./src/entities/User");
var typeorm_1 = require("typeorm");
var UserRouter_1 = require("./src/routers/UserRouter");
var bcrypt_1 = require("bcrypt");
var TemplateRouter_1 = require("./src/routers/TemplateRouter");
var auth_1 = require("./src/resource/auth");
var Log_1 = require("./src/entities/Log");
var app = express();
app.use(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var logRepository, log, userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logRepository = db_1.default.getRepository(Log_1.Log);
                log = new Log_1.Log();
                log.url = req.url;
                log.userAgent = req.headers['user-agent'] || '';
                log.origin = req.headers.origin || '';
                log.method = req.method;
                log.body = JSON.stringify(req.body);
                if (!(req.headers.token != null && req.headers.token !== '')) return [3 /*break*/, 2];
                console.log('tem token');
                userId = (0, auth_1.idUsuario)(String(req.headers.token));
                return [4 /*yield*/, db_1.default.getRepository(User_1.User).findOne({ where: { id: userId } })];
            case 1:
                user = _a.sent();
                log.user = user || new User_1.User();
                _a.label = 2;
            case 2:
                if (log.method !== 'OPTIONS') {
                    void logRepository.save(log);
                }
                console.log(log);
                next();
                return [2 /*return*/];
        }
    });
}); });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
console.log('iniciando o database');
db_1.default.initialize().then(function () {
    console.log('Database connected...------\n\n\n\n\n\n ');
    db_1.default
        .synchronize()
        .then(function () {
        console.log('Database synchronized... ');
        app.listen(3000);
    })
        .catch(function (err) {
        console.log('Error: ' + err);
    });
}).catch(function (err) {
    console.log('Error: ' + err);
});
// Routes
app.use('/user', UserRouter_1.default);
app.use('/template', TemplateRouter_1.default);
app.get('/', function (req, res) {
    var senha = (0, bcrypt_1.hashSync)('1234', 8);
    db_1.default.getRepository(User_1.User).save({
        nome: 'basic',
        email: 'basic@basic',
        senha: senha,
        matricula: '4321',
        tipo: 'basic'
    }).then(function (e) {
        console.log(e);
    }).catch(function (err) {
        console.log(err);
    });
    db_1.default
        .getRepository(User_1.User)
        .createQueryBuilder()
        .insert()
        .into(User_1.User)
        .values({
        nome: 'admin',
        email: 'admin@admin',
        senha: senha,
        matricula: '1234',
        tipo: 'admin'
    })
        .execute()
        .then(function (e) {
        db_1.default
            .getRepository(User_1.User)
            .findOne({ where: { email: 'admin@admin', tipo: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) } })
            .then(function (e) {
            console.log(e);
            res.status(201).json(e);
        })
            .catch(function (err) {
            res.status(500).json(err);
        });
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
exports.default = app;
