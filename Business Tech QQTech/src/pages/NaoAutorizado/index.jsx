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
const NaoAutorizado = () => {
  return (
    <DivEstilizada>
      <ImgEstilizada src="https://http.cat/401" alt="Erro 401" />
    </DivEstilizada>
  );
};

export default NaoAutorizado;
