import BodyContent from "../../components/BodyContent";
import Button from "../../components/Button";
import Header from "../../components/Header";
import InputFile from "../../components/InputFile";
import Search from "../../components/Search";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getTemplatesAtivos } from "../../api/Template";
import {
  getArquivosTemplate,
  salvarArquivo,
  testarArquivo,
} from "../../api/Arquivo";

const H1Estilizado = styled.h1`
  font-size: 50px;
  font-weight: 400;
`;

const H2Estilizado = styled.h2`
  font-size: 25px;
  font-weight: 400;
  text-align: center;
`;

const SelectEstilizado = styled.select`
  padding-top: 10px;
  background-color: var(--second-background);
  height: 55vh;
  width: 35vw;
  border-radius: 10px;
  border: none;
  font-size: 20px;
  text-align: center;
  font-size: ${(props) =>
    props.fontSize >= 24 ? props.fontSize - 6 : props.fontSize - 4}px;
  color: var(--primary-color);

  &:focus {
    outline: none;
  }

  option:hover {
    background-color: var(--second-background);
  }

  option:checked {
    background-color: var(--second-background);
    font-weight: bold;
    color: var(--primary-color);
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const DivFlexColumn = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 50%;
  justify-content: space-evenly;
  height: 80vh;

  @media (max-width: 800px) {
    margin-right: 0;
    width: 100%;
    height: auto;
    justify-content: center;
  }
`;

const DivFlex = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-right: 20px;
  flex-wrap: wrap;

  @media (max-width: 700px) {
    margin-right: 0;
    justify-content: center;
    flex-direction: column;
  }
`;

const DivSalvarButton = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: flex-end;
  bottom: 10px;
  right: 0;
  @media (max-width: 700px) {
    position: relative;
    justify-content: center;
    margin-right: 0;
  }
`;

const SelectCategoria = styled.select`
  margin-top: 10px;
  padding: 10px;
  background-color: var(--second-color);
  border-radius: 10px;
  border: none;
  font-size: 20px;
  text-align: center;
  font-size: ${(props) =>
    props.fontSize >= 24 ? props.fontSize - 6 : props.fontSize - 4}px;
  color: var(--primary-color);
`;

const CadastroArquivoPage = ({ user, setUser }) => {
  const [dados, setDados] = useState([]);
  const [find, setFind] = useState("");
  const [template, setTemplate] = useState();
  const [arquivo, setArquivo] = useState();
  const [categoria, setCategoria] = useState();

  useEffect(() => {
    getTemplatesAtivos(setDados);
  }, []);

  let filterDados = dados;
  if (find) {
    filterDados = dados.filter((e) => {
      return e.nome.toLowerCase().includes(find.toLowerCase());
    });
  }

  return (
    <>
      <Header user={user} setUser={setUser} />
      <BodyContent>
        <H1Estilizado>Cadastro de Arquivo</H1Estilizado>
        <DivFlex>
          <DivFlexColumn>
            <H2Estilizado>Selecionar Template</H2Estilizado>
            <Search value={find} onChange={(e) => setFind(e.target.value)} />
            <SelectEstilizado
              onChange={(e) => {
                setTemplate(e.target.value);
                console.log(template);
              }}
              value={template}
              name="sometext"
              size="10"
              required
            >
              {filterDados.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.nome}
                  </option>
                );
              })}
            </SelectEstilizado>
            <Button
              color="--second-color"
              onClick={() => {
                getArquivosTemplate(template).then((response) => {
                  console.log(response.data);
                });
              }}
            >
              Baixar Template
            </Button>
          </DivFlexColumn>
          <DivFlexColumn>
            <div>
              <H2Estilizado>Testar Arquivo</H2Estilizado>
              <Button
                color="--second-color"
                onClick={(e) => {
                  testarArquivo(arquivo, template);
                }}
              >
                Testar
              </Button>
            </div>
            <div>
              <H2Estilizado>Categoria</H2Estilizado>
              <SelectCategoria onChange={(e) => setCategoria(e.target.value)}>
                <option value="Vendas">Vendas</option>
                <option value="VerdeCard">VerdeCard</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Segurança do Trabalho">
                  Segurança do Trabalho
                </option>
                <option value="Operacional">Operacional</option>
                <option value="Marketing">Marketing</option>
                <option value="Juridico">Jurídico</option>
                <option value="Logística">Logística</option>
                <option value="RH">RH</option>
                <option value="CRM">CRM</option>
                <option value="Mercantil">Mercantil</option>
              </SelectCategoria>
            </div>
            <div>
              <H2Estilizado>Selecionar Arquivo</H2Estilizado>
              <InputFile
                onChange={(e) => {
                  console.log(e);
                  setArquivo(e.target.files[0]);
                }}
              />
            </div>

            <DivSalvarButton $justifycontent="flex-end">
              <Button
                color="--third-color"
                onClick={(e) => {
                  salvarArquivo(arquivo, template, categoria);
                }}
              >
                Salvar
              </Button>
            </DivSalvarButton>
          </DivFlexColumn>
        </DivFlex>
      </BodyContent>
    </>
  );
};

export default CadastroArquivoPage;
