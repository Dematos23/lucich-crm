import { clients } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { PlusCircle, Edit } from "lucide-react";

export default function ClientDetailPage({ params }: { params: { clientId: string } }) {
  const client = clients.find((c) => c.id === params.clientId);

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            {client.legalName}
             <Badge variant={client.status === "active" ? "default" : "secondary"} className={client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>{client.status === 'active' ? 'Activo' : 'Inactivo'}</Badge>
            </h1>
            <p className="text-muted-foreground">{client.tradeName}</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline"><Edit className="mr-2 h-4 w-4"/> Editar</Button>
            <Button><PlusCircle className="mr-2 h-4 w-4"/> Nueva Oportunidad</Button>
        </div>
      </div>

      <Tabs defaultValue="summary">
        <TabsList>
          <TabsTrigger value="summary">Resumen</TabsTrigger>
          <TabsTrigger value="contacts">Contactos</TabsTrigger>
          <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
          <TabsTrigger value="files">Archivos</TabsTrigger>
          <TabsTrigger value="activity">Notas/Actividad</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="py-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Cliente</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
                <div><span className="font-semibold">RUC:</span> {client.ruc}</div>
                <div><span className="font-semibold">Industria:</span> {client.industry}</div>
                <div><span className="font-semibold">Email:</span> {client.email}</div>
                <div><span className="font-semibold">Teléfono:</span> {client.phone}</div>
                <div className="md:col-span-2"><span className="font-semibold">Dirección:</span> {client.address}</div>
                <div className="md:col-span-2"><span className="font-semibold">Dueño:</span> {client.owner.name}</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contacts">
            <Card>
                <CardHeader><CardTitle>Contactos</CardTitle></CardHeader>
                <CardContent><p>Lista de contactos aquí.</p></CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="opportunities">
             <Card>
                <CardHeader><CardTitle>Oportunidades</CardTitle></CardHeader>
                <CardContent><p>Lista de oportunidades del cliente aquí.</p></CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="files">
             <Card>
                <CardHeader><CardTitle>Archivos</CardTitle></CardHeader>
                <CardContent><p>Gestor de archivos aquí.</p></CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="activity">
             <Card>
                <CardHeader><CardTitle>Actividad Reciente</CardTitle></CardHeader>
                <CardContent><p>Timeline de notas y actividades aquí.</p></CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
