<p align="center">
  <img src="public/codelab.png" alt="CodeLab Logo" width="700"/>
</p>

# CodeLab - Real-time Collaborative Code Editor

CodeLab is a real-time collaborative code editor that allows multiple users to code together in the same virtual room. Built with React, Socket.IO, and CodeMirror, it provides a seamless coding experience with real-time synchronization.

## Features

- Real-time code synchronization
- Multiple users can join the same room
- Python syntax highlighting
- Auto-closing brackets and tags
- Copy room ID functionality
- User presence indicators
- Clean and intuitive UI

## Tech Stack

- Frontend: React
- Backend: Node.js, Express
- Real-time Communication: Socket.IO
- Code Editor: CodeMirror
- Styling: CSS
- State Management: React Hooks

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd codelab
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```
REACT_APP_BACKEND_URL=http://localhost:5000
```

4. Start the development server
```bash
# Start the backend server
npm run server:dev

# In a new terminal, start the frontend
npm start
```

The application will be available at `http://localhost:3000`

## Usage

1. Visit the homepage
2. Create a new room or join an existing one with a room ID
3. Share the room ID with others to collaborate
4. Start coding together in real-time

## Development Scripts

- `npm start` - Start the React development server
- `npm run server:dev` - Start the backend server with hot-reload
- `npm run server:prod` - Start the backend server in production mode
- `npm run build` - Create a production build
- `npm test` - Run tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built by Pratham
- Uses CodeMirror for the code editor
- Socket.IO for real-time communication
- React for the frontend framework
