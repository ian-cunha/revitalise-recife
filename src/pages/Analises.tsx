import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, AlertCircle } from "lucide-react";

const Analises = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Análises e Relatórios</h1>
        <p className="text-muted-foreground">
          Indicadores e insights sobre o processo de revitalização
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Conformidade por Tipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg">
              <p className="text-muted-foreground">Gráfico em desenvolvimento</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Tempo Médio de Aprovação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-gradient-to-br from-success/5 to-primary/5 rounded-lg">
              <p className="text-muted-foreground">Gráfico em desenvolvimento</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              Erros Mais Frequentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-gradient-to-br from-warning/5 to-accent/5 rounded-lg">
              <p className="text-muted-foreground">Análise em desenvolvimento</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analises;
