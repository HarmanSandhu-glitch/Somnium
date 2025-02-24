// reviewControllers.js
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import mongoose from 'mongoose';
import reviewModel from '../models/reviewModel.js';
import eventModel from '../models/eventModel.js';

export const createReview = async (req, res) => {
    console.log('createReview');
    try {
        const token = req.cookies?.jwt;
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized: Please log in'
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({
                success: false,
                error: 'Invalid or expired token'
            });
        }

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }


        const eventId = req.params.id;
        const event = await eventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                error: 'Event not found'
            });
        }

        // Input validation
        const { rating, review } = req.body;

        if (!rating || !Number.isInteger(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                error: 'Rating must be an integer between 1 and 5'
            });
        }

        if (!review || typeof review !== 'string' || review.trim().length < 5) {
            return res.status(400).json({
                success: false,
                error: 'Review must be a string with at least 5 characters'
            });
        }

        // Create review
        const newReview = await reviewModel.create({
            user: user._id,
            event: event._id,
            rating,
            review: review.trim()
        });

        console.log('newReview:', newReview);

        // Update event reviews and rating
        event.eventReview.push(newReview._id);
        const reviews = await reviewModel.find({ event: event._id });
        event.eventRating = Number((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1));
        await event.save();

        return res.status(201).json({
            success: true,
            message: 'Review created successfully',
            review: newReview
        });

    } catch (err) {
        console.error('Error in createReview:', err);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

export const getEventReviews = async (req, res) => {
    console.log("Fetching event reviews");
    try {
        const eventId = req.params.id;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid event ID format'
            });
        }

        // Fetch event first to verify existence and get basic details
        const event = await eventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                error: 'Event not found'
            });
        }

        console.log('event:', event);

        const reviews = await reviewModel
            .find({ event: eventId })
            .sort({ createdAt: -1 })
            .lean();

        console.log('reviews:', reviews);

        return res.status(200).json({
            success: true,
            message: reviews.length ? 'Reviews retrieved successfully' : 'No reviews found',
            data: {
                reviews: reviews.map(review => ({
                    ...review,
                    id: review._id, // Add id field for convenience if frontend expects it
                    _id: undefined // Optionally remove _id if you only want 'id'
                })),
                totalReviews: reviews.length,
                averageRating: event.eventRating,
                event: {
                    id: event._id,
                    name: event.eventName,
                    date: event.eventDate,
                    organizer: event.eventOrganizer // Already populated by eventSchema middleware
                }
            }
        });

    } catch (err) {
        console.error('Error in getEventReviews:', err);
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            ...(process.env.NODE_ENV === 'development' && { details: err.message })
        });
    }
};