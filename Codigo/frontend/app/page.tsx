import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Coins, GraduationCap, Award, Store, TrendingUp, Users, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Coins className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">MeritCoin</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Recursos
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Como Funciona
            </Link>
            <Link
              href="#partners"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Parceiros
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Cadastrar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Award className="w-4 h-4" />
              Sistema de Reconhecimento Estudantil
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">
              Reconheça o mérito com <span className="text-primary">moedas virtuais</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Professores distribuem moedas para alunos que se destacam. Alunos trocam por vantagens exclusivas em
              empresas parceiras.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/register">Começar Agora</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">Saiba Mais</Link>
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Alunos Ativos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Professores</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">25+</div>
                <div className="text-sm text-muted-foreground">Parceiros</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
            <Card className="relative p-8 space-y-6 bg-card/80 backdrop-blur-sm border-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Saldo Disponível</div>
                  <div className="text-4xl font-bold text-accent flex items-center gap-2">
                    <Coins className="w-8 h-8" />
                    1,250
                  </div>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-accent" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <div className="font-medium">Recebido de Prof. Silva</div>
                      <div className="text-sm text-muted-foreground">Participação em aula</div>
                    </div>
                  </div>
                  <div className="text-success font-bold">+50</div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Store className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Desconto Restaurante</div>
                      <div className="text-sm text-muted-foreground">Resgatado</div>
                    </div>
                  </div>
                  <div className="text-muted-foreground font-bold">-100</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Recursos do Sistema</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma completa para reconhecimento e recompensa do mérito estudantil
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Coins className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Distribuição de Moedas</h3>
              <p className="text-muted-foreground leading-relaxed">
                Professores recebem 1.000 moedas por semestre para reconhecer alunos que se destacam em participação e
                comportamento.
              </p>
            </Card>
            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold">Catálogo de Vantagens</h3>
              <p className="text-muted-foreground leading-relaxed">
                Alunos podem trocar suas moedas por descontos em restaurantes, materiais, mensalidades e muito mais.
              </p>
            </Card>
            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Store className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-bold">Empresas Parceiras</h3>
              <p className="text-muted-foreground leading-relaxed">
                Empresas cadastram vantagens exclusivas e alcançam estudantes engajados da comunidade acadêmica.
              </p>
            </Card>
            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-chart-4/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-chart-4" />
              </div>
              <h3 className="text-xl font-bold">Extrato Completo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Acompanhe todas as transações, recebimentos e resgates com histórico detalhado e transparente.
              </p>
            </Card>
            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-chart-5/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-chart-5" />
              </div>
              <h3 className="text-xl font-bold">Notificações por Email</h3>
              <p className="text-muted-foreground leading-relaxed">
                Receba notificações instantâneas ao ganhar moedas ou resgatar vantagens, com cupons de troca.
              </p>
            </Card>
            <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-xl font-bold">Segurança Total</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sistema de autenticação robusto e códigos únicos para garantir a segurança de todas as transações.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Como Funciona</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Simples, transparente e eficiente</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold">Professores Reconhecem</h3>
              <p className="text-muted-foreground leading-relaxed">
                Professores enviam moedas aos alunos que se destacam, com mensagens de reconhecimento personalizadas.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-bold">Alunos Acumulam</h3>
              <p className="text-muted-foreground leading-relaxed">
                Alunos recebem notificações e acumulam moedas em sua conta, podendo consultar o saldo a qualquer
                momento.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-success">3</span>
              </div>
              <h3 className="text-xl font-bold">Trocam por Vantagens</h3>
              <p className="text-muted-foreground leading-relaxed">
                Alunos escolhem vantagens no catálogo e recebem cupons por email para usar nas empresas parceiras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl font-bold">Pronto para começar?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Junte-se a centenas de alunos, professores e empresas que já fazem parte do MeritCoin
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Cadastrar Agora</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/login">Já tenho conta</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Coins className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold">MeritCoin</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sistema de reconhecimento estudantil através de moeda virtual.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-foreground transition-colors">
                    Como Funciona
                  </Link>
                </li>
                <li>
                  <Link href="#partners" className="hover:text-foreground transition-colors">
                    Parceiros
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Acesso</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/login" className="hover:text-foreground transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-foreground transition-colors">
                    Cadastro
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 MeritCoin. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
