// eventModel.js
import mongoose from "mongoose";

// Removed unused imports (ticketModel, cookieParser)

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: [true, 'Event Name is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Event Name must be at least 3 characters']
    },
    eventDate: {
        type: Date,
        required: [true, 'Event Date is required'],
        validate: {
            validator: function (v) {
                return v > new Date(); // Ensure date is in the future
            },
            message: 'Event Date must be in the future'
        }
    },
    eventTime: {
        type: String,
        required: [true, 'Event Time is required'],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please use HH:MM format']
    },
    eventLocation: {
        type: String,
        required: [true, 'Event Location is required'],
        trim: true
    },
    eventDescription: {
        type: String,
        required: [true, 'Event Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters']
    },
    eventOrganizer: {
        type: mongoose.Schema.Types.ObjectId, // Fixed typo 'ObjectId'
        ref: 'User',
        required: [true, 'Event Organizer is required']
    },
    eventType: {
        type: String,
        enum: {
            values: ['concert', 'comedy', 'sport', 'theater', 'festival'],
            message: 'Invalid event type'
        },
        required: [true, 'Event Type is required']
    },
    eventReview: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    eventRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    eventStatus: {
        type: String,
        enum: {
            values: ['draft', 'published', 'cancelled'],
            message: 'Invalid event status'
        },
        default: 'draft'
    },
    eventImage: {
        type: String,
        default: ''
    },
    ticketsSold: {
        type: Number,
        default: 0,
        min: [0, 'Tickets sold cannot be negative'],
        max: [100, 'Maximum 100 tickets can be sold']
    },
    totalSales: {
        type: Number,
        default: 0,
        min: [0, 'Total sales cannot be negative']
    },
    // Ticket quantities
    vipTickets: {
        type: Number,
        default: 0,
        min: [0, 'VIP tickets cannot be negative']
    },
    generalTickets: {
        type: Number,
        default: 0,
        min: [0, 'General tickets cannot be negative']
    },
    earlyBirdTickets: {
        type: Number,
        default: 0,
        min: [0, 'Early bird tickets cannot be negative']
    },
    groupTickets: {
        type: Number,
        default: 0,
        min: [0, 'Group tickets cannot be negative']
    },
    // Ticket prices
    vipTicketsPrice: {
        type: Number,
        default: 0,
        min: [0, 'VIP ticket price cannot be negative']
    },
    generalTicketsPrice: {
        type: Number,
        default: 0,
        min: [0, 'General ticket price cannot be negative']
    },
    earlyBirdTicketsPrice: {
        type: Number,
        default: 0,
        min: [0, 'Early bird ticket price cannot be negative']
    },
    groupTicketsPrice: {
        type: Number,
        default: 0,
        min: [0, 'Group ticket price cannot be negative']
    }
}, {
    timestamps: true // Added createdAt and updatedAt fields
});

eventSchema.pre(/^find/, function (next) {
    this.populate('eventOrganizer', 'name email');
    next();
})

const Event = mongoose.model('Event', eventSchema);
export default Event;