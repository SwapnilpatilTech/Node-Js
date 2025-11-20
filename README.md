<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Node.js Project Overview</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f7fb;
      padding: 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 900px;
      margin: auto;
      background: #fff;
      padding: 25px 35px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    h2 span { font-size: 24px; }
    h2 { margin-top: 40px; }
    pre {
      background: #272822;
      color: #fff;
      padding: 10px;
      border-radius: 6px;
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
    }
    table, th, td {
      border: 1px solid #ddd;
    }
    th, td {
      padding: 12px;
      text-align: left;
    }
    th {
      background: #eee;
    }
    .title {
      font-size: 28px;
      font-weight: bold;
      color: #00bfff;
      margin-bottom: 10px;
    }
    ul { margin-left: 25px; }
  </style>
</head>

<body>

<div class="container">

  <div class="title">🌟 Node.js Project</div>
  <p>A modern and scalable Node.js backend application with clean architecture, modular design, and production-ready setup.</p>

  <h2 style="color:#ff9800;">🏗️ Project Structure</h2>
  <pre>
project-name/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── config/
│   ├── middlewares/
│   ├── utils/
│   └── app.js
│
├── tests/
├── .env.example
├── package.json
├── README.md
└── server.js
  </pre>

  <h2 style="color:#8bc34a;">✨ Features</h2>
  <ul>
    <li>⚡ Express.js REST API</li>
    <li>🔐 Secure environment variable support</li>
    <li>🧩 Modular & scalable MVC pattern</li>
    <li>🛡️ Middlewares for validation & auth</li>
    <li>🔄 Centralized error handling</li>
    <li>🧪 Ready for Jest testing</li>
    <li>🚀 Suitable for production deployment</li>
    <li>📦 Clean folder structure</li>
  </ul>

  <h2 style="color:#e91e63;">🧰 Tech Stack</h2>

  <table>
    <tr><th>Technology</th><th>Purpose</th></tr>
    <tr><td>Node.js</td><td>Backend runtime</td></tr>
    <tr><td>Express.js</td><td>Web framework</td></tr>
    <tr><td>MongoDB / MySQL</td><td>Database layer</td></tr>
    <tr><td>dotenv</td><td>Config management</td></tr>
    <tr><td>nodemon</td><td>Dev auto reload</td></tr>
    <tr><td>Jest</td><td>Testing framework</td></tr>
  </table>

  <h2 style="color:#673ab7;">⚙️ Installation</h2>
  <pre>
git clone https://github.com/yourusername/repo-name.git
cd repo-name
npm install
  </pre>

  <h2 style="color:#3f51b5;">▶️ Run the App</h2>
  <pre>npm run dev   # Development</pre>
  <pre>npm start     # Production</pre>

  <h2 style="color:#009688;">🔑 Environment Variables</h2>
  <p>Create <b>.env</b> using <b>.env.example</b>:</p>
  <pre>
PORT=5000
DATABASE_URL=
JWT_SECRET=
  </pre>

  <h2 style="color:#f44336;">📌 API Endpoints</h2>
  <table>
    <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
    <tr><td>GET</td><td>/api/</td><td>API health check</td></tr>
    <tr><td>POST</td><td>/api/user</td><td>Create user</td></tr>
    <tr><td>GET</td><td>/api/user/:id</td><td>Read user details</td></tr>
  </table>

  <h2 style="color:#9c27b0;">🧩 Folder Explained</h2>
  <ul>
    <li><b>controllers/</b> – Request → Response logic</li>
    <li><b>routes/</b> – All API endpoints</li>
    <li><b>services/</b> – Business logic & DB operations</li>
    <li><b>middlewares/</b> – Auth, validation, logging</li>
    <li><b>config/</b> – Database + app setup</li>
    <li><b>utils/</b> – Reusable helpers</li>
  </ul>

  <h2 style="color:#03a9f4;">🚀 Deployment (Render)</h2>
  <ol>
    <li>Connect GitHub repo</li>
    <li>Add environment variables</li>
    <li>Build command: <code>npm install</code></li>
    <li>Start command: <code>node server.js</code></li>
  </ol>

  <h2 style="color:#ff5722;">🤝 Contributing</h2>
  <ol>
    <li>Fork the repo</li>
    <li>Create a new branch</li>
    <li>Commit changes</li>
    <li>Submit a Pull Request</li>
  </ol>

  <h2 style="color:#4caf50;">⭐ Support</h2>
  <p>If you liked this project, please ⭐ it on GitHub.  
  Your support motivates open-source contrib
