# 🔥 Web Application Overview

This web application enables organizations to publish articles on a website where users can log in to access, create, update, or delete publications. It consists of:

- A **.NET 8 backend** (API)
- A **React frontend**
- Both can be run **independently** or deployed via **Docker**

---

## 🧰 Prerequisites (For Manual Setup)

Ensure the following are installed **if you don’t use Docker**:

- Visual Studio Code
- Node.js (v18 or higher)
- .NET SDK (v8 or newer)
- Docker (optional, but recommended for fast deployment)

---

## 🚀 How to Run the Application

You can either:

### ✅ Option 1: Run Manually (VSCode + Terminal)

---

### 🟦 Backend Setup (.NET 8 API)

1. **Clone the backend repository:**

   ```bash
   git clone https://github.com/HamidHamrah/Net-Ignist.git
   cd Net-Ignist/Ignist
   ```

2. **Restore and run the backend:**

   ```bash
   dotnet restore
   dotnet run --urls "http://0.0.0.0:8081"
   ```

   Now the API is available at:  
   `http://localhost:8081/swagger`

---

### 🟨 Frontend Setup (React App)

1. **Clone the frontend repository:**

   ```bash
   git clone https://github.com/HamidHamrah/React-Ignist.git
   cd React-Ignist
   ```

2. **Install dependencies and start:**

   ```bash
   npm install
   npm start
   ```

   The React app will run at:  
   `http://localhost:3000`

---

### ✅ Option 2: Run Anywhere with Docker

#### 🐳 Backend in Docker

If you've Dockerized the backend:

1. Navigate to the backend folder (where `Dockerfile` is):
   ```bash
   cd Net-Ignist/Ignist
   ```

2. Build and run:
   ```bash
   docker build -t my-dotnet-api .
   docker run -d -p 8081:8081 my-dotnet-api
   ```

   Access the backend at `http://<your-ip>:8081/swagger`.

#### 🐳 Frontend in Docker (Optional)

You can also Dockerize the React app similarly. Let us know if you want help with that.

---

## 📁 File Structure (Frontend)

```
src/
├── App.js
├── pages/
├── Components/
│   ├── Authentication/
│   │   ├── ForgetPassword/
│   │   └── Login and Register/
│   ├── Layout/
│   ├── Publications/
│   │   ├── Create/
│   │   ├── List-Delete/
│   │   ├── Read/
│   │   ├── Sidebar/
│   │   └── Update/
│   └── Users/
│       ├── AllUsers/
│       └── Update/
```

---

## ✅ Summary

| Layer     | Stack       | Runs on            |
|-----------|-------------|--------------------|
| Backend   | .NET 8 Web API | `http://localhost:8081/swagger` |
| Frontend  | React + Node.js | `http://localhost:3000`       |
| Dockerized | Yes (backend) | Portable everywhere |

---

## 📌 Repositories

- Backend: [https://github.com/HamidHamrah/Net-Ignist](https://github.com/HamidHamrah/Net-Ignist)
- Frontend: [https://github.com/HamidHamrah/React-Ignist](https://github.com/HamidHamrah/React-Ignist)

---

Let me know if you'd like to include:
- Docker Compose to run both together
- CI/CD setup (GitHub Actions)
- HTTPS or NGINX reverse proxy
