import Header from "../../components/Header";
import BodyContent from "../../components/BodyContent";
import styled from "styled-components";
import Search from "../../components/Search";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import {
  deletarUsuario,
  listarUsuarioPendentes,
  permitirUsuario,
} from "../../api/User";
import NaoAutorizado from "../NaoAutorizado";

const H1Estilizado = styled.h1`
  font-size: 50px;
  font-weight: 400;
`;

const DivFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 20px;
`;

const PermitirUsuairosPage = ({ user, setUser }) => {
  if (user.tipo !== "admin") {
    return <NaoAutorizado />;
  }

  const [dados, setDados] = useState([]);
  const [find, setFind] = useState("");

  useEffect(() => listarUsuarioPendentes(setDados), []);

  if (!dados) {
    console.log("entrou carregando");
    return <h1>Carregando</h1>;
  }

  let filterDados = dados;
  if (find) {
    filterDados = dados.filter((e) => {
      return (
        e.nome.toLowerCase().includes(find.toLowerCase()) ||
        e.matricula.toLowerCase().includes(find.toLowerCase()) ||
        e.email.toLowerCase().includes(find.toLowerCase())
      );
    });
  }
  console.log("find: " + find);
  return (
    <>
      <Header user={user} setUser={setUser} />
      <BodyContent>
        <DivFlex>
          <H1Estilizado>Permitir Usuarios</H1Estilizado>
          <Search value={find} onChange={(e) => setFind(e.target.value)} />
        </DivFlex>
        <Table>
          <thead>
            <tr>
              <th>Nome do Usuario</th>
              <th>Matricula</th>
              <th>Email</th>
              <th>Data Cadastro</th>
              <th>ADM</th>
              <th>Basico</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {filterDados.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{e.nome}</td>
                  <td>{e.matricula}</td>
                  <td>{e.email}</td>
                  <td>{new Date(e.createdat).toLocaleDateString()}</td>
                  <td
                    onClick={() => {
                      console.log("executando permitir usuario admin");
                      if(confirm("Tem certeza que deseja tornar o usuário " + e.nome + " um administrador?"+ "\n" +
                      "Ao tornar um usuário administrador, ele terá acesso a todas as funcionalidades do sistema e informações sensiveis.")){
                        permitirUsuario(e.id, "admin");
                        window.location.reload();
                      }
                    }}
                  >
                    <i className="bi bi-gear-fill"></i>
                  </td>
                  <td
                    onClick={() => {
                      console.log("executando permitir usuario basic");
                      permitirUsuario(e.id, "basic");
                      window.location.reload();
                    }}
                  >
                    <i className="bi bi-person-fill"></i>
                  </td>
                  <td
                    onClick={() => {
                      if(
                      confirm(
                        "Tem certeza que deseja deletar o usuário " +
                          e.nome +
                          "?"
                      )){
                      console.log("executando deletar usuario");
                      deletarUsuario(e.id)
                      window.location.reload();
                    }
                    }}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </BodyContent>
    </>
  );
};

export default PermitirUsuairosPage;
