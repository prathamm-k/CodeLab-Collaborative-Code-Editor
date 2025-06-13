
![CodeLab Logo](public/codelab.png)

# CodeLab - Real-time Collaborative Code Editor

CodeLab is a real-time collaborative code editor that enables multiple users to code together in a shared virtual room. Built with React, Socket.IO, and CodeMirror, it offers a seamless coding experience with real-time synchronization, Python code execution, and a modern UI.

## Features

- Real-time code synchronization across multiple users
- Collaborative coding rooms with unique IDs
- Python syntax highlighting and code execution
- Auto-closing brackets and tags
- User presence indicators with avatars
- Responsive and intuitive UI with output panel
- Download code as `.py` files

## Tech Stack

- **Frontend**: React, React Router, React Hot Toast
- **Backend**: Node.js, Express
- **Real-time Communication**: Socket.IO
- **Code Editor**: CodeMirror
- **Styling**: CSS
- **State Management**: React Hooks

## Prerequisites

- **Node.js**: Version 18.x (LTS recommended, v18.20.4 as of June 2025)
- **npm**: Version 8.x or higher (included with Node.js v18)
- A modern web browser (Chrome, Firefox, Edge, or Safari)

### Verify Node.js and npm Versions

Check your installed versions by running:

```bash
node -v
npm -v
```

- **Expected Output**:
  - `node -v`: Should output `v18.x.x` (e.g., `v18.20.4`)
  - `npm -v`: Should output `8.x.x` or higher (e.g., `8.19.4`)

### Handling Version Mismatches

If your Node.js or npm versions do not match the recommended versions:

1. **Install Node.js v18**:

   - Use a version manager like `nvm` (Node Version Manager) to avoid conflicts:

     ```bash
     # Install nvm (follow instructions for your OS from https://github.com/nvm-sh/nvm)
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
     # Install and use Node.js v18
     nvm install 18
     nvm use 18
     ```
   - Alternatively, download Node.js v18 from nodejs.org and install it manually.

2. **Update npm**:

   - If npm is outdated, update it globally:

     ```bash
     npm install -g npm@latest
     ```

3. **Older Node.js Versions**:

   - If you must use an older version (e.g., Node.js v14 or v16), you may encounter dependency issues with modern packages. To mitigate:
     - Run `npm install --legacy-peer-deps` to bypass peer dependency conflicts.
     - Update `package.json` to use compatible versions of `react`, `socket.io-client`, and `codemirror` if errors persist.
     - Example: For Node.js v14, pin `react` and `react-dom` to `~17.0.2`.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/prathamm-k/CodeLab-Collaborative-Code-Editor.git
   cd codelab
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

   - If errors occur, try `npm install --legacy-peer-deps` or ensure Node.js v18 is active.

3. **Set Up Environment Variables**:

   - Create a `.env` file in the root directory:

     ```bash
     echo "REACT_APP_BACKEND_URL=http://localhost:5000" > .env
     ```

## Running the Application

1. **Start the Backend Server**:

   - In a terminal, run:

     ```bash
     npm run server:dev
     ```
   - This starts the Node.js/Express server with Socket.IO on `http://localhost:5000`.

2. **Start the Frontend Development Server**:

   - In a new terminal, run:

     ```bash
     npm start
     ```
   - This starts the React app, which will open at `http://localhost:3000` in your default browser.

3. **Access the Application**:

   - Open `http://localhost:3000` in your browser.
   - Create a new room or join an existing one using a room ID.
   - Share the room ID with collaborators to start coding together.

## Usage

1. On the homepage, enter a username and either:
   - Create a new room (generates a unique room ID).
   - Join an existing room by pasting a room ID.
2. In the editor:
   - Write Python code, which syncs in real-time with other users.
   - Run code using the "Run" button or `Ctrl+Enter`.
   - Download code as a `.py` file using the "Download" button or `Ctrl+S`.
   - Copy the room ID or leave the room using the sidebar buttons.
3. The output panel displays the result of executed Python code.

## Development Scripts

- `npm start`: Starts the React development server (frontend).
- `npm run server:dev`: Starts the backend server with hot-reload.
- `npm run server:prod`: Starts the backend server in production mode.
- `npm run build`: Creates a production build of the frontend.
- `npm test`: Runs tests (if configured).

## Troubleshooting

- **Backend Connection Issues**:
  - Ensure the backend is running on `http://localhost:5000`.
  - Verify `REACT_APP_BACKEND_URL` in `.env` matches the backend URL.
- **Dependency Errors**:
  - Delete `node_modules` and `package-lock.json`, then run `npm install` again.
  - Use Node.js v18 to avoid compatibility issues.
- **Port Conflicts**:
  - If `3000` or `5000` are in use, change the ports in `package.json` or `.env`.
- **CodeMirror Not Rendering**:
  - Ensure all CodeMirror dependencies and modes are installed (`codemirror`, `codemirror/mode/python`).

## Contributing

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:

   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built by Pratham
- Powered by CodeMirror for the code editor
- Socket.IO for real-time communication
- React for the frontend framework