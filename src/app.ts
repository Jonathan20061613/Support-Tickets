import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import ticketRoutes from './routes/ticket.routes';

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

app.use('/api/tickets', ticketRoutes);

export default app;