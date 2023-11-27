import React, { useState } from "react";
// import reactLogo from './assets/react.svg';
import viteLogo from "/vite.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import StudentLogin from "./pages/StudentLogin";
import PersonelLogin from "./pages/PersonelLogin";
import ActivateAccountPage from "./pages/ActivateAccountPage";
import OTPInputPage from "./pages/OTPInputPage";
import ActivateSuccessPage from "./pages/ActivateSuccessPage";
import CreatePasswordPage from "./pages/CreatePasswordPage";
import HomepageLayoutStudent from "./components/ui/HomepageLayoutStudent";
import ReportPage from "./pages/student/ReportPage";
import HomePage from "./pages/HomePage";
import StudentProfilePage from "./pages/student/StudentProfilePage";
import QRScannerPage from "./pages/student/QRScannerPage";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import TransitionWrapper from "./components/ui/TransitionWrapper";
import MorePage from "./pages/student/MorePage";
import RedeemPage from "./pages/student/RedeemPage";
import LoginPassword from "./pages/LoginPassword";
import "./index.css";

function App() {
  const [scannedCode, setScannedCode] = useState("");

  const handleScan = (data) => {
    setScannedCode(data);
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <TransitionWrapper location={location}>
              <Login />
            </TransitionWrapper>
          }
        />
        {/* Uncomment and adjust the following lines as per your requirements */}
        <Route
          path="/login"
          element={
            <TransitionWrapper location={location}>
              <Login />
            </TransitionWrapper>
          }
        />

        <Route
          path="/login-password"
          element={
            <TransitionWrapper location={location}>
              <LoginPassword />
            </TransitionWrapper>
          }
        />

        <Route
          path="/activate"
          element={
            <TransitionWrapper location={location}>
              <ActivateAccountPage />
            </TransitionWrapper>
          }
        />
        <Route
          path="/otp-input"
          element={
            <TransitionWrapper location={location}>
              <OTPInputPage />
            </TransitionWrapper>
          }
        />
        <Route
          path="/activate-success"
          element={
            <TransitionWrapper location={location}>
              <ActivateSuccessPage />
            </TransitionWrapper>
          }
        />
        <Route
          path="/create-password"
          element={
            <TransitionWrapper location={location}>
              <CreatePasswordPage />
            </TransitionWrapper>
          }
        />

        <Route
          path="/student/home"
          element={
            <TransitionWrapper location={location}>
              <HomepageLayoutStudent>
                <HomePage />
              </HomepageLayoutStudent>
            </TransitionWrapper>
          }
        />

        <Route
          path="/student/report"
          element={
            <HomepageLayoutStudent>
              <ReportPage />
            </HomepageLayoutStudent>
          }
        />

        <Route
          path="/student/more"
          element={
            <HomepageLayoutStudent>
              <MorePage />
            </HomepageLayoutStudent>
          }
        />

        <Route
          path="/student/redeem"
          element={
            <HomepageLayoutStudent>
              <RedeemPage />
            </HomepageLayoutStudent>
          }
        />

        <Route
          path="/home/qr-scanner"
          element={
            <HomepageLayoutStudent>
              <QRScannerPage onScan={handleScan} />
            </HomepageLayoutStudent>
          }
        />

        <Route
          path="/student/profile"
          element={
            <TransitionWrapper location={location}>
              <StudentProfilePage />
            </TransitionWrapper>
          }
        />

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
