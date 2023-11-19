import styled from "styled-components";
import React from "react";

const ButtonEstilizado = styled.button`
  background-color: var(${(props) => props.color});
  border-radius: 10px;
  border: none;
  padding: 10px 30px;
  margin: 10px;
  color: var(--primary-color);
  font-size: 25px;
  cursor: pointer;
`;

const Button = ({ children, ...props }) => {
  return <ButtonEstilizado {...props}>{children}</ButtonEstilizado>;
};

export default Button;
