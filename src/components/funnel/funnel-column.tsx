import type { Opportunity, OpportunityStage } from '@/lib/types';
import { stageLabels } from '@/lib/types';
import { OpportunityCard } from './opportunity-card';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FunnelColumnProps {
  stage: OpportunityStage;
  opportunities: Opportunity[];
}

export function FunnelColumn({ stage, opportunities }: FunnelColumnProps) {
  return (
    <div className="flex flex-col w-80 h-full flex-shrink-0">
      <div className="flex items-center justify-between p-2">
        <h2 className="font-semibold text-foreground">
          {stageLabels[stage]}{' '}
          <span className="text-sm font-normal text-muted-foreground">
            ({opportunities.length})
          </span>
        </h2>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Nueva oportunidad</span>
        </Button>
      </div>
      <ScrollArea className="flex-1 rounded-md bg-muted/50 p-2">
        <div className="flex flex-col gap-3">
          {opportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
