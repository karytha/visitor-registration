import { useForm } from 'react-hook-form';
import { apiPost } from '../../../services/api';
import { useQueryClient } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { visitanteSchema } from './visitantes-schema';

export interface Visitante {
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

export interface UseVisitantsFormProps {
    visitantes: Visitante[];
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    token: string;
}


const useVisitantsForm = ({ visitantes, setError, setSuccess, modalOpen, setModalOpen, token }: UseVisitantsFormProps) => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, clearErrors, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: yupResolver(visitanteSchema)
    });

    const onSubmit = async (data: any) => {
        setError('');
        setSuccess('');
        const res = await apiPost('/visitantes', data, token!);
        if (res.error) {
            setError(res.error);
        } else {
            setSuccess('Visitante cadastrado!');
            reset();
            queryClient.invalidateQueries({ queryKey: ['visitantesAtivos', token] });
            setModalOpen(false);
        }
    };
    const handleOpenModal = () => {
        setModalOpen(true);
        setSuccess('');
    };

    return {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors, isSubmitting },
        reset,
        onSubmit,
        visitantes,
        setError,
        setSuccess,
        modalOpen,
        setModalOpen,
        queryClient,
        handleOpenModal
    };
}

export default useVisitantsForm