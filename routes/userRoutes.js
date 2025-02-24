import express from 'express';
import { isOrganisor, login, signup } from '../controllers/authControllers.js'; // Fixed import
import { isAdmin, isLoggedIn } from '../controllers/authControllers.js';
import { purchasedTickets } from '../controllers/userControllers.js';
import { dashboard } from '../controllers/userDashboard.js';

const userRouter = express.Router();

// Protected routes
userRouter.use(isLoggedIn);
userRouter.get('/dashboard', dashboard); // Fixed middleware usage
userRouter.get('/purchasedTickets', purchasedTickets); // Fixed typo and middleware
userRouter.use(isAdmin || isOrganisor);
userRouter.get('/eventDetails/:eventid', purchasedTickets); // Fixed typo and middleware

export default userRouter;