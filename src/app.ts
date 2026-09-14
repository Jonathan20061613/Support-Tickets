import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Comprobación
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Support Tickets API funcionando correctamente'
  });
});

export default app;