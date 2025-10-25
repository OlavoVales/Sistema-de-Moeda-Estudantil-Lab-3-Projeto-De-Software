import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, GraduationCap, Briefcase, Users } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-secondary/30">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Coins className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">MeritCoin</span>
          </Link>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-tight text-balance">Bem-vindo de volta ao sistema de mérito</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Acesse sua conta para gerenciar moedas, visualizar transações e aproveitar vantagens exclusivas.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-8">
            <Card className="p-4 text-center space-y-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">1000+</div>
              <div className="text-xs text-muted-foreground">Alunos</div>
            </Card>
            <Card className="p-4 text-center space-y-2">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent">50+</div>
              <div className="text-xs text-muted-foreground">Professores</div>
            </Card>
            <Card className="p-4 text-center space-y-2">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mx-auto">
                <Briefcase className="w-5 h-5 text-success" />
              </div>
              <div className="text-2xl font-bold text-success">25+</div>
              <div className="text-xs text-muted-foreground">Parceiros</div>
            </Card>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="p-8 space-y-6">
          <div className="lg:hidden text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Coins className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MeritCoin</span>
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold">Entrar na sua conta</h2>
            <p className="text-muted-foreground">Selecione o tipo de conta e faça login</p>
          </div>

          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="student">Aluno</TabsTrigger>
              <TabsTrigger value="professor">Professor</TabsTrigger>
              <TabsTrigger value="company">Empresa</TabsTrigger>
            </TabsList>

            <TabsContent value="student" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="student-email">Email</Label>
                <Input id="student-email" type="email" placeholder="seu.email@universidade.edu.br" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="student-password">Senha</Label>
                  <Link href="#" className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input id="student-password" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" size="lg">
                Entrar como Aluno
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Cadastre-se
                </Link>
              </p>
            </TabsContent>

            <TabsContent value="professor" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="professor-email">Email Institucional</Label>
                <Input id="professor-email" type="email" placeholder="professor@universidade.edu.br" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="professor-password">Senha</Label>
                  <Link href="#" className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input id="professor-password" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" size="lg">
                Entrar como Professor
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Professores são pré-cadastrados pela instituição
              </p>
            </TabsContent>

            <TabsContent value="company" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="company-email">Email Corporativo</Label>
                <Input id="company-email" type="email" placeholder="contato@empresa.com.br" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="company-password">Senha</Label>
                  <Link href="#" className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input id="company-password" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" size="lg">
                Entrar como Empresa
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Não é parceiro ainda?{" "}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Torne-se parceiro
                </Link>
              </p>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
