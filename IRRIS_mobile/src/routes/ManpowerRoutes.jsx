import React from "react";
import ManpowerHomePage from "../pages/manpower/ManpowerHomePage";
import { Route } from "react-router-dom";
import TransitionWrapper from "../components/ui/TransitionWrapper";
import HomepageLayout from "../components/ui/HomepageLayout";
import TasksPage from "../pages/manpower/TasksPage";

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
  // Add more Route elements here
];

export default ManpowerRoutes;
