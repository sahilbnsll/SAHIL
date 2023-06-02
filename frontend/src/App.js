// frontend/src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import WorkoutList from './components/WorkoutList';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('/api/workouts');
      setWorkouts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/workouts', { name, description });
      setWorkouts([...workouts, response.data]);
      setName('');
      setDescription('');
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (id, name, description) => {
    try {
      const response = await axios.put(`/api/workouts/${id}`, { name, description });
      const updatedWorkouts = workouts.map(workout =>
        workout._id === id ? { ...workout, name: response.data.name, description: response.data.description } : workout
      );
      setWorkouts(updatedWorkouts);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDelete = async id => {
    try {
      await axios.delete(`/api/workouts/${id}`);
      const updatedWorkouts = workouts.filter(workout => workout._id !== id);
      setWorkouts(updatedWorkouts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <><Router>
      <div>
        <h1>Daily Gym Workout</h1>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={RegisterForm} />
          <Route
            path="/login"
            render={props => (
              <LoginForm
                {...props}
                setIsAuthenticated={setIsAuthenticated} />
            )} />
          <PrivateRoute
            path="/workouts"
            component={WorkoutList}
            isAuthenticated={isAuthenticated} />
            <Redirect to="/" />
        </Switch>
      </div>
    </Router><><div>
      <h1>Daily Gym Workout</h1>

      <RegisterForm />
      <LoginForm />
    </div>
        <div>
          <h1>Daily Gym Workout</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Workout Name"
              value={name}
              onChange={e => setName(e.target.value)} />
            <input
              type="text"
              placeholder="Workout Description"
              value={description}
              onChange={e => setDescription(e.target.value)} />
            <button type="submit">Add Workout</button>
          </form>

          <h2>Workouts:</h2>
          <ul>
            {workouts.map(workout => (
              <li key={workout._id}>
                <h3>{workout.name}</h3>
                <p>{workout.description}</p>
                <button onClick={() => handleUpdate(workout._id, workout.name, workout.description)}>Update</button>
                <button onClick={() => handleDelete(workout._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div></></>
  );
};

export default App;
