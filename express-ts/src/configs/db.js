"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conn = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../entities/User");
var Template_1 = require("../entities/Template");
var Tabela_1 = require("../entities/Tabela");
var Campo_1 = require("../entities/Campo");
var Arquivo_1 = require("../entities/Arquivo");
var Log_1 = require("../entities/Log");
exports.conn = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '5149',
    database: 'QQTech',
    schema: 'be-a-ba',
    logging: true,
    synchronize: true,
    entities: [User_1.User, Template_1.Template, Tabela_1.Tabela, Campo_1.Campo, Arquivo_1.Arquivo, Log_1.Log]
});
exports.default = exports.conn;
