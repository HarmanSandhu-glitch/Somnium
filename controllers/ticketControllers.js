import ticketModel from "../models/ticketModel.js";
import eventModel from "../models/eventModel.js"
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";


const generateTicket = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        // Validate eventId format
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid event ID format'
            });
        }

        // Check event existence
        const event = await eventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                error: 'Event not found'
            });
        }

        // Verify authentication
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

        // Verify user
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Validate request body
        const { ticketPrice, ticketDescription, ticketType } = req.body;

        if (!ticketPrice || typeof ticketPrice !== 'number' || ticketPrice < 0) {
            return res.status(400).json({
                success: false,
                error: 'Valid ticket price is required'
            });
        }

        if (!ticketDescription || typeof ticketDescription !== 'string' || ticketDescription.trim().length < 5) {
            return res.status(400).json({
                success: false,
                error: 'Ticket description must be at least 5 characters'
            });
        }

        // Create ticket
        const ticket = await ticketModel.create({
            ticketEvent: eventId,
            ticketOwner: user._id,
            ticketPrice,
            ticketDescription,
            ticketType: ticketType || 'General' // Optional: allow ticketType from request
        });

        console.log('Created ticket:', ticket);

        return res.status(201).json({
            success: true,
            message: 'Ticket created successfully',
            data: {
                ticketId: ticket._id,
                eventName: event.eventName,
                ticketType: ticket.ticketType
            }
        });

    } catch (err) {
        console.error('Error generating ticket:', err);

        // Handle duplicate key error specifically
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Duplicate ticket error',
                message: 'A ticket with these parameters already exists'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            ...(process.env.NODE_ENV === 'development' && { details: err.message })
        });
    }
};

async function deleteTicket(req, res) {
    const ticketId = req.params.id;
    try {
        const ticket = await ticketModel.findByIdAndDelete(ticketId);
        if (!ticket) {
            return res.status(404).send({ "error": "ticket not found" });
        }
        res.status(200).send("ticket deleted successfully");
    } catch (err) {
        res.status(400).send({ "error": "error deleting ticket", message: err.message });
    }
}




export { generateTicket, deleteTicket };

