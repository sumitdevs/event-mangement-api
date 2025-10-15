import pool from "../config/db.js";



export const createEvent = async (title, date, location, capacity) => {
    const query = `
    INSERT INTO events (title, date, location, capacity)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [title, date, location, capacity]);
        return rows[0];
    } catch (error) {
        console.error('Error inserting event:', error.message);
        throw error;
    }
};

export const getAllEvents = async () => {
    const query = 'SELECT * FROM events ORDER BY date ASC;';
    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error fetching events:', error.message);
        throw error;
    }
};

export const getEventById = async (id) => {
    const query = 'SELECT * FROM events WHERE id = $1;';
    try {
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching event by ID:', error.message);
        throw error;
    }
};

export const getEventByTitle = async (title,date) => {
    const query = 'SELECT * FROM events WHERE title = $1 AND date = $2;';
    try {
        const { rows } = await pool.query(query, [title, date]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching event by ID:', error.message);
        throw error;
    }
};

export const updateEvent = async (id, title, date, location, capacity) => {
    const query = `
    UPDATE events
    SET title = $1, date = $2, location = $3, capacity = $4
    WHERE id = $5
    RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [title, date, location, capacity, id]);
        return rows[0];
    } catch (error) {
        console.error('Error updating event:', error.message);
        throw error;
    }
};

export const deleteEventById = async (id) => {
    const query = 'DELETE FROM events WHERE id = $1 RETURNING *;';
    try {
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error deleting event:', error.message);
        throw error;
    }
};