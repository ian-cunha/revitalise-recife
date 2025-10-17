import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  FileCheck,
  Clock,
  ArrowRight,
  Plus,
  TrendingUp,
  FileUp,
  CheckCircle,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import db from "@/data/db.json";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';


const Index = () => {
  const navigate = useNavigate();
  const { stats, submissions, documents } = db;

  // Contagem dinâmica dos documentos aprovados e em análise
  const approvedDocsCount = documents.filter(doc => doc.status === 'aprovado').length;
  const inAnalysisCount = submissions.filter(sub => sub.status === 'em_analise').length;

  const dynamicStats = stats.map(stat => {
    if (stat.title === "Documentos Aprovados") {
      return { ...stat, value: approvedDocsCount.toString() };
    }
    if (stat.title === "Em Análise") {
      return { ...stat, value: inAnalysisCount.toString() };
    }
    return stat;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aprovado":
        return <FileCheck className="h-4 w-4 text-success" />;
      case "em_analise":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <TrendingUp className="h-4 w-4 text-primary" />;
    }
  };

  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case "Building2":
        return <Building2 className={className} />;
      case "FileCheck":
        return <FileCheck className={className} />;
      case "Clock":
        return <Clock className={className} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <Card className="shadow-lg border-2 border-primary/10 bg-gradient-to-br from-primary-light via-white to-white">
        <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Bem-vindo de volta!</h1>
            <p className="text-muted-foreground text-lg">
              O próximo passo na revitalização de forma ágil sem erros.
            </p>
          </div>
          <Button
            onClick={() => navigate("/submeter")}
            size="lg"
            className="bg-primary hover:bg-primary/90 gap-2 shadow-lg transform hover:scale-105 transition-transform"
          >
            <Plus className="h-5 w-5" />
            Nova Submissão
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {dynamicStats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-xl transition-shadow border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  {getIcon(stat.icon, `h-5 w-5 ${stat.color}`)}
                </div>
              </div>
              <p className="text-4xl font-bold mt-2">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent Activity */}
        <Card className="lg:col-span-3 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {submissions.slice(0, 3).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-4 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`mt-1 rounded-full p-1.5 ${activity.status === "aprovado"
                      ? "bg-success-light text-success"
                      : activity.status === "em_analise"
                        ? "bg-warning-light text-warning"
                        : "bg-destructive-light text-destructive"
                      }`}
                  >
                    <CheckCircle className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.property} - Status: {activity.status.replace("_", " ")}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(activity.date), { addSuffix: true, locale: ptBR })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Guide */}
        <Card className="lg:col-span-2 border-2">
          <CardHeader>
            <CardTitle className="text-lg">Guia Rápido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FileUp className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">1. Submeta os Documentos</p>
                <p className="text-xs text-muted-foreground">
                  Preencha as informações e anexe os arquivos necessários.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">2. Acompanhe o Status</p>
                <p className="text-xs text-muted-foreground">
                  Verifique o andamento da sua submissão na aba "Submissões".
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">3. Receba a Aprovação</p>
                <p className="text-xs text-muted-foreground">
                  Seu imóvel será aprovado após a análise de todos os documentos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">4. Ganhe Pontos</p>
                <p className="text-xs text-muted-foreground">
                  Acumule pontos e conquistas a cada etapa concluída.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;