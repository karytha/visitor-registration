import styled from 'styled-components';
import backgroundLogin from '../../assets/jarvis-background.png';

export const LoginContainer = styled.div`
  min-width: 400px;
  margin: auto;
  padding: 24px;
  border-radius: 8px;
  color: rgb(84, 177, 248);
  background: rgba(3, 24, 40, 0.8); /* azul com transparência */
  backdrop-filter: blur(4px);           /* efeito de blur no fundo */
  box-shadow: 0 2px 8px #0002;
`;

export const Container = styled.div`
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

export const FormGroup = styled.div`
  margin-bottom: 12px;
`;
export const ErrorMsg = styled.div`
  color: #d33;
  margin-bottom: 12px;
`;
export const LoginButton = styled.button`
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
