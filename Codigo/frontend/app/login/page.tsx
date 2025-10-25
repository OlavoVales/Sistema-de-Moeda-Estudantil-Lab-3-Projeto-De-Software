"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, GraduationCap, Briefcase, Users } from "lucide-react"
import { useState } from "react";
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  nome: string;
  role: string;
}

export default function LoginPage() {

  const [studentCreds, setStudentCreds] = useState({ email: '', password: '' });
  const [profCreds, setProfCreds] = useState({ email: '', password: '' });
  const [companyCreds, setCompanyCreds] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleStudentChange = (e) => {
    const { id, value } = e.target;
    setStudentCreds(prev => ({ ...prev, [id === 'student-email' ? 'email' : 'password']: value }));
  };

  const handleProfChange = (e) => {
    const { id, value } = e.target;
    setProfCreds(prev => ({ ...prev, [id === 'professor-email' ? 'email' : 'password']: value }));
  };

  const handleCompanyChange = (e) => {
    const { id, value } = e.target;
    setCompanyCreds(prev => ({ ...prev, [id === 'company-email' ? 'email' : 'password']: value }));
  };

  const handleLogin = async (e, credentials, expectedUserType) => {
    e.preventDefault(); 
    setError(''); 

    if (!credentials.email || !credentials.password) {
      setError('Por favor, preencha o email e a senha.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          senha: credentials.password,
          tipoEsperado: expectedUserType
        })
      });

      if (response.ok) {
        const data = await response.json(); 
        const token = data.token;
        localStorage.setItem('authToken', token); 

        try {
          const decodedToken = jwtDecode<JwtPayload>(token);
          const userRole = decodedToken.role;

          switch (userRole) {
            case 'ALUNO':
              window.location.href = '/student/dashboard';
              break;
            case 'PROFESSOR':
              window.location.href = '/professor/dashboard';
              break;
            case 'EMPRESAPARCEIRA':
              window.location.href = '/company/dashboard';
              break;
            default:
              console.warn("Papel do usuário não reconhecido:", userRole);
              window.location.href = '/app'; 
              break;
          }
        } catch (decodeError) {
          console.error("Erro ao decodificar o token:", decodeError);
          setError("Erro ao processar o login. Tente novamente.");
        }

      } else {
        const errorText = await response.text();
        setError(errorText || 'Email, senha ou tipo de usuário incorretos.'); 
      }
    } catch (err) {
      console.error("Erro ao tentar fazer login:", err);
      setError('Não foi possível conectar ao servidor. Verifique sua conexão ou tente mais tarde.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-secondary/30">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">

        <div className="hidden lg:block space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Coins className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">S.G.M.E</span>
          </Link>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-tight text-balance">Bem-vindo de volta ao sistema de mérito</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Acesse sua conta para gerenciar moedas, visualizar transações e aproveitar vantagens exclusivas.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-8">
            <Card className="p-4 text-center space-y-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">1000+</div>
              <div className="text-xs text-muted-foreground">Alunos</div>
            </Card>
            <Card className="p-4 text-center space-y-2">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent">50+</div>
              <div className="text-xs text-muted-foreground">Professores</div>
            </Card>
            <Card className="p-4 text-center space-y-2">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mx-auto">
                <Briefcase className="w-5 h-5 text-success" />
              </div>
              <div className="text-2xl font-bold text-success">25+</div>
              <div className="text-xs text-muted-foreground">Parceiros</div>
            </Card>
          </div>
        </div>


        <Card className="p-8 space-y-6">
          <div className="lg:hidden text-center">
             <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Coins className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MeritCoin</span>
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold">Entrar na sua conta</h2>
            <p className="text-muted-foreground">Selecione o tipo de conta e faça login</p>
          </div>


          {error && (
            <div className="p-3 text-center bg-destructive/10 text-destructive rounded-md text-sm font-medium">
              {error}
            </div>
          )}

          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="student">Aluno</TabsTrigger>
              <TabsTrigger value="professor">Professor</TabsTrigger>
              <TabsTrigger value="company">Empresa</TabsTrigger>
            </TabsList>


            <TabsContent value="student" className="mt-6">
              <form onSubmit={(e) => handleLogin(e, studentCreds, 'ALUNO')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input 
                    id="student-email" 
                    type="email" 
                    placeholder="seu.email@universidade.edu.br" 
                    value={studentCreds.email}
                    onChange={handleStudentChange}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="student-password">Senha</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input 
                    id="student-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={studentCreds.password}
                    onChange={handleStudentChange}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Entrar como Aluno
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Não tem uma conta?{" "}
                  <Link href="/register" className="text-primary hover:underline font-medium">
                    Cadastre-se
                  </Link>
                </p>
              </form>
            </TabsContent>


            <TabsContent value="professor" className="mt-6">
              <form onSubmit={(e) => handleLogin(e, profCreds, 'PROFESSOR')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="professor-email">Email Institucional</Label>
                  <Input 
                    id="professor-email" 
                    type="email" 
                    placeholder="professor@universidade.edu.br" 
                    value={profCreds.email}
                    onChange={handleProfChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="professor-password">Senha</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input 
                    id="professor-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={profCreds.password}
                    onChange={handleProfChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Entrar como Professor
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Professores são pré-cadastrados pela instituição
                </p>
              </form>
            </TabsContent>


            <TabsContent value="company" className="mt-6">
              <form onSubmit={(e) => handleLogin(e, companyCreds, 'EMPRESAPARCEIRA')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email Corporativo</Label>
                  <Input 
                    id="company-email" 
                    type="email" 
                    placeholder="contato@empresa.com.br" 
                    value={companyCreds.email}
                    onChange={handleCompanyChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="company-password">Senha</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input 
                    id="company-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={companyCreds.password}
                    onChange={handleCompanyChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Entrar como Empresa
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Não é parceiro ainda?{" "}
                  <Link href="/register" className="text-primary hover:underline font-medium">
                    Torne-se parceiro
                  </Link>
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}