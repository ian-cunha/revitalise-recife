import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, Building2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import db from "@/data/db.json";

const Submissoes = () => {
    const { submissions } = db;

    const getStatusProps = (status: string) => {
        switch (status) {
            case "aprovado":
                return {
                    icon: <CheckCircle className="h-5 w-5 text-success" />,
                    badge: <Badge className="bg-success/10 text-success border-success/20">Aprovado</Badge>,
                };
            case "em_analise":
                return {
                    icon: <Clock className="h-5 w-5 text-warning" />,
                    badge: <Badge className="bg-warning/10 text-warning border-warning/20">Em Análise</Badge>,
                };
            case "negado":
                return {
                    icon: <XCircle className="h-5 w-5 text-destructive" />,
                    badge: <Badge className="bg-destructive/10 text-destructive border-destructive/20">Negado</Badge>,
                };
            default:
                return {
                    icon: <Building2 className="h-5 w-5 text-primary" />,
                    badge: <Badge variant="outline">Desconhecido</Badge>,
                };
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Submissões</h1>
                <p className="text-muted-foreground">
                    Acompanhe o status de cada submissão de documento.
                </p>
            </div>

            <Card className="shadow-card">
                <CardHeader>
                    <CardTitle>Status das Submissões</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {submissions.map((sub) => {
                            const { icon, badge } = getStatusProps(sub.status);
                            const progress = (sub.completedSteps.length / 14) * 100;
                            return (
                                <Link to={`/submissoes/${sub.id}`} key={sub.id}>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-border hover:shadow-card transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-lg bg-muted hidden sm:block">
                                                {icon}
                                            </div>
                                            <div className="w-full">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                                    <h4 className="font-semibold text-sm">{sub.property}</h4>
                                                    <div className="block sm:hidden">{badge}</div>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1 sm:mt-0">Enviado em: {new Date(sub.date).toLocaleDateString()}</p>
                                                <div className="mt-2">
                                                    <Progress value={progress} className="h-2 w-full" />
                                                    <p className="text-xs text-muted-foreground mt-1">{sub.completedSteps.length} de 14 etapas concluídas</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden sm:block">{badge}</div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Submissoes;