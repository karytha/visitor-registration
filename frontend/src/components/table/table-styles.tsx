import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  background: #fff;
  th, td {
    border: 1px solid #eaeaea;
    padding: 8px 12px;
    text-align: left;
  }
  th {
    background: #f0f0f0;
  }
  tr:nth-child(even) {
    background: #fafafa;
  }
`; 