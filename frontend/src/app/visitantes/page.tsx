"use client";
import Visitantes from '@/components/visitantes/visitantes';
import MasterContainer from '@/components/master-container/master-container';
import { VISITOR_REGISTRATION_TITLE } from '@/constants/constants';

export default function VisitantesPage() {
  return (<MasterContainer>
    <h2>{VISITOR_REGISTRATION_TITLE}</h2>
    <Visitantes />;
  </MasterContainer>)
}
