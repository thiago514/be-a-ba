import CadastroCard from "../../components/CadastroCard";
import styled from "styled-components";

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

const CadastroPage = (setUser, user) => {
  return (
    <DivFlex>
      <LogoEstilizada src="/img/logo.png" />
      <CadastroCard setUser={setUser} user={user} />
    </DivFlex>
  );
};

export default CadastroPage;
