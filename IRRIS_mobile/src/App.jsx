import { useState } from 'react';
// import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import './App.css';
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login"
import Home from "./pages/Home"
import ErrorPage from "./pages/ErrorPage"
import StudentLogin from "./pages/StudentLogin"
import PersonelLogin from "./pages/PersonelLogin"


function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<SplashScreen />} />
        {/* Uncomment and adjust the following lines as per your requirements */}
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/personel" element={<PersonelLogin />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;

