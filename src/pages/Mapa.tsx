import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin } from "lucide-react";
import { useEffect } from "react";

const Mapa = () => {
  useEffect(() => {
    // Leaflet CSS will be added via CDN for now
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
  }, []);

  const imoveis = [
    {
      id: 1,
      nome: "Edifício São José",
      endereco: "Rua do Bom Jesus, 123",
      status: "completo",
      tipo: "Comercial",
      zeph: true,
    },
    {
      id: 2,
      nome: "Sobrado Rua da Aurora",
      endereco: "Rua da Aurora, 456",
      status: "pendente",
      tipo: "Residencial",
      zeph: false,
    },
    {
      id: 3,
      nome: "Casarão Boa Vista",
      endereco: "Av. Conde da Boa Vista, 789",
      status: "irregular",
      tipo: "Tombado",
      zeph: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completo":
        return "bg-success/10 text-success border-success/20";
      case "pendente":
        return "bg-warning/10 text-warning border-warning/20";
      case "irregular":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mapa Interativo</h1>
        <p className="text-muted-foreground">
          Visualização geográfica dos imóveis e seus status documentais
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map Placeholder */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Mapa de Imóveis - Centro Histórico do Recife
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[500px] rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-border overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="h-16 w-16 text-primary/20 mx-auto" />
                  <div>
                    <p className="text-lg font-semibold text-muted-foreground">
                      Mapa Interativo
                    </p>
                    <p className="text-sm text-muted-foreground">
                    </p>
                  </div>
                  <div className="flex gap-4 justify-center pt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-success"></div>
                      <span className="text-xs">Completo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-warning"></div>
                      <span className="text-xs">Pendente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-destructive"></div>
                      <span className="text-xs">Irregular</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Imóveis Cadastrados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {imoveis.map((imovel) => (
                <div
                  key={imovel.id}
                  className="p-4 rounded-lg border border-border hover:shadow-card transition-all cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-sm">{imovel.nome}</h4>
                      {imovel.zeph && (
                        <Badge variant="outline" className="text-xs">
                          ZEPH
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{imovel.endereco}</p>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getStatusColor(imovel.status)}`}>
                        {imovel.status === "completo"
                          ? "Completo"
                          : imovel.status === "pendente"
                            ? "Pendente"
                            : "Irregular"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{imovel.tipo}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Mapa;
