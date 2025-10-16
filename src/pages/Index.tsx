import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, FileCheck, Clock, TrendingUp, CheckCircle, Plus, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Imóveis Cadastrados",
      value: "247",
      icon: Building2,
      color: "text-primary",
      bg: "bg-primary-light",
    },
    {
      title: "Documentos Aprovados",
      value: "24",
      icon: FileCheck,
      color: "text-success",
      bg: "bg-success-light",
    },
    {
      title: "Em Análise",
      value: "2",
      icon: Clock,
      color: "text-warning",
      bg: "bg-warning-light",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: "Habite-se aprovado - Edifício São José",
      status: "success",
      time: "2h",
    },
    {
      id: 2,
      title: "AVCB pendente - Sobrado Rua da Aurora",
      status: "warning",
      time: "4h",
    },
    {
      id: 3,
      title: "Laudo estrutural enviado - Casarão Boa Vista",
      status: "info",
      time: "6h",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Section - Minimal */}
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Bem-vindo ao Revitalise</h1>
          <p className="text-muted-foreground text-lg mt-2">
            Gerencie documentos de revitalização urbana de forma inteligente
          </p>
        </div>

        <Button
          onClick={() => navigate("/submeter")}
          size="lg"
          className="bg-primary hover:bg-primary/90 gap-2 shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Submeter Novo Documento
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Stats Grid - Minimal Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-2 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                >
                  <div
                    className={`mt-1 rounded-full p-1.5 ${activity.status === "success"
                      ? "bg-success-light text-success"
                      : activity.status === "warning"
                        ? "bg-warning-light text-warning"
                        : "bg-primary-light text-primary"
                      }`}
                  >
                    <CheckCircle className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">há {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg">Resumo do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Taxa de Conformidade</span>
                <span className="font-bold text-success">76.5%</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-success w-[76.5%] transition-all"></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Processos Ativos</span>
                <span className="font-bold text-warning">34</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-warning w-[45%] transition-all"></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Imóveis ZEPH</span>
                <span className="font-bold text-primary">52</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary w-[21%] transition-all"></div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Badge variant="outline" className="w-full justify-center py-2">
                Atualizado agora
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
