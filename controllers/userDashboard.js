import eventModel from '../models/eventModel.js'; // Adjust path
import ticketModel from '../models/ticketModel.js'; // Adjust path
import wishlistModel from '../models/wishlistModel.js'; // Adjust path

async function dashboard(req, res) {
    try {
        const user = req.user; // Passed from isLoggedIn middleware
        const userId = user._id;

        // Data to return based on user role
        let dashboardData = {};

        // Common data for all roles
        const wishlist = await wishlistModel.find({ user: userId }).populate('event', 'eventName eventDate').populate('ticket', 'ticketName ticketPrice');
        dashboardData.wishlist = wishlist;

        // Role-specific data
        if (user.role === 'organisor') {
            const events = await eventModel.find({ eventOrganizer: userId }).select('eventName eventDate eventStatus ticketsSold totalSales');
            dashboardData.events = events;
            dashboardData.stats = {
                totalEvents: events.length,
                totalSales: events.reduce((sum, e) => sum + e.totalSales, 0),
            };
        } else if (user.role === 'user') {
            const tickets = await ticketModel.find({ ticketOwner: userId }).populate('ticketEvent', 'eventName eventDate');
            dashboardData.tickets = tickets;
            dashboardData.stats = {
                totalTickets: tickets.length,
                upcomingEvents: tickets.filter(t => new Date(t.ticketEvent.eventDate) > new Date()).length,
            };
        } else if (user.role === 'admin') {
            const allEvents = await eventModel.find().select('eventName eventStatus totalSales');
            const allTickets = await ticketModel.find().select('ticketEvent status');
            dashboardData.events = allEvents;
            dashboardData.tickets = allTickets;
            dashboardData.stats = {
                totalEvents: allEvents.length,
                totalTickets: allTickets.length,
                totalSales: allEvents.reduce((sum, e) => sum + e.totalSales, 0),
            };
        }

        return res.status(200).json({
            message: 'Dashboard data retrieved successfully',
            user: { id: user._id, name: user.name, role: user.role },
            dashboard: dashboardData,
        });
    } catch (err) {
        console.error('Error in dashboard:', err.message);
        return res.status(500).json({ error: 'Server error' });
    }
}

export { dashboard };