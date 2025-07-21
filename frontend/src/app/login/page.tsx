"use client";
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 24px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
`;
const FormGroup = styled.div`
  margin-bottom: 12px;
`;
const ErrorMsg = styled.div`
  color: #d33;
  margin-bottom: 12px;
`;
const LoginButton = styled.button`
  width: 100%;
  background: #0070f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 0;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #005bb5; }
`;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const ok = await login(email, senha);
    setLoading(false);
    if (ok) {
      router.push('/');
    } else {
      setError('E-mail ou senha inválidos');
    }
  };

  return (
    <LoginContainer>
      <h2>Bem-vindo!</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Email<br />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%' }} />
          </label>
        </FormGroup>
        <FormGroup>
          <label>Senha<br />
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required style={{ width: '100%' }} />
          </label>
        </FormGroup>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <LoginButton type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </LoginButton>
      </form>
    </LoginContainer>
  );
}
