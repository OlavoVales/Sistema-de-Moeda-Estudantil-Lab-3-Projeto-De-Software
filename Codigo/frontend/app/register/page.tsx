import type { Metadata } from 'next';
import RegisterForm from './registerForm';

export const metadata: Metadata = {
  title: 'Criar Conta',
  description: 'Crie sua conta de aluno ou empresa parceira',
};

export default function RegisterPage() {
  return <RegisterForm />;
}