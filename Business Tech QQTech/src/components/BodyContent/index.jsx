import styled from "styled-components";
import React from "react";

const BodyContentEstilizado = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  box-sizing: border-box;
  gap: 2rem;
  margin-left: 25vw;
  padding: 0 1rem;
  color: var(--primary-color);
  width: 75vw;

  @media (max-width: 700px) {
    margin-left: 0;
    width: 100vw;
    padding: 0 2rem;
  }
`;

const BodyContent = ({ children }) => {
  return <BodyContentEstilizado>{children}</BodyContentEstilizado>;
};

export default BodyContent;
