import eventModel from "../models/eventModel.js";
async function createEvent(req, res) {
    try {
        const { eventName, eventDescription, eventDate, eventType, eventTime, eventLocation } = req.body;
        console.log(req.body);
        // if (!eventName || !eventDescription || !eventDate || !eventType || !eventTime || !eventLocation) {
        //     return res.status(400).json({ error: "All fields are required" });
        // }
        const event = await eventModel.create(
            {
                eventName,
                eventDescription,
                eventDate,
                eventTime,
                eventLocation,
                eventOrganizer: req.user._id,
                eventType,
            }
        );
        res.status(201).json({ message: "Event created", event });
    } catch (err) {
        res.status(500).json({ error: "Server error", message: err.message });
    }
}

async function updateEvent(req, res) {
    try {
        const { eventName, eventDescription, eventDate, eventType, eventTime, eventLocation } = req.body;
        const event = await eventModel.findByIdAndUpdate(
            req.params.id,
            {
                eventName,
                eventDescription,
                eventDate,
                eventTime,
                eventLocation,
                eventType,
            },
            { new: true }
        );
        res.status(200).json({ message: "Event updated", event });
    }
    catch (err) {
        res.status(500).json({ error: "Server error", message: err.message });
    }
};

async function deleteEvent(req, res) {
    try {
        await eventModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Event deleted" });
    }
    catch (err) {
        res.status(500).json({ error: "Server error", message: err.message });
    }
}

async function getAllEvents(req, res) {
    try {
        const events = await eventModel.find();
        res.status(200).json({ events });
    }
    catch (err) {
        res.status(500).json({ error: "Server error", message: err.message });
    }
}

async function getEvent(req, res) {
    try {
        const event = await eventModel.findById(req.params.id);
        res.status(200).json({ event });
    }
    catch (err) {
        res.status(500).json({ error: "Server error", message: err.message });
    }
}

export { createEvent, updateEvent, deleteEvent, getAllEvents, getEvent };