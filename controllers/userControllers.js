import ticketModel from "../models/ticketModel.js";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import eventModel from "../models/eventModel.js";
import wishlistModel from "../models/wishlistModel.js";


async function purchasedTickets(req, res) {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Please login" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        console.log(user);
        const tickets = await ticketModel.find({ ticketOwner: user._id });
        res.status(200).json({ tickets });
    } catch (err) {
        console.log(err.message);
    }
}

async function buyTicket() {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Please login" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        const ticket = await ticketModel.findById(req.params.id);
        const event = await eventModel.findById(ticket.ticketEvent);
        ticketType = ticket.ticketType;
        event.ticketType -= 1;
        event.totalSales += ticket.ticketPrice;
        await ticket.save();
        res.status(200).json({ message: "Ticket purchased successfully" });
    } catch (err) {
        console.log(err.message);
    }
}

async function eventHistory(req, res) {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Please login" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        const events = await eventModel.find({ organisor: user._id });
        res.status(200).json({ events });
    } catch (err) {
        console.log(err.message);
    }
}

async function wishlist(req, res) {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Please login" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        const wishlist = await wishlistModel.find({ user: user._id });
        res.status(200).json({ wishlist });
    } catch (err) {
        console.log(err.message);
    }
}



export { purchasedTickets, buyTicket, eventHistory, wishlist };