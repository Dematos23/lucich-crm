import { FunnelMetrics } from '@/components/funnel/funnel-metrics';
import { FunnelBoard } from '@/components/funnel/funnel-board';
import { opportunities, clients, users } from '@/lib/data';

export default function FunnelPage() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <FunnelMetrics />
      <div className="flex-1 overflow-hidden">
        <FunnelBoard opportunities={opportunities} />
      </div>
    </div>
  );
}
