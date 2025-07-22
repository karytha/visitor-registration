"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet, apiPost } from '../../services/api';
import styled from 'styled-components';
import MasterContainer from '../../components/master-container/master-container';
import { useForm, FieldError } from 'react-hook-form';
import { FormInput } from '../../components/form-ui/input';
import { Button } from '../../components/form-ui/button';

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

interface Sala {
  id: number;
  nome: string;
}

export default function SalasPage() {
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
    <MasterContainer>
      <h2>Cadastro de Sala</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <FormInput
          label="Nome da sala"
          placeholder="Nome da sala"
          register={register("nome", { required: "Nome obrigatório" })}
          error={errors.nome as FieldError | undefined}
        />
     
        <Button type="submit" disabled={isSubmitting || loading}>
          {isSubmitting || loading ? 'Salvando...' : 'Cadastrar'}
        </Button>
        </div>
      </Form>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {success && <SuccessMsg>{success}</SuccessMsg>}
      <h3>Salas Cadastradas</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {salas.length === 0 && <tr><td colSpan={2} style={{ textAlign: 'center' }}>Nenhuma sala cadastrada</td></tr>}
          {salas.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MasterContainer>
  );
}
