# Wellness Store Full Stack Application

This is a full-stack web application for a health and wellness products store. It features a modern React frontend with a Node.js/Express/MongoDB backend.

## Features

- Responsive design for all devices
- User authentication and account management
- Product browsing and searching with category filters
- Shopping cart functionality
- Checkout process
- Order history
- Detailed product pages with information

## Technology Stack

### Frontend
- **React 18** - Frontend library for building the user interface
- **React Router v6** - Handling navigation and routing
- **Axios** - Making API requests to the backend
- **Font Awesome** - Icons for improved UI
- **CSS Modules** - Component-level styling

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## Project Structure

```
wellness-store-react/
├── backend/
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Express middleware
│   ├── models/         # Mongoose models
│   └── routes/         # API routes
├── public/             # Public assets
├── src/                # React frontend code
│   ├── components/     # Reusable UI components
│   ├── context/        # React Context providers
│   ├── pages/          # Page components
│   ├── services/       # API service functions
│   └── utils/          # Utility functions
└── server.js           # Express server entry point
```

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sankalp-Sachapara/wellness-store-react.git
   cd wellness-store-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (optional):
   Create a `.env` file in the root directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   NODE_ENV=development
   ```

### Running the Application

#### Development Mode (with concurrent frontend and backend)
```bash
npm run dev
```

This will start:
- Backend server on port 5000
- React development server on port 3000

#### Running Only the Backend
```bash
npm run server
```

#### Running Only the Frontend
```bash
npm run client
```

#### Production Mode
```bash
npm run build   # Build the React frontend
npm start       # Start the production server
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id` - Get a single product by ID
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Cart
- `GET /api/carts` - Get user cart (protected)
- `POST /api/carts` - Add item to cart (protected)
- `PUT /api/carts/:productId` - Update cart item quantity (protected)
- `DELETE /api/carts/:productId` - Remove item from cart (protected)
- `DELETE /api/carts` - Clear cart (protected)

### Orders
- `POST /api/orders` - Create a new order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get an order by ID (protected)
- `PUT /api/orders/:id/pay` - Update order to paid (protected)
- `GET /api/orders/admin` - Get all orders (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)

## Deployment

The application is ready for deployment to platforms like Heroku, Vercel, or any other hosting service that supports Node.js applications.

## Future Enhancements

- Add admin dashboard for product management
- Implement product reviews and ratings
- Add payment gateway integration (e.g., Stripe, PayPal)
- Implement user profiles with saved addresses
- Add wishlist functionality
- Add product comparison feature

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
