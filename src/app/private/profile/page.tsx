"use client";

// Importando React e hooks
import { useEffect, useState } from "react";

// Importando serviços
import { getUserProfile } from "@/services/profile/profile";
import { Logout } from "@/services/auth";
import { ROUTES } from "@/config/routes";

// Importando componentes
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Calendar, Award, Edit } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await Logout();
      window.location.href = ROUTES.public.signIn;
    } catch (error) {
      alert("Erro ao fazer logout. Tente novamente.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!user) {
    window.location.href = ROUTES.public.signIn;
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header com Avatar */}
        <Card className="mb-8">
          <CardContent className="pt-8">
            <div className="flex flex-col items-center text-center mb-8">
              <Avatar className="w-32 h-32 mb-4 ring-4 ring-primary/20">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face"
                  alt="Foto do Corretor"
                />
                <AvatarFallback className="text-2xl">MC</AvatarFallback>
              </Avatar>

              <h1 className="text-3xl font-bold text-foreground mb-2">
                {user.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Corretora de Imóveis Especialista
              </p>

              <div className="flex gap-2 mb-6">
                <Badge variant="secondary" className="px-3 py-1">
                  <Award className="w-4 h-4 mr-2" />
                  CRECI: 12345-SP
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  5 anos de experiência
                </Badge>
              </div>

              <Button variant="hero" className="gap-2">
                <Edit className="w-4 h-4" />
                Editar Perfil
              </Button>

              <Button variant="hero" className="gap-2">
                <Edit className="w-4 h-4" />
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Informações de Contato */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Informações de Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Telefone</p>
                  <p className="text-muted-foreground">(11) 99999-9999</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Região de Atuação</p>
                  <p className="text-muted-foreground">São Paulo - SP</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Profissionais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Informações Profissionais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Data de Cadastro</p>
                  <p className="text-muted-foreground">15 de Janeiro, 2020</p>
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">Especialidades</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Residencial</Badge>
                  <Badge variant="secondary">Comercial</Badge>
                  <Badge variant="secondary">Luxury</Badge>
                  <Badge variant="secondary">Investimentos</Badge>
                </div>
              </div>

              <div>
                <p className="font-medium">Imobiliária</p>
                <p className="text-muted-foreground">Imóveis Premium Ltda</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Estatísticas de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">142</p>
                <p className="text-muted-foreground">Imóveis Vendidos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">95%</p>
                <p className="text-muted-foreground">Taxa de Satisfação</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">38</p>
                <p className="text-muted-foreground">Imóveis Ativos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">R$ 25M</p>
                <p className="text-muted-foreground">Volume de Vendas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
