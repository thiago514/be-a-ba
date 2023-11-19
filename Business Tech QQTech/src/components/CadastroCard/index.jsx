import styled from "styled-components";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import { register } from "../../api/User";
import React from "react";

const DivBackground = styled.div`
  background-color: var(--second-color);
  box-sizing: border-box;
  width: 500px;
  border-radius: 30px;
  padding: 30px;
`;

const DivFlex = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const H1 = styled.h1`
  font-size: 50px;
  color: var(--primary-color);
  font-weight: 400;
  text-align: center;
`;

const CadastrarCard = () => {
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");

  function limparCampos(){
    setEmail("");
    setMatricula("");
    setNome("");
    setSenha("");
    setRepetirSenha("");
  }

  return (
    <DivBackground>
      <H1>Cadastre-se</H1>
      <Input
        value={email}
        setValue={setEmail}
        label="Email"
        placeholder="Digite seu email"
        type="text"
      />
      <Input
        value={matricula}
        setValue={setMatricula}
        label="Matricula"
        placeholder="Digite sua matricula"
        type="text"
      />
      <Input
        value={nome}
        setValue={setNome}
        label="Nome Completo"
        placeholder="Digite seu nome"
        type="text"
      />
      <Input
        value={senha}
        setValue={setSenha}
        label="Senha"
        placeholder="Digite sua senha"
        type="password"
      />
      <Input
        value={repetirSenha}
        setValue={setRepetirSenha}
        label="Repetir Senha"
        placeholder="Digite sua senha"
        type="password"
      />
      <DivFlex>
        <Button
          onClick={() => {
            if (
              email === "" ||
              matricula === "" ||
              nome === "" ||
              senha === "" ||
              repetirSenha === ""
            ) {
              limparCampos()
              alert("Preencha todos os campos");
              return;
            }
            if (RegExp("^[0-9]+$").test(matricula) === false) {

              alert("Matricula deve conter apenas números");
              return;
            }
            console.log("campo senha1" + senha + "campo senha2" + repetirSenha);
            if (senha !== repetirSenha) {
              limparCampos()
              return alert("Senhas não conferem");
            }
            const newUser = {
              email: email,
              matricula: matricula,
              nome: nome,
              senha: senha,
            };
            try{
              register(newUser);
            }finally{
              limparCampos()
            }
            
            
            
          }}
          color="--background"
        >
          Cadastrar
        </Button>
        <Button
          onClick={() => {
            const a = document.createElement("a");
            a.href = "/";
            a.click();
          }}
          color="--background"
        >
          Login
        </Button>
      </DivFlex>
    </DivBackground>
  );
};

export default CadastrarCard;
