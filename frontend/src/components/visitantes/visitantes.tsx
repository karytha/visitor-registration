import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet, apiPost, apiPatch } from '../../services/api';
import { useForm } from 'react-hook-form';
import { ACTIVE_VISITORS_TITLE } from '../../constants/constants';
import VisitantesForm from './visitantes-form';
import VisitantesTable from './visitantes-table';

interface Sala {
    id: number;
    nome: string;
}

interface Visitante {
    id: number;
    nome: string;
    cpf: string;
    sala_destino_id: number;
    sala_nome: string;
    data_nascimento?: string;
    email?: string;
    data_entrada: string;
    data_saida?: string;
}

const Visitantes = () => {
    const { token, loading } = useAuth();
    const [salas, setSalas] = useState<Sala[]>([]);
    const [visitantes, setVisitantes] = useState<Visitante[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

    const fetchSalas = async () => {
        const data = await apiGet('/salas', token!);
        setSalas(data);
    };
    const fetchVisitantes = async () => {
        const data = await apiGet('/visitantes/ativos', token!);
        setVisitantes(data);
    };

    useEffect(() => {
        if (!loading && token) {
            fetchVisitantes();
            fetchSalas();
        }
    }, [loading, token]);

    const onSubmit = async (data: any) => {
        setError('');
        setSuccess('');
        const res = await apiPost('/visitantes', {
            ...data,
            sala_destino_id: Number(data.sala_destino_id) || undefined,
            data_nascimento: data.data_nascimento || undefined,
            email: data.email || undefined
        }, token!);
        if (res.error) {
            setError(res.error);
        } else {
            setSuccess('Visitante cadastrado!');
            reset();
            fetchVisitantes();
        }
    };

    const registrarSaida = async (id: number) => {
        await apiPatch(`/visitantes/${id}/saida`, {}, token!);
        fetchVisitantes();
    };

    return (

        <>
            <VisitantesForm
                salas={salas}
                onSubmit={handleSubmit(onSubmit)}
                loading={loading}
                isSubmitting={isSubmitting}
                errors={errors}
                register={register}
            />
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: 12 }}>{success}</div>}
            <h3>{ACTIVE_VISITORS_TITLE}</h3>
            <VisitantesTable visitantes={visitantes} registrarSaida={registrarSaida} />
        </>
    );
};

export default Visitantes;
