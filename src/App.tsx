import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import SubmeterDocumento from "./pages/SubmeterDocumento";
import Submissoes from "./pages/Submissoes";
import FichaImovel from "./pages/FichaImovel";
import Analises from "./pages/Analises";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import Configuracoes from "./pages/Configuracoes";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {isAuthenticated ? (
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                  <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="flex h-14 items-center gap-4 px-4">
                      <SidebarTrigger />
                      <div className="flex-1">
                        <h1 className="text-sm font-semibold text-foreground">
                          Sistema de Revitalização
                        </h1>
                      </div>
                    </div>
                  </header>
                  <main className="flex-1 p-6 bg-muted/30">
                    <Routes>
                      <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                      <Route path="/submeter" element={<ProtectedRoute><SubmeterDocumento /></ProtectedRoute>} />
                      <Route path="/submissoes" element={<ProtectedRoute><Submissoes /></ProtectedRoute>} />
                      <Route path="/submissoes/:id" element={<ProtectedRoute><FichaImovel /></ProtectedRoute>} />
                      <Route path="/analises" element={<ProtectedRoute><Analises /></ProtectedRoute>} />
                      <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </SidebarProvider>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;