<h1>🛒 Simple Product Management API</h1>

<p>
This is a <strong>beginner-friendly REST API</strong> built using Node.js, Express, MongoDB, and Mongoose.
The goal of this project is to help learners understand how a real backend API works using simple and clean logic.
</p>

<hr />

<h2>📌 What You Can Do With This API</h2>

<ul>
  <li>➕ Add new products</li>
  <li>📄 Get all products</li>
  <li>🔍 Get product by ID</li>
  <li>🔎 Search products by name or brand</li>
  <li>🧩 Search products using multiple filters</li>
  <li>📂 Filter products by category</li>
  <li>💰 Filter products by price range</li>
  <li>⭐ Filter products by rating</li>
  <li>📊 Sort products by price</li>
  <li>📃 Use pagination for large data</li>
</ul>

<hr />

<h2>🧰 Technologies Used</h2>

<table>
  <tr>
    <th>Technology</th>
    <th>Purpose</th>
  </tr>
  <tr>
    <td>Node.js</td>
    <td>JavaScript runtime</td>
  </tr>
  <tr>
    <td>Express.js</td>
    <td>Backend framework</td>
  </tr>
  <tr>
    <td>MongoDB</td>
    <td>NoSQL database</td>
  </tr>
  <tr>
    <td>Mongoose</td>
    <td>MongoDB object modeling</td>
  </tr>
  <tr>
    <td>dotenv</td>
    <td>Environment variable management</td>
  </tr>
</table>

<hr />

<h2>📁 Project Structure</h2>

<pre>
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
</pre>

<hr />

<h2>⚙️ Setup Instructions</h2>

<h3>1️⃣ Clone the Repository</h3>
<pre>
git clone &lt;your-repository-url&gt;
cd api-practical-task
</pre>

<h3>2️⃣ Install Dependencies</h3>
<pre>
npm install
</pre>

<h3>3️⃣ Create Environment File</h3>
<p>Create a <code>.env</code> file in the root folder:</p>

<pre>
PORT=3000
MONGODB_URI=mongodb://localhost:27017/product-api
</pre>

<p><strong>⚠️ Important:</strong> Do not push <code>.env</code> to GitHub.</p>

<h3>4️⃣ Run the Server</h3>
<pre>
npm run dev
</pre>

<hr />

<h2>📦 Product Schema</h2>

<pre>
{
  "productName": "iPhone 15",
  "category": "Electronics",
  "brand": "Apple",
  "price": 1200,
  "rating": 4.5,
  "description": "Latest iPhone model"
}
</pre>

<hr />

<h2>🔗 API Endpoints</h2>

<table>
  <tr>
    <th>Method</th>
    <th>Endpoint</th>
    <th>Description</th>
  </tr>

  <tr>
    <td>POST</td>
    <td>/products</td>
    <td>Create a new product</td>
  </tr>

  <tr>
    <td>GET</td>
    <td>/products</td>
    <td>Get all products</td>
  </tr>

  <tr>
    <td>GET</td>
    <td>/products/:id</td>
    <td>Get product by ID</td>
  </tr>

  <tr>
    <td>GET</td>
    <td>/products/search/name?name=phone</td>
    <td>Search by product name</td>
  </tr>

  <tr>
    <td>GET</td>
    <td>/products/search/brand?brand=apple</td>
    <td>Search by brand</td>
  </tr>

  <tr>
    <td>GET</td>
    <td>/products/search/multiple</td>
    <td>Search using multiple fields</td>
  </tr>

  <tr>
    <td>GET</td>
    <td>/products/category?category=electronics</td>
    <td>Filter by category</td>
  </tr>

  <tr>
    <td>GET</td>
    <td>/products/filter/price?min=500&max=1500</td>
    <td>Filter by price range</td>
  </tr>

  <tr>
    <td>GET</td>
    <td>/products/filter/rating?rating=4</td>
    <td>Filter by rating</td>
  </tr>

  <tr>
    <td>GET</td>
    <td>/products/sort/price?order=asc</td>
    <td>Sort by price</td>
  </tr>

  <tr>
    <td>GET</td>
    <td>/products/pagination?page=1&limit=5</td>
    <td>Pagination</td>
  </tr>
</table>

<hr />

<h2>❗ Error Handling</h2>

<table>
  <tr>
    <th>Status Code</th>
    <th>Meaning</th>
  </tr>
  <tr>
    <td>200</td>
    <td>Success</td>
  </tr>
  <tr>
    <td>201</td>
    <td>Created</td>
  </tr>
  <tr>
    <td>400</td>
    <td>Bad request</td>
  </tr>
  <tr>
    <td>404</td>
    <td>Not found</td>
  </tr>
  <tr>
    <td>500</td>
    <td>Server error</td>
  </tr>
</table>

<hr />

<h2>🎯 Who Is This Project For?</h2>

<ul>
  <li>Backend beginners</li>
  <li>Students learning REST APIs</li>
  <li>MongoDB & Mongoose learners</li>
  <li>Mini e-commerce backend practice</li>
</ul>

<hr />

<hr />

<h2>🚀 Future Improvements</h2>

<ul>
  <li>✏️ Update product</li>
  <li>🗑️ Delete product</li>
  <li>🖼️ Image upload</li>
  <li>🔐 Authentication</li>
  <li>🛒 Cart system</li>
</ul>
