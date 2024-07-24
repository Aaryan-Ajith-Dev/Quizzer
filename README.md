# Quizzer

Quizzer is a web application where users can create and take quizzes. The platform offers a secure user experience with authentication, quiz management, and the ability to take quizzes. Future updates will include anti-cheating mechanisms and a results page after quiz attempts.

## Features

- **User Authentication**: Secure login and registration process.
- **Create Quizzes**: Users can create quizzes with multiple questions and options.
- **Take Quizzes**: Users can take quizzes and have their responses recorded.
- **Manage Quizzes**: CRUD operations for quizzes, allowing users to edit, delete, and view their quizzes.

## Upcoming Features

- **Anti-Cheating Mechanisms**: Measures to prevent cheating during quizzes.
- **Result Page**: Displaying results after a quiz is attempted.

## Technologies Used

- **Frontend**: React.js, Material-UI, React-Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Authorization**: BCrypt

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database setup.

### Installation

1. **Clone the repository**
    ```sh
    git clone https://github.com/Aaryan-Ajith-Dev/quizzer.git
    cd quizzer
    ```

2. **Install backend dependencies**
    ```sh
    cd Just-Another-API
    npm install
    ```

3. **Install frontend dependencies**
    ```sh
    cd ../frontend
    npm install
    ```

### Running the Application

1. **Start the backend server**
    ```sh
    cd Just-Another-API
    npm start
    ```

2. **Start the frontend server**
    ```sh
    cd ../frontend
    npm start
    ```

3. **Access the application**
    Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### User Authentication

- **POST** `/auth/register` - Register a new user.
- **POST** `/auth/login` - Login for existing users.

### Quiz Management

- **GET** `/quiz/attempt/:id` - Gets quiz with id `id`.
- **PUT** `/quiz` - Create a new quiz under the sender.
- **POST** `/quiz/:id` - Update an existing quiz.
- **DELETE** `/quiz/:id` - Delete a quiz.

### Quiz Taking

- **POST** `/quiz/attempt` - Submit quiz answers.
