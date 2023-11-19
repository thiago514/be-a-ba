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

const NavAdmUser = () => {
  return (
    <NavEstilizado>
      <LiHeader
        icone="bi bi-house-door-fill"
        href="/dashboard"
        nameLink="Dashboard"
      />
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
        href="/gerenciar-template"
        nameLink="Gerenciar Templates"
      />
      <LiHeader
        icone="bi bi-people-fill"
        href="/permitir-usuarios"
        nameLink="Permitir Usuarios"
      />
      <LiHeader
        icone="bi bi-patch-check-fill"
        href="/permitir-templates"
        nameLink="Permitir Templates"
      />
      <LiHeader
        icone="bi bi-person-fill-gear"
        href="/gerenciar-usuarios"
        nameLink="Gerenciar Usuarios"
      />
      <LiHeader
        icone="bi bi-person-circle"
        href="/meu-usuario"
        nameLink="Meu Usuario"
      />
    </NavEstilizado>
  );
};

export default NavAdmUser;
