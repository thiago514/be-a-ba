import Header from "../../components/Header";
import BodyContent from "../../components/BodyContent";
import styled from "styled-components";
import Search from "../../components/Search";
import Table from "../../components/Table";
import { useState, useEffect } from "react";
import { getTemplateUsuario } from "../../api/Template";
import { getArquivosTemplate } from "../../api/Arquivo";

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

const VisualizarTemplatesPage = ({ user, setUser }) => {
  const [dados, setDados] = useState([]);
  const [find, setFind] = useState("");
  useEffect(() => {
    getTemplateUsuario(setDados);
  }, []);

  if (!dados) {
    console.log("entrou carregando");
    return <h1>Carregando</h1>;
  }

  let filterDados = dados;
  if (find) {
    filterDados = dados.filter((e) => {
      return (
        e.nome.toLowerCase().includes(find.toLowerCase()) ||
        e.extencao_do_arquivo.toLowerCase().includes(find.toLowerCase())
      );
    });
  }

  console.log(dados);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <BodyContent>
        <DivFlex>
          <H1Estilizado>Visualizar Templates</H1Estilizado>
          <Search value={find} onChange={(e) => setFind(e.target.value)} />
        </DivFlex>
        <Table>
          <thead>
            <tr>
              <th>Nome do template</th>
              <th>Tipo</th>
              <th>N/ Tabelas</th>
              <th>Data Upload</th>
              <th>Baixar</th>
              <th>Staus</th>
            </tr>
          </thead>
          <tbody>
            {filterDados.map((e) => {
              const data = new Date(e.createdAt);
              let iconStatus = "";
              if (e.status == "pendente") {
                iconStatus = "bi bi-arrow-repeat";
              } else if (e.status == "ativo") {
                iconStatus = "bi bi-patch-check-fill";
              } else {
                iconStatus = "bi bi-x-octagon-fill";
              }

              return (
                <tr key={e.id}>
                  <td>{e.nome}</td>
                  <td>{e.extencao_do_arquivo}</td>
                  <td>{e.tabelas.length}</td>
                  <td>{new Date(e.createdat).toLocaleDateString()}</td>
                  <td
                    onClick={() => {
                      getArquivosTemplate(e.id);
                    }}
                  >
                    <i className="bi bi-download"></i>
                  </td>
                  <td>
                    <i className={iconStatus}></i>
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

export default VisualizarTemplatesPage;
