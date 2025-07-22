import styled from 'styled-components';
import Link from 'next/link';
import backgroundLogin from '../../assets/jarvis-background.png';
import { FiLogOut } from 'react-icons/fi';

export const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.nav`
  width: 200px;
  background: rgb(1, 4, 16);
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-right: none;
  align-items: flex-start;
`;

export const SidebarLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive'
}) <{ isActive?: boolean }>`
  padding: 10px 24px;
  color: #00eaff;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  width: 100%;
  transition: background 0.2s;
  background: ${({ isActive }) => isActive ? 'rgb(28, 47, 73)' : 'transparent'};
  color:  '#00eaff';
`;
export const Content = styled.div`
  flex: 1;
  padding: 40px 32px;
  overflow: auto;
  background-image: url(${backgroundLogin.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: rgba(3, 24, 40, 0.8);
  background-blend-mode: overlay;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #00eaff;
`;

export const SairButton = styled.div`
  padding: 6px 16px;
  color: #fff;
`;

export const SairButtonIcon = styled(FiLogOut)`
  color: #00eaff;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1.5rem;
`;