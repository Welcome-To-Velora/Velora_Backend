# Velora E-Commerce Backend (MERN Stack)

## Project Overview

### What is Velora?

Velora is a one-of-a-kind e-commerce app designed for adults who adore dinosaur-themed clothing. Our mission is to combine fun, creativity, and quality in a way that resonates with your unique style. Whether you're a fan of bold prints, subtle designs, or minimalist nods to prehistoric favourites, Velora has something for everyone.

Velora’s MERN stack (MongoDB, Express.js, React, Node.js) E-Commerce store will effectively use both OOP and FP. This will allow us to create a well-structured and efficient e-commerce store. We have successfully completed the backend with all relevant and implemented technologies below.

## Technologies Used

### 1. Node.js

- **Purpose**: Node.js is a JavaScript runtime environment that allows the server-side execution of JavaScript. It is designed to build scalable, real-time applications by supporting non-blocking, asynchronous programming, making it ideal for high-concurrency applications like e-commerce.
- **Industry Relevance**: Node.js is one of the most widely used backend technologies, especially for API-driven and real-time applications. It is highly preferred for developing fast and scalable applications, particularly in e-commerce platforms like Velora, which require high performance and responsiveness.
- **Comparison to Alternatives**: Compared to Python (Django/Flask) and PHP (Laravel), Node.js excels in handling high traffic and concurrent requests efficiently due to its non-blocking, event-driven architecture. This is particularly beneficial for real-time applications or services where speed is crucial.
- **License**: Node.js is released under the MIT License, which permits modification, distribution, and private use without restrictions.

### 2. Express.js

- **Purpose**: Express.js is a minimalist web framework for Node.js, designed to simplify routing, middleware integration, and request handling. It serves as the backbone for web servers, handling HTTP requests, and enabling faster development of RESTful APIs.
- **Industry Relevance**: Express.js is one of the most popular frameworks in the Node.js ecosystem due to its simplicity and flexibility. It is highly efficient for building APIs and web applications, making it the preferred choice for many modern e-commerce platforms.
- **Comparison to Alternatives**: While frameworks like Koa and Hapi also serve similar purposes, Express.js is more widely adopted and has a large community, which makes it easier to find resources, tutorials, and solutions to problems. It also has robust support for middleware, making it flexible for different use cases.
- **License**: Express.js is released under the MIT License, allowing free use, modification, and distribution.

### 3. MongoDB & Mongoose

- **Purpose**: MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. This makes it ideal for applications requiring high scalability and flexibility in data storage. Mongoose is an ODM (Object Data Modeling) library that provides schema-based solutions to model data and manage database queries with ease.
- **Industry Relevance**: MongoDB is commonly used in modern web applications because of its scalability, performance, and flexibility in handling various data types. Mongoose further simplifies interactions with MongoDB by providing a higher-level abstraction for defining data models, validation, and query building.
- **Comparison to Alternatives**: While relational databases like MySQL and PostgreSQL offer strong ACID compliance and structured relationships, MongoDB's schema-less structure makes it more suitable for rapidly changing and unstructured data, which is typical in modern e-commerce apps. MongoDB can scale horizontally with ease, making it ideal for applications expecting high traffic and large amounts of unstructured data.
- **License**: MongoDB uses the Server Side Public License (SSPL), which allows free usage but requires open-sourcing any publicly offered service built on MongoDB. Mongoose is licensed under the MIT License.

### 4. Authentication & Security

- **bcryptjs**:
  - **Purpose**: bcryptjs is a library used for securely hashing passwords before storing them in the database, ensuring that even if the database is compromised, passwords cannot be retrieved easily.
  - **Comparison to Alternatives**: Argon2 is considered more secure but is slower than bcrypt. bcrypt is a widely adopted solution that offers a good balance between security and performance, making it ideal for applications like Velora that prioritize user privacy and security.
  - **License**: MIT License, allowing usage in both open-source and commercial applications.
- **jsonwebtoken (JWT)**:

  - **Purpose**: JWT is a compact and self-contained way to represent information between two parties, used for user authentication. It allows secure token-based authentication, which is perfect for stateless applications like Velora where session-based authentication would be impractical.
  - **Comparison to Alternatives**: OAuth is a more complex alternative that is widely used for third-party integrations but might be overkill for an internal authentication system. JWT is simpler and more efficient for scenarios like e-commerce where each request needs to be authenticated independently.
  - **License**: MIT License, permitting unrestricted modification and distribution.

- **cookie-parser**:
  - **Purpose**: This middleware allows parsing cookies in incoming requests, often used for managing user sessions in applications.
  - **Comparison to Alternatives**: express-session is another common middleware used for session management, offering a more stateful approach. However, cookie-parser is more lightweight and appropriate for Velora, where stateless authentication via JWT is favored.
  - **License**: MIT License, making it free to use and modify.

### 5. Caching & Performance Optimization

- **ioredis**:
  - **Purpose**: ioredis is a Node.js client for Redis, a powerful in-memory data structure store that can be used for caching, session storage, and real-time data processing.
  - **Comparison to Alternatives**: Compared to Memcached, Redis offers more advanced data structures, persistence features, and atomic operations, making it better suited for handling complex caching scenarios and real-time features like live inventory updates in Velora.
  - **License**: MIT License, allowing developers to freely use and distribute it.

### 6. Environment Management

- **dotenv**:
  - **Purpose**: dotenv is used to load environment variables from a `.env` file to keep sensitive information like database credentials and API keys secure and separate from the codebase.
  - **License**: MIT License, permitting use in commercial and personal projects without restrictions.

### 7. Cloudinary

- **Purpose**: Cloudinary is a cloud-based media management service that provides capabilities for storing, optimizing, and delivering images and other media assets efficiently.
- **Industry Relevance**: Cloudinary is widely used by web applications that need to manage media uploads, particularly e-commerce platforms that deal with large volumes of product images. Its built-in image optimization and transformation capabilities make it an efficient choice for delivering high-quality images at scale.
- **Comparison to Alternatives**: While AWS S3 and Firebase Storage offer similar services, Cloudinary stands out due to its built-in media transformations, such as resizing, cropping, and format conversion, which reduces the need for additional image processing.
- **License**: Cloudinary operates under a proprietary license with a free-tier available for developers.

## Summary

This backend is structured to handle e-commerce functionalities efficiently using industry-standard technologies. Future work includes integrating a React-based frontend to complete the MERN stack implementation, providing a seamless and interactive shopping experience for users.
