import type { Metadata } from 'next';
import CuponsClientPage from './CuponsClientPage';

export const metadata: Metadata = {
  title: 'Meus Cupons - S.G.M.E',
};

export default function MeusCuponsPage() {
  return <CuponsClientPage />;
}