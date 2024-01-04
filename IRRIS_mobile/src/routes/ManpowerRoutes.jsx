import React from "react";
import ManpowerHomePage from "../pages/manpower/ManpowerHomePage";
import { Route } from "react-router-dom";
import TransitionWrapper from "../components/ui/TransitionWrapper";
import HomepageLayout from "../components/ui/HomepageLayout";
import TasksPage from "../pages/manpower/TasksPage";
import ManpowerNotificationPage from "../pages/manpower/ManpowerNotificationPage";
import ManpowerProgressPage from "../pages/manpower/ManpowerProgressPage";

const ManpowerRoutes = [
  <Route
    key="manpowerRoute1"
    path="/manpower/home"
    element={
      // <TransitionWrapper>
      <HomepageLayout>
        <ManpowerHomePage />
      </HomepageLayout>
      // </TransitionWrapper>
    }
  />,
  <Route
    key="manpowerRoute2"
    path="/manpower/tasks"
    element={
      // <TransitionWrapper>
      <HomepageLayout>
        <TasksPage />
      </HomepageLayout>
      // </TransitionWrapper>
    }
  />,
  <Route
    key="manpowerRoute3"
    path="/manpower/notification/:userId"
    element={
      // <TransitionWrapper>
      <HomepageLayout>
        <ManpowerNotificationPage />
      </HomepageLayout>
      // </TransitionWrapper>
    }
  />,
  <Route
    key="manpowerRoute4"
    path="/manpower/progress/:task/:taskId"
    element={
      // <TransitionWrapper>
      <HomepageLayout>
        <ManpowerProgressPage />
      </HomepageLayout>
      // </TransitionWrapper>
    }
  />,
  <Route
    key="manpowerRoute5"
    path="/manpower/progress"
    element={
      // <TransitionWrapper>
      <HomepageLayout>
        <ManpowerProgressPage />
      </HomepageLayout>
      // </TransitionWrapper>
    }
  />,
  // Add more Route elements here
];

export default ManpowerRoutes;
