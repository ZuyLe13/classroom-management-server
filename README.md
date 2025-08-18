# Classroom Management - Server

This is the backend (server) part of the Classroom Management system, built with Node.js and Express.

## Directory structure

- **configs/**: Configuration files (database, firebase, mail, ...)
- **controllers/**: Request handlers for each resource (auth, instructor, student, ...)
- **middlewares/**: Custom Express middlewares (error handling, validation, ...)
- **routes/**: API route definitions for each resource
- **services/**: Business logic and external service integration (Firebase, Twilio, ...)
- **validations/**: Joi schemas for validating request data
- **server.js**: Main entry point to start the server
- **package.json**: Project information and dependencies

## Installation

1. **Requirements:**
   - Node.js >= 18
   - npm >= 9 (or yarn/pnpm)

2. **Install package:**

   ```bash
   cd server
   npm install
   ```


## Environment Variables

Before running the server, you need to create a `.env` file in the `server/` directory (can be copied from `.env.example`).

Required environment variables:

- **Firebase**:
- `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, ...: Firebase configuration information
- **Twilio** (send SMS):
- `ACCOUNT_SID`, `AUTH_TOKEN`, `FROM`, `TO`
- **SMTP** (send email):
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `JWT_SECRET`: Secret string for JWT authentication
- `FRONTEND_URL`: Frontend (client) address

## Run the server

- **Development mode:**

  ```bash
  npm run dev
  ```
  The server will run at [http://localhost:5000](http://localhost:5000) (default)

- **Production mode:**

  ```bash
  npm start
  ```

## Note
- Configure environment variables as needed (e.g., database, Firebase, Twilio, mail).
- Make sure to start the server before using the client app.

---

For any questions or contributions, please contact:
- Email: leanhduy131103@gmail.com
