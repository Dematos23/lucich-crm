import { opportunities } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuoteComparison } from "@/components/opportunities/quote-comparison";
import { ActivityTimeline } from "@/components/opportunities/activity-timeline";
import { opportunityStages, stageLabels, OpportunityPriority } from "@/lib/types";

const priorityLabels: Record<OpportunityPriority, string> = {
  baja: "Baja",
  media: "Media",
  alta: "Alta",
};

export default function OpportunityDetailPage({ params }: { params: { opportunityId: string } }) {
  const opportunity = opportunities.find((o) => o.id === params.opportunityId);

  if (!opportunity) {
    notFound();
  }
  
  const formattedValue = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: opportunity.currency,
  }).format(opportunity.valueEstimate);


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{opportunity.title}</h1>
        <Link href={`/clients/${opportunity.client.id}`} className="text-lg text-muted-foreground hover:underline">
          {opportunity.client.legalName}
        </Link>
      </div>
      
      <Card>
        <CardContent className="pt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Etapa</div>
            <Select defaultValue={opportunity.stage}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar etapa" />
              </SelectTrigger>
              <SelectContent>
                {opportunityStages.map(stage => (
                  <SelectItem key={stage} value={stage}>{stageLabels[stage]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Prioridad</div>
             <Select defaultValue={opportunity.priority}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar prioridad" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(priorityLabels) as OpportunityPriority[]).map(p => (
                  <SelectItem key={p} value={p}>{priorityLabels[p]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Valor Estimado</div>
            <div className="text-lg font-semibold">{formattedValue}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Dueño</div>
            <div className="text-lg font-semibold">{opportunity.owner.name}</div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">Actividad</TabsTrigger>
          <TabsTrigger value="quotes">Comparativo</TabsTrigger>
          <TabsTrigger value="notes">Notas</TabsTrigger>
          <TabsTrigger value="files">Archivos</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="py-4">
          <ActivityTimeline />
        </TabsContent>
        <TabsContent value="quotes">
          <QuoteComparison />
        </TabsContent>
        <TabsContent value="notes">
          <Card>
            <CardHeader><CardTitle>Notas Rápidas</CardTitle></CardHeader>
            <CardContent><p>Sistema de notas aquí.</p></CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="files">
          <Card>
            <CardHeader><CardTitle>Archivos Adjuntos</CardTitle></CardHeader>
            <CardContent><p>Gestor de archivos aquí.</p></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
