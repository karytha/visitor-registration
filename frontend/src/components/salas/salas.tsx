import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet } from '../../services/api';
import { FieldError } from 'react-hook-form';
import { FormInput } from '../../components/form-ui/input';
import { Button } from '../../components/form-ui/button';
import { NAME_ROOM_LABEL, REGISTERED_ROOMS_TITLE, BACK_BUTTON_LABEL, REGISTER_BUTTON_LABEL, REGISTER_BUTTON_LOADING_LABEL, LOADING_ROOMS_LABEL, ERROR_LOADING_ROOMS_LABEL, NEW_ROOM_LABEL, NAME_REQUIRED_NOTIFICATION_LABEL } from '../../constants/constants';
import SalasTable from './salas-table';
import { Form, ErrorMsg, SuccessMsg } from './salas-styles';
import Modal from '../modal/modal';
import { useQuery } from '@tanstack/react-query';
import useSalasForm from './hooks/useSalasForm';

const SalasContainer = () => {
    const { token } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const salasQuery = useQuery({
        queryKey: ['salas', token],
        queryFn: () => apiGet('/salas', token!),
        enabled: !!token
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        onSubmit
    } = useSalasForm({
        setError,
        setSuccess,
        setLoading,
        modalOpen,
        setModalOpen,
        token: token || ''
    });

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                <Button onClick={() => setModalOpen(true)}>
                    {NEW_ROOM_LABEL}
                </Button>
            </div>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            {success && <SuccessMsg>{success}</SuccessMsg>}
            <h3>{REGISTERED_ROOMS_TITLE}</h3>
            {salasQuery.isLoading ? (
                <div>{LOADING_ROOMS_LABEL}</div>
            ) : salasQuery.isError ? (
                <div>{ERROR_LOADING_ROOMS_LABEL}</div>
            ) : (
                <SalasTable salas={salasQuery.data || []} />
            )}
            {modalOpen && (
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={NEW_ROOM_LABEL}
                    footer={
                        <>
                            <Button type="button" variant="danger" onClick={() => setModalOpen(false)}>{BACK_BUTTON_LABEL}</Button>
                            <Button type="submit" form="sala-form" disabled={isSubmitting || loading}>
                                {isSubmitting || loading ? REGISTER_BUTTON_LOADING_LABEL : REGISTER_BUTTON_LABEL}
                            </Button>
                        </>
                    }
                >
                    <Form id="sala-form" onSubmit={handleSubmit(onSubmit)}>
                        <FormInput
                            label={NAME_ROOM_LABEL}
                            placeholder={NAME_ROOM_LABEL}
                            register={register("nome", { required: NAME_REQUIRED_NOTIFICATION_LABEL })}
                            error={errors.nome as FieldError | undefined}
                        />
                    </Form>
                </Modal>
            )}
        </>
    );
};

export default SalasContainer;
