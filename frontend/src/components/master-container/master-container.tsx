import SidebarLayout from '@/components/sidebar/sidebar';
import { MasterContainer as Container } from './master-container-styles';
import ProtectedRoute from '../ProtectedRoute';

const MasterContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <Container>
        <SidebarLayout>
          {children}
        </SidebarLayout>
      </Container>
    </ProtectedRoute>


  );
}

export default MasterContainer