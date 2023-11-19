import styled from "styled-components";
import React from "react";

const LabelStyle = styled.label`
  font-size: ${(props) => props.fontSize}px;
  color: var(--primary-color);
  font-weight: 400;
`;

const InputStyle = styled.input`
  background-color: var(--third-color);
  height: 31px;
  border-radius: 10px;
  border: none;
  padding: 10px;
  text-align: center;
  font-size: ${(props) =>
    props.fontSize >= 24 ? props.fontSize - 6 : props.fontSize - 4}px;
  color: var(--primary-color);

  &::placeholder {
    color: var(--primary-color);
    text-align: center;
  }

  &:focus {
    outline: none;
  }
`;

const DivFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-block: 20px;
`;

const Input = ({
  value,
  setValue,
  label,
  placeholder,
  type = "text",
  fontSize = 28,
  disabled = false,
}) => {
  const onchange = (e) => {
    setValue(e.target.value);
  };

  return (
    <DivFlexColumn>
      <LabelStyle fontSize={fontSize}>{label}</LabelStyle>
      <InputStyle
        value={value}
        onChange={onchange}
        placeholder={placeholder}
        type={type}
        fontSize={fontSize - 4}
        disabled={disabled}
      />
    </DivFlexColumn>
  );
};

export default Input;
