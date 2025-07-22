import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet, apiPost } from '../../services/api';
import styled from 'styled-components';
import MasterContainer from '../../components/master-container/master-container';
import { useForm, FieldError } from 'react-hook-form';
import { FormInput } from '../../components/form-ui/input';
import { Button } from '../../components/form-ui/button';
import { ROOM_REGISTRATION_TITLE, NAME_ROOM_LABEL, REGISTERED_ROOMS_TITLE, REGISTER_BUTTON_LABEL, REGISTER_BUTTON_LOADING_LABEL } from '../../constants/constants';
import SalasTable from './salas-table';

const Form = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;
const ErrorMsg = styled.div`
  color: #d33;
  margin-bottom: 12px;
`;
const SuccessMsg = styled.div`
  color: #0a0;
  margin-bottom: 12px;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  th, td {
    border: 1px solid #eaeaea;
    padding: 8px 12px;
    text-align: left;
  }
  th {
    background: #f0f0f0;
  }
  tr:nth-child(even) {
    background: #fafafa;
  }
`;

interface Sala {
    id: number;
    nome: string;
}

const Salas = () => {
    const { token } = useAuth();
    const [salas, setSalas] = useState<Sala[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

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
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FormInput
                        label={NAME_ROOM_LABEL}
                        placeholder={NAME_ROOM_LABEL}
                        register={register("nome", { required: "Nome obrigatório" })}
                        error={errors.nome as FieldError | undefined}
                    />
                    <Button type="submit" disabled={isSubmitting || loading}>
                        {isSubmitting || loading ? REGISTER_BUTTON_LOADING_LABEL : REGISTER_BUTTON_LABEL}
                    </Button>
                </div>
            </Form>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            {success && <SuccessMsg>{success}</SuccessMsg>}
            <h3>{REGISTERED_ROOMS_TITLE}</h3>
            <SalasTable salas={salas} />
        </>
    );
};

export default Salas;
