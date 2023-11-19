import app from "..";
import * as request from "supertest";
import UserController from "../src/controller/UserController";

test('Testando o registrar',() => {
    
    const user = {
        nome: "Teste",
        email: "asdf@fad.com",
        matricula: "5443323",
        senha: "123456789",
    }
    let req = {
        body: user
    }

    let res = {
        status: jest.fn().mockImplementation((code) => {
            return {
              json: jest.fn().mockImplementation((data) => {
                return {
                  code,
                  data
                };
              })
            };
          })
    }

    UserController.registar(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(201);
    })

   
});
