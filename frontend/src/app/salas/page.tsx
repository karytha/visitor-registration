"use client";
import Salas from '@/components/salas/salas';
import MasterContainer from '@/components/master-container/master-container';
import { ROOM_REGISTRATION_TITLE } from '@/constants/constants';

export default function SalasPage() {
  return (
    <MasterContainer>
      <h2>{ROOM_REGISTRATION_TITLE}</h2>
      <Salas />
    </MasterContainer>
  );
}
