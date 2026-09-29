# Figurine Webshop

A full-stack webshop for miniature figurines. Customers can browse and search products, fill a cart, pay through Stripe and follow their order status. Admins can manage the product catalogue and update the status of incoming purchases.
The focus of this project was to learn to utilize third party services.

## Features

### Customer features
- **Product browsing**: with product image, description, price and category
- **Search and filtering**: search by name, filter by category and sort by price
- **Authentication**: sign up, sign in and sign out using Clerk
- **Shopping cart**: add products, increase quantities and remove products; the cart is persisted in the browser between visits
- **Checkout**: secure payment through Stripe Checkout
- **Order tracking**: showing each purchase with its products, delivery details, total price and a step-by-step status

### Admin features
- **Role-based access**: admin-only routes and API endpoints, based on the user role stored in Clerk
- **Add products**: form with image upload (images are stored on Cloudinary), category, availability and delivery time
- **Edit products**: update product details, optionally replacing the image
- **Purchase dashboard**: table of all purchases with customer details, totals and dates, expandable rows for the products and status timeline, and a dropdown to update the purchase status

### Backend tech stack
- REST API built with Express
- Request validation with express-validator
- Image upload handling with Multer (5 MB limit) and Cloudinary storage
- Webhook endpoints for:
  - **Clerk**: keeps the local user data in sync when users are created, updated or deleted
  - **Stripe**: marks purchases as paid when a checkout session completes
- Serves the built frontend as static files in production

### Testing and CI
- End-to-end tests written with Robot Framework and the Browser library (Playwright), covering authentication, product search and admin product management
- GitHub Actions workflow that builds the frontend and backend and runs the Robot Framework tests

## Technologies used

### Frontend
| Technology | Purpose |
| --- | --- |
| [React 19] | UI library |
| [TypeScript] | Static typing |
| [Vite] | Dev server and build tool |
| [Ant Design] | UI components (forms, tables, steps, pagination, notifications) |
| [Tailwind CSS 4] | Utility-first styling |
| [React Router] | Client-side routing |
| [Clerk React] | Authentication and user management |
| [Axios] | HTTP client |
| ESLint | Linting |

### Backend
| Technology | Purpose |
| --- | --- |
| [Node.js] and [Express 5]| Web server and REST API |
| [TypeScript] and [tsx] | Typing and development runtime |
| [Prisma 7] with the `pg` driver adapter | ORM and database migrations |
| [PostgreSQL] | Database |
| [Clerk Express] | Authentication middleware and webhook verification |
| [Stripe]| Payments |
| [Cloudinary] | Image hosting |
| [Multer] and [datauri] | Multipart upload handling |
| [express-validator] | Input validation |
| [cors] and [dotenv] | CORS and environment configuration |

### Tooling and infrastructure
- [Docker Compose] for a local PostgreSQL database and pgAdmin
- [Robot Framework] with [robotframework-browser] for E2E tests
- [GitHub Actions] for CI
