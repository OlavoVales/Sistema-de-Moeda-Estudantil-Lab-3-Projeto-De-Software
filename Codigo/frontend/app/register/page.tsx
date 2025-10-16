import type { Metadata } from 'next';
import RegisterForm from './registerForm'; // Importa o novo componente de formulário

// A metadata fica aqui, no Server Component
export const metadata: Metadata = {
  title: 'MeritCoin - Criar Conta',
  description: 'Crie sua conta de aluno ou empresa parceira na plataforma MeritCoin.',
};

// A página agora simplesmente renderiza o formulário
export default function RegisterPage() {
  return <RegisterForm />;
}