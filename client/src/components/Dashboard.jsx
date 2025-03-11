import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState({
    firstName: 'User',
    lastName: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // In a real application, you would fetch user data from your API here
    // Example:
    // async function fetchUserData() {
    //   const userId = localStorage.getItem('userId');
    //   try {
    //     const response = await axios.get(`http://localhost:8000/api/users/${userId}`, {
    //       headers: { Authorization: `Bearer ${token}` }
    //     });
    //     setUser(response.data);
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //   }
    // }
    // fetchUserData();
  }, [navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Welcome Card */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Welcome back, {user.firstName}!</h2>
          <p className="text-gray-600 dark:text-gray-300">
            This is your personal fitness dashboard. Here you can track your workouts, monitor your progress,
            and stay motivated on your fitness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Workouts Card */}
          <div className="card p-6 h-full">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Recent Workouts</h4>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You haven't logged any workouts yet. Start tracking your fitness journey today!
            </p>
            <button className="btn-primary">Log a Workout</button>
          </div>

          {/* Weight Tracker Card */}
          <div className="card p-6 h-full">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Weight Tracker</h4>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Start tracking your weight to see your progress over time.
            </p>
            <button className="btn-primary">Log Weight</button>
          </div>
        </div>

        {/* Fitness Goals Card */}
        <div className="card p-6">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Fitness Goals</h4>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Set your fitness goals to stay motivated and track your progress.
          </p>
          <button className="btn-primary">Set Goals</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;