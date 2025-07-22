import styled from 'styled-components';

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  min-width: 600px;
  border: 1px solid #ddd;
  th, td {
    text-align: left;
    padding: 8px;
    white-space: nowrap;
  }
  th {
    background: #f0f0f0;
  }
  tr:nth-child(even) {
    background: #fafafa;
  }
  @media (max-width: 700px) {
    font-size: 13px;
    min-width: 500px;
    th, td {
      padding: 6px;
    }
  }
  @media (max-width: 500px) {
    font-size: 12px;
    min-width: 400px;
    th, td {
      padding: 4px;
    }
  }
`;