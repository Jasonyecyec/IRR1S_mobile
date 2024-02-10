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
import HomepageLayout from "./components/ui/HomepageLayout";
import HomePage from "./pages/HomePage";
import StudentProfilePage from "./pages/student/StudentProfilePage";
import StudentAccountSettingPage from "./pages/student/StudentAccountSettingPage";
import StudentAboutUs from "./pages/student/StudentAboutUs";
import SuggestionBoxPage from "./pages/SuggestionBoxPage";
import QRScannerPage from "./pages/QRScannerPage";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import TransitionWrapper from "./components/ui/TransitionWrapper";
import MorePage from "./pages/student/MorePage";
import RedeemPage from "./pages/student/RedeemPage";
// import LoginPassword from "./pages/LoginPassword";
import ScanFacilityPage from "./pages/ScanFacilityPage";
import ReportIssuePage from "./pages/ReportIssuePage";
import ReportSuccessPage from "./pages/ReportSuccessPage";
import ReportErrorPage from "./pages/ReportErrorPage";
import FacilityNotFoundPage from "./pages/FacilityNotFoundPage";
import ReportHistoryPage from "./pages/ReportHistoryPage";
import ManpowerHomePage from "./pages/manpower/ManpowerHomePage";
import ManpowerRoutes from "./routes/ManpowerRoutes";
import RateReportPage from "./pages/student/RateReportPage";
import SearchFacilityPage from "./pages/SearchFacilityPage";
import ReviewFacilityPage from "./pages/ReviewFacilityPage";
import RateFacilityPage from "./pages/RateFacilityPage";
import RewardsPage from "./pages/student/RewardsPage";
import "./index.css";

function App() {
  const [scannedCode, setScannedCode] = useState("");
  // const location = useLocation();

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
        {...ManpowerRoutes}
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
          key="studentHome"
          path="/student/home"
          element={
            // <TransitionWrapper location={location}>
            <HomepageLayout>
              <HomePage />
            </HomepageLayout>
            // </TransitionWrapper>
          }
        />

        <Route
          key="studentMore"
          path="/student/more"
          element={
            <TransitionWrapper location={location}>
              <HomepageLayout>
                <MorePage />
              </HomepageLayout>
            </TransitionWrapper>
          }
        />

        <Route
          path="/student/rewards"
          element={
            <TransitionWrapper location={location}>
              {/* <HomepageLayout> */}
              <RewardsPage />
              {/* </HomepageLayout> */}
            </TransitionWrapper>
          }
        />

        <Route
          path="/scan-facility"
          element={
            // <TransitionWrapper location={location}>
            <ScanFacilityPage />
            // </TransitionWrapper>
          }
        />
        <Route
          path="/report-issue"
          element={
            <TransitionWrapper location={location}>
              <ReportIssuePage />
            </TransitionWrapper>
          }
        />
        <Route
          path="/qr-scanner"
          element={
            <TransitionWrapper location={location}>
              <QRScannerPage />
            </TransitionWrapper>
          }
        />
        <Route
          path="/report-success"
          element={
            <TransitionWrapper location={location}>
              <ReportSuccessPage />
            </TransitionWrapper>
          }
        />
        <Route
          path="/report-history"
          element={
            <TransitionWrapper location={location}>
              <ReportHistoryPage />
            </TransitionWrapper>
          }
        />

        <Route
          path="/student/rate-report/:reportId"
          element={
            <TransitionWrapper location={location}>
              <RateReportPage />
            </TransitionWrapper>
          }
        />

        <Route
          path="/report-error"
          element={
            <TransitionWrapper location={location}>
              <ReportErrorPage />
            </TransitionWrapper>
          }
        />

        <Route
          key="searchFacility"
          path="/search-facility"
          element={
            <TransitionWrapper location={location}>
              <SearchFacilityPage />
            </TransitionWrapper>
          }
        />

        <Route
          path="/review-facility/:facilityId"
          element={
            <TransitionWrapper location={location}>
              <ReviewFacilityPage />
            </TransitionWrapper>
          }
        />

        <Route
          path="/rate-facility/:facilityId"
          element={
            <TransitionWrapper location={location}>
              <RateFacilityPage />
            </TransitionWrapper>
          }
        />

        <Route
          path="/facility-not-found"
          element={
            <TransitionWrapper location={location}>
              <FacilityNotFoundPage />
            </TransitionWrapper>
          }
        />
        <Route
          path="/student/more"
          element={
            <HomepageLayout>
              <MorePage />
            </HomepageLayout>
          }
        />
        <Route
          path="/student/redeem"
          element={
            <TransitionWrapper location={location}>
              <RedeemPage />
            </TransitionWrapper>
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
        <Route
          path="/student/account-setting"
          element={
            <TransitionWrapper location={location}>
              <StudentAccountSettingPage />
            </TransitionWrapper>
          }
        />
        <Route
          path="/student/about"
          element={
            <TransitionWrapper location={location}>
              <StudentAboutUs />
            </TransitionWrapper>
          }
        />
        <Route
          path="/suggestion-box"
          element={
            <TransitionWrapper location={location}>
              <SuggestionBoxPage />
            </TransitionWrapper>
          }
        />

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
