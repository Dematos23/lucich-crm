import { ClientDataTable } from "@/components/clients/client-data-table";
import { PageShell } from "@/components/layout/page-shell";
import { clients } from "@/lib/data";

export default function ClientsPage() {
  return (
    <PageShell className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
        <p className="text-muted-foreground">Gestiona la lista de empresas clientes.</p>
      </div>
      <ClientDataTable data={clients} />
    </PageShell>
  );
}
