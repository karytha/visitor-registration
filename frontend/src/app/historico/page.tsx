"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet } from '../../services/api';
import styled from 'styled-components';
import MasterContainer from '../../components/master-container/master-container';
import { NAME_LABEL, CPF_LABEL, ROOM_LABEL, ENTRY_DATE_LABEL, EXIT_DATE_LABEL, EMAIL_LABEL, BIRTHDATE_LABEL, VISITOR_HISTORY_TITLE } from '../../constants/constants';

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
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

interface Visitante {
  id: number;
  nome: string;
  cpf: string;
  sala_nome: string;
  data_nascimento?: string;
  email?: string;
  data_entrada: string;
  data_saida?: string;
}

export default function HistoricoPage() {
  const { token, loading } = useAuth();
  const [visitantes, setVisitantes] = useState<Visitante[]>([]);

  const fetchHistorico = async () => {
    const data = await apiGet('/visitantes/historico', token!);
    setVisitantes(data);
  };

  useEffect(() => {
    if (!loading && token) {
      fetchHistorico();
    }
  }, [loading, token]);

  return (
    <MasterContainer>
      <h2>{VISITOR_HISTORY_TITLE}</h2>
      {loading ? <div>Carregando...</div> : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>{NAME_LABEL}</th>
                <th>{CPF_LABEL}</th>
                <th>{ROOM_LABEL}</th>
                <th>{ENTRY_DATE_LABEL}</th>
                <th>{EXIT_DATE_LABEL}</th>
                <th>{EMAIL_LABEL}</th>
                <th>{BIRTHDATE_LABEL}</th>
              </tr>
            </thead>
            <tbody>
              {visitantes.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center' }}>Nenhum registro</td></tr>}
              {visitantes.map((v) => (
                <tr key={v.id}>
                  <td>{v.nome}</td>
                  <td>{v.cpf}</td>
                  <td>{v.sala_nome}</td>
                  <td>{new Date(v.data_entrada).toLocaleString('pt-BR')}</td>
                  <td>{v.data_saida ? new Date(v.data_saida).toLocaleString('pt-BR') : '-'}</td>
                  <td>{v.email || '-'}</td>
                  <td>{v.data_nascimento ? new Date(v.data_nascimento).toLocaleDateString('pt-BR') : '-'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </MasterContainer>
  );
}
