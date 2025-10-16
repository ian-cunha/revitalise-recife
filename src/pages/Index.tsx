import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, FileCheck, AlertTriangle, Clock, TrendingUp, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const stats = [
    {
      title: "Imóveis Cadastrados",
      value: "247",
      change: "+12 este mês",
      icon: Building2,
      variant: "primary" as const,
    },
    {
      title: "Documentos Aprovados",
      value: "189",
      change: "+23 esta semana",
      icon: FileCheck,
      variant: "success" as const,
    },
    {
      title: "Pendências Ativas",
      value: "34",
      change: "-5 desde ontem",
      icon: Clock,
      variant: "warning" as const,
    },
    {
      title: "Alertas Críticos",
      value: "8",
      change: "Ação requerida",
      icon: AlertTriangle,
      variant: "destructive" as const,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: "Habite-se aprovado - Edifício São José",
      status: "success",
      time: "há 2 horas",
    },
    {
      id: 2,
      title: "AVCB pendente - Sobrado Rua da Aurora",
      status: "warning",
      time: "há 4 horas",
    },
    {
      id: 3,
      title: "Laudo estrutural enviado - Casarão Boa Vista",
      status: "info",
      time: "há 6 horas",
    },
    {
      id: 4,
      title: "Matrícula atualizada - Imóvel ZEPH Centro",
      status: "success",
      time: "há 8 horas",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="rounded-xl bg-gradient-hero p-8 text-white shadow-elevated">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Revitalise</h1>
            <p className="text-white/80 text-lg">
              Sistema Inteligente de Gestão Documental para Revitalização Urbana
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center h-20 w-20 rounded-full bg-white/10 backdrop-blur">
            <Building2 className="h-10 w-10" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div
                className={`rounded-lg p-2 ${
                  stat.variant === "primary"
                    ? "bg-primary/10 text-primary"
                    : stat.variant === "success"
                    ? "bg-success/10 text-success"
                    : stat.variant === "warning"
                    ? "bg-warning/10 text-warning"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`mt-1 rounded-full p-1 ${
                      activity.status === "success"
                        ? "bg-success/10 text-success"
                        : activity.status === "warning"
                        ? "bg-warning/10 text-warning"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <CheckCircle className="h-3 w-3" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Status Geral</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Taxa de Conformidade</span>
                <span className="font-semibold text-success">76.5%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-success w-[76.5%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Processos em Análise</span>
                <span className="font-semibold text-warning">34</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-warning w-[45%]"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Imóveis ZEPH</span>
                <span className="font-semibold text-primary">52</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-gradient-primary w-[21%]"></div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Badge variant="outline" className="w-full justify-center">
                Última atualização: Hoje, 14:32
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
