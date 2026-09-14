import { ticketsData } from '../data/Tickets.data.js';
import { Ticket, CreateTicketDto, UpdateTicketDto } from '../models/ticket.model.js';

export class TicketRepository {
    findAll(): Ticket[] {
        return ticketsData;
    }

    findById(id: number): Ticket | undefined {
        return ticketsData.find(t => t.id === id);
    }

    create(createDto: CreateTicketDto): Ticket {
        const newId = ticketsData.length > 0 ? Math.max(...ticketsData.map(t => t.id)) + 1 : 1;

        const newTicket: Ticket = {
            id: newId,
            title: createDto.title,
            description: createDto.description,
            priority: createDto.priority,
            resolved: createDto.resolved ?? false
        };

        ticketsData.push(newTicket);
        return newTicket;
    }

    update(id: number, updateDto: UpdateTicketDto): Ticket | null {
        const index = ticketsData.findIndex(t => t.id === id);
        if (index === -1) return null;

        ticketsData[index] = {
            ...ticketsData[index],
            ...updateDto
        };

        return ticketsData[index];
    }

    delete(id: number): Ticket | null {
        const index = ticketsData.findIndex(t => t.id === id);
        if (index === -1) return null;

        const deleted = ticketsData.splice(index, 1);
        return deleted[0];
    }
}