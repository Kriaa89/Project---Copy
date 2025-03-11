import React from "react"
import { Link } from "react-router-dom"
import { Activity, BarChart2, Zap, Users } from "lucide-react"

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-3xl"></div>
        <div className="absolute inset-0">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-slow-spin"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-500/20 to-pink-500/20 rounded-full animate-slow-spin-reverse"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-40">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-8 tracking-tight">
              Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Fitness Journey
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-indigo-200 mb-10">
              Your all-in-one platform for workout tracking, weight management, and achieving your fitness goals.
              Take control of your health journey today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                to="/signup"
                className="w-full sm:w-auto px-8 py-4 text-base font-medium rounded-xl text-indigo-900 bg-white hover:bg-indigo-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Your Journey
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 text-base font-medium rounded-xl text-white border-2 border-white/20 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm transform hover:scale-105"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20 sm:py-32 bg-gradient-to-b from-indigo-900/50 to-purple-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
              Comprehensive tools and features designed to help you reach your fitness goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Workout Tracking</h3>
                <p className="text-indigo-200">
                  Create custom workouts and track your progress with detailed analytics.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Progress Analytics</h3>
                <p className="text-indigo-200">
                  Visualize your fitness journey with interactive charts and insights.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Smart Integration</h3>
                <p className="text-indigo-200">
                  Connect with your smartwatch for automatic activity tracking.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
                <p className="text-indigo-200">
                  Join a supportive community and share your fitness achievements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 sm:py-32">
        <div className="max-w-2xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-lg text-indigo-200 mb-10">
            Join thousands who've already started their fitness journey. Start your free trial today.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-4 rounded-xl text-base font-medium text-indigo-900 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started For Free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-950/50 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base text-indigo-200">
            © {new Date().getFullYear()} Fitness Tracker App. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slow-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 20s linear infinite;
        }
        .animate-slow-spin-reverse {
          animation: slow-spin-reverse 25s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Home