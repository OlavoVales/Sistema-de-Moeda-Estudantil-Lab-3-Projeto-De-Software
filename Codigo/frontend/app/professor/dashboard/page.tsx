import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Coins, Send, TrendingUp, Users, LogOut, User, ArrowUpRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ProfessorDashboard() {
  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Coins className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">MeritCoin</span>
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
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Olá, Prof. Maria Silva!</h1>
            <p className="text-muted-foreground">Departamento de Ciência da Computação</p>
          </div>
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">MS</AvatarFallback>
          </Avatar>
        </div>

        {/* Balance and Send Coins */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Balance Card */}
          <Card className="p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="space-y-6">
              <div>
                <p className="text-sm opacity-90">Saldo Disponível</p>
                <div className="flex items-center gap-3 mt-2">
                  <Coins className="w-10 h-10" />
                  <span className="text-5xl font-bold">850</span>
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

          {/* Send Coins Card */}
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
              <Dialog>
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
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-search">Buscar Aluno</Label>
                      <Input id="student-search" placeholder="Digite o nome ou email do aluno" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Quantidade de Moedas</Label>
                      <Input id="amount" type="number" placeholder="Ex: 50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Motivo do Reconhecimento *</Label>
                      <Textarea
                        id="message"
                        placeholder="Descreva o motivo pelo qual o aluno está sendo reconhecido..."
                        rows={4}
                      />
                    </div>
                    <Button className="w-full" size="lg">
                      Confirmar Envio
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </div>

        {/* Stats Cards */}
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

        {/* Recent Transactions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Histórico de Envios</h2>
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
                  <p className="text-sm text-muted-foreground">Excelente participação em aula sobre algoritmos</p>
                  <p className="text-xs text-muted-foreground mt-1">Hoje às 14:30</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-accent">50</p>
                <Badge variant="secondary" className="mt-1">
                  Enviado
                </Badge>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">AS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Ana Santos</p>
                  <p className="text-sm text-muted-foreground">Trabalho excepcional sobre estruturas de dados</p>
                  <p className="text-xs text-muted-foreground mt-1">Ontem às 16:45</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-accent">100</p>
                <Badge variant="secondary" className="mt-1">
                  Enviado
                </Badge>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">PC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Pedro Costa</p>
                  <p className="text-sm text-muted-foreground">Ajudou colegas durante atividade prática</p>
                  <p className="text-xs text-muted-foreground mt-1">2 dias atrás</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-accent">30</p>
                <Badge variant="secondary" className="mt-1">
                  Enviado
                </Badge>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">MO</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Mariana Oliveira</p>
                  <p className="text-sm text-muted-foreground">Apresentação criativa do projeto final</p>
                  <p className="text-xs text-muted-foreground mt-1">3 dias atrás</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-accent">80</p>
                <Badge variant="secondary" className="mt-1">
                  Enviado
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
