import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Auditoria = () => {
  const logs = [
    {
      id: 1,
      action: "Documento aprovado",
      user: "Ana Silva (Analista)",
      timestamp: "2025-10-16 14:30:15",
      type: "success",
    },
    {
      id: 2,
      action: "Documento enviado para complementação",
      user: "João Santos (Técnico)",
      timestamp: "2025-10-16 13:45:22",
      type: "warning",
    },
    {
      id: 3,
      action: "Novo imóvel cadastrado",
      user: "Maria Costa (Admin)",
      timestamp: "2025-10-16 12:15:08",
      type: "info",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Prova do Processo</h1>
        <p className="text-muted-foreground">
          Rastreabilidade completa e auditabilidade de todas as operações
        </p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Log de Auditoria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-border hover:shadow-card transition-all"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm">{log.action}</h4>
                    <Badge
                      variant="outline"
                      className={
                        log.type === "success"
                          ? "bg-success/10 text-success"
                          : log.type === "warning"
                            ? "bg-warning/10 text-warning"
                            : "bg-primary/10 text-primary"
                      }
                    >
                      {log.type === "success"
                        ? "Sucesso"
                        : log.type === "warning"
                          ? "Em análise"
                          : "Cadastrado"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{log.user}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auditoria;
