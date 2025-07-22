import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet } from '../../services/api';
import LogsTable from './logs-table';


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
  // const [logs, setLogs] = useState<Log[]>([]);

  const logsQuery = useQuery({
    queryKey: ['logs', token],
    queryFn: () => apiGet('/logs', token!),
    enabled: !!token && !loading
  });

  return (
    <>
      {loading || logsQuery.isLoading ? <div>Carregando...</div> : (
        <LogsTable logs={logsQuery.data || []} />
      )}
    </>
  );
};

export default LogsContainer; 