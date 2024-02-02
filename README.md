# Voosh Application

This repository contains a simple Express.js API for user authentication and order management. The API uses MongoDB as its database and includes user registration, login, and order management endpoints.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB (Make sure MongoDB is running locally or update the database connection in the `model.js` file)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repository
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=3000
   JWT_SECRET=your_secret_key
   ```

   Replace `your_secret_key` with your desired secret key for JWT token generation.

5. Start the application:

   ```bash
   npm start
   ```

## API Endpoints

### Health Check

- **Endpoint:** `/health-check`
- **Method:** GET
- **Description:** Check the status of the API.
- **Response:**
  ```json
  {
    "status": "success",
    "message": "status is up and running !🎉"
  }
  ```

### User Registration

- **Endpoint:** `/add-user`
- **Method:** POST
- **Description:** Register a new user.
- **Request:**
  ```json
  {
    "name": "John Doe",
    "phone": 1234567890,
    "password": "secure_password"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User added successfully",
    "user": {
      "name": "John Doe",
      "phone_number": 1234567890
    }
  }
  ```

### User Login

- **Endpoint:** `/login-user`
- **Method:** POST
- **Description:** Authenticate and login a user.
- **Request:**
  ```json
  {
    "phone": 1234567890,
    "password": "secure_password"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "jwt_token_here"
  }
  ```

### Get User Orders

- **Endpoint:** `/get-order`
- **Method:** GET
- **Description:** Get orders for the authenticated user.
- **Authorization:** Bearer Token (Include the token received during login in the Authorization header)
- **Response:**
  ```json
  {
    "orders": [
      {
        "user_id": "user_id_here",
        "sub_total": 100.0,
        "phone_number": 1234567890
      }
    ]
  }
  ```

### Add User Order

- **Endpoint:** `/add-order`
- **Method:** POST
- **Description:** Add a new order for the authenticated user.
- **Authorization:** Bearer Token (Include the token received during login in the Authorization header)
- **Request:**
  ```json
  {
    "sub_total": 100.0,
    "phone_number": 1234567890
  }
  ```
- **Response:**
  ```json
  {
    "message": "Order added successfully",
    "order": {
      "user_id": "user_id_here",
      "sub_total": 100.0,
      "phone_number": 1234567890
    }
  }
  ```

## Author

- [Ashok Kumar](https://github.com/AshokChoudhary11)

Feel free to explore, modify, and use this Express API for your projects! If you encounter any issues or have suggestions for improvements, please create an issue or submit a pull request.
