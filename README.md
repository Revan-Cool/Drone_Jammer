
Built by https://www.blackbox.ai

---

# Drone Control OS

## Project Overview
Drone Control OS is a desktop application built using Electron that allows users to control drones through a user-friendly interface. The application facilitates functionalities such as logging in, disconnecting drones, controlling them, identifying owners, and mapping their locations.

## Installation
1. **Clone or download the repository:**
   ```bash
   git clone [repository-url]
   ```
2. **Navigate to the project directory:**
   ```bash
   cd drone-control-os
   ```
3. **Install Node.js dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```
4. **Run the application:**
   ```bash
   npm start
   ```

## Usage
1. Upon launching the application, you'll see a login form.
2. Enter your username and password, then click "Log In".
3. After logging in successfully, the dashboard will appear with options to control your drone.
4. Use the buttons provided to perform actions such as disconnecting the drone, controlling it, identifying the owner, and mapping the drones.

## Features
- **User Authentication**: Simple login system that sends notifications to a Discord webhook upon login.
- **Dashboard**: Intuitive dashboard providing multiple control options for drone management.
- **Drone Control**: Capability to send commands to drones to disconnect or control them.
- **Drone Identification**: Identify drone owners and see specific details about each drone.
- **Mapping**: Visualization of the detected drones' locations and statuses.

## Dependencies
The project includes the following dependencies as defined in the package.json file:
- `electron`: For building the desktop application.
- `express`: Used for creating the backend server.
- `cors`: Middleware to enable CORS for API requests.

## Project Structure
```
drone-control-os/
├── index.html           # Main HTML file for the front-end UI.
├── electron-main.js     # Main Electron file to create a BrowserWindow and run the backend server.
└── package.json         # Node.js dependencies and scripts.
```

## Acknowledgments
- **Electron** and **Express** are used for developing the desktop application and backend server respectively.
- The interface utilizes **Tailwind CSS** for styling and icons from **Font Awesome**.

For any further questions or contributions, feel free to reach out or create a pull request!