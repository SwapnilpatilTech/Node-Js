This is a basic Product Management REST API built to help beginners understand how real-world APIs work.
It allows you to add products, view them, and filter/search/sort products using different query parameters.

This project is ideal if you are learning:

Node.js

Express.js

MongoDB

Mongoose

REST APIs

📌 What This API Can Do

With this API, you can:

➕ Add a new product to the database

📄 Get all products

🔍 Get a product using its ID

🔎 Search products by name or brand

🧩 Search products using multiple fields together

📂 Filter products by category

💰 Filter products by price range

⭐ Filter products by rating

📊 Sort products by price

📃 Use pagination for large product lists

🧰 Technologies Used
Technology	Purpose
Node.js	JavaScript runtime
Express.js	Backend framework
MongoDB	Database
Mongoose	MongoDB ODM
dotenv	Environment variables
📁 Project Structure (Simple View)
project-root/
│
├── controllers/
│   └── product.controller.js
│
├── models/
│   └── product.model.js
│
├── routes/
│   └── product.routes.js
│
├── .env
├── server.js
└── package.json

⚙️ Setup Instructions (Step by Step)
1️⃣ Clone the Project
git clone <your-repository-url>
cd api-practical-task

2️⃣ Install Required Packages
npm install

3️⃣ Create .env File

Create a .env file in the root folder and add:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/product-api


⚠️ Do not upload .env to GitHub

4️⃣ Run the Server
npm run dev


If everything works correctly, your server will start and connect to MongoDB.

📦 Product Data Structure

Each product stored in the database looks like this:

{
  "productName": "iPhone 15",
  "category": "Electronics",
  "brand": "Apple",
  "price": 1200,
  "rating": 4.5,
  "description": "Latest iPhone model"
}

🔗 API Routes Explained (Beginner Style)
➕ Create Product
POST /products


Body (JSON):

{
  "productName": "Laptop",
  "category": "Electronics",
  "brand": "Dell",
  "price": 800,
  "rating": 4
}

📄 Get All Products
GET /products

🔍 Get Product by ID
GET /products/:id

🔎 Search by Product Name
GET /products/search/name?name=phone

🏷️ Search by Brand
GET /products/search/brand?brand=samsung

🧩 Search Using Multiple Fields
GET /products/search/multiple?productName=phone&category=electronics&brand=apple


You can pass one, two, or all fields.

📂 Filter by Category
GET /products/category?category=electronics

💰 Filter by Price Range
GET /products/filter/price?min=500&max=1500

⭐ Filter by Rating
GET /products/filter/rating?rating=4


Returns products with rating greater than or equal to the given value.

📊 Sort Products by Price
GET /products/sort/price?order=asc
GET /products/sort/price?order=desc

📃 Pagination
GET /products/pagination?page=1&limit=5


Helps when you have many products.

❗ Error Handling (Simple Explanation)

The API returns clear error messages:

Status Code	Meaning
200	Request successful
201	Product created
400	Missing or invalid data
404	Product not found
500	Server error

Example error:

{
  "message": "No products found"
}

🎯 Who Should Use This Project?

Beginners learning backend development

Students practicing REST APIs

Anyone building a small e-commerce backend

Developers learning MongoDB filtering

✅ Next Improvements You Can Add

✏️ Update product API

🗑️ Delete product API

🖼️ Product image upload

👤 Authentication (JWT)

🛒 Cart system
