import { Layout, Sidebar, SidebarLink, Content, Header, SairButton } from './sidebar-styles';
import { useAuth } from '@/contexts/AuthContext';

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