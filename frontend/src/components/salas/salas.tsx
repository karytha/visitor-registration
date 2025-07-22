import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet, apiPost } from '../../services/api';
import { useForm, FieldError } from 'react-hook-form';
import { FormInput } from '../../components/form-ui/input';
import { Button } from '../../components/form-ui/button';
import { NAME_ROOM_LABEL, REGISTERED_ROOMS_TITLE, REGISTER_BUTTON_LABEL, REGISTER_BUTTON_LOADING_LABEL } from '../../constants/constants';
import SalasTable from './salas-table';
import { Form, ErrorMsg, SuccessMsg } from './salas-styles';
import Modal from '../modal/modal';

interface Sala {
    id: number;
    nome: string;
}

const SalasContainer = () => {
    const { token } = useAuth();
    const [salas, setSalas] = useState<Sala[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

    const fetchSalas = async () => {
        const data = await apiGet('/salas', token!);
        setSalas(data);
    };

    useEffect(() => {
        if (!loading && token) {
            fetchSalas();
        }
    }, [loading, token]);

    const onSubmit = async (data: any) => {
        setError('');
        setSuccess('');
        setLoading(true);
        const res = await apiPost('/salas', { nome: data.nome }, token!);
        setLoading(false);
        if (res.error) {
            setError(res.error);
        } else {
            setSuccess('Sala cadastrada!');
            reset();
            fetchSalas();
            setModalOpen(false);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                <Button onClick={() => setModalOpen(true)}>
                    Nova sala
                </Button>
            </div>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            {success && <SuccessMsg>{success}</SuccessMsg>}
            <h3>{REGISTERED_ROOMS_TITLE}</h3>
            <SalasTable salas={salas} />
            {modalOpen && (
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Nova sala"
                    footer={
                        <>
                            <button type="button" onClick={() => setModalOpen(false)} style={{ background: '#d33', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', fontWeight: 500, cursor: 'pointer' }}>Voltar</button>
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
                            register={register("nome", { required: "Nome obrigatório" })}
                            error={errors.nome as FieldError | undefined}
                        />
                    </Form>
                </Modal>
            )}
        </>
    );
};

export default SalasContainer;
