# MERN Basketball Scoreboard

## Project Overview
This project is a basketball scoreboard application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to track scores, manage teams, and view game statistics in real-time.

## Technologies Used
- **MongoDB**: NoSQL database for storing game and user data.
- **Express.js**: Web framework for Node.js to build the backend API.
- **React**: Frontend library for building user interfaces.
- **Node.js**: JavaScript runtime for server-side development.
- **WebSockets**: For real-time communication between the server and clients.

## Features
- Real-time score updates using WebSockets.
- User authentication and authorization. (SOON)
- Team management and statistics tracking. (SOON)
- Responsive design for mobile and desktop users. (SOON)

## Environments
- **Development**: Local environment for development and testing.
- **Production**: Deployed on AWS Elastic Beanstalk for live usage.

## Getting Started
### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB instance (local or cloud).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mern-basketball-scoreboard.git
   cd mern-basketball-scoreboard
   ```

2. Install dependencies for the server:
   ```bash
   cd server
   npm install
   ```

3. Install dependencies for the client:
   ```bash
   cd ../client
   npm install
   ```

4. Set up environment variables:
   - Rename the `.env.sample` file to `.env` in the root directory and add your configuration.

5. Start the application:
   - Start the server:
   ```bash
   cd ../server
   npm start
   ```
   - Start the client:
   ```bash
   cd ../client
   npm start
   ```

## WebSockets
This application uses WebSockets for real-time score updates. The server broadcasts score changes to all connected clients, ensuring that everyone sees the latest information without needing to refresh the page.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License.

## Acknowledgments
- [MERN Stack Documentation](https://www.mongodb.com/mern-stack)
- [WebSocket Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
