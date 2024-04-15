# Web Application Overview
This web application serves multiple purposes, primarily enabling organizations to publish articles on a website where users can access them by logging in. It supports CRUD operations for managing articles and user information. Administrators can manage both articles and user accounts, whereas users can manage their own information only.

# Prerequisites
  Ensure the following are installed on your computer:
  * Visual Studio Code
  * Node.js
  * .NET 8 or newer

Running the Application

Backend Setup:

# Clone the backend repository:

  https://github.com/HamidHamrah/Net-Ignist.git
Install the necessary NuGet packages.
Run the backend project.
Frontend Setup:

# Clone the frontend repository:
  https://github.com/HamidHamrah/React-Ignist.git
Open Visual Studio Code and navigate to the frontend project directory.
Open a terminal in VSCode and run:
# 
  npm install
# 
  npm start
Follow these steps to get the application up and running smoothly.

File structure
- src
  - App.js
  - pages
  - Components
    - Authentication
      - ForgetPassword
      - Login and Register
    - Layout
    - Publications
      - Create
      - List-Delete
      - Read
      - Sidebar
      - Update
    - Users
      - AllUsers
      - Update
