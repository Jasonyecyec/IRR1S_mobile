import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./echo.js";
import beamsClient from "./pushNotificationConfig.js";
import { BrowserRouter } from "react-router-dom";
// import './serviceWorkerRegistration.js'

// Initialize Pusher Beams
// beamsClient
//   .start()
//   .then((beamsClient) => {
//     console.log("Pusher Beams initialized successfully", beamsClient);
//     return beamsClient.getDeviceId();
//   })
//   .then((deviceId) => {
//     console.log("Successfully registered with Beams. Device ID:", deviceId);
//     return beamsClient.setUserId("USER_ID");
//   })
//   .then(() => {
//     console.log("User ID set successfully");

//     // Subscribe to push notifications
//     return beamsClient.subscribeToInterests(["job-order"]);
//   })
//   .then(() => {
//     // Event listener for incoming push notifications
//     beamsClient.onUpdate((data) => {
//       console.log("Push notification received:", data);
//       // Handle the incoming push notification data as needed
//     });
//   })
//   .catch((error) => {
//     console.error("Error initializing Pusher Beams:", error);
//   });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
