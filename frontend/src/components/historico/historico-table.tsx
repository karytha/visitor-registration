import { Table } from '../table/table-styles';
import { NAME_LABEL, CPF_LABEL, ROOM_LABEL, ENTRY_DATE_LABEL, EXIT_DATE_LABEL, EMAIL_LABEL, BIRTHDATE_LABEL } from '../../constants/constants';

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

interface HistoricoTableProps {
    visitantes: Visitante[];
}

const HistoricoTable: React.FC<HistoricoTableProps> = ({ visitantes }) => (
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
);

export default HistoricoTable;
