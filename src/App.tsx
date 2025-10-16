import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import SubmeterDocumento from "./pages/SubmeterDocumento";
import Imoveis from "./pages/Imoveis";
import Mapa from "./pages/Mapa";
import Documentos from "./pages/Documentos";
import Analises from "./pages/Analises";
import Auditoria from "./pages/Auditoria";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-14 items-center gap-4 px-4">
                  <SidebarTrigger />
                  <div className="flex-1">
                    <h1 className="text-sm font-semibold text-foreground">
                      Sistema de Revitalização - Prefeitura do Recife
                    </h1>
                  </div>
                </div>
              </header>
              <main className="flex-1 p-6 bg-muted/30">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/submeter" element={<SubmeterDocumento />} />
                  <Route path="/imoveis" element={<Imoveis />} />
                  <Route path="/mapa" element={<Mapa />} />
                  <Route path="/documentos" element={<Documentos />} />
                  <Route path="/analises" element={<Analises />} />
                  <Route path="/auditoria" element={<Auditoria />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
