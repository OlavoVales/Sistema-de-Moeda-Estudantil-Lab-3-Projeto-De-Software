import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Coins, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen p-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" />
          Voltar para home
        </Link>

        <Card className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Coins className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">MeritCoin</span>
            </div>
            <h1 className="text-3xl font-bold">Criar nova conta</h1>
            <p className="text-muted-foreground">Escolha o tipo de conta e preencha seus dados</p>
          </div>

          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Aluno</TabsTrigger>
              <TabsTrigger value="company">Empresa Parceira</TabsTrigger>
            </TabsList>

            <TabsContent value="student" className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="student-cpf">CPF *</Label>
                <Input id="student-cpf" placeholder="000.000.000-00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-rg">RG *</Label>
                <Input id="student-rg" placeholder="00.000.000-0" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-address">Endereço Completo *</Label>
                <Input id="student-address" placeholder="Rua, número, bairro, cidade - UF" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-institution">Instituição de Ensino *</Label>
                <Select>
                  <SelectTrigger id="student-institution">
                    <SelectValue placeholder="Selecione a instituição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ufmg">Universidade Federal de Minas Gerais</SelectItem>
                    <SelectItem value="usp">Universidade de São Paulo</SelectItem>
                    <SelectItem value="unicamp">Universidade Estadual de Campinas</SelectItem>
                    <SelectItem value="puc">PUC Minas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-course">Curso *</Label>
                <Input id="student-course" placeholder="Ex: Ciência da Computação" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-email">Email *</Label>
                <Input id="student-email" type="email" placeholder="joao.silva@email.com" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="student-password">Senha *</Label>
                  <Input id="student-password" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-confirm-password">Confirmar Senha *</Label>
                  <Input id="student-confirm-password" type="password" placeholder="••••••••" />
                </div>
              </div>

              <Button className="w-full" size="lg">
                Criar Conta de Aluno
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Faça login
                </Link>
              </p>
            </TabsContent>

            <TabsContent value="company" className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="company-cnpj">CNPJ *</Label>
                <Input id="company-cnpj" placeholder="00.000.000/0000-00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-name">Nome Fantasia *</Label>
                <Input id="company-name" placeholder="Nome da Empresa" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-email">Email *</Label>
                <Input id="company-email" type="email" placeholder="contato@empresa.com.br" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-password">Senha *</Label>
                  <Input id="company-password" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-confirm-password">Confirmar Senha *</Label>
                  <Input id="company-confirm-password" type="password" placeholder="••••••••" />
                </div>
              </div>

              <Button className="w-full" size="lg">
                Criar Conta de Empresa
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Já é parceiro?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Faça login
                </Link>
              </p>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
