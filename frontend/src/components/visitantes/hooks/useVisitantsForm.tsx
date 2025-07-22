import { useForm } from 'react-hook-form';
import { apiPost } from '../../../services/api';
import { useQueryClient } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { visitanteSchema } from './visitantes-schema';
import { toast } from 'react-toastify';
import { VISITOR_REGISTERED_SUCCESS_NOTIFICATION_LABEL } from '../../../constants/constants';

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
        const res = await apiPost('/visitantes', data, token!);
        if (res.error) {
            setError(res.error);
            toast.error(res.error);
        } else {
            toast.success(VISITOR_REGISTERED_SUCCESS_NOTIFICATION_LABEL);
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