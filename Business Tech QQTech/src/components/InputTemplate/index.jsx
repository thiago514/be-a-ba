import styled from "styled-components";
import React from "react";

const InputTemplate = ({
  value,
  placeholder,
  type = "text",
  label = "",
  name,
  onChange,
  onSelect,
  status,
}) => {
  return (
    <DivFlex>
      <InputStyle
        onChange={onChange}
        onSelect={onSelect}
        className={status}
        value={value}
        placeholder={placeholder}
        name={name}
        type={type}
        required
      />
      <LabelStyle>{label}</LabelStyle>
    </DivFlex>
  );
};

const DivFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0;
`;

const LabelStyle = styled.label`
  font-size: 20px;
  color: var(--primary-color);
  font-weight: 400;
`;

const InputStyle = styled.input`
  background-color: var(--second-color);
  height: 31px;
  border-radius: 10px;
  max-width: 200px;
  border: none;
  padding: 10px;
  font-size: 20px;
  color: var(--primary-color);
  text-align: center;

  &.ativo {
    background-color: var(--third-color) !important;
  }

  &::placeholder {
    color: var(--primary-color);
    text-align: center;
  }

  &:focus {
    outline: none;
  }
`;

export default InputTemplate;
