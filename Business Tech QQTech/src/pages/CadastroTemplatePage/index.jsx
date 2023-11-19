import Header from "../../components/Header";
import BodyContent from "../../components/BodyContent";
import Button from "../../components/Button";
import styled from "styled-components";
import InputTemplate from "../../components/InputTemplate";
import "bootstrap-icons/font/bootstrap-icons.css";
import InputCampos from "../../components/InputCampos";
import Input from "../../components/Input";
import { useState } from "react";
import { post_template } from "../../api/Template";

const H1Estilizado = styled.h1`
  font-size: 50px;
  font-weight: 400;
`;

const DivFlex = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: ${(props) => props.$justifycontent};
  margin-right: 20px;
`;

const DivFlexOverflow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-y: scroll;
  justify-content: ${(props) => props.$justifycontent};
  margin-right: 20px;
  gap: 10px;
  max-width: 80%;
  @media (max-width: 800px) {
    max-width: 70%;
  }
`;

const H2Estilizado = styled.h2`
  font-size: 30px;
  font-weight: 400;
  margin: 0;
`;

let nid = 1;

const CadastroTemplatePage = ({ user, setUser }) => {
  const [template, setTemplate] = useState({
    nome: "",
    extencao_do_arquivo: "",
    tabelas: [
      {
        id: nid++,
        nome: "",
        selecionado: true,
        campos: [
          {
            id: nid++,
            nome: "",
            tipo: "text",
            permite_nulo: false,
          },
        ],
      },
    ],
  });

  const alterarNomeTemplate = (nome) => {
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      nome: nome,
    }));
  };

  const alterarTipoArquivo = (e, extencao_do_arquivo) => {
    if (template.tabelas.length > 1 && extencao_do_arquivo === "CSV") {
      e.preventDefault();
      alert(
        "Não foi possivel alterar o tipo de arquivo para CSV, pois há mais de uma tabela"
      );
      return;
    }
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      extencao_do_arquivo: extencao_do_arquivo,
    }));
  };

  const adicionarTabela = () => {
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      tabelas: [
        ...prevTemplate.tabelas,
        {
          id: nid++,
          nome: ``,
          selecionado: false,
          campos: [
            {
              id: nid++,
              nome: "",
              tipo: "text",
              permite_nulo: false,
            },
          ],
        },
      ],
    }));
  };

  const alterarNomeTabela = (nome) => {
    const tabelaSelecionada = template.tabelas.filter(
      (tabela) => tabela.selecionado === true
    )[0];
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      tabelas: prevTemplate.tabelas.map((tabela) => {
        if (tabela.id === tabelaSelecionada.id) {
          return {
            ...tabela,
            nome: nome,
          };
        }
        return tabela;
      }),
    }));
  };

  const adicionarColuna = () => {
    const tabelaSelecionada = template.tabelas.filter(
      (tabela) => tabela.selecionado === true
    )[0];
    const novaColuna = {
      id: nid++,
      nome: ``,
      tipo: "text",
      permite_nulo: false,
    };
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      tabelas: prevTemplate.tabelas.map((tabela) => {
        if (tabela.id === tabelaSelecionada.id) {
          return {
            ...tabela,
            campos: [...tabela.campos, novaColuna],
          };
        }
        return tabela;
      }),
    }));
  };

  const alterarNomeColuna = ({ id, nome, tipo, permite_nulo }) => {
    console.log("alterarNomeColuna");
    const tabelaSelecionada = template.tabelas.filter(
      (tabela) => tabela.selecionado === true
    )[0];
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      tabelas: prevTemplate.tabelas.map((tabela) => {
        if (tabela.id === tabelaSelecionada.id) {
          return {
            ...tabela,
            campos: tabela.campos.map((campos) => {
              if (id === campos.id) {
                return {
                  id: id,
                  nome: nome,
                  tipo: tipo,
                  permite_nulo: permite_nulo,
                };
              }
              return campos;
            }),
          };
        }
        return tabela;
      }),
    }));
  };

  const selecionarTabela = (id) => {
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      tabelas: prevTemplate.tabelas.map((tabela) => {
        if (tabela.id === id) {
          return {
            ...tabela,
            selecionado: true,
          };
        }
        return {
          ...tabela,
          selecionado: false,
        };
      }),
    }));
  };

  const removerColuna = (id) => {
    const tabelaSelecionada = template.tabelas.filter(
      (tabela) => tabela.selecionado === true
    )[0];
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      tabelas: prevTemplate.tabelas.map((tabela) => {
        if (tabela.id === tabelaSelecionada.id) {
          return {
            ...tabela,
            campos: tabela.campos.filter((campos) => campos.id !== id),
          };
        }
        return tabela;
      }),
    }));
  };

  console.log(template);
  return (
    <>
      <Header user={user} setUser={setUser} />
      <BodyContent>
        <form>
          <H1Estilizado>Cadastro de Template</H1Estilizado>
          <H2Estilizado>Tabelas</H2Estilizado>

          <DivFlex>
            <DivFlexOverflow>
              {template.tabelas.map((table) => {
                return (
                  <InputTemplate
                    key={table.id}
                    status={table.selecionado ? "ativo" : ""}
                    value={table.nome}
                    onChange={(e) => {
                      alterarNomeTabela(e.target.value);
                    }}
                    onSelect={() => {
                      selecionarTabela(table.id);
                    }}
                    placeholder="Nome"
                  />
                );
              })}
            </DivFlexOverflow>
            {template.extencao_do_arquivo !== "CSV" ? (
              <Button
                color="--background"
                onClick={(e) => {
                  e.preventDefault();
                  adicionarTabela();
                }}
              >
                <i className="bi bi-plus-circle-fill"></i>
              </Button>
            ) : (
              ""
            )}
          </DivFlex>

          <H2Estilizado>Campos</H2Estilizado>
          <DivFlex>
            <DivFlexOverflow>
              {template.tabelas
                .filter((tabela) => tabela.selecionado == true)[0]
                .campos.map((campos) => {
                  return (
                    <InputCampos
                      deletarInput={() => {
                        removerColuna(campos.id);
                      }}
                      key={campos.id}
                      values={campos}
                      setValues={alterarNomeColuna}
                      placeholder="Nome"
                    />
                  );
                })}
            </DivFlexOverflow>

            <Button
              color="--background"
              onClick={(e) => {
                e.preventDefault();
                adicionarColuna();
              }}
            >
              <i className="bi bi-plus-circle-fill"></i>
            </Button>
          </DivFlex>
          <DivFlex $justifycontent="space-between">
            <div>
              <H2Estilizado>Tipo de arquivo</H2Estilizado>

              <InputTemplate
                onChange={(e) => alterarTipoArquivo(e, "CSV")}
                type="radio"
                name="extencao_do_arquivo"
                label="CSV"
                value="CSV"
              />
              <InputTemplate
                onChange={(e) => alterarTipoArquivo(e, "XLSX")}
                type="radio"
                name="extencao_do_arquivo"
                label="XLSX"
                value="XLSX"
              />
              <InputTemplate
                onChange={(e) => alterarTipoArquivo(e, "XLS")}
                type="radio"
                name="extencao_do_arquivo"
                label="XLS"
                value="XLS"
              />
            </div>
            <Input
              value={template.nome}
              setValue={alterarNomeTemplate}
              fontSize={30}
              placeholder="Nome do Template"
              label="Nome do Template"
            />
          </DivFlex>
          <DivFlex $justifycontent="flex-end">
            <Button
              type="submit"
              onClick={(e) => post_template(e, template)}
              color="--second-background"
            >
              Salvar
            </Button>
          </DivFlex>
        </form>
      </BodyContent>
    </>
  );
};

export default CadastroTemplatePage;
