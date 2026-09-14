import { TicketRepository } from '../repositories/ticket.repository';
import { CreateTicketDto, UpdateTicketDto, Ticket } from '../models/ticket.model.js';

export class TicketService {
    private ticketRepository = new TicketRepository();

    getAllTickets(resolved?: boolean): Ticket[] {
        const tickets = this.ticketRepository.findAll();
        if (resolved !== undefined) {
            return tickets.filter(t => t.resolved === resolved);
        }
        return tickets;
    }

    getTicketById(id: number): Ticket | null {
        const ticket = this.ticketRepository.findById(id);
        return ticket || null;
    }

    createTicket(createDto: CreateTicketDto): Ticket {
        return this.ticketRepository.create(createDto);
    }

    updateTicket(id: number, updateDto: UpdateTicketDto): Ticket | null {
        return this.ticketRepository.update(id, updateDto);
    }

    deleteTicket(id: number): Ticket | null {
        return this.ticketRepository.delete(id);
    }
}