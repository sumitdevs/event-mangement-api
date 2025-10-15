import pool from "../config/db.js";

export const registerUser = async (userId, eventId) => {
    const query = `
    INSERT INTO event_registrations (user_id, event_id)
    VALUES ($1, $2)
    RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [userId, eventId]);
        return rows[0];
    } catch (error) {
        console.error('Error registering user:', error.message);
        throw error;
    }
};

export const cancelRegistration = async (userId, eventId) => {
    const query = `
    DELETE FROM event_registrations
    WHERE user_id = $1 AND event_id = $2
    RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [userId, eventId]);
        return rows[0];
    } catch (error) {
        console.error('Error canceling registration:', error.message);
        throw error;
    }
};


export const isUserRegistered = async (userId, eventId) => {
    try {
        const query = `
        SELECT * FROM event_registrations
        WHERE user_id = $1 AND event_id = $2;
        `;
        const { rows } = await pool.query(query, [userId, eventId]);
        return rows.length > 0;
    } catch (error) {
        console.error('Error checking registration:', error.message);
        throw error;
    }
};

export const countRegistrations = async (eventId) => {
    try {
        const query = `
        SELECT COUNT(*) FROM event_registrations WHERE event_id = $1;
        `;
        const { rows } = await pool.query(query, [eventId]);
        return parseInt(rows[0].count);
    } catch (error) {
        console.error('Error counting registrations:', error.message);
        throw error;
    }
};

export const getUsersByEvent = async (eventId) => {
    const query = `
    SELECT u.id, u.name, u.email
    FROM users u
    INNER JOIN event_registrations er ON u.id = er.user_id
    WHERE er.event_id = $1;
    `;

    try {
        const { rows } = await pool.query(query, [eventId]);
        return rows;
    } catch (error) {
        console.error("Error fetching users for event:", error.message);
        throw error;
    }
};

export const getAllEventsWithUsers = async () => {
    try {
        const query = `
        SELECT 
        e.id AS event_id,
        e.title,
        e.date,
        e.location,
        e.capacity,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email
        FROM events e
        LEFT JOIN event_registrations er ON e.id = er.event_id
        LEFT JOIN users u ON er.user_id = u.id
        ORDER BY e.date ASC, e.title ASC
        `;
        const { rows } = await pool.query(query);
        
        const eventsMap = {};
        rows.forEach(row => {
        if (!eventsMap[row.event_id]) {
            eventsMap[row.event_id] = {
                id: row.event_id,
                title: row.title,
                date: row.date,
                location: row.location,
                capacity: row.capacity,
                registrations: []
            };
        }

        if (row.user_id) {
            eventsMap[row.event_id].registrations.push({
                id: row.user_id,
                name: row.user_name,
                email: row.user_email
            });
        }
        });

    return Object.values(eventsMap);
} catch (error) {
    console.error('Error fetching events with users:', error.message);
    throw error;
}
};