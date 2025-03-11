import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// Components
import Navbar from './components/Navbar';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900">
        <Navbar />
        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
