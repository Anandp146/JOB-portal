## Job Portal Project - MERN Stack
### Welcome to the Job Portal project! This application is designed to provide a platform for users to find and apply for job opportunities. It is built using the MERN (MongoDB, Express.js, React, Node.js) stack. Please keep in mind that this is the developer's first large-scale project, so the file structure might not be optimal.

## Project Overview
### The Job Portal project allows users to:

- Browse and search for job listings
- Create an account to apply for jobs
- Post job openings for employers
- Manage job applications

## Tech Stack
- Frontend: React.js, Redux, Bootstrap
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- State Management: Redux
- Form Validation: Formik, Yup

## Usage
### For Job Seekers:

- Register an account.
- Complete your profile.
- Search for jobs.
- Apply for jobs.

### For Employers:

- Register an account.
- Post job listings.
- Manage job listings.


## Backend Dependencies
```json
"dependencies": {
  "bcrypt": "^5.1.1",
  "cloudinary": "^2.0.1",
  "cookie-parser": "^1.4.6",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.18.2",
  "express-fileupload": "^1.4.3",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.1.3",
  "nodemon": "^3.0.3",
  "validator": "^13.11.0"
}
```

## Frontend Dependencies
```json
"dependencies": {
  "@fortawesome/free-solid-svg-icons": "^6.5.1",
  "@fortawesome/react-fontawesome": "^0.2.0",
  "@heroicons/react": "^2.1.3",
  "@material-tailwind/react": "^2.1.9",
  "axios": "^1.6.7",
  "fontawesome": "^5.6.3",
  "fortawesome": "^0.0.1-security",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-hot-toast": "^2.4.1",
  "react-icons": "^5.0.1",
  "react-pdf": "^7.7.1",
  "react-router-dom": "^6.22.3",
  "tw-elements-react": "^1.0.0-alpha2"
}
```
## Getting Started
### To run the project locally, follow these steps:
### Installation
### 1. Clone the repository:
```sh
git clone https://github.com/Anandp146/JOB-portal.git
cd JOB-portal
```
### 2. Install backend dependencies:
```sh
cd backend
npm install
```
### 3. Install frontend dependencies:
```sh
cd frontend
npm install
```
### 4. Create a .env file with necessary url's and variables.

### 5. Run the application:
### Start the backend server:

```sh
cd server
npm start
```
### Start the frontend development server:

```sh
cd ../client
npm start
```

