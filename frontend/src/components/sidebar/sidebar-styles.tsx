import styled from 'styled-components';
import Link from 'next/link';

export const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;
export const Sidebar = styled.nav`
  width: 200px;
  background: #f5f5f5;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-right: 1px solid #eaeaea;
  align-items: flex-start;
`;
export const SidebarLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive'
}) <{ isActive?: boolean }>`
  padding: 10px 24px;
  color: #222;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  width: 100%;
  transition: background 0.2s;
  background: ${({ isActive }) => isActive ? '#e6f0fa' : 'transparent'};
  color: ${({ isActive }) => isActive ? '#0070f3' : '#222'};
  &:hover {
    background: #e6f0fa;
    color: #0070f3;
  }
`;
export const Content = styled.div`
  flex: 1;
  padding: 40px 32px;
  overflow: auto;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SairButton = styled.button`
  padding: 6px 16px;
  background: #0070f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #005bb5; }
`;