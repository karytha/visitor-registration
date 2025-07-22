import { Layout, Sidebar, SidebarLink, Content, Header, SairButton } from './sidebar-styles';
import { useAuth } from '@/contexts/AuthContext';
import { FiUsers, FiClock, FiHome, FiList, FiAirplay } from "react-icons/fi";
import { VISITORS_ROUTE_LABEL, ROOMS_ROUTE_LABEL, HOME_ROUTE_LABEL, LOGS_ROUTE_LABEL, LOGIN_ROUTE_LABEL, HISTORY_ROUTE_LABEL } from '../../constants/constants'


export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    const { logout, pathname } = useAuth();

    const checkIfIsActive = (urlRoute: string) => {
        return `/${urlRoute}` === pathname
    }

    return (
        <Layout>
            <Sidebar>
                <SidebarLink href={`/${HOME_ROUTE_LABEL}`} isActive={checkIfIsActive('')}>
                    <FiAirplay style={{ marginRight: 8 }} />
                    Dashboard
                </SidebarLink>
                <SidebarLink href={`/${VISITORS_ROUTE_LABEL}`} isActive={checkIfIsActive(VISITORS_ROUTE_LABEL)}>
                    <FiUsers style={{ marginRight: 8 }} />
                    Visitantes
                </SidebarLink>
                <SidebarLink href={`/${HISTORY_ROUTE_LABEL}`} isActive={checkIfIsActive(HISTORY_ROUTE_LABEL)}>
                    <FiClock style={{ marginRight: 8 }} />
                    Histórico
                </SidebarLink>
                <SidebarLink href={`/${ROOMS_ROUTE_LABEL}`} isActive={checkIfIsActive(ROOMS_ROUTE_LABEL)}>
                    <FiHome style={{ marginRight: 8 }} />
                    Salas
                </SidebarLink>
                <SidebarLink href={`/${LOGS_ROUTE_LABEL}`} isActive={checkIfIsActive(LOGS_ROUTE_LABEL)}>
                    <FiList style={{ marginRight: 8 }} />
                    Logs
                </SidebarLink>
            </Sidebar>
            <Content>
                <Header style={{ justifyContent: 'end' }}>
                    <SairButton onClick={logout}>Sair</SairButton>
                </Header>
                <hr style={{ margin: '24px 0' }} />
                {children}
            </Content>
        </Layout>
    );
} 