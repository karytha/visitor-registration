import { useForm } from 'react-hook-form';
import { apiPost } from '../../../services/api';
import { useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NAME_REQUIRED_NOTIFICATION_LABEL } from '../../../constants/constants';
import { toast } from 'react-toastify';
import { ROOM_REGISTERED_SUCCESS_NOTIFICATION_LABEL } from '../../../constants/constants';

export interface Sala {
    id: number;
    nome: string;
}

export interface UseSalasFormProps {
    setError: (msg: string) => void;
    setSuccess: (msg: string) => void;
    setLoading: (loading: boolean) => void;
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    token: string;
}

const salaSchema = yup.object().shape({
    nome: yup.string().required(NAME_REQUIRED_NOTIFICATION_LABEL),
});

const useSalasForm = ({ setError, setSuccess, setLoading, modalOpen, setModalOpen, token }: UseSalasFormProps) => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: yupResolver(salaSchema)
    });

    const onSubmit = async (data: any) => {
        setError('');
        setLoading(true);
        const res = await apiPost('/salas', { nome: data.nome }, token!);
        setLoading(false);
        if (res.error) {
            setError(res.error);
            toast.error(res.error);
        } else {
            setSuccess(ROOM_REGISTERED_SUCCESS_NOTIFICATION_LABEL);
            toast.success(ROOM_REGISTERED_SUCCESS_NOTIFICATION_LABEL);
            reset();
            queryClient.invalidateQueries({ queryKey: ['salas', token] });
            setModalOpen(false);
        }
    };

    return {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        onSubmit,
        setError,
        setSuccess,
        setLoading,
        modalOpen,
        setModalOpen,
        queryClient,
    };
};

export default useSalasForm; 