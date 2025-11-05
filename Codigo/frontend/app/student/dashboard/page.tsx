"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Coins, TrendingUp, Store, ArrowUpRight, ArrowDownRight, LogOut, User } from "lucide-react"
import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  nome: string;
  role: string;
}

interface AlunoData {
  id: number;
  cpf: string;
  rg: string | null;
  endereco: string | null;
  instituicao: string | null;
  curso: string | null;
  saldo: number;
}

interface TransacaoAluno {
  id: number;
  tipo: string;
  quantidade: number;
  motivo: string;
  origemDestino: string;
  dataHora: string;
}

export default function StudentDashboard() {
  const [alunoData, setAlunoData] = useState<AlunoData | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [historico, setHistorico] = useState<TransacaoAluno[]>([]);
  const [historicoLoading, setHistoricoLoading] = useState(true);

  const fetchHistoricoAluno = useCallback(async (studId: number, token: string) => {
    setHistoricoLoading(true);
    setErrorMessage('');
    try {
      const histURL = `http://localhost:8080/api/alunos/${studId}/transacoes`;
      console.log('fetchHistoricoAluno: Tentando buscar histórico em:', histURL);

      const histResponse = await fetch(histURL, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('fetchHistoricoAluno: Resposta do fetch (histórico) recebida. Status:', histResponse.status);

      if (histResponse.ok) {
        const histData: TransacaoAluno[] = await histResponse.json();
        setHistorico(histData);
        console.log("fetchHistoricoAluno: Histórico carregado:", histData);
      } else {
        const histErrorText = await histResponse.text();
        console.error(`fetchHistoricoAluno: Erro ${histResponse.status} ao buscar histórico. StatusText: ${histResponse.statusText}. Body: ${histErrorText}`);
        setErrorMessage(prev => prev.includes('histórico') ? prev : (prev ? prev + ' | ' : '') + `Erro ${histResponse.status} ao buscar histórico.`);
      }
    } catch (error) {
      console.error("fetchHistoricoAluno: Erro de rede ao buscar histórico:", error);
      setErrorMessage(prev => prev.includes('histórico') ? prev : (prev ? prev + ' | ' : '') + "Erro de conexão ao buscar histórico.");
    } finally {
        setHistoricoLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setErrorMessage('');
      setHistoricoLoading(true);
      const token = localStorage.getItem('authToken');
      console.log('useEffect: Token lido do localStorage:', token);

      if (token) {
        let currentAlunoId: number | null = null;
        try {
          const decodedToken = jwtDecode<JwtPayload>(token);
          const userEmail = decodedToken.sub;
          setUserName(decodedToken.nome);

          const encodedEmail = encodeURIComponent(userEmail);
          const fetchURL = `http://localhost:8080/api/alunos/by-email/${encodedEmail}`;
          console.log('useEffect: Tentando buscar dados do aluno em:', fetchURL);

          const requestHeaders = {
            'Authorization': `Bearer ${token}`
          };
          console.log('useEffect: Headers a serem enviados:', requestHeaders);

          const alunoResponse = await fetch(fetchURL, {
            headers: requestHeaders
          });

          console.log('useEffect: Resposta do fetch (aluno) recebida. Status:', alunoResponse.status);

          if (alunoResponse.ok) {
            const data: AlunoData = await alunoResponse.json();
            console.log('useEffect: Dados recebidos da API (aluno):', data);

            if (data && typeof data.saldo !== 'undefined') {
                 setAlunoData(data);
                 currentAlunoId = data.id;
                 console.log("useEffect: Dados do Aluno setados no estado.");
                 setErrorMessage('');
                 fetchHistoricoAluno(currentAlunoId, token);
            } else {
                 console.error('useEffect: Dados recebidos da API (aluno) estão incompletos ou inválidos:', data);
                 setErrorMessage('Dados do aluno retornados pela API estão incompletos.');
                 setHistoricoLoading(false);
                 return;
            }

          } else {
            const errorText = await alunoResponse.text();
            console.error(`useEffect: Erro ${alunoResponse.status} ao buscar dados do aluno. StatusText: ${alunoResponse.statusText}. Body: ${errorText}`);
            if (alunoResponse.status === 404) {
                 setErrorMessage(`Erro ${alunoResponse.status}: Perfil de aluno não encontrado para este usuário.`);
            } else if (alunoResponse.status === 403) {
                 setErrorMessage(`Erro ${alunoResponse.status}: Acesso negado. Verifique o token.`);
            } else {
                 setErrorMessage(`Erro ${alunoResponse.status} ao buscar dados do aluno.`);
            }
            setHistoricoLoading(false);
          }
        } catch (error) {
          console.error("useEffect: Erro no try-catch (decodificar token ou fetch):", error);
          if (error instanceof TypeError && error.message === 'Failed to fetch') {
              setErrorMessage("Erro de conexão: Não foi possível conectar ao servidor backend. Verifique se ele está rodando e acessível.");
          } else {
              setErrorMessage("Erro de conexão ou ao processar token.");
          }
          setHistoricoLoading(false);
        }
      } else {
        console.warn("useEffect: Token não encontrado no localStorage.");
        setErrorMessage("Sessão inválida. Faça login novamente.");
        setHistoricoLoading(false);
      }
    };

    fetchData();
  }, [fetchHistoricoAluno]);

  const getInitials = (name: string) => {
    if (!name) return '?';
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Coins className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">S.G.M.E</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <LogOut className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Olá, {userName || 'Aluno'}!</h1>
            <p className="text-muted-foreground">Bem-vindo ao seu painel de estudante</p>
          </div>
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
        </div>

        {errorMessage && (
             <Card className="p-4 bg-destructive/10 text-destructive border-destructive/30">
                 <p className="text-sm font-medium">{errorMessage}</p>
             </Card>
        )}

        <Card className="p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Saldo Disponível</p>
                <div className="flex items-center gap-3 mt-2">
                  <Coins className="w-10 h-10" />
                  <span className="text-5xl font-bold">
                    {alunoData?.saldo !== null && typeof alunoData?.saldo !== 'undefined'
                       ? alunoData.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
                       : '---'}
                  </span>
                </div>
              </div>
              <Button variant="secondary" asChild>
                <Link href="/student/rewards">
                  Ver Vantagens
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-foreground/20">
              <div>
                <p className="text-sm opacity-90">Recebido este mês</p>
                <p className="text-2xl font-bold mt-1">+350</p>
              </div>
              <div>
                <p className="text-sm opacity-90">Gasto este mês</p>
                <p className="text-2xl font-bold mt-1">-200</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/student/rewards">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Store className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold">Catálogo</h3>
                  <p className="text-sm text-muted-foreground">Ver vantagens</p>
                </div>
              </div>
            </Link>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/student/transactions">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">Extrato</h3>
                  <p className="text-sm text-muted-foreground">Ver transações</p>
                </div>
              </div>
            </Link>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Coins className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-bold">Meus Cupons</h3>
                <p className="text-sm text-muted-foreground">Ver resgates</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Transações Recentes</h2>
            <Button variant="ghost" asChild>
              <Link href="/student/transactions">
                Ver todas
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <Card className="divide-y divide-border">
            {historicoLoading && <p className="p-4 text-center text-muted-foreground">Carregando histórico...</p>}
            {!historicoLoading && historico.length === 0 && (
              <p className="p-4 text-center text-muted-foreground">Nenhuma transação registrada ainda.</p>
            )}
            {!historicoLoading && historico.map((transacao) => {
              const isRecebimento = transacao.tipo === 'DISTRIBUICAO';
              
              return (
                <div key={transacao.id} className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isRecebimento ? 'bg-success/10' : 'bg-primary/10'
                    }`}>
                      {isRecebimento ? (
                        <ArrowDownRight className="w-6 h-6 text-success" />
                      ) : (
                        <ArrowUpRight className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {isRecebimento ? `Recebido de ${transacao.origemDestino}` : transacao.origemDestino}
                      </p>
                      <p className="text-sm text-muted-foreground">{transacao.motivo}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(transacao.dataHora).toLocaleString('pt-BR', { 
                          day: '2-digit', 
                          month: '2-digit', 
                          year: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${
                      isRecebimento ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {isRecebimento ? '+' : '-'}{transacao.quantidade}
                    </p>
                    <Badge variant={isRecebimento ? 'secondary' : 'outline'} className="mt-1">
                      {isRecebimento ? 'Recebido' : 'Resgatado'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    </div>
  )
}