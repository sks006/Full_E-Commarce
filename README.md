# 🛒 Full E-Commerce Backend (Node.js + Sequelize)

## Project Overview

This project provides the backend for an e-commerce platform, including user management, product listings, categories, and order management. The backend is built with **Node.js**, **Express**, **Sequelize**, and uses a MySQL or PostgreSQL database.

---

## 🏗️ Features

- **User Authentication**: Basic user model for managing sellers.
- **Product Management**: Products with categories, stock, price, and images.
- **Database**: Sequelize ORM with migrations for database management.
- **Seeding**: Seeder files to populate dummy data for products, categories, and users.
- **Model Associations**: Relations between Products, Users, and Categories.

---

## 🔧 Project Setup

### 1. Prerequisites

Before starting, ensure that you have the following installed:

- **Node.js** (>= v14.x)
- **MySQL** or **PostgreSQL**
- **Sequelize CLI** (installed globally or locally)


```bash
npm install -g npm dev run
```
Products
GET /products
Get a list of all products.

POST /products
Create a new product.

GET /products/:id
Get a specific product by ID.

PUT /products/:id
Update a product by ID.

DELETE /products/:id
Delete a product by ID.


MIT License

Copyright (c) 2025 Shihab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
