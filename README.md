# MERN Basketball Scoreboard built with Cursor AI

## Project Overview
This project is a basketball scoreboard application built using the MERN stack (MongoDB, Express.js, React, Node.js)  entirely with Cursor AI, and with some studying from YouTube. It allows users to track scores, manage teams, and view game statistics in real-time, in the future.

My goal with this project is to motivate throught sports, coding and building micro SaaS, and give access to a cross-device tool, shareable and accessible anywhere in the world with a live score from a basketball game.

It's just a start version that I could deploy it and make it live to work on the upgrades and new features.

* This is a work in progress so it may have some bugs.

Dashboard
![image](https://github.com/user-attachments/assets/62693e41-7412-46a8-a59b-64de7cf58142)

Scoreboard
![image](https://github.com/user-attachments/assets/ec8509d6-d9f2-4e16-8b21-9dffe9acfe68)

# Live Demo

- Scoreboard Control [https://cursor-mern-basketball-scoreboard.onrender.com]
- Scoreboard [https://cursor-mern-basketball-scoreboard.onrender.com/scoreboard]

* Deployed at Render.com with a free account, so it may not be working sometimes.

## Technologies Used
- **MongoDB Atlas**: Cloud-hosted MongoDB service for storing game and user data.
- **Express.js**: Web framework for Node.js to build the backend API.
- **React**: Frontend library for building user interfaces.
- **Node.js**: JavaScript runtime for server-side development.
- **WebSockets**: For real-time communication between the server and clients.

## Features
- Real-time score updates in different devices using WebSockets
- Dashboard for managing games and teams. (SOON)
- User authentication and authorization. (SOON)
- Team management and statistics tracking. (SOON)
- Responsive design for mobile and desktop users. (SOON)

## Environments
- **Development**: Local environment for development and testing.
- **Production**: Deployed on Render.com with a free account

## Getting Started
### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB Atlas account (for cloud-hosted database).

### Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/edu-damasceno/cursor-mern-basketball-scoreboard.git
   cd cursor-mern-basketball-scoreboard
   ```

2. Install dependencies and build the project:
   ```
   npm run build
   ```
   This command will install dependencies for both the backend and frontend, and build the frontend.

3. Start the backend server:
   ```
   npm start
   ```
   This will start the backend server using Node.js.

4. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```

## Deployment

This project is set up for deployment on render.com. The `build` script in the root `package.json` file is configured to install dependencies for both backend and frontend, and build the frontend. This setup allows for easy deployment of the full-stack application on platforms like render.com.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License.

## Acknowledgments
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MERN Stack Documentation](https://www.mongodb.com/mern-stack)
- [WebSocket Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
