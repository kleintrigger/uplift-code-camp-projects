External/Public Link: https://roberts-job-application-tracking-node-app.onrender.com/


A full-stack web application that allows users to track their job applications.
Users can register, log in, add job applications, update status, add notes, filter results, and delete applications.

🚀 Features

✅ User Registration & Login (JWT Authentication)

✅ Protected Dashboard

✅ Add new job applications

✅ Update application status (Applied, Interview, Rejected)

✅ Edit notes

✅ Delete applications (soft delete supported)

✅ Filter applications by status

✅ Responsive layout

✅ Automatic token handling in Postman

🛠 Tech Stack
Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

bcrypt

Frontend

HTML

CSS

Vanilla JavaScript (ES Modules)

LocalStorage (for token storage)

📂 Project Structure
project-root/
│
├── models/
│   └── JobApplication.js
│
├── routes/
│   ├── authRoutes.js
│   └── applicationRoutes.js
│
├── controllers/
│
├── middleware/
│
├── public/
│   ├── css/
│   └── js/
│
├── dashboard.html
├── login.html
├── register.html
├── app.js
├── index.js
└── README.md

🔐 Authentication

The app uses JWT (JSON Web Tokens).

After login:

Token is stored in localStorage

Sent in requests using:

Authorization: Bearer <token>


Protected routes require a valid token.

📦 Installation
1️⃣ Clone the repository
git clone https://github.com/your-username/job-app-tracker.git
cd job-app-tracker

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4558

4️⃣ Start the server
npm start


Server runs at:

http://localhost:4558

📡 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
Application Routes (Protected)
Method	Endpoint	Description
GET	/api/applications	Get all applications
GET	/api/applications?status=Applied	Filter applications
POST	/api/applications	Create new application
PUT	/api/applications/:id	Update application
DELETE	/api/applications/:id	Delete application
🧪 Testing With Postman

Login

Save token

Use Bearer Token in protected routes

Test GET, POST, PUT, DELETE endpoints

🖥 UI Overview
Dashboard

Welcome message

Add application form

Filter by status

Applications displayed in grid layout

Action buttons for update/delete

📌 Future Improvements

Pagination

Search by company

Sorting options

Dark mode

Deployment (Render / Railway / Vercel)

Role-based access

👤 Author

Built as a full-stack practice project using Node.js and MongoDB.