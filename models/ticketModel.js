import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    ticketOwner: {
        type: mongoose.Schema.Types.ObjectId, // Updated to Types.ObjectId
        ref: 'User',
        required: [true, 'Ticket Owner is required']
    },
    ticketPrice: {
        type: Number,
        required: [true, 'Ticket Price is required'],
        min: [0, 'Ticket Price cannot be negative']
    },
    ticketDescription: {
        type: String,
        required: [true, 'Ticket Description is required'],
        trim: true,
        minlength: [5, 'Description must be at least 5 characters']
    },
    ticketEvent: {
        type: mongoose.Schema.Types.ObjectId, // Updated to Types.ObjectId
        ref: 'Event',
        required: [true, 'Ticket Event is required']
    },
    ticketType: {
        type: String,
        enum: {
            values: ['General', 'VIP', 'Early Bird', 'Group'],
            message: 'Invalid ticket type'
        },
        default: 'General'
    },
    status: {
        type: String,
        enum: {
            values: ['Available', 'Sold Out'],
            message: 'Invalid ticket status'
        },
        default: 'Available'
    }
}, {
    timestamps: true // Added for tracking creation/update times
});

ticketSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'ticketOwner',
        select: 'name profilePic'
    }).populate({
        path: 'ticketEvent',
        select: 'eventName eventDate eventLocation'
    });
    next();
});

// Remove any existing problematic indexes
ticketSchema.index({ ticketOwner: 1, ticketEvent: 1 }); // Optional: compound index for better query performance

const ticketModel = mongoose.model('Ticket', ticketSchema);

export default ticketModel;