export type User = {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'advisor' | 'viewer';
  avatarUrl: string;
};

export type Client = {
  id: string;
  legalName: string;
  tradeName?: string;
  ruc?: string;
  industry?: string;
  phone: string;
  email: string;
  address?: string;
  tags: string[];
  status: 'active' | 'inactive';
  owner: User;
  createdAt: string;
  updatedAt: string;
};

export type Contact = {
  id: string;
  clientId: string;
  fullName: string;
  roleTitle: string;
  email: string;
  phone: string;
  isPrimary: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type OpportunityStage = 'lead' | 'diagnostico' | 'cotizacion' | 'comparativo' | 'emision' | 'renovacion';
export const opportunityStages: OpportunityStage[] = ['lead', 'diagnostico', 'cotizacion', 'comparativo', 'emision', 'renovacion'];
export const stageLabels: Record<OpportunityStage, string> = {
  lead: 'Lead',
  diagnostico: 'Diagnóstico',
  cotizacion: 'Cotización',
  comparativo: 'Comparativo',
  emision: 'Emisión',
  renovacion: 'Renovación',
};


export type OpportunityPriority = 'baja' | 'media' | 'alta';

export type Opportunity = {
  id: string;
  title: string;
  client: Client;
  stage: OpportunityStage;
  priority: OpportunityPriority;
  valueEstimate: number;
  currency: 'PEN' | 'USD';
  expectedCloseDate?: string;
  renewalDate?: string;
  owner: User;
  status: 'open' | 'won' | 'lost';
  createdAt: string;
  updatedAt: string;
};

export type Activity = {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'whatsapp' | 'task';
  summary: string;
  dueDate?: string;
  done: boolean;
  createdAt: string;
  createdBy: User;
};

export type Note = {
  id: string;
  text: string;
  createdAt: string;
  createdBy: User;
};

export type Quote = {
  id: string;
  insurerName: string;
  premium: number;
  deductible: number;
  keyCoverageBullets: string[];
  exclusionsSummary: string;
  recommendationFlag: boolean;
};

export type AppFile = {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
    uploadedBy: User;
    createdAt: string;
}
