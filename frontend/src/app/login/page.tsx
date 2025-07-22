"use client";
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import backgroundLogin from '../../assets/jarvis-background.png';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { FormInput } from '../../components/form-ui/input';
import { FieldError } from 'react-hook-form';

const LoginContainer = styled.div`
  min-width: 400px;
  margin: auto;
  padding: 24px;
  border-radius: 8px;
  color: rgb(84, 177, 248);
  background: rgba(3, 24, 40, 0.8); /* azul com transparência */
  backdrop-filter: blur(4px);           /* efeito de blur no fundo */
  box-shadow: 0 2px 8px #0002;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  min-width: 100px;
  padding: 24px;
  border: 1px solid #eee;
  border-radius: 8px;
  height: 100vh;
  background-size: cover;
  background-position: center; 
  background-image: url(${backgroundLogin.src});
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.6); 
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
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
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    setError('');
    const ok = await login(data.email, data.senha);
    if (ok) {
      router.push('/');
    } else {
      setError('E-mail ou senha inválidos');
    }
  };

  return (
    <Container>
      <LoginContainer>
        <h2>Bem-vindo!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Email"
            type="email"
            placeholder="Digite seu email"
            register={register("email", { required: "Email obrigatório" })}
            error={errors.email as FieldError | undefined}
          />
          <FormInput
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            register={register("senha", { required: "Senha obrigatória" })}
            error={errors.senha as FieldError | undefined}
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <LoginButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </LoginButton>
        </form>
      </LoginContainer>
    </Container>
  );
}
