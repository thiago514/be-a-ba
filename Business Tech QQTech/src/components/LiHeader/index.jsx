import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";

const LiEstilizado = styled.li`
  list-style: none;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 28px;
  @media (max-width: 700px) {
    text-align: center;
  }
`;

const AEstilizado = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  padding-left: 1rem;
`;

const IEstilizado = styled.i`
  @media (max-width: 700px) {
    i {
      display: none;
    }
  }
`;

const LiHeader = ({ icone, href, nameLink }) => {
  return (
    <LiEstilizado>
      <IEstilizado className={icone}></IEstilizado>
      <AEstilizado href={href}>{nameLink}</AEstilizado>
    </LiEstilizado>
  );
};

export default LiHeader;
