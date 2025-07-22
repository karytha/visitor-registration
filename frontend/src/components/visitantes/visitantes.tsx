import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet, apiPatch } from '../../services/api';
import { ACTIVE_VISITORS_TITLE, VISITOR_REGISTRATION_TITLE, ADD_NEW_VISITOR_TITLE, VISITOR_REGISTERED_SUCCESS_NOTIFICATION_LABEL, GENERIC_ERROR_NOTIFICATION_LABEL, REGISTER_BUTTON_LABEL, LOADING_VISITORS_LABEL, ERROR_LOADING_VISITORS_LABEL, BACK_BUTTON_LABEL } from '../../constants/constants';
import VisitantesForm from './visitantes-form';
import VisitantesTable from './visitantes-table';
import Modal from '../modal/modal';
import { Button } from '../form-ui/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useVisitantsForm, { Visitante } from './hooks/useVisitantsForm';


const VisitantesContainer = () => {
    const { token, loading } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const salasQuery = useQuery({
        queryKey: ['salas', token],
        queryFn: () => apiGet('/salas', token!),
        enabled: !!token && !loading
    });

    const visitantesQuery = useQuery({
        queryKey: ['visitantesAtivos', token],
        queryFn: () => apiGet('/visitantes/ativos', token!),
        enabled: !!token && !loading
    });

    const { register, handleSubmit, clearErrors, formState: { errors, isSubmitting }, reset, onSubmit, handleOpenModal } = useVisitantsForm({
        visitantes: (visitantesQuery.data as Visitante[]) || [],
        setError,
        setSuccess,
        modalOpen,
        setModalOpen,
        token: token || '',
    });


    const handleRegisterExit = async (id: number) => {
        await apiPatch(`/visitantes/${id}/saida`, {}, token!);
        queryClient.invalidateQueries({ queryKey: ['visitantesAtivos', token] });
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                <Button onClick={handleOpenModal}>
                    {ADD_NEW_VISITOR_TITLE}
                </Button>
            </div>
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{GENERIC_ERROR_NOTIFICATION_LABEL || error}</div>}
            {success && <div style={{ color: 'green', marginBottom: 12 }}>{VISITOR_REGISTERED_SUCCESS_NOTIFICATION_LABEL || success}</div>}
            <h3>{ACTIVE_VISITORS_TITLE}</h3>
            {visitantesQuery.isLoading ? (
                <div>{LOADING_VISITORS_LABEL}</div>
            ) : visitantesQuery.isError ? (
                <div>{ERROR_LOADING_VISITORS_LABEL}</div>
            ) : (
                <VisitantesTable visitantes={visitantesQuery.data || []} registrarSaida={handleRegisterExit} />
            )}
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
                    title={VISITOR_REGISTRATION_TITLE}
                    footer={
                        <>
                            <Button variant="danger" type="button" onClick={() => {
                                setModalOpen(false);
                                reset();
                                clearErrors();
                                setError('');
                                setSuccess('');
                            }}>{BACK_BUTTON_LABEL}</Button>
                            <Button type="submit" onClick={handleSubmit(onSubmit)} form="visitantes-form" disabled={isSubmitting || loading}>{REGISTER_BUTTON_LABEL}</Button>
                        </>
                    }
                >
                    <VisitantesForm
                        salas={salasQuery.data || []}
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
