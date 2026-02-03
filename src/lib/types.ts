
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  role: 'admin' | 'user';
}

export interface Opportunity {
  id: string;
  name: string;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  closeDate: string;
  clientId: string;
  clientName?: string;
  salesRepId: string;
  salesRepName?: string; 
  priority: 'low' | 'medium' | 'high';
  lastContact: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  industry?: string;
  contactPerson?: string;
  lastContactDate?: string;
  status: 'active' | 'inactive' | 'lead';
}

export interface FunnelColumn {
  id: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  title: string;
  opportunities: Opportunity[];
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
  