import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet, apiPost, apiPatch } from '../../services/api';
import { useForm, FieldError } from 'react-hook-form';
import { ACTIVE_VISITORS_TITLE } from '../../constants/constants';
import VisitantesForm from './visitantes-form';
import VisitantesTable from './visitantes-table';
import Modal from '../modal/modal';
import { Button } from '../form-ui/button';

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

const VisitantesContainer = () => {
    const { token, loading } = useAuth();
    const [salas, setSalas] = useState<Sala[]>([]);
    const [visitantes, setVisitantes] = useState<Visitante[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const { register, handleSubmit, clearErrors, formState: { errors, isSubmitting }, reset } = useForm();

    const fetchSalas = async () => {
        const data = await apiGet('/salas', token!);
        setSalas(Array.isArray(data) ? data : []);
    };
    const fetchVisitantes = async () => {
        const data = await apiGet('/visitantes/ativos', token!);
        setVisitantes(Array.isArray(data) ? data : []);
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
        const res = await apiPost('/visitantes', data, token!);
        if (res.error) {
            setError(res.error);
        } else {
            setSuccess('Visitante cadastrado!');
            reset();
            fetchVisitantes();
            setModalOpen(false);
        }
    };
    const registrarSaida = async (id: number) => {
        await apiPatch(`/visitantes/${id}/saida`, {}, token!);
        fetchVisitantes();
    };

    const handleOpenModal = () => {
        setModalOpen(true);
        setSuccess('');
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                <Button onClick={handleOpenModal}>
                    Novo visitante
                </Button>
            </div>
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: 12 }}>{success}</div>}
            <h3>{ACTIVE_VISITORS_TITLE}</h3>
            <VisitantesTable visitantes={visitantes} registrarSaida={registrarSaida} />
            {modalOpen && (
                <Modal
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        reset();
                        clearErrors();
                        setError('');
                        setSuccess('');
                    }}
                    title="Novo visitante"
                    footer={
                        <>
                            <button type="button" onClick={() => {
                                setModalOpen(false);
                                reset();
                                clearErrors();
                                setError('');
                                setSuccess('');
                            }} style={{ background: '#d33', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', fontWeight: 500, cursor: 'pointer' }}>Voltar</button>
                            <button type="submit" onClick={handleSubmit(onSubmit)} form="visitantes-form" style={{ background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', fontWeight: 500, cursor: 'pointer' }} disabled={isSubmitting || loading}>Cadastrar</button>
                        </>
                    }
                >
                    <VisitantesForm
                        salas={salas}
                        onSubmit={handleSubmit(onSubmit)}
                        loading={loading}
                        isSubmitting={isSubmitting}
                        errors={errors}
                        register={register}
                    />
                </Modal>
            )}
        </>
    );
};

export default VisitantesContainer;
