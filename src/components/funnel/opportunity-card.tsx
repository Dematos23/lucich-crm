import type { Opportunity } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Calendar, User, DollarSign } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { stageLabels } from '@/lib/types';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const priorityClasses: Record<Opportunity['priority'], string> = {
  alta: 'border-l-4 border-red-500',
  media: 'border-l-4 border-yellow-500',
  baja: 'border-l-4 border-blue-500',
};

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { title, client, valueEstimate, currency, owner, priority, expectedCloseDate, stage } = opportunity;
  const formattedValue = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(valueEstimate);

  const formattedDate = expectedCloseDate
    ? new Date(expectedCloseDate).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
      })
    : '-';

  return (
    <Card className={cn('bg-card hover:shadow-md transition-shadow', priorityClasses[priority])}>
      <CardHeader className="flex-row items-start justify-between space-y-0 p-4 pb-2">
        <CardTitle className="text-sm font-semibold leading-tight pr-2">
          {title}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 flex-shrink-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Acciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Abrir detalle</DropdownMenuItem>
             <DropdownMenuSub>
              <DropdownMenuSubTrigger>Cambiar Etapa</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {Object.entries(stageLabels).map(([key, label]) => (
                    <DropdownMenuItem key={key}>{label}</DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem className="text-green-600 focus:text-green-600">Marcar Ganada</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 focus:text-red-600">Marcar Perdida</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-xs text-muted-foreground space-y-3">
        <p className="font-medium text-foreground/90">{client.legalName}</p>
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-1.5" title="Valor estimado">
             <DollarSign className="h-3 w-3" />
             <span>{formattedValue}</span>
           </div>
           <div className="flex items-center gap-1.5" title="Cierre esperado">
             <Calendar className="h-3 w-3" />
             <span>{formattedDate}</span>
           </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2" title="Dueño">
            <Avatar className="h-6 w-6">
              <AvatarImage src={owner.avatarUrl} alt={owner.name} />
              <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{owner.name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
