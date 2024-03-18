import React from "react";
import ManpowerHomePage from "../pages/manpower/ManpowerHomePage";
import { Route } from "react-router-dom";
import TransitionWrapper from "../components/ui/TransitionWrapper";
import HomepageLayout from "../components/ui/HomepageLayout";
import TasksPage from "../pages/manpower/TasksPage";
import ManpowerNotificationPage from "../pages/manpower/ManpowerNotificationPage";
import ManpowerProgressPage from "../pages/manpower/ManpowerProgressPage";
import ManpowerRatingPage from "../pages/manpower/ManpowerRatingPage";
import ManpowerProfilePage from "../pages/manpower/ManpowerProfilePage";

const ManpowerRoutes = [
  <Route
    key="manpowerRoute1"
    path="/manpower/home"
    element={
      <TransitionWrapper location={location}>
        <HomepageLayout>
          <ManpowerHomePage />
        </HomepageLayout>
      </TransitionWrapper>
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

  <Route
    key="manpowerRoute6"
    path="/manpower/rate/:jobOrderId"
    element={
      // <TransitionWrapper>
      // <HomepageLayout>
      <ManpowerRatingPage />
      // </HomepageLayout>
      // </TransitionWrapper>
    }
  />,
  <Route
    key="manpowerRoute7"
    path="/manpower/profile"
    element={
      <TransitionWrapper location={location}>
        <ManpowerProfilePage />
      </TransitionWrapper>
    }
  />,
];

export default ManpowerRoutes;
