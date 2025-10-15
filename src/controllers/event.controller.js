import { 
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEventById,
    getEventByTitle
 } from "../models/event.model.js";

 import { 
    cancelRegistration,
    registerUser,
    isUserRegistered,
    countRegistrations,
    getAllEventsWithUsers,
    getUsersByEvent,
 } from "../models/registered.model.js";

export const addEvent = async (req, res) => {
    try {
        const { title, date, location, capacity } = req.body;
        if (!title || !date || !location || !capacity) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const eventExit = await getEventByTitle(title, date);

         if (eventExit) {
            return res.status(400).json({ message: 'event is already exist' });
        }
        if (capacity>1000) {
            return res.status(400).json({ message: 'capacity is greater than 1000' });
        }
        const newEvent = await createEvent(title, date, location, capacity);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
};

export const fetchAllEvents = async (req, res) => {
    try {
        const events = await getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
};

export const getEventDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await getEventById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        const registrations = await getUsersByEvent(id);
        res.status(200).json({ ...event, registrations });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event details', error: error.message });
    }
};

export const updateEventDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, location, capacity } = req.body;

        const existingEvent = await getEventById(id);
        if (!existingEvent) return res.status(404).json({ message: 'Event not found' });

        const updatedEvent = await updateEvent(id, title, date, location, capacity);
        res.status(200).json({ message: 'Event updated successfully', updatedEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const existingEvent = await getEventById(id);
        if (!existingEvent) return res.status(404).json({ message: 'Event not found' });

        const deletedEvent = await deleteEventById(id);
        res.status(200).json({ message: 'Event deleted successfully', deletedEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
};


export const registerForEvent = async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        const event = await getEventById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (new Date(event.date) < new Date())
        return res.status(400).json({ message: 'Cannot register for past events' });

        const currentCount = await countRegistrations(eventId);
        if (currentCount >= event.capacity)
        return res.status(400).json({ message: 'Event is full' });

        const alreadyRegistered = await isUserRegistered(userId, eventId);
        if (alreadyRegistered)
        return res.status(400).json({ message: 'User already registered for this event' });

        const registration = await registerUser(userId, eventId);
        res.status(201).json({ message: 'User registered successfully', registration });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};


export const getEventStats = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await getEventById(id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        const totalRegistrations = await countRegistrations(id);
        const remainingCapacity = event.capacity - totalRegistrations;
        const percentUsed = ((totalRegistrations / event.capacity) * 100).toFixed(2);

        res.status(200).json({
        totalRegistrations,
        remainingCapacity,
        percentUsed: `${percentUsed}%`,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event stats', error: error.message });
    }
};

export const listUpcomingEvents = async (req, res) => {
    try {
        const events = await getAllEvents();
        const upcoming = events
        .filter(event => new Date(event.date) > new Date())
        .sort((a, b) => {
        if (new Date(a.date) !== new Date(b.date)) {
            return new Date(a.date) - new Date(b.date); 
        }
        return a.location.localeCompare(b.location); 
        });
        res.status(200).json(upcoming);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching upcoming events', error: error.message });
    }
};

export const cancelUserRegistration = async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        const registered = await isUserRegistered(userId, eventId);
        if (!registered) {
        return res.status(400).json({ message: 'User is not registered for this event' });
        }

        const result = await cancelRegistration(userId, eventId);
        if (!result) {
        return res.status(400).json({ message: 'Registration not found or already canceled' });
        }

        res.status(200).json({ message: 'Registration canceled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling registration', error: error.message });
    }
};

export const fetchAllEventsWithUsers = async (req, res) => {
    try {
        const events = await getAllEventsWithUsers();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
};