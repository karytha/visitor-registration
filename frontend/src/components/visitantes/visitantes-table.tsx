import { Table } from '../table/table-styles';
import { SaidaButton } from './visitantes-styles';
import { CPF_LABEL, ROOM_LABEL, ENTRY_DATE_LABEL, EMAIL_LABEL, BIRTHDATE_LABEL } from '../../constants/constants';

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

interface VisitantesTableProps {
    visitantes: Visitante[];
    registrarSaida: (id: number) => void;
}

const VisitantesTable: React.FC<VisitantesTableProps> = ({ visitantes, registrarSaida }) => (
    <Table>
        <thead>
            <tr>
                <th>Nome</th>
                <th>{CPF_LABEL}</th>
                <th>{ROOM_LABEL}</th>
                <th>{ENTRY_DATE_LABEL}</th>
                <th>{EMAIL_LABEL}</th>
                <th>{BIRTHDATE_LABEL}</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {visitantes.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center' }}>Nenhum visitante ativo</td></tr>}
            {visitantes.map((v) => (
                <tr key={v.id}>
                    <td>{v.nome}</td>
                    <td>{v.cpf}</td>
                    <td>{v.sala_nome}</td>
                    <td>{new Date(v.data_entrada).toLocaleString('pt-BR')}</td>
                    <td>{v.email || '-'}</td>
                    <td>{v.data_nascimento ? new Date(v.data_nascimento).toLocaleDateString('pt-BR') : '-'}</td>
                    <td>
                        <SaidaButton onClick={() => registrarSaida(v.id)}>Registrar saída</SaidaButton>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default VisitantesTable;
