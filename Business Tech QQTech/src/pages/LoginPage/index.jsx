import LoginCard from "../../components/LoginCard";
import styled from "styled-components";
import React from "react";

const DivFlex = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  height: 100vh;
`;

const LogoEstilizada = styled.img`
  width: 500px;
  border-radius: 30px;
`;

const LoginPage = ({ setUser, user }) => {
  return (
    <DivFlex height="100vh" $justifycontent="space-around">
      <LogoEstilizada src="/img/logo.png" width={500} $padding="auto" />
      <LoginCard setUser={setUser} user={user} />
    </DivFlex>
  );
};

export default LoginPage;
