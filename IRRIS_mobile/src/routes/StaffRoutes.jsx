import React from "react";
import { Route } from "react-router-dom";
import StaffHomepage from "../pages/staff/StaffHomepage";
import StaffMorePage from "../pages/staff/StaffMorePage";
import HomepageLayout from "../components/ui/HomepageLayout";
import CalendarPage from "../pages/staff/CalendarPage";
import TransitionWrapper from "../components/ui/TransitionWrapper";
import AvailableFacility from "../pages/staff/AvailableFacility";
import PencilBookPage from "../pages/staff/PencilBookPage";
import StaffProfilePage from "../pages/staff/StaffProfilePage";

const StaffRoutes = [
  <Route
    key="staffRoute1"
    path="/staff/home"
    element={
      // <TransitionWrapper>
      <HomepageLayout>
        <StaffHomepage />
      </HomepageLayout>
      // </TransitionWrapper>
    }
  />,

  <Route
    key="staffRoute2"
    path="/staff/more"
    element={
      <TransitionWrapper location={location}>
        <HomepageLayout>
          <StaffMorePage />
        </HomepageLayout>
      </TransitionWrapper>
    }
  />,
  <Route
    key="staffRoute3"
    path="/staff/calendar"
    element={
      <TransitionWrapper location={location}>
        <CalendarPage />
      </TransitionWrapper>
    }
  />,
  <Route
    key="staffRoute4"
    path="/staff/pencil-book-facility"
    element={
      <TransitionWrapper location={location}>
        <AvailableFacility />
      </TransitionWrapper>
    }
  />,

  <Route
    key="staffRoute5"
    path="/staff/pencil-book/:facilityId"
    element={
      <TransitionWrapper location={location}>
        <PencilBookPage />
      </TransitionWrapper>
    }
  />,
  <Route
    key="staffRoute6"
    path="/staff/profile"
    element={
      <TransitionWrapper location={location}>
        <StaffProfilePage />
      </TransitionWrapper>
    }
  />,
];
export default StaffRoutes;
