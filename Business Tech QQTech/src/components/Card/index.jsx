import styled from "styled-components";
import { alterarStatusUsuario } from "../../api/User";
import { alterarStatusTemplate } from "../../api/Template";
import { getArquivosTemplate } from "../../api/Arquivo";
import React from "react";

const CardEstilizado = styled.div`
  text-decoration: ${(props) => (props.$ativado ? "none" : "line-through")};
  width: 320px;
  height: 320px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--third-color);

  @media (max-width: 800px) {
    margin-inline: 0;
    
  }
`;

const H1Estilizado = styled.h1`
  font-size: 30px;
  font-weight: 400;
`;

const TextoCard = styled.p`
  font-size: 20px;
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

const ButtonEstilizado = styled.button`
  background-color: var(--background);
  border-radius: 10px;
  border: none;
  padding: 5px 15px;
  margin: 10px;
  color: var(--primary-color);
  font-size: 20px;
`;

const Card = ({ template, usuario, setModal, setUsuario }) => {
  if (!!usuario) {
    const dados = usuario;
    return (
      <CardEstilizado $ativado={dados.tipo != "desativado"}>
        <H1Estilizado>{dados.nome}</H1Estilizado>
        <TextoCard><strong>Tipo:</strong> {dados.tipo}</TextoCard>
        <TextoCard><strong>Matricula:</strong> {dados.matricula} </TextoCard>
        <TextoCard><strong>Email:</strong> {dados.email}</TextoCard>
        <DivFlex>
          <ButtonEstilizado
            onClick={() => {
              alterarStatusUsuario(
                dados.id,
                dados.tipo == "desativado" ? "basic" : "desativado"
              );
            }}
          >
            {dados.tipo != "desativado" ? "Desativar" : "Ativar"}
          </ButtonEstilizado>
          <ButtonEstilizado
            onClick={() => {
              setUsuario(dados);
              setModal(true);
              console.log("entrou no modal");
            }}
          >
            Editar
          </ButtonEstilizado>
        </DivFlex>
      </CardEstilizado>
    );
  }

  const dados = template;
  return (
    <CardEstilizado $ativado={dados.status == "ativo"}>
      <H1Estilizado>{dados.nome}</H1Estilizado>
      <TextoCard>Tipo: {dados.extencao_do_arquivo}</TextoCard>
      <TextoCard>Criador: {dados.user.nome} </TextoCard>
      <TextoCard>Tabelas: {dados.tabelas.map((e) => e.nome + ", ")}</TextoCard>
      <DivFlex>
        <ButtonEstilizado
          onClick={() => {
            alterarStatusTemplate(
              dados.id,
              dados.status == "ativo" ? "inativo" : "ativo"
            );
            window.location.reload();
          }}
        >
          {dados.status == "ativo" ? "Desativar" : "Ativar"}
        </ButtonEstilizado>
        <ButtonEstilizado
          onClick={() => {
            getArquivosTemplate(dados.id);
          }}
        >
          Baixar
        </ButtonEstilizado>
      </DivFlex>
    </CardEstilizado>
  );
};

export default Card;
