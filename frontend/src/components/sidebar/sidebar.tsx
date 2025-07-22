import { Layout, Sidebar, SidebarLink, Content, Header, SairButton } from './sidebar-styles';
import { useAuth } from '@/contexts/AuthContext';
import { FiUsers, FiClock, FiHome, FiList, FiAirplay } from "react-icons/fi";
import { VISITORS_ROUTE_LABEL, ROOMS_ROUTE_LABEL, HOME_ROUTE_LABEL, LOGS_ROUTE_LABEL, LOGIN_ROUTE_LABEL, HISTORY_ROUTE_LABEL, HOME_LABEL, VISITORS_LABEL, HISTORY_LABEL, ROOMS_LABEL, LOGS_LABEL, LOGOUT_LABEL } from '../../constants/constants'

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
    const { logout, pathname } = useAuth();

    const checkIfIsActive = (urlRoute: string) => {
        return `/${urlRoute}` === pathname
    }

    return (
        <Layout>
            <Sidebar>
                <SidebarLink href={`/${HOME_ROUTE_LABEL}`} isActive={checkIfIsActive(HOME_ROUTE_LABEL)}>
                    <FiAirplay style={{ marginRight: 8 }} />
                    {HOME_LABEL}
                </SidebarLink>
                <SidebarLink href={`/${VISITORS_ROUTE_LABEL}`} isActive={checkIfIsActive(VISITORS_ROUTE_LABEL)}>
                    <FiUsers style={{ marginRight: 8 }} />
                    {VISITORS_LABEL}
                </SidebarLink>
                <SidebarLink href={`/${HISTORY_ROUTE_LABEL}`} isActive={checkIfIsActive(HISTORY_ROUTE_LABEL)}>
                    <FiClock style={{ marginRight: 8 }} />
                    {HISTORY_LABEL}
                </SidebarLink>
                <SidebarLink href={`/${ROOMS_ROUTE_LABEL}`} isActive={checkIfIsActive(ROOMS_ROUTE_LABEL)}>
                    <FiHome style={{ marginRight: 8 }} />
                    {ROOMS_LABEL}
                </SidebarLink>
                <SidebarLink href={`/${LOGS_ROUTE_LABEL}`} isActive={checkIfIsActive(LOGS_ROUTE_LABEL)}>
                    <FiList style={{ marginRight: 8 }} />
                    {LOGS_LABEL}
                </SidebarLink>
            </Sidebar>
            <Content>
                <Header style={{ justifyContent: 'end' }}>
                    <SairButton onClick={logout}>{LOGOUT_LABEL}</SairButton>
                </Header>
                <hr style={{ margin: '24px 0' }} />
                {children}
            </Content>
        </Layout>
    );
} 