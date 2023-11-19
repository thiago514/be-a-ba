import styled from "styled-components";

const ImgEstilizada = styled.img`
  width: 100vw;

  align-self: center;
  justify-self: center;
`;

const DivEstilizada = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
`;
const ErroPage = () => {
  return (
    <DivEstilizada>
      <ImgEstilizada src="https://http.cat/404" alt="Erro 404" />
    </DivEstilizada>
  );
};

export default ErroPage;
