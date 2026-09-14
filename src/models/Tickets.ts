export type Priority = 'low' | 'medium' | 'high';

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  resolved: boolean;
}