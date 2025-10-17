import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    CheckCircle,
    Clock,
    XCircle,
    Building2,
    FileText,
    Award,
    Star,
    Sparkles,
} from "lucide-react";
import db from "@/data/db.json";

const FichaImovel = () => {
    const { id } = useParams();
    const submission = db.submissions.find((sub) => sub.id === parseInt(id || ""));

    if (!submission) {
        return <div>Submissão não encontrada</div>;
    }

    const getStatusProps = (status: string) => {
        switch (status) {
            case "aprovado":
                return {
                    icon: <CheckCircle className="h-8 w-8 text-success" />,
                    badge: <Badge className="bg-success/10 text-success border-success/20 text-lg px-4 py-1">Aprovado</Badge>,
                };
            case "em_analise":
                return {
                    icon: <Clock className="h-8 w-8 text-warning" />,
                    badge: <Badge className="bg-warning/10 text-warning border-warning/20 text-lg px-4 py-1">Em Análise</Badge>,
                };
            case "negado":
                return {
                    icon: <XCircle className="h-8 w-8 text-destructive" />,
                    badge: <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-lg px-4 py-1">Negado</Badge>,
                };
            default:
                return {
                    icon: <Building2 className="h-8 w-8 text-primary" />,
                    badge: <Badge variant="outline">Desconhecido</Badge>,
                };
        }
    };

    const { icon, badge } = getStatusProps(submission.status);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{submission.property}</h1>
                    <p className="text-muted-foreground">Ficha de Acompanhamento da Submissão</p>
                </div>
                <div className="flex items-center gap-4">
                    {icon}
                    {badge}
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card className="shadow-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                Etapas do Processo
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {submission.steps.map((step, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        {step.completed ? (
                                            <CheckCircle className="h-5 w-5 text-success" />
                                        ) : (
                                            <Clock className="h-5 w-5 text-muted-foreground" />
                                        )}
                                        <span className={step.completed ? "text-foreground" : "text-muted-foreground"}>
                                            {step.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="shadow-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-accent" />
                                Pontuação
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-5xl font-bold text-accent">{submission.points}</p>
                            <p className="text-muted-foreground text-sm">pontos</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Star className="h-5 w-5 text-accent" />
                                Conquistas
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {submission.achievements.map((ach, index) => (
                                <Badge key={index} variant="outline" className="bg-accent-light text-accent">
                                    <Award className="h-3 w-3 mr-1" />
                                    {ach}
                                </Badge>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FichaImovel;