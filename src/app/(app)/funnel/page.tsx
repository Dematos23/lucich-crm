import { FunnelMetrics } from '@/components/funnel/funnel-metrics';
import { FunnelBoard } from '@/components/funnel/funnel-board';
import { opportunities } from '@/lib/data';
import { PageShell } from '@/components/layout/page-shell';

export default function FunnelPage() {
  return (
    <PageShell className="flex h-full min-h-0 flex-col gap-8">
      <FunnelMetrics />
      <div className="flex-1 overflow-hidden">
        <FunnelBoard opportunities={opportunities} />
      </div>
    </PageShell>
  );
}
