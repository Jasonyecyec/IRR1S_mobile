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
import QRScannerPage from "./pages/student/QRScannerPage";

function App() {
  const [scannedCode, setScannedCode] = useState("");

  const handleScan = (data) => {
    setScannedCode(data);
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Uncomment and adjust the following lines as per your requirements */}
        <Route path="/login" element={<Login />} />
        <Route path="/activate" element={<ActivateAccountPage />} />
        <Route path="/otp-input" element={<OTPInputPage />} />
        <Route path="/activate-success" element={<ActivateSuccessPage />} />
        <Route path="/create-password" element={<CreatePasswordPage />} />
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/personel" element={<PersonelLogin />} />
        <Route
          path="/home"
          element={
            <HomepageLayoutStudent>
              <HomePage />
            </HomepageLayoutStudent>
          }
        />

        <Route
          path="/home/report"
          element={
            <HomepageLayoutStudent>
              <ReportPage />
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
        <Route path="/home/history" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
