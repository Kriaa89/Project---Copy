import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Activity, Weight, Calendar, TrendingUp, Award, Clock, Plus } from "lucide-react"

const Dashboard = () => {
  const [user, setUser] = useState({
    firstName: "User",
    lastName: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
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
  }, [navigate])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-indigo-800 to-purple-800 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, {user.firstName}!</h2>
              <p className="text-indigo-200">Track your progress, stay motivated, and achieve your fitness goals.</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-10 p-4 rounded-xl">
                <Calendar className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Workouts</p>
                <p className="text-2xl font-bold text-gray-800">0</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Activity className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">Start tracking</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Current Weight</p>
                <p className="text-2xl font-bold text-gray-800">--</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Weight className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-500">Log your first weight</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Achievements</p>
                <p className="text-2xl font-bold text-gray-800">0</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-500">Complete goals to earn</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Streak</p>
                <p className="text-2xl font-bold text-gray-800">0 days</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-500">Log activity to start</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Workouts Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-indigo-600" />
                  Recent Workouts
                </h4>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                  View All
                </button>
              </div>

              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
                  <Activity className="h-8 w-8 text-indigo-600" />
                </div>
                <p className="text-gray-500 mb-4">
                  You haven't logged any workouts yet. Start tracking your fitness journey today!
                </p>
                <button className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Log a Workout
                </button>
              </div>
            </div>
          </div>

          {/* Weight Tracker Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Weight className="h-5 w-5 mr-2 text-purple-600" />
                  Weight Tracker
                </h4>
                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
                  View All
                </button>
              </div>

              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                  <Weight className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-gray-500 mb-4">Start tracking your weight to see your progress over time.</p>
                <button className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Log Weight
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Fitness Goals Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-600" />
                Fitness Goals
              </h4>
              <button className="text-yellow-600 hover:text-yellow-800 text-sm font-medium flex items-center">
                View All
              </button>
            </div>

            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <p className="text-gray-500 mb-4">Set your fitness goals to stay motivated and track your progress.</p>
              <button className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Set Goals
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

