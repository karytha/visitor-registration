"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiGet, apiPost } from '../../services/api';
import styled from 'styled-components';
import MasterContainer from '../../components/master-container/master-container';

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
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSalas = async () => {
    const data = await apiGet('/salas', token!);
    setSalas(data);
  };

  useEffect(() => {
    if (!loading && token) {
      fetchSalas();
    }
  }, [loading, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const res = await apiPost('/salas', { nome }, token!);
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setSuccess('Sala cadastrada!');
      setNome('');
      fetchSalas();
    }
  };

  return (
    <MasterContainer>
      <h2>Cadastro de Sala</h2>
      <Form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome da sala" value={nome} onChange={e => setNome(e.target.value)} required style={{ flex: 2 }} />
        <button type="submit" disabled={loading} style={{ flex: 1, minWidth: 120 }}>{loading ? 'Salvando...' : 'Cadastrar'}</button>
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
