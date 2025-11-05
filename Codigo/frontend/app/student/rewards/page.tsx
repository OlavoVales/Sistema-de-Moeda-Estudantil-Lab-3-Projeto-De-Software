"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Coins, ArrowLeft, Search, Store, Utensils, Book, Ticket, Loader2 } from "lucide-react"
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  nome: string;
  role: string;
}

interface AlunoData {
  id: number;
  saldo: number;
}

interface Vantagem {
  id: number;
  nome: string;
  descricao: string;
  custoMoedas: number;
  quantidadeDisponivel: number | null;
  nomeEmpresa: string;
}

export default function RewardsClientPage() {
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [alunoSaldo, setAlunoSaldo] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage('');
      const token = localStorage.getItem('authToken');

      if (!token) {
        setErrorMessage("Sessão inválida. Faça login.");
        setIsLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const userEmail = decodedToken.sub;
        const encodedEmail = encodeURIComponent(userEmail);
        const headers = { 'Authorization': `Bearer ${token}` };

        const [alunoResponse, vantagensResponse] = await Promise.all([
          fetch(`http://localhost:8080/api/alunos/by-email/${encodedEmail}`, { headers }),
          fetch(`http://localhost:8080/api/vantagens`, { headers })
        ]);

        if (!alunoResponse.ok) {
          throw new Error(`Falha ao buscar dados do aluno (status: ${alunoResponse.status})`);
        }
        const alunoData: AlunoData = await alunoResponse.json();
        setAlunoSaldo(alunoData.saldo);

        if (!vantagensResponse.ok) {
          throw new Error(`Falha ao buscar vantagens (status: ${vantagensResponse.status})`);
        }
        const vantData: Vantagem[] = await vantagensResponse.json();
        setVantagens(vantData);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        let msg = "Não foi possível carregar os dados. Tente novamente.";
        if (error instanceof Error) msg = error.message;
        setErrorMessage(msg);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleResgatar = (vantagemId: number) => {
    alert(`Funcionalidade de resgate para Vantagem ID ${vantagemId} ainda não implementada.`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Lógica de filtro (a implementar)
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/student/dashboard">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Coins className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">S.G.M.E</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10">
              <Coins className="w-5 h-5 text-accent" />
              <span className="font-bold text-accent">
                {isLoading ? '...' : alunoSaldo.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Catálogo de Vantagens</h1>
          <p className="text-xl text-muted-foreground">Troque suas moedas por descontos e benefícios exclusivos</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Buscar vantagens..." className="pl-10" onChange={handleSearch} />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button variant="default">Todas</Button>
            <Button variant="outline">
              <Utensils className="w-4 h-4 mr-2" />
              Alimentação
            </Button>
            <Button variant="outline">
              <Book className="w-4 h-4 mr-2" />
              Educação
            </Button>
            <Button variant="outline">
              <Store className="w-4 h-4 mr-2" />
              Varejo
            </Button>
            <Button variant="outline">
              <Ticket className="w-4 h-4 mr-2" />
              Lazer
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="text-center p-12 text-muted-foreground col-span-full">
            <Loader2 className="w-12 h-12 animate-spin mx-auto" />
            <p className="mt-4 text-lg">Carregando vantagens...</p>
          </div>
        )}
        
        {errorMessage && (
          <Card className="p-8 text-center bg-destructive/10 border-destructive/30 col-span-full">
            <p className="text-lg font-medium text-destructive">{errorMessage}</p>
          </Card>
        )}

        {!isLoading && !errorMessage && vantagens.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-8">
            Nenhuma vantagem disponível no momento.
          </p>
        )}

        {!isLoading && !errorMessage && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vantagens.map((vantagem) => (
              <Card key={vantagem.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className="aspect-video bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Store className="w-16 h-16 text-white" />
                </div>
                <div className="p-6 space-y-4 flex flex-col flex-1">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-lg leading-tight">{vantagem.nome}</h3>
                      <Badge variant="secondary">{vantagem.nomeEmpresa}</Badge> 
                    </div>
                    <p className="text-sm text-muted-foreground">{vantagem.descricao || "Sem descrição."}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-accent" />
                      <span className="text-2xl font-bold text-accent">
                        {vantagem.custoMoedas.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <Button 
                      onClick={() => handleResgatar(vantagem.id)}
                      disabled={alunoSaldo < vantagem.custoMoedas || vantagem.quantidadeDisponivel === 0}
                    >
                      {vantagem.quantidadeDisponivel === 0 ? "Esgotado" : "Resgatar"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}