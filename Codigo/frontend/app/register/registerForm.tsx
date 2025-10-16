"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Coins, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function RegisterForm() {
  const [studentData, setStudentData] = useState({
    nome: "",
    cpf: "",
    rg: "",
    endereco: "",
    instituicao: "",
    curso: "",
    email: "",
    senha: "",
  });

  const [companyData, setCompanyData] = useState({
    nome: "",
    cnpj: "",
    nomeFantasia: "",
    email: "",
    senha: "",
  });

  const handleStudentChange = (e) => {
    const { id, value } = e.target;
    let key = id.replace('student-', '');
    
    if (key === 'password') {
      key = 'senha';
    }
    
    setStudentData((prev) => ({ ...prev, [key]: value }));
  };
  
  const handleCompanyChange = (e) => {
    const { id, value } = e.target;
    
    if (id === 'company-contact-name') {
      setCompanyData((prev) => ({ ...prev, nome: value }));
      return;
    }
    if (id === 'company-name') {
      setCompanyData((prev) => ({ ...prev, nomeFantasia: value }));
      return;
    }
    if (id === 'company-password') {
      setCompanyData((prev) => ({ ...prev, senha: value }));
      return;
    }
    const key = id.replace('company-', '');
    setCompanyData((prev) => ({ ...prev, [key]: value }));
  };
  
  const handleStudentSelectChange = (value) => {
    setStudentData((prev) => ({ ...prev, instituicao: value }));
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();

    if (studentData.senha !== e.target['student-confirm-password'].value) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/cadastro/aluno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        alert('Conta de aluno criada com sucesso! Você será redirecionado para o login.');
        window.location.href = '/login';
      } else {
        const error = await response.text();
        alert(`Erro ao criar conta: ${error}`);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      alert("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
    }
  };
  
  const handleCompanySubmit = async (e) => {
    e.preventDefault();

    if (companyData.senha !== e.target['company-confirm-password'].value) {
      alert("As senhas não coincidem!");
      return;
    }

    const payload = {
      nome: companyData.nome,
      email: companyData.email,
      senha: companyData.senha,
      cnpj: companyData.cnpj,
      nomeFantasia: companyData.nomeFantasia
    };

    try {
      const response = await fetch('http://localhost:8080/api/cadastro/empresa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Conta de empresa criada com sucesso! Você será redirecionado para o login.');
        window.location.href = '/login';
      } else {
        const error = await response.text();
        alert(`Erro ao criar conta: ${error}`);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      alert("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
    }
  };

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
                        <span className="text-2xl font-bold">S.G.M.E</span>
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
                        <form onSubmit={handleStudentSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="student-nome">Nome Completo *</Label>
                                <Input id="student-nome" value={studentData.nome} onChange={handleStudentChange} placeholder="Seu nome completo" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="student-cpf">CPF *</Label>
                                <Input id="student-cpf" value={studentData.cpf} onChange={handleStudentChange} placeholder="000.000.000-00" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="student-rg">RG *</Label>
                                <Input id="student-rg" value={studentData.rg} onChange={handleStudentChange} placeholder="00.000.000-0" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="student-endereco">Endereço Completo *</Label>
                                <Input id="student-endereco" value={studentData.endereco} onChange={handleStudentChange} placeholder="Rua, número, bairro, cidade - UF" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="student-instituicao">Instituição de Ensino *</Label>
                                <Select onValueChange={handleStudentSelectChange} required>
                                    <SelectTrigger id="student-instituicao">
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
                                <Label htmlFor="student-curso">Curso *</Label>
                                <Input id="student-curso" value={studentData.curso} onChange={handleStudentChange} placeholder="Ex: Engenharia de Software" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="student-email">Email *</Label>
                                <Input id="student-email" type="email" value={studentData.email} onChange={handleStudentChange} placeholder="seu@email.com" required />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="student-password">Senha *</Label>
                                    <Input id="student-password" type="password" value={studentData.senha} onChange={handleStudentChange} placeholder="••••••••" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="student-confirm-password">Confirmar Senha *</Label>
                                    <Input id="student-confirm-password" type="password" placeholder="••••••••" required />
                                </div>
                            </div>
                            <Button type="submit" className="w-full" size="lg">
                                Criar Conta de Aluno
                            </Button>
                            <p className="text-center text-sm text-muted-foreground">
                                Já tem uma conta?{" "}
                                <Link href="/login" className="text-primary hover:underline font-medium">
                                    Faça login
                                </Link>
                            </p>
                        </form>
                    </TabsContent>

                    <TabsContent value="company" className="space-y-6 mt-6">
                        <form onSubmit={handleCompanySubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="company-contact-name">Nome do Responsável *</Label>
                                <Input id="company-contact-name" value={companyData.nome} onChange={handleCompanyChange} placeholder="Nome do contato principal" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company-cnpj">CNPJ *</Label>
                                <Input id="company-cnpj" value={companyData.cnpj} onChange={handleCompanyChange} placeholder="00.000.000/0000-00" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company-name">Nome Fantasia *</Label>
                                <Input id="company-name" value={companyData.nomeFantasia} onChange={handleCompanyChange} placeholder="Nome da Empresa" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company-email">Email *</Label>
                                <Input id="company-email" type="email" value={companyData.email} onChange={handleCompanyChange} placeholder="contato@empresa.com.br" required />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company-password">Senha *</Label>
                                    <Input id="company-password" type="password" value={companyData.senha} onChange={handleCompanyChange} placeholder="••••••••" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company-confirm-password">Confirmar Senha *</Label>
                                    <Input id="company-confirm-password" type="password" placeholder="••••••••" required />
                                </div>
                            </div>
                            <Button type="submit" className="w-full" size="lg">
                                Criar Conta de Empresa
                            </Button>
                            <p className="text-center text-sm text-muted-foreground">
                                Já é parceiro?{" "}
                                <Link href="/login" className="text-primary hover:underline font-medium">
                                    Faça login
                                </Link>
                            </p>
                        </form>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    </div>
  );
}