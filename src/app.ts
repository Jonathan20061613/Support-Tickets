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
        message: 'Support Tickets API funcionando correctamente'
    });
});

// Obtener todos los tickets
// http://localhost:3000/api/health
// http://localhost:3000/api/tickets?resolved=true
// http://localhost:3000/api/tickets?resolved=false
app.get('/api/tickets', (req: Request, res: Response) => {
    let results = tickets;
    const { resolved } = req.query;

    if (resolved !== undefined) {
        const isResolved = resolved === 'true';
        results = tickets.filter(t => t.resolved === isResolved);
    }

    res.status(200).json({
        success: true,
        data: results,
        total: results.length
    });
});

// Obtener ticket ID 
// http://localhost:3000/api/tickets/:id  
app.get('/api/tickets/:id', (req: Request, res: Response) => {
    const idParam = req.params.id as string;

    if (!/^\d+$/.test(idParam)) {
        return res.status(400).json({
            success: false,
            message: 'El ID debe ser un entero positivo'
        });
    }

    const ticketId = parseInt(idParam, 10);
    const ticket = tickets.find(t => t.id === ticketId);

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
});

// Crear un ticket 
// http://localhost:3000/api/tickets
app.post('/api/tickets', (req: Request, res: Response) => {
    const body: CreateTicketDto = req.body;

    if (!body.title || !body.description || !body.priority) {
        return res.status(400).json({
            success: false,
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
        success: true,
        message: 'Ticket creado correctamente',
        data: newTicket
    });
});

// Actualizar Parcialmente un ticket 
// http://localhost:3000/api/tickets/:id  
app.patch('/api/tickets/:id', (req: Request, res: Response) => {
    const idParam = req.params.id as string;
    if (!/^\d+$/.test(idParam)) {
        return res.status(400).json({
            success: false,
            message: 'El ID debe ser un entero positivo'
        });
    }

    const ticketId = parseInt(idParam, 10);
    const body: UpdateTicketDto = req.body;

    const ticketIndex = tickets.findIndex(t => t.id === ticketId);

    if (ticketIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Ticket no encontrado'
        });
    }

    tickets[ticketIndex] = {
        ...tickets[ticketIndex],
        ...body
    };

    return res.status(200).json({
        success: true,
        message: 'Ticket actualizado correctamente',
        data: tickets[ticketIndex]
    });
});

// Eliminar un ticket por ID 
// http://localhost:3000/api/tickets/:id  
app.delete('/api/tickets/:id', (req: Request, res: Response) => {
    const idParam = req.params.id as string;
    if (!/^\d+$/.test(idParam)) {
        return res.status(400).json({
            success: false,
            message: 'El ID debe ser un entero positivo'
        });
    }

    const ticketId = parseInt(idParam, 10);
    const ticketIndex = tickets.findIndex(t => t.id === ticketId);

    if (ticketIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Ticket no encontrado'
        });
    }

    const deletedTicket = tickets.splice(ticketIndex, 1)[0];

    return res.status(200).json({
        success: true,
        message: 'Ticket eliminado correctamente',
        data: deletedTicket
    });
});

export default app;