import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review is required']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: 1,
        max: 5
    },
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: [true, 'Event is required']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
})

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'event',
        select: 'eventName'
    }).populate(
        {
            path: 'user',
            select: ['name', 'profilePic']
        }
    );
})

const reviewModel = mongoose.model('Review', reviewSchema);

export default reviewModel;