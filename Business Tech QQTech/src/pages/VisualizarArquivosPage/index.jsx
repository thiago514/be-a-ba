import styled from "styled-components";
import Header from "../../components/Header";
import BodyContent from "../../components/BodyContent";
import Search from "../../components/Search";
import Table from "../../components/Table";
import { getArquivos, getArquivo, deletarArquivo } from "../../api/Arquivo";
import { useEffect, useState } from "react";
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

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

const Iestilizado = styled.i`
  font-size: 20px;
  color: var(--primary-color);
  width: 100%;
  cursor: pointer;
`;

const VisualizarArquivosPage = ({ user, setUser }) => {
  const [dados, setDados] = useState([]);
  const [find, setFind] = useState("");

  useEffect(() => getArquivos(setDados), []);

  if (!dados) {
    console.log("entrou carregando");
    return <h1>Carregando</h1>;
  }

  let filterDados = dados;
  if (find) {
    filterDados = dados.filter((e) => {
      return (
        e.nome_arquivo.toLowerCase().includes(find.toLowerCase()) ||
        e.nome_usuario.toLowerCase().includes(find.toLowerCase()) ||
        e.nome_template.toLowerCase().includes(find.toLowerCase()) ||
        e.categoria.toLowerCase().includes(find.toLowerCase())
      );
    });
  }
  console.log("find: " + find);
  console.log(filterDados);

  return (
    <>
      <Header user={user} setUser={setUser} />

      <BodyContent>
        <DivFlex>
          <H1Estilizado>Visualizar Arquivos</H1Estilizado>
          <Search
            value={find}
            onChange={(e) => {
              setFind(e.target.value);
            }}
          />
        </DivFlex>
        <Table>
          <thead>
            <tr>
              <th>Nome do Arquivo</th>
              <th>Categoria</th>
              <th>Template</th>
              <th>Usuario</th>
              <th>Data Upload</th>
              <th>Baixar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {filterDados.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{e.nome_arquivo}</td>
                  <td>{e.categoria}</td>
                  <td>{e.nome_template}</td>
                  <td>{e.nome_usuario}</td>
                  <td>{e.data_criacao}</td>
                  <td
                    onClick={() => {
                      getArquivo(e.id);
                    }}
                  >
                    <Iestilizado className="bi bi-download"></Iestilizado>
                  </td>
                  <td
                    onClick={() => {
                      if(
                      confirm(
                        "Deseja realmente deletar o arquivo " +
                          e.nome_arquivo +
                          "?"
                      )){
                      deletarArquivo(e.id);
                      alert("Arquivo deletado com sucesso");
                      window.location.reload();
                      }
                    }}
                  >
                    <Iestilizado className="bi bi-trash-fill"></Iestilizado>
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

export default VisualizarArquivosPage;
