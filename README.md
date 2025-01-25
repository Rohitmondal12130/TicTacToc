

# Tic-Tac-Toe Game (MERN Stack)

This is a **Tic-Tac-Toe** game built with the **MERN Stack** (MongoDB, Express, React, Node.js). The project includes user authentication, JWT-based login system, and an interactive game interface.

## Features

- User registration and login with JWT authentication
- Tic-Tac-Toe game board with real-time game state tracking
- MongoDB for storing user data and game state
- React frontend with Axios to interact with the backend API
- Protected routes for game access (login required)

## Tech Stack

- **Frontend:**
  - React
  - Axios
  - React Router DOM

- **Backend:**
  - Node.js
  - Express
  - MongoDB (Mongoose)
  - JWT Authentication
  - Bcrypt for Password Hashing

- **Tools:**
  - Git and GitHub for version control
  - Heroku (for backend deployment)
  - Netlify (for frontend deployment)

## Installation

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Clone the repository

Clone this repository to your local machine:

```bash
git clone https://github.com/Rohitmondal12130/TicTacToc.git
cd TicTacToc
```

### Backend Setup

1. Navigate to the backend folder:
   
   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following:

   ```
   PORT=5000
   MONGO_URI=your_mongo_database_uri
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:

   ```bash
   npm start
   ```

The backend will now be running on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm start
   ```

The frontend will now be running on `http://localhost:3000`.

## Usage

1. **Registration and Login:**
   - Go to the **login** or **register** page.
   - Create a new user or login with existing credentials.

2. **Playing the Game:**
   - After logging in, you will be redirected to the game screen.
   - You can make moves on the Tic-Tac-Toe board.
   - The game will automatically detect win conditions and handle the game state.

## Deployment

### Backend (Heroku)

1. Push your backend to a Heroku app:

   ```bash
   heroku create
   git push heroku main
   ```

2. Set the environment variables on Heroku:

   ```bash
   heroku config:set JWT_SECRET=your_jwt_secret_key MONGO_URI=your_mongo_database_uri
   ```

### Frontend (Netlify)

1. Deploy your React app on [Netlify](https://www.netlify.com/).
2. Set the environment variable `REACT_APP_API_URL` to point to the backend API URL.

