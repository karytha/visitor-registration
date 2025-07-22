import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet } from '../../services/api';
import MasterContainer from '../../components/master-container/master-container';
import { VISITOR_HISTORY_TITLE } from '../../constants/constants';
import HistoricoTable from './historico-table';

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

const Historico = () => {
    const { token, loading } = useAuth();
    const [visitantes, setVisitantes] = useState<Visitante[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchHistorico = async () => {
        setIsLoading(true);
        const data = await apiGet('/visitantes/historico', token!);
        setVisitantes(data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!loading && token) {
            fetchHistorico();
        }
    }, [loading, token]);

    return (
        <MasterContainer>
            <h2>{VISITOR_HISTORY_TITLE}</h2>
            {isLoading ? <div>Carregando...</div> : (
                <HistoricoTable visitantes={visitantes} />
            )}
        </MasterContainer>
    );
};

export default Historico;
