import styled from "styled-components";
import { useEffect, useState } from "react";
import React from "react";

const InputStyle = styled.input`
  background-color: var(--third-color);
  height: 41px;
  border: none;
  margin: 0;
  max-width: 150px;
  color: var(--primary-color);
  text-align: center;

  &::placeholder {
    color: var(--primary-color);
    text-align: center;
  }
`;

const DivFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-left: 1rem;
  width: 150px;
  flex-wrap: wrap;
  margin: 0;
  padding-inline: 1rem;
  background-color: var(--third-color);
`;

const DivContent = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  min-width: 150px;
  max-width: 150px;
  overflow: hidden;
  border-radius: 10px;
`;

const IAbsolute = styled.i`
  position: absolute;
  left: 0;
  top: 0;
  font-size: 1rem;
  color: var(--primary-color);
  cursor: pointer;
`;

const SelectEstilizado = styled.select`
  background-color: var(--third-color);
  height: 41px;
  color: var(--primary-color);
  width: 150px;
  border: none;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

const InputCampos = ({ deletarInput, setValues, values }) => {
  const id = values.id;
  const [nome, setNome] = useState(values.nome);
  const [permite_nulo, setPermiteNull] = useState(values.permite_nulo);
  const [tipo, setTipo] = useState(values.tipo);

  useEffect(() => {
    setValues({ id, nome, tipo, permite_nulo });
  }, [nome, tipo, permite_nulo]);

  return (
    <DivContent>
      <IAbsolute
        className="bi bi-x-circle-fill"
        onClick={() => deletarInput()}
      ></IAbsolute>
      <InputStyle
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
          // setValues({id, nome, tipo, permite_nulo});
        }}
        type="text"
        placeholder="Nome"
        required
      />
      <DivFlex>
        <InputStyle
          onChange={(e) => {
            console.log("nulo alterado" + e.target.checked);
            setPermiteNull(e.target.checked);
          }}
          type="checkbox"
          placeholder="Tipo"
          id="permiteNulo"
          checked={permite_nulo}
        />
        <label htmlFor="permiteNulo">Nulo</label>
      </DivFlex>
      <SelectEstilizado
        value={tipo}
        onChange={(e) => {
          setTipo(e.target.value);
          // setValues({id, nome, tipo, permite_nulo});
        }}
        required
      >
        <option value="text">Texto</option>
        <option value="int">Número inteiro</option>
        <option value="float">Número real</option>
        <option value="datetime">Data e Hora</option>
        <option value="bool">Verdadeiro ou Falso</option>
      </SelectEstilizado>
    </DivContent>
  );
};

export default InputCampos;
