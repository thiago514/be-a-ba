import styled from "styled-components";
import Sair from "../Sair";
import NavAdmUser from "../NavAdmUser";
import NavBasicUser from "../NavBasicUser";
import React from "react";

const HeaderEstilizado = styled.header`
  top: 0;
  left: 0;
  width: 25vw;
  min-height: 100vh;

  background-color: var(--third-color);
  position: fixed;
  padding: 2rem 0 0 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  overflow-x: scroll;

  @media (max-width: 700px) {
    position: relative;
    width: 100vw;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const LogoEstilizada = styled.img`
  width: 200px;
  border-radius: 30px;
  padding: 0 0 2rem 0;

  @media (max-width: 1200px) {
    display: none;
  }

  @media (max-width: 700px) {
    display: block;
    width: 150px;
    padding: 0;
  }

  @media (max-width: 400px) {
    display: none;
  }
`;

const SairSpace = styled.div`
  height: 10vh;
  
`
const Header = ({ user, setUser }) => {
  return (
    <HeaderEstilizado>
      <LogoEstilizada src="img/logo.png" alt="Logo Business Tech"/>
      {user.tipo === "admin" ? <NavAdmUser /> : <NavBasicUser />}
      <Sair setUser={setUser} />
    </HeaderEstilizado>
  );
};

export default Header;
