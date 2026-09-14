import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller';

const router = Router();
const controller = new TicketController();

router.get('/', controller.getTickets);
router.get('/:id', controller.getTicketById);
router.post('/', controller.createTicket);
router.patch('/:id', controller.updateTicket);
router.delete('/:id', controller.deleteTicket);

export default router;