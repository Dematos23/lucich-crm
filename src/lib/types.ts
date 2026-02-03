
export type UserRole = 'admin' | 'advisor' | 'viewer' | 'user';

export interface User {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export type OpportunityStage =
  | 'lead'
  | 'diagnostico'
  | 'comparativo'
  | 'cotizacion'
  | 'renovacion'
  | 'emision';

export const opportunityStages: OpportunityStage[] = [
  'lead',
  'diagnostico',
  'comparativo',
  'cotizacion',
  'renovacion',
  'emision',
];

export const stageLabels: Record<OpportunityStage, string> = {
  lead: 'Lead',
  diagnostico: 'Diagnostico',
  comparativo: 'Comparativo',
  cotizacion: 'Cotizacion',
  renovacion: 'Renovacion',
  emision: 'Emision',
};

export type OpportunityPriority = 'baja' | 'media' | 'alta';
export type OpportunityStatus = 'open' | 'won' | 'lost';

export interface Opportunity {
  id: string;
  title: string;
  client: Client;
  stage: OpportunityStage;
  priority: OpportunityPriority;
  valueEstimate: number;
  currency: string;
  owner: User;
  status: OpportunityStatus;
  createdAt: string;
  updatedAt: string;
  expectedCloseDate?: string;
  renewalDate?: string;
}

export interface Client {
  id: string;
  legalName: string;
  tradeName?: string;
  ruc?: string;
  industry?: string;
  phone?: string;
  email: string;
  address?: string;
  tags?: string[];
  status: 'active' | 'inactive' | 'lead';
  owner: User;
  createdAt?: string;
  updatedAt?: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  date: string;
  notes: string;
  userId: string;
  userName: string;
}

export interface Quote {
    id: string;
    opportunityId: string;
    items: { description: string; quantity: number; price: number }[];
    total: number;
    status: 'draft' | 'sent' | 'accepted' | 'rejected';
    validUntil: string;
  }
  
