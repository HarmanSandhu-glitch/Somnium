import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: [true, 'Event is required']
    },
    ticket: {
        type: mongoose.Schema.ObjectId,
        ref: 'Ticket',
        required: [true, 'Ticket is required']
    }
})

const wishlistModel = mongoose.model('Wishlist', wishlistSchema);

export default wishlistModel;