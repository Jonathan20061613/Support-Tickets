import { Request, Response } from 'express';
import { TicketService } from '../services/ticket.service';
import { CreateTicketDto, UpdateTicketDto } from '../models/ticket.model.js';

export class TicketController {
    private ticketService = new TicketService();

    getTickets = (req: Request, res: Response) => {
        const { resolved } = req.query;
        let resolvedFilter: boolean | undefined = undefined;

        if (resolved !== undefined) {
            resolvedFilter = resolved === 'true';
        }

        const tickets = this.ticketService.getAllTickets(resolvedFilter);

        return res.status(200).json({
            success: true,
            data: tickets,
            total: tickets.length
        });
    }

    getTicketById = (req: Request, res: Response) => {
        const idParam = req.params.id as string;

        if (!/^\d+$/.test(idParam)) {
            return res.status(400).json({
                success: false,
                message: 'El ID debe ser un entero positivo'
            });
        }

        const ticket = this.ticketService.getTicketById(parseInt(idParam, 10));

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: ticket
        });
    }

    createTicket = (req: Request, res: Response) => {
        const body: CreateTicketDto = req.body;

        if (!body.title || !body.description || !body.priority) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios (title, description, priority)'
            });
        }

        const newTicket = this.ticketService.createTicket(body);

        return res.status(201).json({
            success: true,
            message: 'Ticket creado correctamente',
            data: newTicket
        });
    }

    updateTicket = (req: Request, res: Response) => {
        const idParam = req.params.id as string;
        if (!/^\d+$/.test(idParam)) {
            return res.status(400).json({
                success: false,
                message: 'El ID debe ser un entero positivo'
            });
        }

        const body: UpdateTicketDto = req.body;
        const updatedTicket = this.ticketService.updateTicket(parseInt(idParam, 10), body);

        if (!updatedTicket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Ticket actualizado correctamente',
            data: updatedTicket
        });
    }

    deleteTicket = (req: Request, res: Response) => {
        const idParam = req.params.id as string;
        if (!/^\d+$/.test(idParam)) {
            return res.status(400).json({
                success: false,
                message: 'El ID debe ser un entero positivo'
            });
        }

        const deletedTicket = this.ticketService.deleteTicket(parseInt(idParam, 10));

        if (!deletedTicket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Ticket eliminado correctamente',
            data: deletedTicket
        });
    }
}