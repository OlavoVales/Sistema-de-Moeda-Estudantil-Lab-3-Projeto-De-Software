"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Store, Plus, TrendingUp, Users, LogOut, User, ArrowUpRight, Package, Loader2, Coins } from "lucide-react"
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
import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  nome: string;
  role: string;
}

interface Vantagem {
  id: number;
  nome: string;
  descricao: string;
  custoMoedas: number;
  quantidadeDisponivel: number | null;
}

interface VantagemFormDTO {
  nome: string;
  descricao: string;
  custoMoedas: string;
  quantidadeDisponivel: string;
}

export default function CompanyDashboardClient() {
  const [userName, setUserName] = useState<string>('');
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [vantagensLoading, setVantagensLoading] = useState(true);

  const [form, setForm] = useState<VantagemFormDTO>({ nome: '', descricao: '', custoMoedas: '', quantidadeDisponivel: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pageError, setPageError] = useState('');
  
  const fetchVantagens = useCallback(async (token: string) => {
    setVantagensLoading(true);
    try {
      const vantURL = `http://localhost:8080/api/empresas/vantagens`;
      const response = await fetch(vantURL, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data: Vantagem[] = await response.json();
        setVantagens(data);
      } else {
        console.error("Erro ao buscar vantagens:", response.statusText);
        setPageError("Erro ao carregar vantagens.");
      }
    } catch (error) {
      console.error("Erro de rede ao buscar vantagens:", error);
      setPageError("Erro de conexão ao carregar vantagens.");
    } finally {
      setVantagensLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        setUserName(decodedToken.nome);
        fetchVantagens(token);
      } catch (error) {
        console.error("Token inválido:", error);
        setPageError("Sessão inválida.");
        setVantagensLoading(false);
      }
    } else {
      console.warn("Token não encontrado.");
      setPageError("Faça login para continuar.");
      setVantagensLoading(false);
    }
  }, [fetchVantagens]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setForm({ nome: '', descricao: '', custoMoedas: '', quantidadeDisponivel: '' });
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  const handleCadastroVantagem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const token = localStorage.getItem('authToken');
    if (!token) {
      setErrorMessage("Sessão expirada. Faça login novamente.");
      setIsLoading(false);
      return;
    }

    const payload = {
      nome: form.nome,
      descricao: form.descricao,
      custoMoedas: parseFloat(form.custoMoedas),
      quantidadeDisponivel: form.quantidadeDisponivel ? parseInt(form.quantidadeDisponivel, 10) : null
    };

    if (isNaN(payload.custoMoedas) || payload.custoMoedas < 0) {
        setErrorMessage("Custo de moedas inválido.");
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/empresas/vantagens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const novaVantagem: Vantagem = await response.json();
        setSuccessMessage("Vantagem cadastrada com sucesso!");
        setVantagens(prev => [novaVantagem, ...prev]);
        setTimeout(() => {
            setForm({ nome: '', descricao: '', custoMoedas: '', quantidadeDisponivel: '' });
            setIsDialogOpen(false);
            setSuccessMessage('');
        }, 1500);
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText || "Erro ao cadastrar vantagem.");
      }
    } catch (error) {
      console.error("Erro de rede ao cadastrar:", error);
      setErrorMessage("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

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
              <Store className="w-6 h-6 text-primary-foreground" />
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
            <h1 className="text-3xl font-bold">Olá, {userName || 'Empresa'}!</h1>
            <p className="text-muted-foreground">Painel de Empresa Parceira</p>
          </div>
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
        </div>

        {pageError && (
          <Card className="p-4 bg-destructive/10 text-destructive border-destructive/30">
            <p className="text-sm font-medium">{pageError}</p>
          </Card>
        )}

        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Package className="w-8 h-8" />
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-sm opacity-90">Vantagens Ativas</p>
              <p className="text-3xl font-bold">{vantagensLoading ? '...' : vantagens.length}</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-2">
              <Users className="w-8 h-8 text-success" />
              <p className="text-sm text-muted-foreground">Resgates este Mês</p>
              <p className="text-3xl font-bold">127</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-2">
              <TrendingUp className="w-8 h-8 text-accent" />
              <p className="text-sm text-muted-foreground">Total de Resgates</p>
              <p className="text-3xl font-bold">1,543</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-2">
              <Store className="w-8 h-8 text-primary" />
              <p className="text-sm text-muted-foreground">Alunos Alcançados</p>
              <p className="text-3xl font-bold">892</p>
            </div>
          </Card>
        </div>

        <div className="flex justify-end">
          <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Cadastrar Nova Vantagem
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Cadastrar Vantagem</DialogTitle>
                <DialogDescription>Adicione uma nova vantagem para os alunos</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCadastroVantagem} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome da Vantagem *</Label>
                  <Input id="nome" value={form.nome} onChange={handleFormChange} placeholder="Ex: Café Grátis" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea id="descricao" value={form.descricao} onChange={handleFormChange} placeholder="Descreva os detalhes da vantagem..." rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="custoMoedas">Custo em Moedas *</Label>
                    <Input id="custoMoedas" type="number" value={form.custoMoedas} onChange={handleFormChange} placeholder="Ex: 100" min="0" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantidadeDisponivel">Qtd. Disponível</Label>
                    <Input id="quantidadeDisponivel" type="number" value={form.quantidadeDisponivel} onChange={handleFormChange} placeholder="Ex: 50 (branco=ilimitado)" min="0" />
                  </div>
                </div>

                {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
                {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
                
                <DialogFooter className="pt-4">
                   <DialogClose asChild>
                     <Button type="button" variant="outline" disabled={isLoading}>Cancelar</Button>
                   </DialogClose>
                   <Button type="submit" disabled={isLoading}>
                     {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                     Cadastrar Vantagem
                   </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Vantagens Cadastradas</h2>
          
          {vantagensLoading && (
            <div className="text-center p-8 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin mx-auto" />
              <p>Carregando vantagens...</p>
            </div>
          )}
          
          {!vantagensLoading && vantagens.length === 0 && (
             <Card className="p-8 text-center">
              <p className="text-muted-foreground">Nenhuma vantagem cadastrada ainda.</p>
             </Card>
          )}

          {!vantagensLoading && vantagens.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vantagens.map((vantagem) => (
                <Card key={vantagem.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-video bg-gradient-to-br from-primary/80 to-primary/60 flex items-center justify-center">
                    <Store className="w-16 h-16 text-white/90" />
                  </div>
                  <div className="p-6 space-y-4 flex flex-col flex-1">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-lg">{vantagem.nome}</h3>
                        <Badge variant="secondary">
                          {vantagem.quantidadeDisponivel !== null ? `${vantagem.quantidadeDisponivel} rest.` : "Ilimitada"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {vantagem.descricao || "Sem descrição"}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-sm">
                        <p className="text-muted-foreground">Custo</p>
                        <p className="text-xl font-bold text-accent flex items-center gap-1">
                          <Coins className="w-5 h-5" />
                          {vantagem.custoMoedas.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div className="text-sm text-right">
                        <p className="text-muted-foreground">Resgates</p>
                        <p className="text-xl font-bold">0</p>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Editar
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Desativar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Resgates Recentes</h2>
            <Button variant="ghost">
              Ver todos
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <Card className="divide-y divide-border">
            <div className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">JS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">João Silva</p>
                  <p className="text-sm text-muted-foreground">20% de Desconto</p>
                  <p className="text-xs text-muted-foreground mt-1">Cupom: #MC-2024-156</p>
                </div>
              </div>
              <div className="text-right">
                <Badge>Pendente</Badge>
                <p className="text-xs text-muted-foreground mt-1">Há 5 minutos</p>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">AS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Ana Santos</p>
                  <p className="text-sm text-muted-foreground">Combo Lanche + Bebida</p>
                  <p className="text-xs text-muted-foreground mt-1">Cupom: #MC-2024-155</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary">Utilizado</Badge>
                <p className="text-xs text-muted-foreground mt-1">Há 1 hora</p>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">PC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Pedro Costa</p>
                  <p className="text-sm text-muted-foreground">20% de Desconto</p>
                  <p className="text-xs text-muted-foreground mt-1">Cupom: #MC-2024-154</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary">Utilizado</Badge>
                <p className="text-xs text-muted-foreground mt-1">Há 2 horas</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}