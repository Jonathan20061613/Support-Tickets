import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { tickets } from './data/tickets';
import { CreateTicketDto, UpdateTicketDto } from './models/Tickets.js';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta Comprobación
// http://localhost:3000/api/health
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Support Tickets API funcionando correctamente 🚀'
    });
});

// Obtener todos los tickets
// http://localhost:3000/api/tickets
app.get('/api/tickets', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        data: tickets,
        total: tickets.length
    });
});

// Crear un ticket 
// http://localhost:3000/api/tickets
app.post('/api/tickets', (req: Request, res: Response) => {
    const body: CreateTicketDto = req.body;

    if (!body.title || !body.description || !body.priority) {
        return res.status(400).json({
            status: 'error',
            message: 'Faltan campos obligatorios (title, description, priority)'
        });
    }

    const newId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1;

    const newTicket = {
        id: newId,
        title: body.title,
        description: body.description,
        priority: body.priority,
        resolved: body.resolved ?? false
    };

    tickets.push(newTicket);

    return res.status(201).json({
        status: 'success',
        data: newTicket
    });
});

// Actualizar Parcialmente un ticket 
// http://localhost:3000/api/tickets/:id  
// ejemplo: http://localhost:3000/api/tickets/1
app.patch('/api/tickets/:id', (req: Request, res: Response) => {
    const ticketId = parseInt(req.params.id as string);
    const body: UpdateTicketDto = req.body;

    const ticketIndex = tickets.findIndex(t => t.id === ticketId);

    if (ticketIndex === -1) {
        return res.status(404).json({
            status: 'error',
            message: `Ticket con ID ${ticketId} no encontrado`
        });
    }

    tickets[ticketIndex] = {
        ...tickets[ticketIndex],
        ...body
    };

    return res.status(200).json({
        status: 'success',
        data: tickets[ticketIndex]
    });
});

export default app;