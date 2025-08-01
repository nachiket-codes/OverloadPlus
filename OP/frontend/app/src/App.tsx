import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SplashScreen from './components/SplashScreen';
import { useState, useEffect } from 'react'
import Signup from './components/Signup';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux'
import { store } from './store';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/" element={<Home/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/password-reset" element={<ResetPassword/>} />
          </Routes>
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
