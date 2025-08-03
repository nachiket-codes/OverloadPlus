import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SplashScreen from './components/SplashScreen';
import { useState, useEffect } from 'react'
import Signup from './components/Signup';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux'
import { store } from './store';
import Home from './components/FPages/Home';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Splits from './components/FPages/Splits';
import LogWorkout from './components/FPages/LogWorkout';
import Profile from './components/FPages/Profile';
import { navItems } from './data/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BottomNav from './components/BottomNav';

function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500); // 1.5 seconds splash
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* App routes are always present */}
      <Provider store={store}>
        <BrowserRouter>
        <div className="pb-[140px]">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/password-reset" element={<ResetPassword />} />
              <Route path="/split" element={<Splits />} />
              <Route path="/log" element={<LogWorkout />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <BottomNav/>
          <ToastContainer position="top-center" autoClose={3000} />
        </BrowserRouter>
      </Provider>
      {/* Splash screen overlay with slide-out animation */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>
    </div>
    
  );
}

export default App;
