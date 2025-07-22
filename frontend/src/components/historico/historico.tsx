import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet } from '../../services/api';
import MasterContainer from '../../components/master-container/master-container';
import { VISITOR_HISTORY_TITLE } from '../../constants/constants';
import HistoricoTable from './historico-table';

const Historico = () => {
    const { token, loading } = useAuth();

    const historicoQuery = useQuery({
        queryKey: ['visitantesHistorico', token],
        queryFn: () => apiGet('/visitantes/historico', token!),
        enabled: !!token && !loading
    });

    return (
        <MasterContainer>
            <h2>{VISITOR_HISTORY_TITLE}</h2>
            {historicoQuery.isLoading ? <div>Carregando...</div> : (
                <HistoricoTable visitantes={historicoQuery.data || []} />
            )}
        </MasterContainer>
    );
};

export default Historico;
