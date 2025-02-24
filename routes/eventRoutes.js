import express from 'express';
import { createEvent, updateEvent, deleteEvent, getAllEvents, getEvent } from "../controllers/eventController.js";
import { isAdmin, isOrganisor } from "../controllers/authControllers.js";

const eventRouter = express.Router();


eventRouter.get('/getAllEvents', getAllEvents);
eventRouter.get('/getEvent/:id', getEvent);

eventRouter.use(isAdmin || isOrganisor);
eventRouter.post('/createEvent', createEvent);
eventRouter.put('/updateEvent/:id', updateEvent);
eventRouter.delete('/deleteEvent/:id', deleteEvent);

export default eventRouter;

// 67bc6b6fe412fff38e6adcf6