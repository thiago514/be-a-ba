import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";

const ContainerEstilizado = styled.div`
  position: relative;
  display: block;
  width: 35vw;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const CampoTextoEstilizado = styled.input`
  height: 56px;
  padding: 12px 16px;
  border-radius: 10px;
  border: 2px solid;
  border-color: var(--third-color);
  background: transparent;
  box-sizing: border-box;
  width: 35vw;
  color: var(--primary-color);
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Icone = styled.i`
  position: absolute;
  top: 12px;
  right: 1rem;
  font-size: 28px;
`;

const Search = (props) => {
  return (
    <ContainerEstilizado>
      <CampoTextoEstilizado {...props} />
      <Icone className="bi bi-search" />
    </ContainerEstilizado>
  );
};

export default Search;
