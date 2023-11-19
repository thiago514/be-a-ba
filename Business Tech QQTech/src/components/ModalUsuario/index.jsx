import styled from "styled-components";
import Modal from "react-modal";
import Input from "../Input";
import { useState } from "react";
import Button from "../Button";
import { editarUsuario } from "../../api/User";
import React from "react";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: "10px",
    transform: "translate(-50%, -50%)",
    background: "var(--second-background)",
  },
};

const DivFlex = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const LabelStyle = styled.label`
  font-size: 28px;
  color: var(--primary-color);
  font-weight: 400;
`;

const SelectEstilizado = styled.select`
  display: flex;
  width: 100%;
  border-radius: 10px;
  border: none;
  padding: 10px;
  margin-block: 10px;
  color: var(--primary-color);
  font-size: 18px;
  text-align: center;
  background-color: var(--background);

  & option {
    font-size: 18px;
    line-height: normal;
    background-color: var(--background);
  }
`;

const H2Estilizado = styled.h2`
  font-size: 40px;
  font-weight: 400;
  text-align: center;
`;

const ModalUsuario = ({ modal, setModal, usuario }) => {
  if (modal) {
    const [email, setEmail] = useState(usuario.email);
    const [matricula, setMatricula] = useState(usuario.matricula);
    const [nome, setNome] = useState(usuario.nome);
    const [tipo, setTipo] = useState(usuario.tipo);

    console.log(usuario);
    return (
      <Modal isOpen={modal} style={customStyles}>
        <H2Estilizado>Editando Usuairo</H2Estilizado>
        <Input
          value={email}
          setValue={setEmail}
          label="Email"
          placeholder="Digite seu email"
          type="text"
        />
        <Input
          value={matricula}
          setValue={setMatricula}
          label="Matricula"
          placeholder="Digite sua matricula"
          type="text"
        />
        <Input
          value={nome}
          setValue={setNome}
          label="Nome Completo"
          placeholder="Digite seu nome"
          type="text"
        />
        <LabelStyle>Tipo</LabelStyle>
        <SelectEstilizado
          value={tipo}
          onChange={(e) => {
            setTipo(e.target.value);
          }}
        >
          <option value="admin">Admin</option>
          <option value="basic">Basic</option>
        </SelectEstilizado>
        <DivFlex>
          <Button
            onClick={async () => {
              setModal(false);
            }}
            color="--background"
          >
            Sair
          </Button>
          <Button
            onClick={() => {
              const id = usuario.id;
              editarUsuario({ id, email, matricula, nome, tipo });
              setModal(false);
            }}
            color="--background"
          >
            Enviar
          </Button>
        </DivFlex>
      </Modal>
    );
  }
};

export default ModalUsuario;
