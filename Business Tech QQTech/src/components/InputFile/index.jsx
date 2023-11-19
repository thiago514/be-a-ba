import styled from "styled-components";
import React from "react";
const Container = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
  justify-content: flex-start;
  width: 400px;
  align-items: center;
  margin-left: 1rem;
`;

const InputFileStyle = styled.input`
  position: absolute;
  z-index: -1;
  display: hidden;
  left: 35px;
  font-size: 17px;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
`;

const LabelStyle = styled.label`
  display: inline-block;
  padding: 12px 18px;
  cursor: pointer;
  border-radius: 5px;
  background-color: var(--second-color);
  font-size: 16px;
  font-weight: bold;
  color: var(--primary-color);
`;

const InputFile = ({ onChange }) => {
  return (
    <Container>
      <LabelStyle htmlFor="file">Escolha um arquivo</LabelStyle>
      <InputFileStyle
        onChange={onChange}
        type="file"
        id="file"
        required
        accept=".xls, .xlsx, .csv"
      />
    </Container>
  );
};

export default InputFile;
