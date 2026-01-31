import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Users, MessageSquare, Plus, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Activity } from "@/lib/types";
import { users } from "@/lib/data";

const activityIcons = {
  call: <Phone className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  meeting: <Users className="h-4 w-4" />,
  whatsapp: <MessageSquare className="h-4 w-4" />,
  task: <CheckCircle className="h-4 w-4" />,
};

const mockActivities: (Activity & { type: 'call' | 'email' | 'meeting' | 'whatsapp' | 'task' })[] = [
    {
        id: 'act-1',
        type: 'call',
        summary: 'Llamada inicial de diagnóstico. Cliente interesado en póliza de responsabilidad civil.',
        createdAt: '2024-05-22T11:00:00Z',
        createdBy: users[1],
        done: true,
    },
    {
        id: 'act-2',
        type: 'email',
        summary: 'Envío de correo con solicitud de información para cotizar.',
        createdAt: '2024-05-22T14:30:00Z',
        createdBy: users[1],
        done: true,
    },
     {
        id: 'act-3',
        type: 'meeting',
        summary: 'Reunión para presentar el comparativo de cotizaciones. Se resolvieron dudas sobre deducibles.',
        createdAt: '2024-05-24T10:00:00Z',
        createdBy: users[1],
        done: false,
    }
];

export function ActivityTimeline() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Actividad</CardTitle>
                <Button variant="outline"><Plus className="mr-2 h-4 w-4"/> Agregar Actividad</Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mb-6">
                    <Textarea placeholder="Agregar una nota rápida... (Ej: Cliente confirmó recepción de la propuesta)" />
                    <Button>Guardar Nota</Button>
                </div>

                <div className="relative pl-6">
                    <div className="absolute left-0 top-0 h-full w-px bg-border" style={{transform: "translateX(11px)"}}></div>
                    {mockActivities.map(activity => (
                        <div key={activity.id} className="relative flex items-start gap-4 mb-6">
                           <div className="absolute left-0 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                                {activityIcons[activity.type]}
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm">{activity.summary}</p>
                                <div className="text-xs text-muted-foreground flex items-center gap-2">
                                     <Avatar className="h-5 w-5">
                                        <AvatarImage src={activity.createdBy.avatarUrl} alt={activity.createdBy.name} />
                                        <AvatarFallback>{activity.createdBy.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{activity.createdBy.name}</span>
                                    <span>•</span>
                                    <span>{new Date(activity.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
