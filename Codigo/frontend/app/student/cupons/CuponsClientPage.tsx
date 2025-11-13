"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, ArrowLeft, Loader2, Ticket } from "lucide-react"
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

interface Cupom {
  id: number;
  codigoResgate: string;
  dataResgate: string;
  utilizado: boolean;
  nomeVantagem: string;
  imagemUrl: string;
  nomeEmpresa: string;
}

export default function CuponsClientPage() {
  const [cupons, setCupons] = useState<Cupom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [alunoId, setAlunoId] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Meus Cupons - S.G.M.E";

    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage('');
      const token = localStorage.getItem('authToken');

      if (!token) {
        setErrorMessage("Sessão inválida. Faça login.");
        setIsLoading(false);
        return;
      }

      let currentAlunoId: number | null = null;
      let userEmail: string = '';

      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        userEmail = decodedToken.sub;
        
        const encodedEmail = encodeURIComponent(userEmail);
        const alunoResponse = await fetch(`http://localhost:8080/api/alunos/by-email/${encodedEmail}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!alunoResponse.ok) {
          throw new Error(`Falha ao buscar dados do aluno (status: ${alunoResponse.status})`);
        }
        const alunoData: AlunoData = await alunoResponse.json();
        setAlunoId(alunoData.id);
        currentAlunoId = alunoData.id;
        
      } catch (error) {
         console.error("Erro ao buscar dados do aluno:", error);
         setErrorMessage("Erro ao carregar dados do perfil. Tente novamente.");
         setIsLoading(false);
         return;
      }

      if (currentAlunoId) {
        try {
           const cuponsResponse = await fetch(`http://localhost:8080/api/alunos/${currentAlunoId}/cupons`, {
              headers: { 'Authorization': `Bearer ${token}` }
           });
           
           if (!cuponsResponse.ok) {
             throw new Error(`Falha ao buscar cupons (status: ${cuponsResponse.status})`);
           }
           const cuponsData: Cupom[] = await cuponsResponse.json();
           setCupons(cuponsData);

        } catch(error) {
           console.error("Erro ao buscar cupons:", error);
           let msg = "Não foi possível carregar seus cupons. Tente novamente.";
           if (error instanceof Error) msg = error.message;
           setErrorMessage(msg);
        }
      }
      
      setIsLoading(false);
    };

    fetchData();
  }, []);

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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Meus Cupons Resgatados</h1>
          <p className="text-xl text-muted-foreground">Apresente estes códigos no estabelecimento parceiro para validar.</p>
        </div>

        {isLoading && (
          <div className="text-center p-12 text-muted-foreground col-span-full">
            <Loader2 className="w-12 h-12 animate-spin mx-auto" />
            <p className="mt-4 text-lg">Carregando seus cupons...</p>
          </div>
        )}
        
        {errorMessage && (
          <Card className="p-8 text-center bg-destructive/10 border-destructive/30 col-span-full">
            <p className="text-lg font-medium text-destructive">{errorMessage}</p>
          </Card>
        )}

        {!isLoading && !errorMessage && cupons.length === 0 && (
          <Card className="p-12 text-center col-span-full">
            <Ticket className="w-16 h-16 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">Você ainda não tem cupons</h3>
            <p className="text-muted-foreground mt-2">Vá ao catálogo de vantagens para resgatar seu primeiro cupom!</p>
            <Button asChild className="mt-6">
              <Link href="/student/rewards">Ir para o Catálogo</Link>
            </Button>
          </Card>
        )}

        {!isLoading && !errorMessage && cupons.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cupons.map((cupom) => (
              <Card key={cupom.id} className={`overflow-hidden transition-shadow ${cupom.utilizado ? 'opacity-60 bg-secondary/50' : 'hover:shadow-lg'}`}>
                <div className="h-48 w-full bg-gray-200">
                  <img 
                    src={cupom.imagemUrl} 
                    alt={cupom.nomeVantagem} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-6 space-y-4 flex flex-col flex-1">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-lg leading-tight">{cupom.nomeVantagem}</h3>
                      <Badge variant={cupom.utilizado ? "outline" : "default"}>
                        {cupom.utilizado ? "Utilizado" : "Ativo"}
                      </Badge> 
                    </div>
                    <p className="text-sm text-muted-foreground">Resgatado de: {cupom.nomeEmpresa}</p>
                    <p className="text-xs text-muted-foreground">
                      Resgatado em: {new Date(cupom.dataResgate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground text-center">Seu Código de Resgate:</p>
                    <div className={`my-2 p-3 text-center border-2 border-dashed rounded-lg ${cupom.utilizado ? 'border-gray-400' : 'border-primary'}`}>
                      <span className={`text-3xl font-bold tracking-widest ${cupom.utilizado ? 'text-muted-foreground line-through' : 'text-primary'}`}>
                        {cupom.codigoResgate}
                      </span>
                    </div>
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