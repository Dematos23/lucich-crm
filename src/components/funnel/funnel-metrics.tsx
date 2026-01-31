import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Target, Clock, AlertTriangle } from 'lucide-react';

const metrics = [
  { title: 'Oportunidades Abiertas', value: '12', icon: Briefcase },
  { title: 'Valor Estimado Total', value: 'S/ 125,430', icon: Target },
  { title: 'Próximas Renovaciones', value: '3', icon: Clock },
  { title: 'Urgentes', value: '2', icon: AlertTriangle },
];

export function FunnelMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
