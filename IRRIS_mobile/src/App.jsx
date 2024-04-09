import React, { useEffect, useState } from "react";
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
import StaffRoutes from "./routes/StaffRoutes";
import NotificationPage from "./pages/NotificationPage";
import LeaderBoardPage from "./pages/student/LeaderBoardPage";
import PointsHistoryPage from "./pages/student/PointsHistoryPage";
import AchievementPage from "./pages/student/AchievementPage";
import AchievementDetailsPage from "./pages/student/AchievementDetailsPage";
import RewardsQualifiedPage from "./pages/student/RewardsQualifiedPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import useNotificationStore from "@/src/services/state/notificationStore";
import beamsClient from "@/src/pushNotificationConfig";
import Cookies from "js-cookie";
import useUserStore from "./services/state/userStore";
import useJobOrderStore from "./services/state/jobOrderStore";
import "./index.css";

function App() {
  const [scannedCode, setScannedCode] = useState("");
  const { notification, setNotification, setNotificationDetails } =
    useNotificationStore((state) => ({
      notification: state.notification,
      setNotification: state.setNotification,
      setNotificationDetails: state.setNotificationDetails,
    }));

  const {
    isJobOrderNotif,
    isJobOrderRequestNotif,
    jobOrderDetails,
    jobOrderRequestDetails,
    setjobOrderNotif,
    setjobOrderRequestNotif,
    setJobOrderDetails,
    setJobOrderRequestDetails,
  } = useJobOrderStore((state) => ({
    isJobOrderNotif: state.isJobOrderNotif,
    isJobOrderRequestNotif: state.isJobOrderRequestNotif,
    jobOrderDetails: state.jobOrderDetails,
    jobOrderRequestDetails: state.jobOrderRequestDetails,
    setjobOrderNotif: state.setjobOrderNotif,
    setjobOrderRequestNotif: state.setjobOrderRequestNotif,
    setJobOrderDetails: state.setJobOrderDetails,
    setJobOrderRequestDetails: state.setJobOrderRequestDetails,
  }));

  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  // const location = useLocation();

  const handleScan = (data) => {
    setScannedCode(data);
  };

  useEffect(() => {
    const initializePusherBeamsJobOrder = async () => {
      try {
        const client = await beamsClient.start();
        const userIdCookie = Cookies.get("user_id");

        console.log("Pusher Beams initialized successfully", client);

        // Set user ID if needed
        // await client.setUserId("USER_ID");

        // Subscribe to push notifications
        await client.setDeviceInterests([`job-order-${userIdCookie}`]);
        console.log("Device interests have been set");

        // Get and log device interests
        const interests = await client.getDeviceInterests();
        console.log("Device interests:", interests);
      } catch (error) {
        console.error("Error initializing Pusher Beams:", error);
      }
    };

    const initializePusherBeams = async () => {
      try {
        const client = await beamsClient.start();
        const userIdCookie = Cookies.get("user_id");

        console.log("Pusher Beams initialized successfully", client);

        // Set user ID if needed
        // await client.setUserId("USER_ID");

        // Subscribe to push notifications
        await client.setDeviceInterests([
          `notification-channel-${userIdCookie}`,
        ]);
        console.log("Device interests have been set");

        // Get and log device interests
        const interests = await client.getDeviceInterests();
        console.log("Device interests:", interests);
      } catch (error) {
        console.error("Error initializing Pusher Beams:", error);
      }
    };

    const listenToNotification = () => {
      const userIdCookie = Cookies.get("user_id");

      const notificationChannel = window.Echo.channel(
        `notification-channel-${userIdCookie}`
      );

      notificationChannel.listen("UserNotification", (notification) => {
        console.log(
          "Successfully subscribed to notification-channel:",
          notification
        );

        if (notification) {
          console.log("recieved notif");
          setNotification(true);
          // Check if there is a notification in local storage
          const storedNotification = JSON.parse(
            localStorage.getItem("notification")
          );

          if (!storedNotification) {
            // If there is no stored notification, store the received notification
            setNotificationDetails(notification);

            // Store the notification in local storage
            localStorage.setItem("notification", JSON.stringify(notification));
          }
        } else {
          // Update the state and store the updated notification in local storage
          setNotificationDetails(notification);
          localStorage.setItem("notification", JSON.stringify(notification));
        }
      });
    };

    const listenToJobOrder = () => {
      console.log("listening");
      const userIdCookie = Cookies.get("user_id");

      const jobOrderChannel = window.Echo.channel(
        `job-order-channel-${userIdCookie}`
      );

      const jobOrderRequestChannel = window.Echo.channel(
        `job-order-request-channel-${userIdCookie}`
      );

      //   // LISTEN TO REPORT
      jobOrderChannel.listen("JobOrderNotification", (notification) => {
        console.log(
          "Successfully subscribed to job-order-channel:",
          notification
        );
        if (
          notification &&
          notification.jobOrder &&
          Array.isArray(notification.jobOrder)
        ) {
          console.log("job order recieved");

          notification.jobOrder.forEach((job) => {
            // if (job.assigned_manpower === parseInt(userIdCookie, 10)) {
            console.log("setting job order");
            setjobOrderNotif(true);

            setJobOrderDetails((prev) => {
              const updatedJobOrderDetails = { ...prev, job };
              console.log("updatedJobOrderDetails", updatedJobOrderDetails);

              // set the job order to local storage
              localStorage.setItem(
                "job_order",
                JSON.stringify(updatedJobOrderDetails)
              );
              return updatedJobOrderDetails;
            });
            // }
          });
        }
      });

      // LISTEN TO REQUEST
      jobOrderRequestChannel.listen(
        "JobOrderRequestNotification",
        (notification) => {
          console.log(
            "Successfully subscribed to job-order-request-channel:",
            notification
          );
          setjobOrderRequestNotif(true);

          if (
            notification &&
            notification.jobOrderRequest &&
            Array.isArray(notification.jobOrderRequest)
          ) {
            notification.jobOrderRequest.forEach((job) => {
              setjobOrderRequestNotif(true);

              setJobOrderRequestDetails((prev) => {
                const updatedJobOrderDetails = { ...prev, job };
                console.log("updatedJobOrderDetails", updatedJobOrderDetails);
                // set the job order to local storage
                localStorage.setItem(
                  "job_order_request",
                  JSON.stringify(updatedJobOrderDetails)
                );
                return updatedJobOrderDetails;
              });
            });
          }
        }
      );
    };

    if (user && user.user_role === "manpower") {
      initializePusherBeamsJobOrder();
      listenToJobOrder();
    }

    if (user && user.user_role === "student") {
      initializePusherBeams();
      listenToNotification();
    }

    if (user && user.user_role === "staff") {
      initializePusherBeams();
      listenToNotification();
    }
  }, [user]);

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
        {...StaffRoutes}
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
          key="leaderboards"
          path="/leaderboards"
          element={
            <TransitionWrapper location={location}>
              {/* <HomepageLayout> */}
              <LeaderBoardPage />
              {/* </HomepageLayout> */}
            </TransitionWrapper>
          }
        />

        <Route
          key="achievements"
          path="/achievements"
          element={
            <TransitionWrapper location={location}>
              {/* <HomepageLayout> */}
              <AchievementPage />
              {/* </HomepageLayout> */}
            </TransitionWrapper>
          }
        />

        <Route
          key="achievements"
          path="/achievements-details/:achievementId"
          element={
            <TransitionWrapper location={location}>
              <AchievementDetailsPage />
            </TransitionWrapper>
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
          path="/student/rewards-qualified/:rewardsId"
          element={
            <TransitionWrapper location={location}>
              {/* <HomepageLayout> */}
              <RewardsQualifiedPage />
              {/* </HomepageLayout> */}
            </TransitionWrapper>
          }
        />

        <Route
          path="/notification/:userId"
          element={
            <TransitionWrapper location={location}>
              <HomepageLayout>
                <NotificationPage />
              </HomepageLayout>
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
          path="/student/points-history"
          element={
            <HomepageLayout location={location}>
              <PointsHistoryPage />
            </HomepageLayout>
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

        <Route
          path="/terms-and-conditions"
          element={
            <TransitionWrapper location={location}>
              <TermsAndConditionsPage />
            </TransitionWrapper>
          }
        />

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
