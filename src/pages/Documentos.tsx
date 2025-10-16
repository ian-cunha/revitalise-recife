import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Documentos = () => {
  const documents = [
    { name: "Habite-se", status: "aprovado", etapa: "Aprovação Final" },
    { name: "AVCB", status: "pendente", etapa: "Análise Técnica" },
    { name: "Laudo Estrutural", status: "em_analise", etapa: "Triagem" },
    { name: "Matrícula Atualizada", status: "aprovado", etapa: "Aprovação Final" },
    { name: "Alvará de Funcionamento", status: "irregular", etapa: "Complementação" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aprovado":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pendente":
        return <Clock className="h-4 w-4 text-warning" />;
      case "irregular":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <FileText className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return <Badge className="bg-success/10 text-success border-success/20">Aprovado</Badge>;
      case "pendente":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pendente</Badge>;
      case "irregular":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Irregular</Badge>;
      default:
        return <Badge variant="outline">Em Análise</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Gestão de Documentos</h1>
        <p className="text-muted-foreground">
          Acompanhamento e validação de documentos técnicos obrigatórios
        </p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Documentos em Processo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:shadow-card transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-muted">
                    {getStatusIcon(doc.status)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{doc.name}</h4>
                    <p className="text-xs text-muted-foreground">{doc.etapa}</p>
                  </div>
                </div>
                {getStatusBadge(doc.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documentos;
