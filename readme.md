# Course Selling App

This project is a course selling application built with Node.js, Express, and MongoDB. It includes user and admin authentication, course management, and purchase functionality.

## Features

* **User Authentication:**
    * User signup and login.
    * Purchase courses.
    * View all available courses.
    * View purchased courses.
* **Admin Authentication:**
    * Admin signup and login.
    * Create and delete courses.
    * Add course content.
* **Database:**
    * MongoDB for data storage.
* **Authentication:**
    * JWT (JSON Web Tokens) for user and admin authentication.
* **Middleware:**
    * User and Admin authentication middleware.

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* jsonwebtoken
* dotenv

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd <project_directory>
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Create a `.env.config` file and add your MongoDB connection string:**

    ```
    MONGO_URI=your_mongodb_connection_string
    ```

5.  **Run the application:**

    ```bash
    npm start
    ```

## Project Structure
