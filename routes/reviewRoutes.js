import express from 'express';
import { createReview, getEventReviews } from '../controllers/reviewControllers.js'; // Adjust path

const reviewRouter = express.Router();

reviewRouter.route('/createReview/:id').post(createReview);
reviewRouter.route('/getEventReview/:id').get(getEventReviews);

export default reviewRouter;