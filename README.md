# Velora E-Commerce Backend (MERN Stack)

## Project Overview

### What is Velora?

Velora is a one-of-a-kind e-commerce app designed for adults who adore dinosaur-themed clothing. Our mission is to combine fun, creativity, and quality in a way that resonates with your unique style. Whether you're a fan of bold prints, subtle designs, or minimalist nods to prehistoric favourites, Velora has something for everyone.

Velora’s MERN stack (MongoDB, Express.js, React, Node.js) E-Commerce store will effectively use both OOP and FP. This will allow us to create a well-structured and efficient e-commerce store. We have successfully completed the backend with all relevant and implemented technologies below.

## Technologies Used

### 1. Node.js

- **Purpose**: Runtime environment for executing JavaScript on the server side, allowing developers to build scalable and efficient applications.
- **Industry Relevance**: Widely used for backend development, particularly for API-driven applications and real-time services.
- **Comparison to Alternatives**: Compared to Python (Django/Flask) and PHP (Laravel), Node.js offers non-blocking asynchronous operations, making it highly efficient for handling concurrent requests.
- **License**: Node.js is released under the MIT License, which permits modification, distribution, and private use without restrictions.

### 2. Express.js

- **Purpose**: A web application framework for Node.js that simplifies routing, middleware integration, and request handling.
- **Industry Relevance**: One of the most popular frameworks for Node.js applications due to its lightweight and flexible nature.
- **Comparison to Alternatives**: Compared to frameworks like Koa and Hapi, Express.js is more widely adopted and has a larger community, making it easier to find resources and support.
- **License**: Released under the MIT License, allowing free use, modification, and distribution.

### 3. MongoDB & Mongoose

- **Purpose**: MongoDB is a NoSQL database used for storing structured and unstructured data efficiently. Mongoose is an ODM (Object Data Modeling) library that provides schema validation and query building for MongoDB.
- **Industry Relevance**: Commonly used in modern web applications for its scalability and flexibility in handling various data types.
- **Comparison to Alternatives**: Compared to MySQL and PostgreSQL, MongoDB provides more flexibility with schema-less structures but may lack relational capabilities. MySQL and PostgreSQL offer ACID compliance and structured relationships, making them preferable for applications needing strong consistency.
- **License**: MongoDB uses the Server Side Public License (SSPL), which allows free usage but requires open-sourcing any publicly offered service built on MongoDB. Mongoose is licensed under the MIT License.

### 4. Authentication & Security

- **bcryptjs**: Used for securely hashing passwords before storing them in the database.
  - **Comparison to Alternatives**: Argon2 is considered more secure but is slower. bcrypt remains a widely used option for balanced security and performance.
  - **License**: MIT License, allowing usage in both open-source and commercial applications.
- **jsonwebtoken (JWT)**: Used for user authentication, enabling secure token-based authentication mechanisms.

  - **Comparison to Alternatives**: OAuth provides a more complex but widely supported authentication method for third-party integrations.
  - **License**: MIT License, permitting unrestricted modification and distribution.

- **cookie-parser**: Middleware that enables parsing of cookies in incoming requests, often used for session management.
  - **Comparison to Alternatives**: express-session provides session-based authentication, which can be a better choice for stateful applications.
  - **License**: MIT License, making it free to use and modify.

### 5. Caching & Performance Optimization

- **ioredis**: A Redis client for handling caching, session storage, and real-time data processing.
  - **Comparison to Alternatives**: Compared to Memcached, Redis supports more advanced data structures and persistence features.
  - **License**: MIT License, allowing developers to freely use and distribute it.

### 6. Environment Management

- **dotenv**: Loads environment variables from a .env file to keep sensitive data like API keys and database credentials secure.
  - **License**: MIT License, permitting use in commercial and personal projects without restrictions.

### 7. Cloudinary

- **Purpose**: A cloud-based media management service used for storing, optimizing, and delivering images efficiently.
- **Industry Relevance**: Widely used in web applications for handling media uploads with transformations and optimizations.
- **Comparison to Alternatives**: Compared to AWS S3 and Firebase Storage, Cloudinary provides built-in transformations and optimizations, reducing the need for additional processing.
- **License**: Cloudinary operates under a proprietary license with a free-tier available for developers.

## Summary

This backend is structured to handle e-commerce functionalities efficiently using industry-standard technologies. Future work includes integrating a React-based frontend to complete the MERN stack implementation.
