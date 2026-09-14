export type Priority = 'low' | 'medium' | 'high';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  resolved: boolean;
}

export interface CreateTicketDto {
  title: string;
  description: string;
  priority: Priority;
  resolved?: boolean; 
}

export type UpdateTicketDto = Partial<Omit<Ticket, 'id'>>;