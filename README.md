# Real-Time Chat Application with Node.js, Express.js, and Socket.IO

## **Objective -**

Build a real-time chat application using Node.js, Express.js, and Socket.IO. This project aims to create a dynamic chat experience, allowing multiple users to join chat rooms and communicate seamlessly in real-time.

## **Requirements -**

To get started, ensure you have the following:

  - Basic Node.js project with Express.js and Socket.IO.
  - HTML, CSS, and JavaScript for the web interface.
  - Proper NPM packages installed for dependencies.

## **Getting Started -**

   1. Clone this repository to your local machine.

     - git clone https://github.com/siddharthsonii/Real-Time-Chat-Application.git

   2. Navigate to the project directory.
      
     - cd chat-application

   3. Install dependencies.
      
     - npm install express moment socket.io http path

   4. Run the application.
      
     - node index.js

   5. Access the application in your browser at http://localhost:8000.

## **Project Structure -**

    |-- helper
        |-- helper.js
    |-- node_modules
    |-- public
        |-- css
            |-- chat.css
            |-- index.css
        |-- js
            |--main.js
        |-- chat.html
        |-- index.html
    |-- index.js
    |-- package-lock.json
    |-- package.json
    |-- README.md


## **Functionality -**

  1. User Interface:
     - Simple web interface to join chat rooms and send messages.
  2. Server-Side Logic:
     - Manage chat rooms, user connections, and message broadcasting.
  3. Socket.IO Events (Server-Side):
     - `connection`: Handle a new user connection.
     - `join`: Add a user to a specific chat room.
     - `message`: Broadcast a message to all users in a chat room.
     - `disconnect`: Handle user disconnections and clean up user data.
  4. Socket.IO Event Listeners (Client-Side):
     - Implement JavaScript listeners to update the user interface in real time.
  5. Error Handling:
     - Proper error handling for invalid chat room names, user names, and other potential issues.

## **Testing -**

   Test the chat application by opening multiple browser instances to simulate multiple users.

Feel free to contribute, report issues, or suggest improvements!
