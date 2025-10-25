import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Coins, TrendingUp, Store, ArrowUpRight, ArrowDownRight, LogOut, User } from "lucide-react"

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
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
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Olá, João Silva!</h1>
            <p className="text-muted-foreground">Bem-vindo ao seu painel de estudante</p>
          </div>
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">JS</AvatarFallback>
          </Avatar>
        </div>

        {/* Balance Card */}
        <Card className="p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Saldo Disponível</p>
                <div className="flex items-center gap-3 mt-2">
                  <Coins className="w-10 h-10" />
                  <span className="text-5xl font-bold">1,250</span>
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

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" asChild>
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
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" asChild>
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

        {/* Recent Transactions */}
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
            <div className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <ArrowDownRight className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="font-medium">Recebido de Prof. Maria Silva</p>
                  <p className="text-sm text-muted-foreground">Excelente participação em aula</p>
                  <p className="text-xs text-muted-foreground mt-1">Hoje às 14:30</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-success">+50</p>
                <Badge variant="secondary" className="mt-1">
                  Recebido
                </Badge>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ArrowUpRight className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Desconto Restaurante Universitário</p>
                  <p className="text-sm text-muted-foreground">Cupom #MC-2024-001</p>
                  <p className="text-xs text-muted-foreground mt-1">Ontem às 12:15</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-muted-foreground">-100</p>
                <Badge variant="outline">Resgatado</Badge>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <ArrowDownRight className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="font-medium">Recebido de Prof. João Santos</p>
                  <p className="text-sm text-muted-foreground">Trabalho excepcional entregue</p>
                  <p className="text-xs text-muted-foreground mt-1">2 dias atrás</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-success">+100</p>
                <Badge variant="secondary">Recebido</Badge>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ArrowUpRight className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Material Didático - Livraria Campus</p>
                  <p className="text-sm text-muted-foreground">Cupom #MC-2024-002</p>
                  <p className="text-xs text-muted-foreground mt-1">3 dias atrás</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-muted-foreground">-150</p>
                <Badge variant="outline">Resgatado</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
