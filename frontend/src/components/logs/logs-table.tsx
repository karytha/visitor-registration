import { Table } from '../table/table-styles';
import { LOG_DATE_LABEL, LOG_ACTION_LABEL, LOG_USER_LABEL, LOG_EMAIL_LABEL } from '@/constants/constants';

interface Log {
    id: number;
    usuario_id?: number;
    acao: string;
    data: string;
    usuario_nome?: string;
    usuario_email?: string;
}

interface LogsTableProps {
    logs: Log[];
}



const LogsTable: React.FC<LogsTableProps> = ({ logs }) => (
    <Table>
        <thead>
            <tr>
                <th>{LOG_DATE_LABEL}</th>
                <th>{LOG_ACTION_LABEL}</th>
                <th>{LOG_USER_LABEL}</th>
                <th>{LOG_EMAIL_LABEL}</th>
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
    </Table>
);

export default LogsTable; 