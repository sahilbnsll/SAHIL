// server.js

const express = require('express');
const connectDB = require('./db');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workouts');
const { protect } = require('./middleware/authMiddleware');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/gym-workout', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

// Workout model
const Workout = require('./models/Workout');

const workoutsRouter = require('./routes/workouts');
app.use('/api/workouts', workoutsRouter);

// API routes
app.get('/api/workouts', (req, res) => {
  Workout.find()
    .then(workouts => res.json(workouts))
    .catch(err => res.status(404).json({ msg: 'No workouts found' }));
});

app.post('/api/workouts', (req, res) => {
  const newWorkout = new Workout({
    name: req.body.name,
    description: req.body.description,
  });

  newWorkout
    .save()
    .then(workout => res.json(workout))
    .catch(err => console.log(err));
});
// Routes
const workoutsRouter = require('./routes/workouts');
const authRouter = require('./routes/auth');
app.use('/api/workouts', protect, workoutsRouter);
app.use('/api/auth', authRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
