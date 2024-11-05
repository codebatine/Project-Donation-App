# Project Donation App

This is a donation platform built for a hackathon. The app allows users to sign up, log in, create donation projects, and support projects by making donations. MongoDB is used for data storage, and Langchain is integrated for basic chatbot functionalities.

## Features

- **User Authentication:** Signup and login with hashed passwords
- **Project Creation:** Users can create donation projects and set donation goals
- **Donation Tracking:** Shows donation progress towards each project's goal
- **Chat Assistant:** Basic chatbot assistance powered by Langchain (testing mode)

## Technologies Used

- **Frontend:** React, Sass
- **Backend:** Node.js, Express
- **Database:** MongoDB (MongoDB Atlas recommended for deployment)
- **AI Integration:** Langchain

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB (either local or MongoDB Atlas for cloud hosting)
- Langchain API key

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/codebatine/Project-Donation-App.git
   ```

For both backend and frontend, run the following commands from their respective directories:

# In the backend folder

```bash
cd backend
npm install
```

# In the frontend folder

```bash
cd frontend
npm install
```

## Set up Environment Variables:

In the backend folder, create a .env file and add the following environment variables:

```bash
MONGO_URI=<Your_MongoDB_URI>
JWT_SECRET=<Your_JWT_Secret>
LANGCHAIN_TRACING_V2=true
LANGCHAIN_ENDPOINT=https://api.smith.langchain.com
LANGCHAIN_API_KEY=<Your_Langchain_API_Key>
LANGCHAIN_PROJECT=donation-app
```

## Start the Servers:

First, make sure MongoDB is running, either locally or on MongoDB Atlas.

Start the backend server:

```bash
cd backend
npm start
```

## Start the frontend server:

```bash
cd frontend
node server.js
```

## Access the Application:

The app should now be accessible at http://localhost:3000, and the backend API will be running on http://localhost:5000.

## API Endpoints

### Authentication

POST /api/auth/signup - Register a new user

POST /api/auth/login - Log in as an existing user

### Projects

POST /api/projects - Create a new donation project

GET /api/projects - Get all projects

PUT /api/projects/:id/donate - Make a donation to a project

### Chatbot

POST /api/chatbot - Interact with the Langchain-powered chatbot
