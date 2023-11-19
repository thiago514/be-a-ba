import styled from "styled-components";
import Header from "../../components/Header";
import BodyContent from "../../components/BodyContent";
import Search from "../../components/Search";
import { useEffect, useState } from "react";
import { getTodosTemplates } from "../../api/Template";
import Card from "../../components/Card";
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

  @media (max-width: 800px) {
    margin-right: 0;
    justify-content: center;
  }
`;

const GerenciarTemplatesPage = ({ user, setUser }) => {
  if (user.tipo !== "admin") {
    return <NaoAutorizado />;
  }

  const [dados, setDados] = useState([]);
  const [find, setFind] = useState("");

  useEffect(() => {
    getTodosTemplates(setDados);
  }, []);
  console.log(dados);

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
  console.log("find: " + find);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <BodyContent>
        <DivFlex>
          <H1Estilizado>Gerenciar Templates</H1Estilizado>
          <Search value={find} onChange={(e) => setFind(e.target.value)} />
        </DivFlex>
        <DivFlex>
          {filterDados.map((template) => {
            return <Card key={template.id} template={template} />;
          })}
        </DivFlex>
      </BodyContent>
    </>
  );
};

export default GerenciarTemplatesPage;
