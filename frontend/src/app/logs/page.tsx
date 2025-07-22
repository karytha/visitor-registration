"use client";
import LogsContainer from '@/components/logs/logs';
import MasterContainer from '@/components/master-container/master-container';
import { LOGS_TITLE } from '@/constants/constants';

export default function LogsPage() {
  return (
    <MasterContainer>
      <h2>{LOGS_TITLE}</h2>
      <LogsContainer />
    </MasterContainer>
  );
}
