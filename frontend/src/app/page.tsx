"use client";
import MasterContainer from '@/components/master-container/master-container';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <MasterContainer>
      <h2>Bem-vindo, {user?.nome || user?.email}!</h2>

      <p>Escolha uma funcionalidade no menu acima.</p>
    </MasterContainer>
  );
}
