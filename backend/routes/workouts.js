// backend/routes/workouts.js

const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const { protect } = require('../middleware/authMiddleware');

// Update a workout
router.put('/:id', async (req, res) => {
    try {
      const { name, description } = req.body;
      const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
      res.json(updatedWorkout);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Delete a workout
  router.delete('/:id', async (req, res) => {
    try {
      const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
      res.json(deletedWorkout);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
// GET all workouts
router.get('/', protect, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/*
router.get('/', (req, res) => {
  Workout.find()
    .then(workouts => res.json(workouts))
    .catch(err => res.status(500).json({ error: err.message }));
});
*/

// POST a new workout
router.post('/', (req, res) => {
  const { name, description } = req.body;
  const newWorkout = new Workout({ name, description });

  newWorkout.save()
    .then(workout => res.json(workout))
    .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
