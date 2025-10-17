import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Configuracoes = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
                <p className="text-muted-foreground">
                    Gerencie as informações da sua conta
                </p>
            </div>

            <Card className="shadow-card">
                <CardHeader>
                    <CardTitle>Perfil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <Button>Alterar foto</Button>
                            <p className="text-xs text-muted-foreground mt-2">JPG, GIF ou PNG. 1MB max.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" defaultValue="Admin" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="admin@revitalise.com" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancelar</Button>
                        <Button>Salvar alterações</Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-card">
                <CardHeader>
                    <CardTitle>Segurança</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="password">Nova Senha</Label>
                        <Input id="password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                        <Input id="confirm-password" type="password" />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancelar</Button>
                        <Button>Alterar senha</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sair</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        Deseja sair da sua conta?
                    </p>
                    <Button variant="destructive" onClick={handleLogout}>Sair</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Configuracoes;