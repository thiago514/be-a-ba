import styled from "styled-components";
import React from "react";

const AEstilizado = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 400;
  padding-left: 1rem;
  bottom: 1rem;
  font-size: 28px;
  align-self: flex-end;
  margin-top: 10px;
  margin-right: 1rem;

  @media (max-width: 700px) {
    align-self: center;
    bottom: 0;
    font-size: 18px;
  }
`;

const Sair = ({ setUser }) => {
  return (
    <AEstilizado href="/" onClick={() => resetUser(setUser)}>
      <i className="bi bi-x-square-fill"></i> Sair
    </AEstilizado>
  );
};

const resetUser = (setUser) => {
  setUser(null);
  localStorage.setItem(
    "user",
    JSON.stringify({
      nome: "",
      email: "",
      token: "",
      matricula: "",
      tipo: "",
    })
  );
};

export default Sair;
