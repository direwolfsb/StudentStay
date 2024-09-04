Here’s a detailed and organized README for **StudentStay**, incorporating JWT authentication, custom hooks like `fetchHook`, authentication context (`authContext`), admin functionalities, and client-side functionalities. This README is designed to provide a comprehensive understanding of the project.

---

# StudentStay

**StudentStay** is a comprehensive platform that allows students to find, book, and rent accommodations during their academic journey. It leverages modern web technologies with user-friendly interfaces and secure authentication, offering a seamless experience to students and property owners alike.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Authentication and Authorization](#authentication-and-authorization)
- [Frontend Components and Hooks](#frontend-components-and-hooks)
- [Admin Functionality](#admin-functionality)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **JWT Authentication:** Secure login and registration for users using JSON Web Tokens (JWT).
- **Custom Hooks:** Use of reusable custom hooks such as `fetchHook` to simplify API calls.
- **Authentication Context:** Global authentication state management using `authContext` to handle logged-in status across the application.
- **Admin Panel:** Admin functionality to manage users, properties, bookings, and approvals.
- **User-Friendly Interface:** Easy navigation and powerful filters for students to find accommodations.
- **Secure Booking:** Seamless and secure booking process with payment integration.

## Technologies Used

- **Frontend:**
  - React.js
  - React Hooks (Custom hooks for fetching data, authentication, etc.)
  - React Context API (for global state management)
  - Axios (for API requests)
  - React Router (for navigation)
  - Bootstrap (for responsive styling)
  
- **Backend:**
  - Node.js
  - Express.js
  - JWT (JSON Web Tokens) for authentication
  - MongoDB (Database)

- **Authentication:**
  - JSON Web Tokens (JWT) for user authentication and authorization

## Authentication and Authorization

The app uses **JWT** for both user and admin authentication. Here’s how the flow works:

- **User Registration and Login:** 
  - When a user registers, their password is hashed using bcrypt and stored in the database.
  - During login, a JWT is generated and sent to the client, which stores it in local storage.
  - Subsequent API requests include the JWT in the headers for verification.

- **Token Validation:**
  - The backend verifies the JWT using the `jsonwebtoken` package.
  - Protected routes (like booking or posting listings) require a valid token to access.

- **Roles & Permissions:**
  - The platform includes user roles like `admin` and `student`. Only `admin` users have access to administrative functions (like managing listings and bookings).

## Frontend Components and Hooks

### **Custom Hooks**

#### `fetchHook.js`

This custom hook handles API calls across the application. It abstracts away repetitive API requests and provides a standardized way to manage loading and errors.

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url, options);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
```

### **Authentication Context (`authContext`)**

The `authContext` manages user authentication and stores the JWT token. It allows the entire app to have access to authentication status and user information.

```javascript
import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    user: null,
  });

  const login = (token, user) => {
    localStorage.setItem('token', token);
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
```

### **Protected Routes**

You can create protected routes that only logged-in users can access using the authentication context:

```javascript
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './authContext';

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
```

## Admin Functionality

### **Admin Panel**

- **Manage Users:** Admins can view, approve, or delete user accounts.
- **Manage Listings:** Admins have the ability to approve or deny property listings. This ensures only verified listings appear on the platform.
- **Manage Bookings:** Admins can view, confirm, or cancel bookings made by students.

### **Admin Protected Routes**

Admin routes are protected and only accessible to users with an `admin` role. This is achieved by extending the `ProtectedRoute` component:

```javascript
const AdminProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.token || auth.user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};
```

## Installation

### Prerequisites

- Node.js and npm installed on your system
- MongoDB installed and running

### Clone the Repository

```bash
git clone https://github.com/yourusername/studentstay.git
cd studentstay
```

### Install Dependencies

Navigate to the `backend` directory and install the necessary dependencies:

```bash
cd backend
npm install
```

Then, navigate to the `frontend` directory and install the dependencies:

```bash
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=8800
```

### Running the Application

Start the backend server:

```bash
cd backend
npm start
```

Start the frontend development server:

```bash
cd ../frontend
npm start
```

Visit `http://localhost:3000` in your browser to access the application.

## Usage

- **Search for Accommodations:** Use the search bar on the homepage to find rooms based on your preferred location, dates, and other filters.
- **View Listings:** Click on a listing to view detailed information, including images, amenities, and pricing.
- **Reserve a Room:** If you're logged in, you can reserve a room directly through the platform.
- **Submit Your Listing:** Property owners can submit their listings through a form on the site, which will be reviewed and added to the platform.

## API Endpoints

The backend API includes the following endpoints:

- **GET** `/api/hotels` - Fetch all hotels
- **GET** `/api/hotels/find/:id` - Fetch a specific hotel by ID
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login a user
- **PUT** `/api/rooms/availability/:id` - Update room availability

Refer to the backend code for more detailed documentation on the available endpoints.

## Contributing

We welcome contributions from the community. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch to your fork.
4. Open a pull request to the `main` branch of this repository.

Please ensure your code adheres to our coding standards and includes relevant tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact us at:

- **Email:** support@studentstay.com
- **GitHub Issues:** [Create a new issue](https://github.com/yourusername/studentstay/issues)

---

This README now includes detailed information about the platform's authentication, custom hooks, protected routes, and admin functionality.

Feel free to customize this README to better fit your project's specifics <img width="1440" alt="Screenshot 2024-08-31 at 5 53 31 PM" src="https://github.com/user-attachments/assets/28318520-d143-45dd-920c-c4412714e281">
<img width="777" alt="Screenshot 2024-08-31 at 5 53 24 PM" src="https://github.com/user-attachments/assets/70d91645-007a-4b98-8a40-f86c01b18d9d">
<img width="777" alt="Screenshot 2024-08-31 at 5 53 15 PM" src="https://github.com/user-attachments/assets/98339348-f426-4a34-87e4-285b3d97b23b">
<img width="777" alt="Screenshot 2024-08-31 at 5 52 50 PM" src="https://github.com/user-attachments/assets/43d04311-f940-4a48-a919-efdec02d006c">
<img width="777" alt="Screenshot 2024-08-31 at 5 52 19 PM" src="https://github.com/user-attachments/assets/296006fc-8cc5-418b-9ee3-ae98e9bf461d">
<img width="777" alt="Screenshot 2024-08-31 at 5 52 03 PM" src="https://github.com/user-attachments/assets/01d34c1a-23da-4d22-9600-2c22990f3e41">
<img width="777" alt="Screenshot 2024-08-31 at 5 51 49 PM" src="https://github.com/user-attachments/assets/bd43de10-3158-4b8b-8f63-1ad95c5a0220">
<img width="777" alt="Screenshot 2024-08-31 at 5 50 26 PM" src="https://github.com/user-attachments/assets/af336c5a-6639-4002-9eb4-16a45019d473">
<img width="777" alt="Screenshot 2024-08-31 at 5 49 54 PM" src="https://github.com/user-attachments/assets/2d83bd42-57e3-4851-be1f-7369375676e7">
and update the placeholders with actual links or information relevant to your project.
