import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet } from '../../services/api';
import styled from 'styled-components';
import { LOGS_TITLE } from '../../constants/constants';
import LogsTable from './logs-table';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
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

interface Log {
    id: number;
    usuario_id?: number;
    acao: string;
    data: string;
    usuario_nome?: string;
    usuario_email?: string;
}

const LogsContainer = () => {
    const { token, loading } = useAuth();
    const [logs, setLogs] = useState<Log[]>([]);

    const fetchLogs = async () => {
        const data = await apiGet('/logs', token!);
        setLogs(data);
    };

    useEffect(() => {
        if (!loading && token) {
            fetchLogs();
        }
    }, [loading, token]);

    return (
        <>
            {loading ? <div>Carregando...</div> : (
                <LogsTable logs={logs} />
            )}
        </>
    );
};

export default LogsContainer; 