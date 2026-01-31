import type { Opportunity } from '@/lib/types';
import { opportunityStages } from '@/lib/types';
import { FunnelColumn } from './funnel-column';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface FunnelBoardProps {
  opportunities: Opportunity[];
}

export function FunnelBoard({ opportunities }: FunnelBoardProps) {
  return (
    <ScrollArea className="w-full h-full whitespace-nowrap">
      <div className="flex gap-4 pb-4 h-full">
        {opportunityStages.map((stage) => {
          const stageOpportunities = opportunities.filter(
            (opp) => opp.stage === stage && opp.status === 'open'
          );
          return (
            <FunnelColumn
              key={stage}
              stage={stage}
              opportunities={stageOpportunities}
            />
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
