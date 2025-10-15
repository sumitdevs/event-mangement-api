# 🎟️ Event Management API

A RESTful API built with **Node.js**, **Express**, and **PostgreSQL** (without Sequelize) to manage events, users, and registrations.  

**Features:**
- Create, update, and delete users and events
- Register/unregister users for events
- Prevent duplicate registrations and overbooking
- View upcoming events with sorting
- Fetch event statistics and registered user details

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/sumitdevs/event-mangement-api.git
cd event-management-api

2️⃣ Install dependencies
npm install

3️⃣ Create .env file
PORT=3000
DB_USER='postgres'
DB_HOST='localhost'
DB_NAME='ems'
DB_PASSWORD='7808'
DB_PORT=5432

4️⃣ Setup PostgreSQL Database
CREATE DATABASE ems;

CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE events (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date TIMESTAMP NOT NULL,
  location VARCHAR(100) NOT NULL,
  capacity INT CHECK (capacity <= 1000)
);

CREATE TABLE event_registrations (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, event_id)
);

5️⃣ Run the server
npm run dev


Server runs on http://localhost:3000
.


🌐 API Endpoints
👤 User Endpoints
Method	Endpoint	Description
POST	/api/v1/user	Add a new user
GET	/api/v1/user	Fetch all users
GET	/api/v1/user/:id	Fetch a specific user
DELETE	/api/v1/user/:id	Delete a specific user

Example: Add User

POST /api/v1/user
{
  "name": "Alice Johnson",
  "email": "alice@example.com"
}


Response

{
  "message": "User added successfully",
  "user": {
    "id": "uuid",
    "name": "Alice Johnson",
    "email": "alice@example.com"
  }
}

🎫 Event Endpoints

Method	Endpoint	Description
POST	/api/v1/event	Add a new event
GET	/api/v1/event	Fetch all events (without registered users)
PATCH	/api/v1/event/:id	Update a specific event
DELETE	/api/v1/event/:id	Delete a specific event
POST	/api/v1/event/register	Register a user for an event
DELETE	/api/v1/event/cancel	Unregister a user from an event
GET	/api/v1/event/upcoming	List all upcoming events
GET	/api/v1/event/stats/:id	Fetch statistics for a specific event
GET	/api/v1/event/all	Fetch all events with registered user details
GET	/api/v1/event/:id	Fetch a specific event with registered users

Example: Add Event

POST /api/v1/event
{
  "title": "Tech Conference 2025",
  "date": "2025-11-25T10:00:00Z",
  "location": "Bangalore",
  "capacity": 500
}


Response

{
  "message": "Event created successfully",
  "event": {
    "id": "uuid",
    "title": "Tech Conference 2025",
    "date": "2025-11-25T10:00:00Z",
    "location": "Bangalore",
    "capacity": 500
  }
}


Example: Register for Event

POST /api/v1/event/register
{
  "user_id": "user-uuid",
  "event_id": "event-uuid"
}


Response

{
  "message": "User registered successfully for event."
}


Example: Cancel Registration

DELETE /api/v1/event/cancel
{
  "user_id": "user-uuid",
  "event_id": "event-uuid"
}


Response

{
  "message": "User registration cancelled successfully."
}


Example: Event Stats

GET /api/v1/event/stats/event-uuid


Response

{
  "event_id": "event-uuid",
  "total_registrations": 120,
  "remaining_capacity": 380,
  "percentage_used": 24
}


Example: List Upcoming Events

GET /api/v1/event/upcoming


Response

[
  {
    "id": "event-uuid",
    "title": "AI & ML Summit",
    "date": "2026-01-15T09:30:00Z",
    "location": "Delhi",
    "capacity": 1000
  }
]


Example: Fetch All Events with Registered Users

GET /api/v1/event/all


Response

[
  {
    "id": "event-uuid",
    "title": "Tech Conference 2025",
    "date": "2025-11-25T10:00:00Z",
    "location": "Bangalore",
    "capacity": 500,
    "registrations": [
      { "id": "user-uuid", "name": "Alice", "email": "alice@example.com" },
      { "id": "user-uuid2", "name": "Bob", "email": "bob@example.com" }
    ]
  }
]


Example: Fetch Specific Event with Registered Users

GET /api/v1/event/event-uuid


Response

{
  "id": "event-uuid",
  "title": "Tech Conference 2025",
  "date": "2025-11-25T10:00:00Z",
  "location": "Bangalore",
  "capacity": 500,
  "registrations": [
    { "id": "user-uuid", "name": "Alice", "email": "alice@example.com" }
  ]
}

🧪 Testing Tools

Postman or Thunder Client to test API endpoints

pgAdmin to manage PostgreSQL