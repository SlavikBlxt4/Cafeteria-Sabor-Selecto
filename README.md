# Sabor Selecto - Coffee Shop Ecommerce

Welcome to Sabor Selecto, a coffee shop e-commerce platform where you can explore, select, and order a variety of coffee capsules. This README provides an overview of the project, including how the frontend and backend were implemented, as well as the main features and functionalities.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Frontend Implementation](#frontend-implementation)
3. [Backend Implementation](#backend-implementation)
4. [Main Features](#main-features)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Environment Variables](#environment-variables)
8. [License](#license)

## Project Overview

Sabor Selecto is designed to offer an intuitive and responsive user experience for customers to browse and purchase coffee products. The platform includes user authentication, product management, and order processing capabilities.

## Frontend Implementation

The frontend of the Sabor Selecto website is built using HTML, CSS, and JavaScript to ensure a responsive and engaging user interface.

- **HTML**: Structured the layout and content of the web pages.
- **CSS**: Styled the web pages to make them visually appealing and responsive across different devices.
- **JavaScript**: Added interactivity and dynamic content loading.

### Key Features

- **Responsive Design**: Ensured that the website is fully responsive and works seamlessly on desktops, tablets, and mobile devices.
- **Dynamic Content**: Used JavaScript to fetch and display coffee products from the backend database.

## Backend Implementation

The backend of Sabor Selecto is powered by Express.js with TypeScript, and PostgreSQL is used as the database. The backend handles user authentication, product management, order processing, and email notifications.

- **Express.js**: Used for building the server-side application.
- **TypeScript**: Enhanced the robustness and maintainability of the backend code.
- **PostgreSQL**: Used for storing user data, product details, and order information.
- **JWT (JSON Web Tokens)**: Implemented for user authentication and authorization, distinguishing between clients and employees.
- **bcrypt**: Used for encrypting passwords to ensure security.
- **dotenv**: Managed environment variables securely.

### Key Features

- **User Authentication**: Implemented user registration and login functionalities.
- **Token-Based Authentication**: Used JWT to manage user sessions and permissions.
- **Product Management**: Fetch coffee products from the database and display them on the frontend.
- **Order Processing**: Enabled users to create orders for coffee capsules.
- **Email Notifications**: Sent an email confirmation when an order is placed.

## Main Features

1. **User Registration and Login**:
    - Secure user registration and login using bcrypt for password encryption.
    - Token-based authentication with JWT to distinguish between clients and employees.

2. **Product Management**:
    - Fetch and display coffee products from the PostgreSQL database.

3. **Order Processing**:
    - Create and manage orders for coffee capsules.
    - Send email notifications upon order placement.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/SlavikBlxt4/Cafeteria-Sabor-Selecto.git
    cd Cafeteria-Sabor-Selecto
    ```

2. **Install dependencies**:
    ```bash
    
    # For backend dependencies
    cd ../Back-End
    npm install
    ```

3. **Set up the database**:
    - Make sure PostgreSQL is installed and running.
    - Create a new database and configure the connection settings in the `.env` file.

4. **Run the application**:
    ```bash
    # Start the backend server
    cd Back-End
    npm run dev

    ```
    ### Start the frontend server
   - Use Live Server on your favourite IDE to start the website at port 5500
    

## Usage

Once the application is running, you can access it in your browser at `http://localhost:5500`. Use the provided features to register, log in, browse coffee products, and place orders.

## Environment Variables

The project uses the `dotenv` package to manage environment variables. Create a `.env` file in the backend directory with the following variables:

SECRET_KEY="Your secret key for your tokens"
DATABASE_KEY="Your database password"
SENDGRID_API_KEY = "Your API key for your email orders (using SendGrid)"



Ensure that these variables are configured correctly to match your local setup.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for checking out Sabor Selecto! We hope you enjoy exploring and using our coffee shop e-commerce platform. If you have any questions or need further assistance, feel free to open an issue or contact us.

Happy brewing! ☕
