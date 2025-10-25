import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Store, Plus, TrendingUp, Users, LogOut, User, ArrowUpRight, Package } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CompanyDashboard() {
  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Store className="w-6 h-6 text-primary-foreground" />
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
            <h1 className="text-3xl font-bold">Restaurante Universitário</h1>
            <p className="text-muted-foreground">Painel de Empresa Parceira</p>
          </div>
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">RU</AvatarFallback>
          </Avatar>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Package className="w-8 h-8" />
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-sm opacity-90">Vantagens Ativas</p>
              <p className="text-3xl font-bold">5</p>
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

        {/* Add Reward Button */}
        <div className="flex justify-end">
          <Dialog>
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
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="reward-name">Nome da Vantagem *</Label>
                  <Input id="reward-name" placeholder="Ex: 20% de Desconto" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reward-description">Descrição *</Label>
                  <Textarea id="reward-description" placeholder="Descreva os detalhes da vantagem..." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reward-cost">Custo em Moedas *</Label>
                  <Input id="reward-cost" type="number" placeholder="Ex: 100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reward-image">Foto do Produto</Label>
                  <Input id="reward-image" type="file" accept="image/*" />
                </div>
                <Button className="w-full" size="lg">
                  Cadastrar Vantagem
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Active Rewards */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Vantagens Cadastradas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <Store className="w-16 h-16 text-white" />
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-lg">20% de Desconto</h3>
                    <Badge variant="secondary">Ativa</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Válido para almoço ou jantar de segunda a sexta-feira</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Custo</p>
                    <p className="text-xl font-bold text-accent">100 moedas</p>
                  </div>
                  <div className="text-sm text-right">
                    <p className="text-muted-foreground">Resgates</p>
                    <p className="text-xl font-bold">45</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Editar
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Desativar
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                <Store className="w-16 h-16 text-white" />
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-lg">Combo Lanche + Bebida</h3>
                    <Badge variant="secondary">Ativa</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Combo especial disponível durante todo o dia</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Custo</p>
                    <p className="text-xl font-bold text-accent">50 moedas</p>
                  </div>
                  <div className="text-sm text-right">
                    <p className="text-muted-foreground">Resgates</p>
                    <p className="text-xl font-bold">82</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Editar
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Desativar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Redemptions */}
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
