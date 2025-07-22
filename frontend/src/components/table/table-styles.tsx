import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
background:rgba(0, 0, 0, 0.51);
  th, td {
    border: 1px solid #29d6ff;
    padding: 8px 12px;
    text-align: left;
    color: #00eaff;
  }
  th {
    background:rgba(12, 58, 80, 0.52);
  }
  tr:nth-child(even) {
    background:rgba(12, 58, 80, 0.52);
  }
`; 