import eventModel from '../models/eventModel.js'; // Adjust path
import ticketModel from '../models/ticketModel.js'; // Adjust path

async function purchasedTickets(req, res) {
    try {
        const eventId = req.params.eventid; // From route /eventDetails/:eventid
        if (!eventId) {
            return res.status(400).json({ error: 'Event ID is required' });
        }

        const event = await eventModel.findById(eventId).select('eventName eventDate eventLocation ticketsSold totalSales');
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const tickets = await ticketModel.find({ ticketEvent: eventId })
            .populate('ticketOwner', 'name email')
            .select('ticketName ticketPrice ticketOwner status ticketType');

        if (!tickets.length) {
            return res.status(200).json({
                message: 'No tickets sold for this event yet',
                event: {
                    id: event._id,
                    name: event.eventName,
                    date: event.eventDate,
                    location: event.eventLocation,
                },
                tickets: [],
                stats: {
                    totalSold: event.ticketsSold,
                    totalSales: event.totalSales,
                },
            });
        }

        const ticketStats = {
            totalSold: tickets.length,
            totalSales: tickets.reduce((sum, ticket) => sum + ticket.ticketPrice, 0),
            byType: {
                General: tickets.filter(t => t.ticketType === 'General').length,
                VIP: tickets.filter(t => t.ticketType === 'VIP').length,
                EarlyBird: tickets.filter(t => t.ticketType === 'Early Bird').length,
                Group: tickets.filter(t => t.ticketType === 'Group').length,
            },
        };

        if (event.ticketsSold !== ticketStats.totalSold || event.totalSales !== ticketStats.totalSales) {
            event.ticketsSold = ticketStats.totalSold;
            event.totalSales = ticketStats.totalSales;
            await event.save();
        }

        return res.status(200).json({
            message: 'Purchased tickets retrieved successfully',
            event: {
                id: event._id,
                name: event.eventName,
                date: event.eventDate,
                location: event.eventLocation,
            },
            tickets: tickets.map(ticket => ({
                id: ticket._id,
                name: ticket.ticketName,
                price: ticket.ticketPrice,
                owner: ticket.ticketOwner ? { name: ticket.ticketOwner.name, email: ticket.ticketOwner.email } : null,
                status: ticket.status,
                type: ticket.ticketType,
            })),
            stats: ticketStats,
        });
    } catch (err) {
        console.error('Error in purchasedTickets:', err.message);
        return res.status(500).json({ error: 'Server error' });
    }
}

export { purchasedTickets };