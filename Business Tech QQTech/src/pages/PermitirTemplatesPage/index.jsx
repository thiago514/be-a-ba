import Header from "../../components/Header";
import BodyContent from "../../components/BodyContent";
import styled from "styled-components";
import Search from "../../components/Search";
import Table from "../../components/Table";
import { alterarStatusTemplate, getTemplatePendente } from "../../api/Template";
import { useEffect, useState } from "react";
import { getArquivosTemplate } from "../../api/Arquivo";
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

const PermitirTemplatesPage = ({ user, setUser }) => {
  if (user.tipo !== "admin") {
    return <NaoAutorizado />;
  }

  const [dados, setDados] = useState([]);
  const [find, setFind] = useState("");
  useEffect(() => {
    getTemplatePendente(setDados);
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
        e.extencao_do_arquivo.toLowerCase().includes(find.toLowerCase()) ||
        e.user.nome.toLowerCase().includes(find.toLowerCase())
      );
    });
  }
  console.log(filterDados);
  return (
    <>
      <Header user={user} setUser={setUser} />
      <BodyContent>
        <DivFlex>
          <H1Estilizado>Permitir Templates</H1Estilizado>
          <Search value={find} onChange={(e) => setFind(e.target.value)} />
        </DivFlex>
        <Table>
          <thead>
            <tr>
              <th>Nome do template</th>
              <th>Tipo</th>
              <th>N/ Tabelas</th>
              <th>Data Upload</th>
              <th>Usuario</th>
              <th>Baixar</th>
              <th>Deletar</th>
              <th>Aprovar</th>
            </tr>
          </thead>
          <tbody>
            {filterDados.map((e) => {
              const data = new Date(e.createdat);
              return (
                <tr key={e.id}>
                  <td>{e.nome}</td>
                  <td>{e.extencao_do_arquivo}</td>
                  <td>{e.tabelas.length}</td>
                  <td>{data.toLocaleDateString()}</td>
                  <td>{e.user.nome}</td>
                  <td
                    onClick={() => {
                      getArquivosTemplate(e.id);
                    }}
                  >
                    <i className="bi bi-download"></i>
                  </td>
                  <td
                    onClick={() => {
                      if (
                        confirm(
                          "Tem certeza que deseja deletar o template " +
                            e.nome +
                            "?"
                        )
                      ) {
                        console.log("recusando template");
                        alterarStatusTemplate(e.id, "excluido");
                        getTemplatePendente(setDados);
                      }
                    }}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </td>
                  <td
                    onClick={() => {
                      if (
                        confirm(
                          "Tem certeza que deseja permitir o template " +
                            e.nome +
                            "?"
                        )
                      ) {
                        console.log("permitindo template");
                        alterarStatusTemplate(e.id, "ativo");
                        getTemplatePendente(setDados);
                      }
                    }}
                  >
                    <i className="bi bi-patch-check-fill"></i>
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

export default PermitirTemplatesPage;
