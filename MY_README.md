## Welcome to the E-commerce Fullstack Monorepo!
This project is a comprehensive microservices-based e-commerce platform built on Turborepo for optimized development and deployment. It features Next.js frontends and a variety of Node.js backend services, utilizing different frameworks and databases to showcase a robust and flexible architecture.

## Architecture Overview ------
This project follows a Monorepo structure managed by Turborepo to handle inter-dependencies and build processes efficiently.

| Directory | Contents | Description |
| --- | --- | --- |
| apps/client | Next.js | The customer-facing storefront for browsing and purchasing products. |
| apps/admin | Next.js | The admin dashboard for managing products, orders, and users. |
| apps/order-service | Fastify (Node.js) | Handles all order creation and lifecycle management. |
| apps/payment-service | Hono (Node.js) | Future service intended to integrate payment processing (currently a placeholder). |
| apps/product-service | Express (Node.js) | Manages all product data, inventory, and categories. |
| packages/product-db | Prisma, PostgreSQL | Houses the schema and ORM for the Product Service. |
| packages/order-db | Mongoose, MongoDB | Houses the schema and ORM for the Order Service. |
| packages/typescript-config | TypeScript | Shared TypeScript configuration files. |

## Tech Stack ------
| Component | Framework / Tool | Notes |
| --- | --- | --- |
| Monorepo | Turborepo | Manages builds, dependencies, and caching. |
| Frontend | Next.js | Used for both the Client and Admin UIs. |
| Backend | Fastify, Express, Hono | Microservices running on Node.js/TypeScript. |
| Database (Product) | PostgreSQL | Used for reliable product and inventory data. |
| Database (Order) | MongoDB | Used for flexible order document storage. |
| ORM / ODM | Prisma, Mongoose | Prisma for PostgreSQL, Mongoose for MongoDB. |
| Language | TypeScript | Strict typing across the entire monorepo. |
| Containerization | Docker | Used to run the PostgreSQL database locally. |

## Getting Started ------
Before you begin, ensure you have the following installed on your machine:
-Node.js,
-npm,
-Docker.

1. Clone the repository
2. `npm install`
3. `docker-compose up -d postgres`
4. to run the full project, run `turbo dev`
