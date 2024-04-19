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
import RequestHistoryPage from "../pages/staff/RequestHistoryPage";
import RequestPage from "../pages/staff/RequestPage";
import PencilBookHistory from "../pages/staff/PencilBookHistory";
import PencilBookDetails from "../pages/staff/PencilBookDetails";
import RequestDetails from "../pages/staff/RequestDetails";

const StaffRoutes = [
  <Route
    key="staffRoute1"
    path="/staff/home"
    element={
      <TransitionWrapper location={location}>
        <HomepageLayout>
          <StaffHomepage />
        </HomepageLayout>
      </TransitionWrapper>
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
  <Route
    key="staffRoute7"
    path="/staff/request-history"
    element={
      <TransitionWrapper location={location}>
        <RequestHistoryPage />
      </TransitionWrapper>
    }
  />,
  <Route
    key="staffRoute8"
    path="/staff/request"
    element={
      <TransitionWrapper location={location}>
        <RequestPage />
      </TransitionWrapper>
    }
  />,

  <Route
    key="staffRoute9"
    path="/staff/pencil-book-history"
    element={
      <TransitionWrapper location={location}>
        <PencilBookHistory />
      </TransitionWrapper>
    }
  />,

  <Route
    key="staffRoute10"
    path="/staff/pencil-book-details/:id"
    element={
      <TransitionWrapper location={location}>
        <PencilBookDetails />
      </TransitionWrapper>
    }
  />,
  <Route
    key="staffRoute11"
    path="/staff/request-details/:id/:type"
    element={
      <TransitionWrapper location={location}>
        <RequestDetails />
      </TransitionWrapper>
    }
  />,
];
export default StaffRoutes;
