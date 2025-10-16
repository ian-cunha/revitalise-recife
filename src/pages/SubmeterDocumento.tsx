import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Circle,
  Upload,
  FileText,
  Award,
  Star,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Informações Básicas",
    description: "Dados do imóvel",
    icon: FileText,
  },
  {
    id: 2,
    title: "Habite-se",
    description: "Documento de habitação",
    icon: Upload,
  },
  {
    id: 3,
    title: "AVCB",
    description: "Auto de vistoria bombeiros",
    icon: Upload,
  },
  {
    id: 4,
    title: "Laudo Estrutural",
    description: "Análise estrutural",
    icon: Upload,
  },
  {
    id: 5,
    title: "Confirmação",
    description: "Revisão final",
    icon: Award,
  },
];

const SubmeterDocumento = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [points, setPoints] = useState(0);

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
  const isLastStep = currentStep === steps.length;
  const isFirstStep = currentStep === 1;

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
      setPoints(points + 20);
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep || completedSteps.includes(stepId - 1)) {
      setCurrentStep(stepId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with Points */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Submeter Documento</h1>
            <p className="text-muted-foreground mt-1">Complete todas as etapas e ganhe pontos</p>
          </div>
          <Card className="shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-full bg-accent-light">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Seus Pontos</p>
                <p className="text-2xl font-bold text-accent">{points}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Progresso</span>
                <span className="text-muted-foreground">
                  {currentStep} de {steps.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Steps Navigation */}
        <div className="grid grid-cols-5 gap-2">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === step.id;
            const isAccessible = step.id <= currentStep || completedSteps.includes(step.id - 1);

            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                disabled={!isAccessible}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all duration-300 text-center space-y-2",
                  isCurrent && "border-primary bg-primary-light scale-105",
                  isCompleted && !isCurrent && "border-success bg-success-light",
                  !isCurrent && !isCompleted && "border-border bg-card hover:border-primary/50",
                  !isAccessible && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex justify-center">
                  {isCompleted ? (
                    <div className="p-2 rounded-full bg-success text-success-foreground">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "p-2 rounded-full",
                        isCurrent ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}
                    >
                      <StepIcon className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <div className="hidden md:block">
                  <p className={cn("text-xs font-medium", isCurrent && "text-primary", isCompleted && "text-success")}>
                    Etapa {step.id}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Content Card */}
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <div className="space-y-6 animate-fade-in">
              {/* Step Header */}
              <div className="text-center space-y-2 pb-6 border-b">
                <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20">
                  Etapa {currentStep} de {steps.length}
                </Badge>
                <h2 className="text-2xl font-bold">{steps[currentStep - 1].title}</h2>
                <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
              </div>

              {/* Step Content */}
              <div className="space-y-6 min-h-[300px]">
                {currentStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                      <Label htmlFor="endereco">Endereço do Imóvel</Label>
                      <Input id="endereco" placeholder="Ex: Rua do Bom Jesus, 123" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input id="bairro" placeholder="Ex: Recife Antigo" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tipo">Tipo de Imóvel</Label>
                        <Input id="tipo" placeholder="Ex: Residencial" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-4 bg-accent-light rounded-lg">
                      <Star className="h-5 w-5 text-accent" />
                      <p className="text-sm">
                        <strong>Dica:</strong> Preencha todos os campos corretamente para ganhar pontos extras!
                      </p>
                    </div>
                  </div>
                )}

                {currentStep >= 2 && currentStep <= 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium mb-2">Arraste ou clique para enviar</p>
                      <p className="text-sm text-muted-foreground">
                        PDF, JPEG ou PNG • Máximo 10MB
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-success-light text-center">
                        <CheckCircle2 className="h-6 w-6 text-success mx-auto mb-2" />
                        <p className="text-xs font-medium">Formato Válido</p>
                      </div>
                      <div className="p-4 rounded-lg bg-success-light text-center">
                        <CheckCircle2 className="h-6 w-6 text-success mx-auto mb-2" />
                        <p className="text-xs font-medium">Tamanho OK</p>
                      </div>
                      <div className="p-4 rounded-lg bg-muted text-center">
                        <Circle className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs font-medium">Aguardando</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-4 bg-primary-light rounded-lg">
                      <Award className="h-5 w-5 text-primary" />
                      <p className="text-sm">
                        <strong>+20 pontos</strong> ao completar esta etapa
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-6 animate-fade-in text-center">
                    <div className="p-8 bg-success-light rounded-2xl">
                      <Award className="h-16 w-16 text-success mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Parabéns!</h3>
                      <p className="text-muted-foreground mb-4">
                        Você completou todas as etapas do processo
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <Sparkles className="h-5 w-5 text-accent" />
                        <span className="text-3xl font-bold text-accent">{points} pontos</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-left">
                      {steps.slice(0, -1).map((step) => (
                        <div key={step.id} className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                          <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                          <div>
                            <p className="font-medium text-sm">{step.title}</p>
                            <p className="text-xs text-muted-foreground">Completo</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={isFirstStep}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={isLastStep}
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  {isLastStep ? "Finalizar" : "Próximo"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        {completedSteps.length > 0 && (
          <Card className="shadow-md animate-fade-in">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" />
                Conquistas Desbloqueadas
              </h3>
              <div className="flex gap-3">
                {completedSteps.map((step) => (
                  <div
                    key={step}
                    className="p-3 rounded-lg bg-accent-light text-center flex-1"
                  >
                    <Award className="h-6 w-6 text-accent mx-auto mb-1" />
                    <p className="text-xs font-medium">Etapa {step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SubmeterDocumento;
