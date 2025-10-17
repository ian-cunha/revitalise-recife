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
    CheckCircle2,
    User,
    Building,
    ShieldCheck,
} from "lucide-react";
import db from "@/data/db.json";

const allSteps = [
    { id: 1, title: "Matrícula do Imóvel", icon: Building, category: "Proprietário e Imóvel" },
    { id: 2, title: "Identificação do Proprietário", icon: User, category: "Proprietário e Imóvel" },
    { id: 3, title: "Inscrição Imobiliária", icon: FileText, category: "Proprietário e Imóvel" },
    { id: 4, title: "Certidão Negativa de Débitos", icon: FileText, category: "Proprietário e Imóvel" },
    { id: 5, title: "RRT/ART do Projeto e Execução", icon: Award, category: "Responsabilidade Técnica" },
    { id: 6, title: "Comprovante de Regularidade", icon: Award, category: "Responsabilidade Técnica" },
    { id: 7, title: "Projeto Arquitetônico Completo", icon: FileText, category: "Projeto Técnico" },
    { id: 8, title: "Memorial Descritivo e Justificativo", icon: FileText, category: "Projeto Técnico" },
    { id: 9, title: "Projetos Complementares", icon: FileText, category: "Projeto Técnico" },
    { id: 10, title: "Plano de Gerenciamento de Resíduos", icon: FileText, category: "Projeto Técnico" },
    { id: 11, title: "Aprovação do IPHAN", icon: ShieldCheck, category: "Aprovações Prévias" },
    { id: 12, title: "Aprovação dos Bombeiros (PSCIP)", icon: ShieldCheck, category: "Aprovações Prévias" },
    { id: 13, title: "Licença Ambiental", icon: ShieldCheck, category: "Aprovações Prévias" },
    { id: 14, title: "Confirmação", icon: CheckCircle2, category: "Finalização" },
];

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
                                {allSteps.map((step) => {
                                    const isCompleted = submission.completedSteps.includes(step.id);
                                    return (
                                        <li key={step.id} className="flex items-center gap-3">
                                            {isCompleted ? (
                                                <CheckCircle className="h-5 w-5 text-success" />
                                            ) : (
                                                <Clock className="h-5 w-5 text-muted-foreground" />
                                            )}
                                            <span className={isCompleted ? "text-foreground" : "text-muted-foreground"}>
                                                {step.title}
                                            </span>
                                        </li>
                                    );
                                })}
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
                </div>
            </div>
        </div>
    );
};

export default FichaImovel;