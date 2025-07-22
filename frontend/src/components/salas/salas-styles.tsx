import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;
export const ErrorMsg = styled.div`
  color: #d33;
  margin-bottom: 12px;
`;
export const SuccessMsg = styled.div`
  color: #0a0;
  margin-bottom: 12px;
`;
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
export const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 0 32px 24px 32px;
  min-width: 380px;
  max-width: 95vw;
  box-shadow: 0 8px 32px #0004;
  position: relative;
  display: flex;
  flex-direction: column;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0 16px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 16px;
`;
export const ModalTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  color: #222;
`;
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #bbb;
  transition: color 0.2s;
  &:hover { color: #888; }
`;
export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;
export const OpenModalButton = styled.button`
  background: #0070f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 16px;
  float: right;
  transition: background 0.2s;
  &:hover { background: #005bb5; }
`;
export const ModalButton = styled.button<{ variant?: 'primary' | 'danger' }>`
  padding: 8px 20px;
  border-radius: 4px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  color: #fff;
  background: ${({ variant }) =>
        variant === 'danger' ? '#d33' : '#0070f3'};
  &:hover {
    background: ${({ variant }) =>
        variant === 'danger' ? '#a00' : '#005bb5'};
  }
  &:disabled {
    background: #ccc;
    color: #888;
    cursor: not-allowed;
  }
`;
export const ModalInput = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: 2px solid #0070f3;
    border-color: #0070f3;
  }
`; 