"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet } from '../../services/api';
import MasterContainer from '../../components/master-container/master-container';
import { LOGS_TITLE } from '../../constants/constants';

interface Log {
  id: number;
  usuario_id?: number;
  acao: string;
  data: string;
  usuario_nome?: string;
  usuario_email?: string;
}

export default function LogsPage() {
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
    <MasterContainer>
      <h2>{LOGS_TITLE}</h2>
      {loading ? <div>Carregando...</div> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Ação</th>
              <th>Usuário</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center' }}>Nenhum log</td></tr>}
            {logs.map(log => (
              <tr key={log.id}>
                <td>{new Date(log.data).toLocaleString('pt-BR')}</td>
                <td>{log.acao}</td>
                <td>{log.usuario_nome || '-'}</td>
                <td>{log.usuario_email || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </MasterContainer>
  );
}
