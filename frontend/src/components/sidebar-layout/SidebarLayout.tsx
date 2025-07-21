import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;
const Sidebar = styled.nav`
  width: 200px;
  background: #f5f5f5;
  padding: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-right: 1px solid #eaeaea;
  align-items: flex-start;
`;
const SidebarLink = styled(Link)`
  padding: 10px 24px;
  color: #222;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  width: 100%;
  transition: background 0.2s;
  &:hover {
    background: #e6f0fa;
    color: #0070f3;
  }
`;
const Content = styled.div`
  flex: 1;
  padding: 40px 32px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SairButton = styled.button`
  padding: 6px 16px;
  background: #0070f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #005bb5; }
`;

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    return (
        <Layout>
            <Sidebar>
                <SidebarLink href="/visitantes">Visitantes</SidebarLink>
                <SidebarLink href="/historico">Histórico</SidebarLink>
                <SidebarLink href="/salas">Salas</SidebarLink>
                <SidebarLink href="/logs">Logs</SidebarLink>
            </Sidebar>
            <Content>
                <Header>
                    <h2>Bem-vindo, {user?.nome || user?.email}!</h2>
                    <SairButton onClick={logout}>Sair</SairButton>
                </Header>
                <hr style={{ margin: '24px 0' }} />
                {children}
            </Content>
        </Layout>
    );
} 