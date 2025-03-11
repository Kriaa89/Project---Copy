import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
dbConnect()
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

// Import routes (we'll create these next)
import userRoutes from './routes/user.routes.js';
import workoutRoutes from './routes/workout.routes.js';
import exerciseRoutes from './routes/exercise.routes.js';
import weightLogRoutes from './routes/weightLog.routes.js';

// Routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/weight-logs', weightLogRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});