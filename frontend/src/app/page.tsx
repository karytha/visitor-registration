"use client";
import MasterContainer from '@/components/master-container/master-container';
import { useAuth } from '@/contexts/AuthContext';
import { CHOOSE_FUNCTIONALITY } from '../constants/constants';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <MasterContainer>
      <h2>Bem-vindo, {user?.nome || user?.email}!</h2>
      <p>{CHOOSE_FUNCTIONALITY}</p>
    </MasterContainer>
  );
}
