/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Upload,
  User,
  FileText,
  Building,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Loader,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  id: number;
  title: string;
  description: string;
  icon: any;
  category: string;
};

const steps: Step[] = [
  { id: 1, title: "Matrícula do Imóvel", description: "Cartório de Registro", icon: Building, category: "Proprietário e Imóvel" },
  { id: 2, title: "Identificação do Proprietário", description: "RG/CPF ou CNPJ/Contrato Social", icon: User, category: "Proprietário e Imóvel" },
  { id: 3, title: "Inscrição Imobiliária", description: "Consta no carnê do IPTU", icon: FileText, category: "Proprietário e Imóvel" },
  { id: 4, title: "Certidão Negativa de Débitos", description: "Prova de quitação do IPTU", icon: FileText, category: "Proprietário e Imóvel" },

  { id: 5, title: "RRT/ART do Projeto e Execução", description: "Arquitetos e Engenheiros", icon: Award, category: "Responsabilidade Técnica" },
  { id: 6, title: "Comprovante de Regularidade", description: "Certidão do CAU/PE ou CREA-PE", icon: Award, category: "Responsabilidade Técnica" },

  { id: 7, title: "Projeto Arquitetônico Completo", description: "Plantas, cortes, fachadas", icon: FileText, category: "Projeto Técnico" },
  { id: 8, title: "Memorial Descritivo e Justificativo", description: "Detalhes e justificativas", icon: FileText, category: "Projeto Técnico" },
  { id: 9, title: "Projetos Complementares", description: "Estrutural, elétrico, etc.", icon: FileText, category: "Projeto Técnico" },
  { id: 10, title: "Plano de Gerenciamento de Resíduos", description: "PGRCC detalhando o descarte", icon: FileText, category: "Projeto Técnico" },

  { id: 11, title: "Aprovação do IPHAN", description: "Ofício de aprovação final", icon: ShieldCheck, category: "Aprovações Prévias" },
  { id: 12, title: "Aprovação dos Bombeiros (PSCIP)", description: "Atestado de aprovação do CBMPE", icon: ShieldCheck, category: "Aprovações Prévias" },
  { id: 13, title: "Licença Ambiental", description: "Emitida pela Secretaria de Meio Ambiente", icon: ShieldCheck, category: "Aprovações Prévias" },

  { id: 14, title: "Confirmação", description: "Revisão final e envio", icon: CheckCircle2, category: "Finalização" },
];

const groupByCategory = (items: Step[]) =>
  items.reduce<Record<string, Step[]>>((acc, item) => {
    acc[item.category] = acc[item.category] ? [...acc[item.category], item] : [item];
    return acc;
  }, {});

const SubmeterDocumento = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const navigate = useNavigate();

  // Progresso: considera todos menos a confirmação para a barra ficar mais intuitiva
  const progressBase = steps.length - 1;
  const progress = Math.min(100, (completedSteps.length / progressBase) * 100);
  const isLastStep = currentStep === steps.length;

  const grouped = useMemo(() => groupByCategory(steps), []);
  const currentStepData = steps.find((s) => s.id === currentStep);

  const handleNext = () => {
    if (isLastStep) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      navigate("/submissoes");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
        setPoints((p) => p + 10);
      }
      setShowApproved(true);

      setTimeout(() => {
        setShowApproved(false);
        if (currentStep < steps.length) {
          setCurrentStep((c) => c + 1);
        }
      }, 900);
    }, 1200);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((c) => c - 1);
    }
  };

  const canAccess = (stepId: number) =>
    completedSteps.includes(stepId) ||
    stepId === currentStep ||
    completedSteps.includes(stepId - 1);

  const handleStepClick = (stepId: number) => {
    if (canAccess(stepId)) setCurrentStep(stepId);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Submeter Documentos
          </h1>
          <p className="text-muted-foreground mt-1">
            Siga as etapas para completar a sua submissão.
          </p>
        </div>

        <Card className="shadow-md w-full sm:w-auto">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-full bg-accent/10">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Seus Pontos</p>
              <p className="text-2xl font-bold text-accent">{points}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top progress for small screens */}
      <Card className="shadow-lg mt-4 lg:hidden">
        <CardContent className="p-4 sm:p-6">
          <Progress value={progress} className="h-2" />
          <div className="mt-4">
            <p className="text-sm font-semibold text-primary">
              {currentStepData?.category}
            </p>
            <p className="text-xs text-muted-foreground">
              Etapa {currentStep} de {steps.length}: {currentStepData?.title}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Main responsive layout */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar stepper (desktop) */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
          <Card className="shadow-lg sticky top-6 max-h-[80vh] overflow-auto">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Etapas</CardTitle>
              <Progress value={progress} className="h-2 mt-2" />
            </CardHeader>
            <CardContent className="pt-0">
              <nav className="space-y-5">
                {Object.entries(grouped).map(([category, categorySteps]) => (
                  <div key={category} className="space-y-2">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {category}
                    </p>

                    <ul className="space-y-1.5">
                      {categorySteps.map((step) => {
                        const isCompleted = completedSteps.includes(step.id);
                        const isCurrent = currentStep === step.id;
                        const accessible = canAccess(step.id);
                        const Icon = step.icon;

                        return (
                          <li key={step.id}>
                            <button
                              type="button"
                              onClick={() => handleStepClick(step.id)}
                              aria-current={isCurrent ? "step" : undefined}
                              aria-disabled={!accessible}
                              className={cn(
                                "w-full text-left flex items-center gap-3 rounded-lg px-3 py-2 transition",
                                "border",
                                isCurrent
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:bg-muted",
                                !accessible && "opacity-60 cursor-not-allowed"
                              )}
                              disabled={!accessible}
                            >
                              <span
                                className={cn(
                                  "flex h-8 w-8 items-center justify-center rounded-full border-2 shrink-0",
                                  isCompleted
                                    ? "bg-emerald-500 border-emerald-500 text-emerald-50"
                                    : isCurrent
                                      ? "border-primary text-primary"
                                      : "border-border text-muted-foreground"
                                )}
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="h-4 w-4" />
                                ) : accessible ? (
                                  <Icon className="h-4 w-4" />
                                ) : (
                                  <Lock className="h-4 w-4" />
                                )}
                              </span>

                              <div className="min-w-0">
                                <p
                                  className={cn(
                                    "text-sm font-medium truncate",
                                    isCurrent ? "text-primary" : ""
                                  )}
                                  title={step.title}
                                >
                                  {step.title}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {step.description}
                                </p>
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* Main content */}
        <section className="lg:col-span-8 xl:col-span-9 space-y-6">
          {/* Desktop header for current step */}
          <Card className="shadow-xl hidden lg:block">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20">
                    Etapa {currentStep} de {steps.length}
                  </Badge>
                  <h2 className="text-xl font-bold">{currentStepData?.title}</h2>
                  <p className="text-muted-foreground">
                    {currentStepData?.description}
                  </p>
                </div>
                <div className="w-48">
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conteúdo da etapa */}
          <Card className="shadow-xl">
            <CardContent className="p-6 md:p-8">
              <div className="space-y-6 animate-fade-in">
                {/* Mobile/Tablet header for step */}
                <div className="text-center space-y-2 pb-6 border-b lg:hidden">
                  <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20">
                    Etapa {currentStep} de {steps.length}
                  </Badge>
                  <h2 className="text-2xl font-bold">{currentStepData?.title}</h2>
                  <p className="text-muted-foreground">
                    {currentStepData?.description}
                  </p>
                </div>

                <div className="space-y-6 min-h-[220px] lg:min-h-[260px] flex items-center justify-center">
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-4 animate-fade-in">
                      <Loader className="h-16 w-16 text-primary animate-spin" />
                      <p className="text-muted-foreground">
                        Analisando documento...
                      </p>
                    </div>
                  ) : showApproved ? (
                    <div className="flex flex-col items-center gap-4 animate-fade-in">
                      <CheckCircle2 className="h-16 w-16 text-emerald-500" />
                      <p className="text-muted-foreground">Etapa Concluída!</p>
                    </div>
                  ) : (
                    <div className="w-full space-y-4">
                      {/* Área de upload responsiva e acessível */}
                      <label
                        htmlFor="file-input"
                        className={cn(
                          "block border-2 border-dashed rounded-xl p-6 sm:p-10 text-center",
                          "hover:border-primary transition-colors cursor-pointer",
                          "border-border"
                        )}
                      >
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium mb-2">
                          Arraste ou clique para enviar
                        </p>
                        <p className="text-sm text-muted-foreground">
                          PDF, JPEG ou PNG • Máximo 10MB
                        </p>
                        <input id="file-input" type="file" className="sr-only" />
                      </label>

                      {/* Ajuda contextual (opcional, melhora UX em desktop) */}
                      <div className="text-xs text-muted-foreground text-center">
                        Dica: nomeie seus arquivos com o número da etapa (ex:
                        <code className="mx-1">07_projeto_arquitetonico.pdf</code>)
                        para acelerar a validação.
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t gap-2">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1 || isLoading || showApproved}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={isLoading || showApproved}
                    className="gap-2 bg-primary hover:bg-primary/90"
                  >
                    {isLastStep ? "Finalizar" : "Próximo"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default SubmeterDocumento;
