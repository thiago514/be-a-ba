import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";

const TableEstilizada = styled.table`
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: var(--primary-color);
  background-color: var(--third-color);
  border-radius: 10px;
  line-height: 2rem;
  thead{
    
  }
  th{
    border: 1px solid var(--primary-color);
    border-top: none;
    
  }
  td {
    border: 1px solid var(--primary-color);
  }
  i {
    font-size: 1.5rem;
  }
  tbody {
    font-weight: 400;
    background-color: var(--second-background);
  }
`;

const DivFlexOverflow = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: scroll;
  overflow-x: scroll;
  justify-content: ${(props) => props.$justifycontent};
  max-width: 100%;
  height: 80vh;
`;

const Table = ({ children }) => {
  return (
    <DivFlexOverflow>
      <TableEstilizada>{children}</TableEstilizada>
    </DivFlexOverflow>
  );
};

export default Table;
