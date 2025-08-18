import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './configs/config.js';
import { firebase } from './configs/firebase.js';
import authRoutes from './routes/authRoute.js';
import instructorRoutes from './routes/instructorRoute.js';
import studentRoutes from './routes/studentRoute.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Authentication Routes
app.use("/api/v1/auth", authRoutes);

// Instructor Routes
app.use("/api/v1", instructorRoutes);

// Student Routes
app.use("/api/v1", studentRoutes);

// Global error handler
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});
