"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Coins, Send, TrendingUp, Users, LogOut, User, ArrowUpRight, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { useState, useEffect, useCallback } from "react"; // Adicionado useCallback
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  nome: string;
  role: string;
}

interface ProfessorData {
  id: number;
  cpf: string;
  departamento: string;
  instituicaoEnsinoId: number;
  saldoMoedas: number;
}

interface Transacao {
  id: number;
  nomeAluno: string;
  motivo: string;
  quantidade: number;
  dataHora: string;
  tipo: string;
}

export default function ProfessorDashboard() {
  const [professorData, setProfessorData] = useState<ProfessorData | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [alunoEmail, setAlunoEmail] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [motivo, setMotivo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [historico, setHistorico] = useState<Transacao[]>([]);
  const [historicoLoading, setHistoricoLoading] = useState(true);

  // --- Função Separada para Buscar Histórico ---
  const fetchHistorico = useCallback(async (profId: number, token: string) => {
    setHistoricoLoading(true);
    try {
      const histURL = `http://localhost:8080/api/professores/${profId}/transacoes`;
      console.log('fetchHistorico: Tentando buscar histórico em:', histURL);

      const histResponse = await fetch(histURL, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('fetchHistorico: Resposta do fetch (histórico) recebida. Status:', histResponse.status);

      if (histResponse.ok) {
        const histData: Transacao[] = await histResponse.json();
        setHistorico(histData);
        console.log("fetchHistorico: Histórico carregado:", histData);
      } else {
        const histErrorText = await histResponse.text();
        console.error(`fetchHistorico: Erro ${histResponse.status} ao buscar histórico. StatusText: ${histResponse.statusText}. Body: ${histErrorText}`);
        setErrorMessage(prev => prev.includes('histórico') ? prev : prev + ` Erro ${histResponse.status} ao buscar histórico.`);
      }
    } catch (error) {
      console.error("fetchHistorico: Erro de rede ao buscar histórico:", error);
      setErrorMessage(prev => prev.includes('histórico') ? prev : prev + " Erro de conexão ao buscar histórico.");
    } finally {
        setHistoricoLoading(false);
    }
  }, []); // useCallback para evitar recriação desnecessária

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      console.log('useEffect: Token lido do localStorage:', token);

      if (token) {
        let currentProfessorId: number | null = null;
        try {
          const decodedToken = jwtDecode<JwtPayload>(token);
          const userEmail = decodedToken.sub;
          setUserName(decodedToken.nome);

          const fetchURL = `http://localhost:8080/api/professores/by-email/${userEmail}`;
          console.log('useEffect: Tentando buscar dados do professor em:', fetchURL);

          const profResponse = await fetch(fetchURL, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          console.log('useEffect: Resposta do fetch (professor) recebida. Status:', profResponse.status);

          if (profResponse.ok) {
            const data: ProfessorData = await profResponse.json();
            console.log('useEffect: Dados recebidos da API (professor):', data);

            if (data && data.departamento && typeof data.saldoMoedas !== 'undefined') {
                 setProfessorData(data);
                 currentProfessorId = data.id;
                 console.log("useEffect: Dados do Professor setados no estado.");
                 setErrorMessage('');
                 // --- Chama fetchHistorico aqui ---
                 fetchHistorico(currentProfessorId, token); 
            } else {
                 console.error('useEffect: Dados recebidos da API (professor) estão incompletos ou inválidos:', data);
                 setErrorMessage('Dados do professor retornados pela API estão incompletos.');
                 setHistoricoLoading(false);
                 return;
            }
          } else {
            const profErrorText = await profResponse.text();
            console.error(`useEffect: Erro ${profResponse.status} ao buscar dados do professor. StatusText: ${profResponse.statusText}. Body: ${profErrorText}`);
            setErrorMessage(`Erro ${profResponse.status} ao buscar dados do professor.`);
            setHistoricoLoading(false);
          }
        } catch (error) {
           console.error("useEffect: Erro no try-catch (decodificar token ou fetch):", error);
           setErrorMessage("Erro de conexão ou ao processar dados.");
           setHistoricoLoading(false);
        }
      } else {
        console.warn("useEffect: Token não encontrado no localStorage.");
        setErrorMessage("Sessão inválida. Faça login novamente.");
        setHistoricoLoading(false);
      }
    };

    fetchData();
  }, [fetchHistorico]); // Adiciona fetchHistorico como dependência do useEffect

  const handleDistributeCoins = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const token = localStorage.getItem('authToken');

    if (!token || !professorData?.id) { // Verifica token e professorId juntos
      setErrorMessage("Erro de autenticação ou professor não identificado. Faça login novamente ou recarregue.");
      setIsLoading(false);
      return;
    }

    const currentProfessorId = professorData.id; // Garante que temos o ID

    const payload = {
      alunoEmail: alunoEmail,
      quantidade: parseInt(quantidade, 10),
      motivo: motivo
    };

    if (isNaN(payload.quantidade) || payload.quantidade <= 0) {
        setErrorMessage("Quantidade inválida. Informe um número positivo.");
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/professores/${currentProfessorId}/distribuir-moedas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSuccessMessage("Moedas enviadas com sucesso!");
        
        // --- REMOVIDA A ATUALIZAÇÃO OTIMISTA ---
        // const novaTransacao: Transacao = { ... };
        // setHistorico(prevHistorico => [novaTransacao, ...prevHistorico]);

        setTimeout(() => {
            setAlunoEmail('');
            setQuantidade('');
            setMotivo('');
            setIsDialogOpen(false);
            setSuccessMessage('');
            // --- CHAMA fetchHistorico para atualizar ---
            fetchHistorico(currentProfessorId, token); 
        }, 1500);
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText || "Erro ao enviar moedas. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro de rede ao enviar moedas:", error);
      setErrorMessage("Erro de conexão. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

   const handleDialogChange = (open) => {
    setIsDialogOpen(open);
    if (!open) {
      setAlunoEmail('');
      setQuantidade('');
      setMotivo('');
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  const getInitials = (name: string) => {
    if (!name || name === 'Buscando...') return '?';
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
            <h1 className="text-3xl font-bold">Olá, {userName || 'Professor'}!</h1>
            <p className="text-muted-foreground">
              Departamento de {professorData?.departamento || 'Carregando...'}
            </p>
          </div>
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
        </div>

        {errorMessage && !isDialogOpen && (
             <Card className="p-4 bg-destructive/10 text-destructive border-destructive/30">
                 <p className="text-sm font-medium">{errorMessage}</p>
             </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
             <div className="space-y-6">
              <div>
                <p className="text-sm opacity-90">Saldo Disponível</p>
                <div className="flex items-center gap-3 mt-2">
                  <Coins className="w-10 h-10" />
                  <span className="text-5xl font-bold">
                    {professorData?.saldoMoedas ?? '---'}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-foreground/20">
                <div>
                  <p className="text-sm opacity-90">Distribuído este semestre</p>
                  <p className="text-2xl font-bold mt-1">1,150</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Total de envios</p>
                  <p className="text-2xl font-bold mt-1">23</p>
                </div>
              </div>
              <p className="text-xs opacity-75 pt-2">
                Você recebe 1.000 moedas por semestre. Saldo acumula se não utilizado.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Send className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Enviar Moedas</h2>
                  <p className="text-sm text-muted-foreground">Reconheça seus alunos</p>
                </div>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full">
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Moedas para Aluno
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Enviar Moedas</DialogTitle>
                    <DialogDescription>Reconheça o mérito de um aluno enviando moedas</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleDistributeCoins} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="alunoEmail">Email do Aluno *</Label>
                      <Input
                        id="alunoEmail"
                        type="email"
                        placeholder="Digite o email do aluno"
                        value={alunoEmail}
                        onChange={(e) => setAlunoEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantidade">Quantidade de Moedas *</Label>
                      <Input
                        id="quantidade"
                        type="number"
                        placeholder="Ex: 50"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        min="1"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motivo">Motivo do Reconhecimento *</Label>
                      <Textarea
                        id="motivo"
                        placeholder="Descreva o motivo pelo qual o aluno está sendo reconhecido..."
                        rows={4}
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        required
                      />
                    </div>
                     {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
                     {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
                    <DialogFooter className="pt-4">
                       <DialogClose asChild>
                         <Button type="button" variant="outline" disabled={isLoading}>Cancelar</Button>
                       </DialogClose>
                       <Button type="submit" disabled={isLoading}>
                         {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                         Confirmar Envio
                       </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alunos Reconhecidos</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Média por Envio</p>
                <p className="text-2xl font-bold">50</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Coins className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Próxima Recarga</p>
                <p className="text-2xl font-bold">45d</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Histórico de Envios</h2>
            <Button variant="ghost">
              Ver todos
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <Card className="divide-y divide-border">
            {historicoLoading && <p className="p-4 text-center text-muted-foreground">Carregando histórico...</p>}
            {!historicoLoading && historico.length === 0 && (
              <p className="p-4 text-center text-muted-foreground">Nenhum envio realizado ainda.</p>
            )}
            {!historicoLoading && historico.map((transacao) => (
              <div key={transacao.id} className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(transacao.nomeAluno)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{transacao.nomeAluno}</p>
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
                  <p className="text-xl font-bold text-accent">{transacao.quantidade}</p>
                  <Badge variant="secondary" className="mt-1">
                    Enviado
                  </Badge>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}