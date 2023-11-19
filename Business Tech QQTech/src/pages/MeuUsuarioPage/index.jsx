import Header from "../../components/Header";
import BodyContent from "../../components/BodyContent";
import styled from "styled-components";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { alterarMeuUsuario } from "../../api/User";

const H1Estilizado = styled.h1`
  font-size: 50px;
  font-weight: 400;
`;

const DivFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  align-self: center;
  flex-wrap: wrap;

  @media (max-width: 800px) {
    width: 95vw;
  }
`;

const MeuUsuarioPage = ({ user, setUser }) => {
  const [email, setEmail] = useState(user.email);
  const [matricula, setMatricula] = useState(user.matricula);
  const [nome, setNome] = useState(user.nome);
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");

  return (
    <>
      <Header user={user} setUser={setUser} />
      <BodyContent>
        <H1Estilizado>Meu Usuario</H1Estilizado>
        <DivFlex>
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
            disabled={true}
          />
          <Input
            value={nome}
            setValue={setNome}
            label="Nome Completo"
            placeholder="Digite seu nome"
            type="text"
          />
          <Input
            value={senhaAntiga}
            setValue={setSenhaAntiga}
            label="Senha Antiga"
            placeholder="Digite sua senha"
            type="password"
          />
          <Input
            value={senha}
            setValue={setSenha}
            label="Nova Senha"
            placeholder="Digite sua senha"
            type="password"
          />
          <Input
            value={repetirSenha}
            setValue={setRepetirSenha}
            label="Repetir Nova Senha"
            placeholder="Digite sua senha"
            type="password"
          />
          <Button
            onClick={async () => {
              if (email === "" || nome === "") {
                alert("Preencha todos os campos");
                return;
              }
              if (!!senhaAntiga) {
                if (senhaAntiga == senha) {
                  return alert("Senha nova não pode ser igual a senha antiga");
                }
                if (senha !== repetirSenha) {
                  return alert("Senhas não conferem");
                }

                const alterUser = {
                  email: email,
                  matricula: matricula,
                  nome: nome,
                  senhaAntiga: senhaAntiga,
                  senha: senha,
                };
                alterarMeuUsuario(alterUser, setUser);
              } else {
                const alterUser = {
                  email: email,
                  matricula: matricula,
                  nome: nome,
                };
                alterarMeuUsuario(alterUser, setUser);
              }
            }}
            color="--second-color"
          >
            Alterar
          </Button>
        </DivFlex>
      </BodyContent>
    </>
  );
};

export default MeuUsuarioPage;
