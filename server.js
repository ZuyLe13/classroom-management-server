import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './configs/config.js';
import { firebase } from './configs/firebase.js';
import authRoutes from './routes/authRoute.js';
import instructorRoutes from './routes/instructorRoute.js';
import studentRoutes from './routes/studentRoute.js';
import messageRoutes from './routes/messageRoute.js';
import { errorHandler } from './middlewares/errorHandler.js';
import http from "http";
import { Server } from "socket.io";
import setupChatSocket from './sockets/message.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});

// Authentication Routes
app.use("/api/v1/auth", authRoutes);

// Instructor Routes
app.use("/api/v1", instructorRoutes);

// Student Routes
app.use("/api/v1", studentRoutes);

// Message Routes
app.use("/api/v1/messages", messageRoutes);

app.use((_, res) => {
   res.send('Hello world');
});

// Global error handler
app.use(errorHandler);

setupChatSocket(io);

httpServer.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});
