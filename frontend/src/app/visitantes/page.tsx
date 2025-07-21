"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet, apiPost, apiPatch } from '../../services/api';
import styled from 'styled-components';
import MasterContainer from '../../components/master-container/master-container';

const Form = styled.form`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
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
  const [form, setForm] = useState({ nome: '', cpf: '', sala_destino_id: '', data_nascimento: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await apiPost('/visitantes', {
      ...form,
      sala_destino_id: Number(form.sala_destino_id) || undefined,
      data_nascimento: form.data_nascimento || undefined,
      email: form.email || undefined
    }, token!);
    if (res.error) {
      setError(res.error);
    } else {
      setSuccess('Visitante cadastrado!');
      setForm({ nome: '', cpf: '', sala_destino_id: '', data_nascimento: '', email: '' });
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
      <Form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome*" value={form.nome} onChange={handleChange} required style={{ flex: 2 }} />
        <input name="cpf" placeholder="CPF*" value={form.cpf} onChange={handleChange} required style={{ flex: 1 }} />
        <select name="sala_destino_id" value={form.sala_destino_id} onChange={handleChange} required style={{ flex: 1 }}>
          <option value="">Sala destino*</option>
          {salas.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
        </select>
        <input name="data_nascimento" type="date" placeholder="Data de nascimento" value={form.data_nascimento} onChange={handleChange} style={{ flex: 1 }} />
        <input name="email" type="email" placeholder="E-mail" value={form.email} onChange={handleChange} style={{ flex: 2 }} />
        <button type="submit" disabled={loading} style={{ flex: 1, minWidth: 120 }}>{loading ? 'Salvando...' : 'Cadastrar'}</button>
      </Form>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {success && <SuccessMsg>{success}</SuccessMsg>}
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
