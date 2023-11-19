import LiHeader from "../LiHeader";
import styled from "styled-components";
import React from "react";

const NavEstilizado = styled.nav`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  gap: 2rem;
`;

const NavBasicUser = () => {
  return (
    <NavEstilizado>
      <LiHeader
        icone="bi bi-receipt-cutoff"
        href="/cadastro-arquivo"
        nameLink="Cadastro de Arquivo"
      />
      <LiHeader
        icone="bi bi-database-fill"
        href="/consultar-arquivos"
        nameLink="Consultar Arquivos"
      />
      <LiHeader
        icone="bi bi-table"
        href="/cadastro-template"
        nameLink="Cadastro de Templates"
      />
      <LiHeader
        icone="bi bi-gear-fill"
        href="/visualizar-templates"
        nameLink="Visualizar Templates"
      />
      <LiHeader
        icone="bi bi-person-circle"
        href="/meu-usuario"
        nameLink="Meu Usuario"
      />
    </NavEstilizado>
  );
};

export default NavBasicUser;
