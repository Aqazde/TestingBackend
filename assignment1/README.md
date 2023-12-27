# Sign up/Login Page with Backend and PostgreSQL Database

This project demonstrates a simple user authentication system built using HTML, CSS, JavaScript (client-side), Node.js with Express (server-side), bcrypt for password hashing, and PostgreSQL for the database.

## Features

- **Signup and Login Forms**: Dual forms for user registration (signup) and authentication (login).
- **Password Validation**: Checks for valid email format and password matching on signup.
- **User Registration**: Stores user information securely in a PostgreSQL database after hashing the password.
- **User Authentication**: Validates user login by comparing the hashed password stored in the database.

## Project Structure

- **aa.html**: HTML file containing the frontend structure and forms for login and signup.
- **server2.js**: Node.js server file that handles endpoints for signup and login, interacts with the PostgreSQL database, and performs user authentication.
- **Style.css**: External CSS file styling the UI elements for a pleasant user experience.
- **Database Schema**: Defines the PostgreSQL database schema with a `users` table storing user information.

## Setup Instructions

1. Clone the repository.
2. Install Node.js and PostgreSQL if not already installed.
3. Create a PostgreSQL database named `postgres`.
4. Execute the SQL script provided to create the `users` table.
5. Update the database configuration in `server2.js` if necessary (username, password, port, etc.).
6. Run `npm install` to install the required dependencies.
7. Start the server using `node server2.js`.
8. Access the application at `http://localhost:3000/`.

## Usage

- Access the `aa.html` file in a web browser to interact with the signup and login forms.
- Fill in valid email addresses and passwords to register and log in.
- The system redirects to a specific URL upon successful signup or login.

## Technologies Used

- HTML, CSS, JavaScript (Frontend)
- Node.js, Express (Backend)
- PostgreSQL (Database)
- bcrypt (Password hashing)

