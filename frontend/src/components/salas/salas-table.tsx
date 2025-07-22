import { ROOM_LABEL, ID_LABEL } from '@/constants/constants';
import { Table } from '../table/table-styles';

interface Sala {
    id: number;
    nome: string;
}

interface SalasTableProps {
    salas: Sala[];
}

const SalasTable: React.FC<SalasTableProps> = ({ salas }) => (
    <Table>
        <thead>
            <tr>
                <th>{ID_LABEL}</th>
                <th>{ROOM_LABEL}</th>
            </tr>
        </thead>
        <tbody>
            {salas.length === 0 && <tr><td colSpan={2} style={{ textAlign: 'center' }}>Nenhuma sala cadastrada</td></tr>}
            {salas.map((s) => (
                <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.nome}</td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default SalasTable;


