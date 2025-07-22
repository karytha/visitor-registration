import styled from 'styled-components';
import backgroundLogin from '../../assets/jarvis-background.png';

export const MasterContainer = styled.div`
  display: contents;
  max-width: 100px;
  margin: 40px auto;
  padding: 24px;
  background: red;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0001;
  max-width: 1000px;
  width: 100%;
  
  p {
    color: #fff;
  }

  @media (max-width: 700px) {
    padding: 12px;
    margin: 16px auto;
    max-width: 100vw;
  }
`;
