import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Coins, ArrowLeft, Search, Store, Utensils, Book, Ticket } from "lucide-react"

export default function StudentRewardsPage() {
  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
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
              <span className="text-xl font-bold">MeritCoin</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10">
              <Coins className="w-5 h-5 text-accent" />
              <span className="font-bold text-accent">1,250</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Catálogo de Vantagens</h1>
          <p className="text-xl text-muted-foreground">Troque suas moedas por descontos e benefícios exclusivos</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Buscar vantagens..." className="pl-10" />
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

        {/* Rewards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Reward Card 1 */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <Utensils className="w-16 h-16 text-white" />
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-lg leading-tight">20% de Desconto no Restaurante Universitário</h3>
                  <Badge variant="secondary">Alimentação</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Válido para almoço ou jantar de segunda a sexta-feira</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-bold text-accent">100</span>
                </div>
                <Button>Resgatar</Button>
              </div>
            </div>
          </Card>

          {/* Reward Card 2 */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Book className="w-16 h-16 text-white" />
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-lg leading-tight">R$ 50 em Material Didático</h3>
                  <Badge variant="secondary">Educação</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Cupom para compra de livros e materiais na Livraria Campus
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-bold text-accent">150</span>
                </div>
                <Button>Resgatar</Button>
              </div>
            </div>
          </Card>

          {/* Reward Card 3 */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <Store className="w-16 h-16 text-white" />
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-lg leading-tight">15% OFF em Produtos de Tecnologia</h3>
                  <Badge variant="secondary">Varejo</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Desconto em notebooks, tablets e acessórios na TechStore
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-bold text-accent">200</span>
                </div>
                <Button>Resgatar</Button>
              </div>
            </div>
          </Card>

          {/* Reward Card 4 */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <Ticket className="w-16 h-16 text-white" />
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-lg leading-tight">Ingresso de Cinema</h3>
                  <Badge variant="secondary">Lazer</Badge>
                </div>
                <p className="text-sm text-muted-foreground">1 ingresso inteira para qualquer sessão no Cineplex</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-bold text-accent">80</span>
                </div>
                <Button>Resgatar</Button>
              </div>
            </div>
          </Card>

          {/* Reward Card 5 */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
              <Utensils className="w-16 h-16 text-white" />
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-lg leading-tight">Combo Lanche + Bebida</h3>
                  <Badge variant="secondary">Alimentação</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Combo especial na Cantina Central do campus</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-bold text-accent">50</span>
                </div>
                <Button>Resgatar</Button>
              </div>
            </div>
          </Card>

          {/* Reward Card 6 */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <Book className="w-16 h-16 text-white" />
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-lg leading-tight">Desconto de 5% na Mensalidade</h3>
                  <Badge variant="secondary">Educação</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Aplicável na próxima mensalidade do semestre</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-bold text-accent">500</span>
                </div>
                <Button>Resgatar</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
