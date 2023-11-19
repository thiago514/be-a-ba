import styled from "styled-components";
import Input from "../Input";
import Button from "../Button";
import { login } from "../../api/User";
import { useState } from "react";
import React from "react";


const DivBackground = styled.div`
  background-color: var(--second-background);
  box-sizing: border-box;
  width: 500px;
  height: 500px;
  border-radius: 30px;
  padding: 30px;
`;

const H1Estilizado = styled.h1`
  font-size: 50px;
  font-weight: 400;
  text-align: center;
`;

const DivFlex = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const LoginCard = ({ setUser, user }) => {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  console.log("email: ", matricula, "senha: ", senha);
  return (
    <DivBackground>
      <H1Estilizado>Login</H1Estilizado>
      <Input
        value={matricula}
        setValue={setMatricula}
        label="Matricula"
        placeholder="Digite sua matricula"
        type="text"
      />
      <Input
        value={senha}
        setValue={setSenha}
        label="Senha"
        placeholder="Digite sua senha"
        type="password"
      />
      <DivFlex>
        <Button
          color="--background"
          onClick={async () => {
            console.log("matricula: " + matricula);
            console.log("senha: " + senha);
            if (matricula === "" || senha === "") {
              alert("Preencha todos os campos");
              return;
            }
            if (RegExp("^[0-9]+$").test(matricula) === false) {
              alert("Matricula deve conter apenas números");
              return;
            }
            console.log("clicou: ", matricula, senha);
            logando(matricula, senha, setUser);
          }}
        >
          Entrar
        </Button>
        <Button
          color="--background"
          onClick={() => {
            const a = document.createElement("a");
            a.href = "/cadastro";
            a.click();
          }}
        >
          Cadastrar
        </Button>
      </DivFlex>
    </DivBackground>
  );
};

const logando = (matricula, senha, setUser) => {
  login(matricula, senha, setUser);

  console.log("logando");
};

export default LoginCard;
