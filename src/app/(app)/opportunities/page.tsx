import { OpportunityDataTable } from "@/components/opportunities/opportunity-data-table";
import { PageShell } from "@/components/layout/page-shell";
import { opportunities } from "@/lib/data";

export default function OpportunitiesPage() {
  return (
    <PageShell className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Oportunidades</h1>
        <p className="text-muted-foreground">Gestiona la lista de todas las oportunidades.</p>
      </div>
      <OpportunityDataTable data={opportunities} />
    </PageShell>
  );
}
