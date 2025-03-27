# Wellness Store React Frontend

This is a React-based frontend for the Health and Wellness Products web application. It provides a modern single-page application experience for users to browse and purchase health and wellness products.

## Features

- Responsive design for all devices
- User authentication and account management
- Product browsing and searching with category filters
- Shopping cart functionality
- Checkout process
- Order history
- Detailed product pages with information and reviews

## Technologies Used

- **React 18** - Frontend library for building the user interface
- **React Router v6** - Handling navigation and routing
- **Axios** - Making API requests to the backend
- **Font Awesome** - Icons for improved UI
- **CSS Modules** - Component-level styling

## Project Structure

- `/src/components` - Reusable UI components
  - `/layout` - Layout components like Header and Footer
  - `/products` - Product-related components like ProductCard and ProductList
  - `/common` - Common UI components
- `/src/pages` - Page components for different routes
- `/src/context` - React Context providers for authentication and cart
- `/src/services` - API service functions
- `/src/utils` - Utility functions
- `/src/assets` - Static assets like images

## Getting Started

### Prerequisites

- Node.js and npm installed
- Backend API running (from the original wellness-store-project)

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

3. Start the development server:
   ```bash
   npm start
   ```

4. The application should now be running at http://localhost:3000

## API Integration

This frontend is designed to work with the corresponding backend API from the original wellness-store-project. The API endpoints are defined in `src/services/api.js` and include:

- User authentication (login/register)
- Product listing and filtering
- Cart management
- Order processing

## Deployment

To create a production build:

```bash
npm run build
```

This will create an optimized production build in the `build` folder that can be deployed to a static hosting service.

## Future Enhancements

- Add admin dashboard for product management
- Implement product reviews and ratings
- Add payment gateway integration
- Implement user profiles with saved addresses
- Add wishlist functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
