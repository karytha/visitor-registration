"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet, apiPost, apiPatch } from '../../services/api';
import styled from 'styled-components';
import MasterContainer from '../../components/master-container/master-container';
import { useForm, FieldError } from 'react-hook-form';
import { FormInput } from '../../components/form-ui/input';
import { FormSelect } from '../../components/form-ui/FormSelect';
import { Button } from '../../components/form-ui/button';
import { VISITOR_REGISTRATION_TITLE, CPF_REQUIRED_NOTIFICATION_LABEL, ROOM_REQUIRED_NOTIFICATION_LABEL, NAME_REQUIRED_NOTIFICATION_LABEL, ACTIVE_VISITORS_TITLE, CPF_LABEL, ROOM_LABEL, ENTRY_DATE_LABEL, EMAIL_LABEL, BIRTHDATE_LABEL, REGISTER_BUTTON_LABEL, REGISTER_BUTTON_LOADING_LABEL } from '../../constants/constants';

const Form = styled.form`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const SaidaButton = styled.button`
  color: #fff;
  background: #d33;
  border: 0;
  border-radius: 4px;
  padding: 4px 12px;
  cursor: pointer;
  &:hover { background: #a00; }
`;

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

export default function VisitantesPage() {

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
      fetchSalas()
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
    <MasterContainer>
      <h2>{VISITOR_REGISTRATION_TITLE}</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Nome"
          placeholder="Nome*"
          register={register("nome", { required: NAME_REQUIRED_NOTIFICATION_LABEL })}
          error={errors.nome as FieldError | undefined}
        />
        <FormInput
          label={CPF_LABEL}
          placeholder="CPF*"
          register={register("cpf", { required: CPF_REQUIRED_NOTIFICATION_LABEL })}
          error={errors.cpf as FieldError | undefined}
        />
        <FormSelect
          label={ROOM_LABEL}
          options={salas.map((s: any) => ({ value: s.id, label: s.nome }))}
          register={register("sala_destino_id", { required: ROOM_REQUIRED_NOTIFICATION_LABEL })}
          error={errors.sala_destino_id as FieldError | undefined}
        />
        <FormInput
          label={BIRTHDATE_LABEL}
          type="date"
          register={register("data_nascimento")}
          error={errors.data_nascimento as FieldError | undefined}
        />
        <FormInput
          label={EMAIL_LABEL}
          type="email"
          register={register("email")}
          error={errors.email as FieldError | undefined}
        />
        <Button type="submit" disabled={isSubmitting || loading}>
          {isSubmitting || loading ? REGISTER_BUTTON_LOADING_LABEL : REGISTER_BUTTON_LABEL}
        </Button>
      </Form>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: 12 }}>{success}</div>}
      <h3>{ACTIVE_VISITORS_TITLE}</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>{CPF_LABEL}</th>
            <th>{ROOM_LABEL}</th>
            <th>{ENTRY_DATE_LABEL}</th>
            <th>{EMAIL_LABEL}</th>
            <th>{BIRTHDATE_LABEL}</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {visitantes.length === 0 && <tr><td colSpan={7} style={{ textAlign: 'center' }}>Nenhum visitante ativo</td></tr>}
          {visitantes.map((v: Visitante) => (
            <tr key={v.id}>
              <td>{v.nome}</td>
              <td>{v.cpf}</td>
              <td>{v.sala_nome}</td>
              <td>{new Date(v.data_entrada).toLocaleString('pt-BR')}</td>
              <td>{v.email || '-'}</td>
              <td>{v.data_nascimento ? new Date(v.data_nascimento).toLocaleDateString('pt-BR') : '-'}</td>
              <td>
                <SaidaButton onClick={() => registrarSaida(v.id)}>Registrar saída</SaidaButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MasterContainer>

  );
}
