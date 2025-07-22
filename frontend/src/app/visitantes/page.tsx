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
      <h2>Cadastro de Visitante</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Nome"
          placeholder="Nome*"
          register={register("nome", { required: "Nome obrigatório" })}
          error={errors.nome as FieldError | undefined}
        />
        <FormInput
          label="CPF"
          placeholder="CPF*"
          register={register("cpf", { required: "CPF obrigatório" })}
          error={errors.cpf as FieldError | undefined}
        />
        <FormSelect
          label="Sala destino*"
          options={salas.map((s: any) => ({ value: s.id, label: s.nome }))}
          register={register("sala_destino_id", { required: "Sala obrigatória" })}
          error={errors.sala_destino_id as FieldError | undefined}
        />
        <FormInput
          label="Data de nascimento"
          type="date"
          register={register("data_nascimento")}
          error={errors.data_nascimento as FieldError | undefined}
        />
        <FormInput
          label="E-mail"
          type="email"
          register={register("email")}
          error={errors.email as FieldError | undefined}
        />
        <Button type="submit" disabled={isSubmitting || loading} style={{ minWidth: 120 }}>
          {isSubmitting || loading ? 'Salvando...' : 'Cadastrar'}
        </Button>
      </Form>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: 12 }}>{success}</div>}
      <h3>Visitantes Ativos</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Sala</th>
            <th>Data Entrada</th>
            <th>E-mail</th>
            <th>Data Nasc.</th>
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
