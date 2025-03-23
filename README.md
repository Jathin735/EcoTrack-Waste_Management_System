# EcoTrack – Smart Waste Management System

EcoTrack is a smart waste management system designed to address waste mismanagement through effective reporting, tracking, and monitoring. It connects citizens, waste collectors, and authorities for streamlined waste management.

## 🚀 Features
- **User Management:** User registration, login, and authentication using JWT.
- **Report Waste:** Users can submit waste reports with descriptions, images (uploaded via Cloudinary), and location details.
- **Admin Dashboard:** Admins can view all reports, track progress, and update the status (Pending, In Progress, Resolved).
- **Schedule Pickup:** Users can schedule waste pickups at preferred dates and times.
- **Notifications:** Real-time notifications using Socket.IO for report updates.
- **Progress Tracking:** Users can monitor cleanup progress in real time.

## 🛠️ Technology Stack
- **Frontend:** React.js with TailwindCSS
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **File Uploads:** Cloudinary
- **Real-time Communication:** Socket.IO

## 📦 Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/ecotrack.git
    cd ecotrack
    ```

2. Install dependencies for both frontend and backend:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Configure Environment Variables:
Create `.env` files for both frontend and backend with the following:
- **Backend .env:**
  ```env
  MONGO_URI=your_mongo_db_uri
  JWT_SECRET=your_jwt_secret
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  ```
- **Frontend .env:**
  ```env
  REACT_APP_API_URL=http://localhost:5000/api
  ```

4. Start the servers:
    - **Backend:**
    ```bash
    cd backend
    npm run dev
    ```
    - **Frontend:**
    ```bash
    cd frontend
    npm start
    ```

## 📋 API Endpoints
- **POST /auth/login** - Login user
- **POST /auth/register** - Register user
- **POST /reports** - Submit a report (User)
- **GET /reports** - Get all reports (Admin)
- **PUT /reports/:id** - Update report progress (Admin)
- **POST /pickups** - Schedule waste pickup

## 👤 Roles and Permissions
- **User:** Can submit reports, schedule pickups, and view progress.
- **Admin:** Can view all reports, update progress, and manage system data.

## 🚧 Challenges Faced
- Ensuring secure authentication using JWT.
- Implementing image uploads using Cloudinary.
- Real-time notifications using Socket.IO.

## 📧 Contact
For any queries, contact **[Your Name]** at **[Your Email]**.

---

Made with ❤️ by the EcoTrack Team.

