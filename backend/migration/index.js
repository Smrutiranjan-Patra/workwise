const seats = `CREATE TABLE IF NOT EXISTS seats (
    id SERIAL PRIMARY KEY,                -- Auto-incremented seat ID
    isBooked BOOLEAN DEFAULT FALSE,        -- Boolean to track if the seat is booked (default to false)
    rowNumber INT,                         -- Row number for the seat
    seatNumber INT                         -- Seat number within the row
)`;
const users = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,                -- Auto-incremented user ID
    name VARCHAR(100) NOT NULL,           -- User's name
    email VARCHAR(100) UNIQUE NOT NULL,   -- Unique email address
    password_hash VARCHAR(255) NOT NULL   -- Hashed password
);`;

module.exports = { seats, users };
