import styled from 'styled-components';

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
  background:rgba(12, 58, 80, 0.8);
  border-radius: 12px;
  padding: 0 32px 24px 32px;
  min-width: 380px;
  max-width: 80vw;
  box-shadow: 0 8px 32px #00eaff44;
  border: 1.5px solid #00eaff;
  position: relative;
  display: flex;
  flex-direction: column;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0 16px 0;
  margin-bottom: 16px;
`;
export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: #00eaff;
  letter-spacing: 2px;
  text-align: center;

`;
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #bbb;
  transition: color 0.2s;
  top: 400px;
  justify-content: flex-end;
  magin-top: -10px;
  &:hover { color: #888; }
`;
export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;