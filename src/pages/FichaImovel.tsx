import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    CheckCircle,
    Clock,
    XCircle,
    Building2,
    FileText,
    Award,
    Sparkles,
    CheckCircle2,
    User,
    Building,
    ShieldCheck,
    Download,
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

    const handleDownloadPDF = () => {
        if (!submission) return;

        const pdf = new jsPDF('p', 'mm', 'a4');
        const now = new Date();

        // --- Cabeçalho do PDF ---
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(20);
        pdf.text("Ficha de Acompanhamento", pdf.internal.pageSize.getWidth() / 2, 20, { align: "center" });
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "normal");
        pdf.text("Sistema Revitalise", pdf.internal.pageSize.getWidth() / 2, 28, { align: "center" });
        pdf.line(15, 35, 195, 35);

        // --- Informações da Submissão ---
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text("Imóvel:", 15, 45);
        pdf.setFont("helvetica", "normal");
        pdf.text(submission.property, 35, 45);

        pdf.setFont("helvetica", "bold");
        pdf.text("Data da Submissão:", 15, 52);
        pdf.setFont("helvetica", "normal");
        pdf.text(new Date(submission.date).toLocaleDateString('pt-BR'), 55, 52);

        pdf.setFont("helvetica", "bold");
        pdf.text("Status Atual:", 15, 59);
        pdf.setFont("helvetica", "normal");
        pdf.text(submission.status.replace("_", " "), 42, 59);

        // --- Detalhes das Etapas ---
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Detalhes das Etapas do Processo", 15, 75);
        pdf.line(15, 77, 195, 77);

        let yPos = 85;
        pdf.setFontSize(10);
        let currentCategory = "";

        allSteps.forEach((step) => {
            if (yPos > 270) { // Adiciona nova página se o conteúdo for muito longo
                pdf.addPage();
                yPos = 20;
            }

            if (step.category !== currentCategory) {
                currentCategory = step.category;
                yPos += 5;
                pdf.setFont("helvetica", "bold");
                pdf.text(currentCategory, 15, yPos);
                yPos += 7;
            }

            const isCompleted = submission.completedSteps.includes(step.id);
            const statusText = isCompleted ? "Concluído" : "Pendente";
            const statusColor = isCompleted ? [0, 100, 0] : [200, 0, 0]; // Verde ou Vermelho

            pdf.setFont("helvetica", "normal");
            pdf.text(`- ${step.title}`, 20, yPos);

            pdf.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
            pdf.text(statusText, 150, yPos);
            pdf.setTextColor(0, 0, 0); // Reseta a cor para preto

            yPos += 7;
        });

        // --- Rodapé e Resumo ---
        yPos += 5;
        pdf.line(15, yPos, 195, yPos);
        yPos += 10;
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Pontuação Total: ${submission.points} pontos`, 15, yPos);

        pdf.setFontSize(8);
        pdf.setTextColor(150);
        pdf.text(
            `Documento gerado em ${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR')}`,
            pdf.internal.pageSize.getWidth() / 2, 285, { align: 'center' }
        );

        // --- Salva o PDF ---
        pdf.save(`ficha-${submission.property.replace(/\s+/g, '-')}.pdf`);
    };

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
            <div>
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

                <div className="grid md:grid-cols-3 gap-6 mt-6">
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

            <div className="flex justify-end pt-6 border-t">
                <Button onClick={handleDownloadPDF}>
                    <Download className="mr-2 h-4 w-4" />
                    Baixar Ficha (PDF)
                </Button>
            </div>
        </div>
    );
};

export default FichaImovel;