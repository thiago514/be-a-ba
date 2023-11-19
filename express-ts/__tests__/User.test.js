"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("../src/controller/UserController");
test('Testando o registrar', function () {
    var user = {
        nome: "Teste",
        email: "asdf@fad.com",
        matricula: "5443323",
        senha: "123456789",
    };
    var req = {
        body: user
    };
    var res = {
        status: jest.fn().mockImplementation(function (code) {
            return {
                json: jest.fn().mockImplementation(function (data) {
                    return {
                        code: code,
                        data: data
                    };
                })
            };
        })
    };
    UserController_1.default.registar(req, res).then(function () {
        expect(res.status).toHaveBeenCalledWith(201);
    });
});
