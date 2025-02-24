import express from 'express';
import { generateTicket, deleteTicket } from '../controllers/ticketControllers.js';

const ticketRouter = express.Router();

// ticketRouter.post('/generateTicket', (req,res)=>{
//     res.send('creating new ticket');
// });
ticketRouter.post('/generateTicket/:eventId', generateTicket);

ticketRouter.delete('/deleteTicket/:id', deleteTicket);

export default ticketRouter;