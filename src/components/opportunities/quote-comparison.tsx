import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, FileText } from "lucide-react";
import type { Quote } from "@/lib/types";

const mockQuotes: Quote[] = [
    {
        id: 'quote-1',
        insurerName: 'Aseguradora del Pacífico',
        premium: 5200,
        deductible: 1500,
        keyCoverageBullets: ['Daños a terceros S/ 1M', 'Pérdida total por robo', 'Asistencia en ruta 24/7'],
        exclusionsSummary: 'Excluye daños por desastres naturales no declarados y uso comercial.',
        recommendationFlag: false,
    },
    {
        id: 'quote-2',
        insurerName: 'La Positiva Seguros',
        premium: 4800,
        deductible: 2000,
        keyCoverageBullets: ['Daños a terceros S/ 800K', 'Pérdida total por robo o accidente', 'Chofer de reemplazo (3/año)'],
        exclusionsSummary: 'Excluye accesorios no declarados. Mayor deducible en caso de vuelco.',
        recommendationFlag: true,
    },
    {
        id: 'quote-3',
        insurerName: 'Rimac Seguros',
        premium: 5500,
        deductible: 1000,
        keyCoverageBullets: ['Daños a terceros S/ 1.2M', 'Pérdida total y parcial por robo', 'Asistencia legal completa'],
        exclusionsSummary: 'No cubre lunas o espejos por eventos separados.',
        recommendationFlag: false,
    }
];

export function QuoteComparison() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Opciones comparadas y una recomendación clara.</h2>
                <p className="text-muted-foreground">Te explico en simple qué cubre y qué no cubre cada opción.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {mockQuotes.map(quote => (
                    <Card key={quote.id} className={quote.recommendationFlag ? 'border-primary border-2 shadow-lg' : ''}>
                        {quote.recommendationFlag && (
                             <Badge className="absolute -top-3 left-4 bg-primary text-primary-foreground">Recomendado</Badge>
                        )}
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-6 w-6 text-muted-foreground"/>
                                {quote.insurerName}
                            </CardTitle>
                             <CardDescription>Prima Anual</CardDescription>
                             <p className="text-2xl font-bold text-foreground">
                                {new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'USD' }).format(quote.premium)}
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div>
                                <h4 className="font-semibold mb-2">Coberturas Clave</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    {quote.keyCoverageBullets.map((bullet, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0"/>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                           </div>
                            <div>
                                <h4 className="font-semibold mb-2">Deducible</h4>
                                <p className="text-lg font-semibold text-foreground">
                                    {new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'USD' }).format(quote.deductible)}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Exclusiones Importantes</h4>
                                <p className="text-sm text-muted-foreground">{quote.exclusionsSummary}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                <FileText className="mr-2 h-4 w-4"/>
                                Ver Cotización PDF
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
